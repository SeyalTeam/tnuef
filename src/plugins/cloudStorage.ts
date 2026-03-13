import path from 'path'

import { s3Storage } from '@payloadcms/storage-s3'

const mediaPrefix = process.env.S3_MEDIA_PREFIX || 'tnuef'
const publicBaseURL =
  process.env.S3_PUBLIC_URL ||
  process.env.NEXT_PUBLIC_S3_PUBLIC_URL ||
  process.env.S3_ENDPOINT ||
  ''
const endpoint = process.env.S3_ENDPOINT || ''
const bucket = process.env.S3_BUCKET || ''
const region = process.env.S3_REGION || 'auto'
const accessKeyId = process.env.S3_ACCESS_KEY_ID || ''
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || ''

const isCloudStorageEnabled = Boolean(
  endpoint && bucket && region && accessKeyId && secretAccessKey && publicBaseURL,
)

const getPublicFileURL = (filename: string, prefix?: string) => {
  const normalizedBaseURL = publicBaseURL.replace(/\/$/, '')
  const objectKey = path.posix.join(prefix || mediaPrefix, filename)

  if (!normalizedBaseURL) return objectKey

  return `${normalizedBaseURL}/${objectKey}`
}

export const cloudStoragePlugin = s3Storage({
  enabled: isCloudStorageEnabled,
  bucket,
  collections: {
    media: {
      generateFileURL: ({ filename, prefix }) => getPublicFileURL(filename, prefix),
      prefix: mediaPrefix,
    },
  },
  config: {
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    endpoint,
    forcePathStyle: true,
    region,
  },
})
