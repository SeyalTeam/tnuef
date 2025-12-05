'use client'
import React, { useState } from 'react'
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
  const [currentSlide, setCurrentSlide] = useState(0)

  if (!data) return null

  const { title, hero, slug } = data
  const image = hero?.media as Media
  const content = hero?.richText

  // Split content into manageable chunks for slides
  // This is a simple approach - you can customize based on your needs
  const contentChunks = content?.root?.children
    ? splitContentIntoChunks(content.root.children)
    : [[]]
  const totalSlides = contentChunks.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
          {/* Left Content Side - Fixed Height with Carousel */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {/* Title (outside carousel area) */}
            <div className="space-y-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight relative inline-block">
                {title}
                <span className="absolute -bottom-2 left-0 w-1/3 h-1.5 bg-[#D32F2F] rounded-full"></span>
              </h2>
            </div>

            {/* Content Carousel Container */}
            <div className="relative flex-1 lg:h-[700px] mb-6 overflow-hidden">
              <div className="h-full flex items-start">
                <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                  {content && (
                    <RichText
                      data={{ root: { children: contentChunks[currentSlide], ...content.root } }}
                    />
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              {totalSlides > 1 && (
                <>
                  {currentSlide > 0 && (
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#D32F2F] text-white p-3 rounded-full shadow-lg hover:bg-[#B71C1C] transition-all duration-300 z-10"
                      aria-label="Previous content"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  )}

                  {currentSlide < totalSlides - 1 && (
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#D32F2F] text-white p-3 rounded-full shadow-lg hover:bg-[#B71C1C] transition-all duration-300 z-10"
                      aria-label="Next content"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Slide Indicator & Read More Button */}
            <div className="flex items-center justify-between">
              {totalSlides > 1 && (
                <div className="flex gap-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'w-8 bg-[#D32F2F]' : 'w-2 bg-gray-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}

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

          {/* Right Image Side - Fixed */}
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
    </section>
  )
}

// Helper function to split content into chunks
// This splits content into groups of paragraphs - adjust as needed
function splitContentIntoChunks(children: any[], chunkSize = 3) {
  if (!children || children.length === 0) return [[]]

  const chunks = []
  for (let i = 0; i < children.length; i += chunkSize) {
    chunks.push(children.slice(i, i + chunkSize))
  }

  return chunks.length > 0 ? chunks : [[]]
}
