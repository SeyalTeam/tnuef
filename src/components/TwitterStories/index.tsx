'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TweetImage } from '@/utilities/twitter'
import { ChevronLeft, ChevronRight, Twitter } from 'lucide-react'

interface TwitterStoriesProps {
  stories: TweetImage[]
}

export const TwitterStories: React.FC<TwitterStoriesProps> = ({ stories }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  if (!stories || stories.length === 0) return null

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
    <section className="py-8 bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-black p-1.5 rounded-full">
              <Twitter className="w-5 h-5 text-white fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Latest from X</h2>
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
          {stories.map((story) => (
            <Link
              key={story.id}
              href={story.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-none snap-start group relative w-[160px] md:w-[200px] aspect-[9/16] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <Image
                src={story.url}
                alt={story.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 160px, 200px"
              />

              {/* Grading Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60 opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Icon Overlay */}
              <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Twitter className="w-4 h-4 text-white" />
              </div>

              {/* Text Link - if needed, but keeping it clean for image slider look */}
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-xs font-medium text-white/90 truncate block">@tnueforg</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
