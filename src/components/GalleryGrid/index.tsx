'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface GalleryImage {
  id: string
  title: string
  image: Media | string
  order: number
  active: boolean
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) return null

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const currentImage = images[currentIndex]?.image as Media

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">புகைப்படங்கள்</h2>
          </div>

          {/* 4x4 Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {images.map((item, index) => {
              const image = item.image as Media
              if (!image || !image.url) return null

              return (
                <div
                  key={item.id}
                  className="group relative aspect-video overflow-hidden rounded-lg cursor-pointer bg-gray-200 hover:shadow-2xl transition-all duration-300"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Popup */}
      {lightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={closeLightbox}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-full mx-auto flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={currentImage.url || ''}
                alt={currentImage.alt || 'Gallery image'}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Next Button */}
          <button
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
