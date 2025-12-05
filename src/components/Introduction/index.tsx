'use client'
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
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
          {/* Left Content Side - Fixed Height with Scroll */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {/* Title (outside scrollable area) */}
            <div className="space-y-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight relative inline-block">
                {title}
                <span className="absolute -bottom-2 left-0 w-1/3 h-1.5 bg-[#D32F2F] rounded-full"></span>
              </h2>
            </div>

            {/* Scrollable Content Container - Matches Image Height */}
            <div className="relative flex-1 lg:h-[700px] mb-6">
              {/* Scrollable content */}
              <div className="h-full overflow-y-auto pr-4 scrollbar-custom">
                <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                  {content && <RichText data={content} />}
                </div>
              </div>

              {/* Bottom fade gradient to indicate scrollable content */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
            </div>

            {/* Read More Button (outside scrollable area) */}
            <div>
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

          {/* Right Image Side - Fixed Height */}
          <div className="w-full lg:w-1/2 relative lg:h-[700px]">
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl group">
              {/* Decorative background element */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D32F2F] to-orange-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500"></div>

              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100">
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

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #d32f2f;
          border-radius: 10px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #b71c1c;
        }

        /* For Firefox */
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #d32f2f #f1f1f1;
        }
      `}</style>
    </section>
  )
}
