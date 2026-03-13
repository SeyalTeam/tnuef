import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  const toAbsoluteURL = (url?: string | null) => {
    if (!url) return null

    return url.startsWith('http://') || url.startsWith('https://') ? url : `${serverUrl}${url}`
  }

  let url = 'https://tnuef.com/api/media/file/tnueflogo.jpg'

  if (image && typeof image === 'object' && 'url' in image) {
    const resolvedImageURL = toAbsoluteURL(image.sizes?.og?.url) || toAbsoluteURL(image.url)

    if (resolvedImageURL) {
      url = resolvedImageURL
    }
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | TNUEF'
    : 'Tamil Nadu Untouchability Eradication Front'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
