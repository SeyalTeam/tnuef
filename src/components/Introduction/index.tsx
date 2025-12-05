import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface IntroductionProps {
  data: {
    title: string
    hero: {
      media?: Media | string | null
      richText?: any
    }
    slug: string
  }
}

export const IntroductionSection: React.FC<IntroductionProps> = ({ data }) => {
  if (!data) return null

  const { title, hero, slug } = data
  const image = hero?.media as Media
  const content = hero?.richText

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-red-50/30 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
          {/* Left Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col animate-fade-in-up">
            <div className="space-y-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight relative inline-block">
                {title}
                <span className="absolute -bottom-2 left-0 w-1/3 h-1.5 bg-[#D32F2F] rounded-full"></span>
              </h2>
            </div>

            {/* Content container with fixed height matching image */}
            <div className="relative flex-grow mb-6">
              <div className="prose prose-lg text-gray-600 leading-relaxed max-h-[400px] overflow-hidden">
                {content && <RichText data={content} />}
              </div>
              {/* Gradient fade at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>

            {/* Read More button at bottom */}
            <div className="mt-auto">
              <Link
                href={`/${slug}`}
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-[#D32F2F] hover:bg-[#B71C1C] rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Read More
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Image Side */}
          <div className="w-full lg:w-1/2 flex items-stretch">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group w-full min-h-[400px]">
              {/* Decorative background element */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D32F2F] to-orange-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500"></div>

              <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gray-100">
                {image && image.url ? (
                  <Image
                    src={image.url}
                    alt={image.alt || title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
