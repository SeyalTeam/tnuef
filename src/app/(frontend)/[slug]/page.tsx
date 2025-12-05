import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Slider } from '@/components/Slider'
import { LatestPosts } from '@/components/LatestPosts'
import { IntroductionSection } from '@/components/Introduction'
import { PageHero } from '@/heros/PageHero'
import RichText from '@/components/RichText'

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
      return doc.slug !== 'home'
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
  if (slug === 'home') {
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

    const posts = await payload.find({
      collection: 'posts',
      limit: 3,
      sort: '-publishedAt',
      depth: 1, // Populate relationships like heroImage
    })
    latestPosts = posts.docs
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

          {/* Latest Posts - Only on homepage */}
          {latestPosts.length > 0 && <LatestPosts posts={latestPosts} />}

          {/* Introduction Section - Only on homepage */}
          {introData && <IntroductionSection data={introData} />}

          <div className="pt-16">
            <RenderHero {...hero} />
            <RenderBlocks blocks={layout} />
          </div>
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
