import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export const cloudStoragePlugin = vercelBlobStorage({
  collections: {
    media: true,
  },
  token: process.env.BLOB_READ_WRITE_TOKEN || '',
})
