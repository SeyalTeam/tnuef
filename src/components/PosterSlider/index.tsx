'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { Media } from '@/payload-types'

export interface PosterStory {
  id: string
  title: string
  image: Media | string
  link?: string | null
}

interface PosterSliderProps {
  posters: PosterStory[]
}

export const PosterSlider: React.FC<PosterSliderProps> = ({ posters }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  if (!posters || posters.length === 0) return null

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300 // Approx width of one card + gap
      const currentScroll = scrollContainerRef.current.scrollLeft

      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">Posters</h2>
          </div>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {posters.map((poster) => {
            const imageUrl =
              typeof poster.image === 'string' ? poster.image : poster.image?.url || ''
            const imageAlt =
              typeof poster.image === 'string' ? poster.title : poster.image?.alt || poster.title

            const CardContent = () => (
              <>
                {/* Image */}
                <div className="relative w-full h-full">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 160px, 200px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                </div>

                {/* Subtle full overlay */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Grading Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60 opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Icon Overlay (Only if link exists) */}
                {poster.link && (
                  <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Title */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-sm font-semibold text-white/95 line-clamp-2 drop-shadow-md">
                    {poster.title}
                  </h3>
                </div>
              </>
            )

            const wrapperClasses =
              'flex-none snap-start group relative w-[160px] md:w-[200px] aspect-[9/16] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gray-100'

            if (poster.link) {
              return (
                <Link
                  key={poster.id}
                  href={poster.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={wrapperClasses}
                >
                  <CardContent />
                </Link>
              )
            }

            return (
              <div key={poster.id} className={wrapperClasses}>
                <CardContent />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
