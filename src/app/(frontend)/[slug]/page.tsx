import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Slider } from '@/components/Slider'
import { LatestPosts } from '@/components/LatestPosts'
import { IntroductionSection } from '@/components/Introduction'
import { PageHero } from '@/heros/PageHero'
import RichText from '@/components/RichText'
import { NewsBoard } from '@/components/NewsBoard'
import { GalleryGrid } from '@/components/GalleryGrid'
import { LeadersBanner } from '@/components/LeadersBanner'
import { BookPromo } from '@/components/BookPromo'
import { TwitterStories } from '@/components/TwitterStories'
import { getLatestTweetImages } from '@/utilities/twitter'
import { PosterSlider } from '@/components/PosterSlider'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home' && doc.slug !== 'contact'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  // Fetch slider data for homepage
  let sliderData: any[] = []
  let latestPosts: any[] = []
  let tweetImages: any[] = [] // Twitter stories data
  let postersData: any[] = [] // Posters data

  if (slug === 'home') {
    // Fetched later after checking site settings
    // tweetImages = await getLatestTweetImages()

    const payload = await getPayload({ config: configPromise })
    const sliders = await payload.find({
      collection: 'sliders',
      limit: 100,
      sort: 'order',
      depth: 1, // Populate the image relationship
    })

    sliderData = sliders.docs.map((slide: any) => ({
      id: slide.id,
      title: slide.title,
      image: {
        url: typeof slide.image === 'object' ? slide.image.url : '',
        alt: typeof slide.image === 'object' ? slide.image.alt : slide.title,
      },
      link: slide.link,
      order: slide.order,
      active: slide.active,
    }))

    // Find news-board category ID to exclude it
    const newsBoardCat = await payload.find({
      collection: 'categories',
      where: {
        slug: {
          equals: 'news-board',
        },
      },
      limit: 1,
    })

    const newsBoardCategoryId = newsBoardCat.docs.length > 0 ? newsBoardCat.docs[0].id : null

    const posts = await payload.find({
      collection: 'posts',
      where: newsBoardCategoryId
        ? {
            categories: {
              not_in: [newsBoardCategoryId],
            },
          }
        : {},
      limit: 3,
      sort: '-publishedAt',
      depth: 1, // Populate relationships like heroImage
    })
    latestPosts = posts.docs
    // Fetch Posters
    const postersQuery = await payload.find({
      collection: 'posters',
      where: {
        active: {
          equals: true,
        },
      },
      sort: '-updatedAt', // Default to recently updated
      limit: 10,
      depth: 1,
    })

    postersData = postersQuery.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      image: doc.image,
      link: doc.link,
    }))
  }

  // Fetch Introduction page data
  let introData = null
  if (slug === 'home') {
    const payload = await getPayload({ config: configPromise })
    const introPage = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'introduction',
        },
      },
      limit: 1,
    })

    if (introPage.docs.length > 0) {
      introData = introPage.docs[0]
    }
  }

  // Fetch news board posts (from news-board category)
  let newsBoardPosts: any[] = []
  let bookDownloadCount = 0

  if (slug === 'home') {
    const payload = await getPayload({ config: configPromise })

    // Fetch site settings first to check for Twitter toggle
    let enableTwitterFeed = true // Default to true if not found
    try {
      const siteSettings = await payload.findGlobal({
        slug: 'site-settings' as any,
      })
      bookDownloadCount = (siteSettings as any).bookDownloadCount || 0

      // Explicitly check boolean, because it could be false
      if (typeof (siteSettings as any).enableTwitterFeed === 'boolean') {
        enableTwitterFeed = (siteSettings as any).enableTwitterFeed
      }
    } catch (error) {
      console.error('Error fetching site settings', error)
    }

    if (enableTwitterFeed) {
      // Fetch Twitter images (stories) only if enabled
      tweetImages = await getLatestTweetImages()
    }

    // Find the news-board category first
    const newsBoardCategory = await payload.find({
      collection: 'categories',
      where: {
        slug: {
          equals: 'news-board',
        },
      },
      limit: 1,
    })

    if (newsBoardCategory.docs.length > 0) {
      const categoryId = newsBoardCategory.docs[0].id

      // Fetch posts from this category
      const boardPosts = await payload.find({
        collection: 'posts',
        where: {
          categories: {
            contains: categoryId,
          },
          _status: {
            equals: 'published',
          },
        },
        limit: 6,
        sort: '-publishedAt',
        depth: 1,
      })

      newsBoardPosts = boardPosts.docs
    }
  }

  // Fetch Gallery images
  let galleryImages: any[] = []
  if (slug === 'home') {
    const payload = await getPayload({ config: configPromise })
    const gallery = await payload.find({
      collection: 'gallery',
      where: {
        active: {
          equals: true,
        },
      },
      limit: 16, // 4x4 grid
      sort: '-createdAt',
      depth: 1,
    })
    galleryImages = gallery.docs
  }

  return (
    <article className="pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {slug === 'home' ? (
        // Homepage layout
        <>
          {/* Slider - Only on homepage */}
          {sliderData.length > 0 && <Slider slides={sliderData} />}

          {/* Twitter Stories - Only on homepage */}
          {tweetImages.length > 0 && <TwitterStories stories={tweetImages} />}

          {/* Poster Slider - Only on homepage */}
          {postersData.length > 0 && <PosterSlider posters={postersData} />}

          {/* Latest Posts - Only on homepage */}
          {latestPosts.length > 0 && <LatestPosts posts={latestPosts} />}

          {/* Introduction Section - Only on homepage */}
          {introData && <IntroductionSection data={introData} />}

          {/* Leaders Banner - Only on homepage */}
          <LeadersBanner />

          {/* News Board - Only on homepage */}
          {newsBoardPosts.length > 0 && <NewsBoard posts={newsBoardPosts} />}

          {/* Book Promo Section */}
          <BookPromo initialDownloadCount={bookDownloadCount} />

          {/* Gallery - Only on homepage */}
          {galleryImages.length > 0 && <GalleryGrid images={galleryImages} />}
        </>
      ) : (
        // Other pages layout (like post pages)
        <>
          <PageHero page={page as any} />

          <div className="flex flex-col items-center gap-4 pt-8">
            <div className="container">
              {hero?.richText && (
                <RichText
                  className="max-w-[48rem] mx-auto"
                  data={hero.richText}
                  enableGutter={false}
                />
              )}
              {layout && layout.length > 0 && (
                <div className="max-w-[48rem] mx-auto mt-8">
                  <RenderBlocks blocks={layout} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
