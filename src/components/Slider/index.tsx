'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SliderImage {
  id: string
  title: string
  image: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  link?: string
  order: number
  active: boolean
}

interface SliderProps {
  slides: SliderImage[]
  autoPlayInterval?: number
}

export const Slider: React.FC<SliderProps> = ({ slides, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Filter active slides and sort by order
  const activeSlides = slides.filter((slide) => slide.active).sort((a, b) => a.order - b.order)

  useEffect(() => {
    if (!isAutoPlaying || activeSlides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activeSlides.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, activeSlides.length, autoPlayInterval])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? activeSlides.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activeSlides.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  if (activeSlides.length === 0) {
    return null
  }

  const currentSlide = activeSlides[currentIndex]

  const SlideContent = () => (
    <div className="relative w-full h-full">
      <Image
        src={currentSlide.image.url}
        alt={currentSlide.image.alt || currentSlide.title}
        fill
        className="object-cover"
        priority={currentIndex === 0}
        sizes="100vw"
      />
    </div>
  )

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden bg-gray-900">
      {/* Slider Images */}
      <div className="relative w-full h-full">
        {currentSlide.link ? (
          <Link href={currentSlide.link} className="block w-full h-full">
            <SlideContent />
          </Link>
        ) : (
          <SlideContent />
        )}
      </div>

      {/* Navigation Arrows */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-200 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-200 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {activeSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-white w-6 md:w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
