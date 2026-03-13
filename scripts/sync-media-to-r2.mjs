import path from 'path'

import {
  CopyObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const requiredEnvVars = [
  'DATABASE_URI',
  'S3_ENDPOINT',
  'S3_ACCESS_KEY_ID',
  'S3_SECRET_ACCESS_KEY',
  'S3_BUCKET',
  'S3_REGION',
]

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key])

if (!process.env.S3_PUBLIC_URL && !process.env.NEXT_PUBLIC_S3_PUBLIC_URL) {
  missingEnvVars.push('S3_PUBLIC_URL or NEXT_PUBLIC_S3_PUBLIC_URL')
}

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
  process.exit(1)
}

const targetPrefix = process.env.S3_MEDIA_PREFIX || 'tnuef'
const publicBaseURL = (
  process.env.S3_PUBLIC_URL ||
  process.env.NEXT_PUBLIC_S3_PUBLIC_URL ||
  ''
).replace(/\/$/, '')

const client = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
})

const bucket = process.env.S3_BUCKET

const getTargetKey = (filename, prefix = targetPrefix) => path.posix.join(prefix, filename)
const getPublicURL = (filename, prefix = targetPrefix) =>
  `${publicBaseURL}/${getTargetKey(filename, prefix)}`

const objectExists = async (key) => {
  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    )

    return true
  } catch (error) {
    if (error?.$metadata?.httpStatusCode === 404 || error?.name === 'NotFound') {
      return false
    }

    throw error
  }
}

const copyObject = async (sourceKey, targetKey, contentType) => {
  await client.send(
    new CopyObjectCommand({
      Bucket: bucket,
      ContentType: contentType,
      CopySource: `/${bucket}/${sourceKey}`,
      Key: targetKey,
      MetadataDirective: contentType ? 'REPLACE' : 'COPY',
    }),
  )
}

const uploadFromURL = async (sourceURL, targetKey, contentType) => {
  const response = await fetch(sourceURL)

  if (!response.ok) {
    throw new Error(`Failed to download ${sourceURL}: ${response.status} ${response.statusText}`)
  }

  const body = Buffer.from(await response.arrayBuffer())

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: body,
      ContentType: contentType || response.headers.get('content-type') || undefined,
      Key: targetKey,
    }),
  )
}

const ensurePrefixMarker = async () => {
  const keepFileKey = `${targetPrefix}/.keep`

  if (await objectExists(keepFileKey)) return

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: '',
      Key: keepFileKey,
    }),
  )
}

const getSourceCandidates = ({ docPrefix, filename, url }) => {
  const candidates = new Set()

  if (docPrefix) {
    candidates.add(path.posix.join(docPrefix, filename))
  }

  candidates.add(filename)

  if (typeof url === 'string' && url.startsWith(publicBaseURL)) {
    const keyFromURL = url.replace(`${publicBaseURL}/`, '')

    if (keyFromURL) {
      candidates.add(keyFromURL)
    }
  }

  return [...candidates]
}

const syncAsset = async ({ contentType, docPrefix, filename, url }) => {
  if (!filename) {
    return { action: 'skipped', reason: 'missing-filename' }
  }

  const targetKey = getTargetKey(filename)

  if (await objectExists(targetKey)) {
    return { action: 'exists', key: targetKey }
  }

  for (const sourceKey of getSourceCandidates({ docPrefix, filename, url })) {
    if (sourceKey === targetKey) continue

    if (await objectExists(sourceKey)) {
      await copyObject(sourceKey, targetKey, contentType)
      return { action: 'copied', from: sourceKey, key: targetKey }
    }
  }

  if (typeof url === 'string' && /^https?:\/\//.test(url)) {
    await uploadFromURL(url, targetKey, contentType)
    return { action: 'downloaded', from: url, key: targetKey }
  }

  return { action: 'missing', key: targetKey }
}

const main = async () => {
  await mongoose.connect(process.env.DATABASE_URI)
  await ensurePrefixMarker()

  const mediaCollection = mongoose.connection.collection('media')
  const mediaDocs = await mediaCollection
    .find({}, { projection: { filename: 1, mimeType: 1, prefix: 1, sizes: 1, url: 1 } })
    .toArray()

  let updatedDocs = 0
  let copiedObjects = 0
  let downloadedObjects = 0
  let missingObjects = 0

  for (const doc of mediaDocs) {
    const update = {
      prefix: targetPrefix,
      url: doc.filename ? getPublicURL(doc.filename) : doc.url,
    }

    const originalResult = await syncAsset({
      contentType: doc.mimeType,
      docPrefix: doc.prefix,
      filename: doc.filename,
      url: doc.url,
    })

    if (originalResult.action === 'copied') copiedObjects += 1
    if (originalResult.action === 'downloaded') downloadedObjects += 1
    if (originalResult.action === 'missing') missingObjects += 1

    const sizes = doc.sizes && typeof doc.sizes === 'object' ? { ...doc.sizes } : {}

    for (const [sizeName, sizeData] of Object.entries(sizes)) {
      if (!sizeData || typeof sizeData !== 'object' || !sizeData.filename) continue

      const sizeResult = await syncAsset({
        contentType: doc.mimeType,
        docPrefix: doc.prefix,
        filename: sizeData.filename,
        url: sizeData.url,
      })

      if (sizeResult.action === 'copied') copiedObjects += 1
      if (sizeResult.action === 'downloaded') downloadedObjects += 1
      if (sizeResult.action === 'missing') missingObjects += 1

      sizes[sizeName] = {
        ...sizeData,
        url: getPublicURL(sizeData.filename),
      }
    }

    await mediaCollection.updateOne(
      { _id: doc._id },
      {
        $set: {
          ...update,
          sizes,
        },
      },
    )

    updatedDocs += 1
  }

  console.log(
    JSON.stringify(
      {
        copiedObjects,
        downloadedObjects,
        missingObjects,
        prefix: targetPrefix,
        updatedDocs,
      },
      null,
      2,
    ),
  )
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
