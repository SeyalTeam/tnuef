import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Tamil Nadu Untouchability Eradication Front - Working towards social equality and justice.',
  images: [
    {
      url: 'https://tnuef.com/api/media/file/tnueflogo.jpg',
    },
  ],
  siteName: 'TNUEF',
  title: 'Tamil Nadu Untouchability Eradication Front',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
