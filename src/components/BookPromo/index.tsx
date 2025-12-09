'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface BookPromoProps {
  initialDownloadCount: number
}

export const BookPromo: React.FC<BookPromoProps> = ({ initialDownloadCount }) => {
  const [downloadCount, setDownloadCount] = useState(initialDownloadCount)

  const handleDownload = async () => {
    // Optimistically update UI
    setDownloadCount((prev) => prev + 1)

    try {
      await fetch('/api/increment-download', { method: 'POST' })
    } catch (error) {
      console.error('Failed to increment download count', error)
      // Revert on error if needed, but for simple counters it's often fine to ignore
    }
  }

  const handleWhatsAppShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#book-promo`
    const text = `Check out this book: ${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section id="book-promo" className="bg-white py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          {/* Left Image Column (Swapped) */}
          <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-full">
            <Image
              src="https://bucghzn379yrpbdu.public.blob.vercel-storage.com/Banner/tnuefebook.png"
              alt="Book Promo"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right Content Column (Swapped) */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-red-50 to-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-700 leading-tight mb-8">
              &quot;இப்பல்லாம் யார் சாதி பாக்குறாங்க&quot; என்று சொல்லும் உதடுகளுக்கு சமர்ப்பணம்
            </h1>

            <div className="prose prose-lg text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                நடப்பு கொடுமைகளோடு, அரசியல் திட்டத்தை இணைக்கிறது. தோழர் எம்.ஏ.பேபியின் நீக்கமற
                நிறைந்துள்ள சாதி என்ற கட்டுரை.
              </p>
              <p className="text-lg leading-relaxed">
                நல்ல மனங்களைக் கலங்க வைக்கும் தீண்டாமை வடிவங்கள் இந்த நூலில் பட்டியல் இடப்பட்டுள்ளன.
                கிராமம், கிராமமாக, வீதிகளில் இறங்கி தமிழ்நாடு தீண்டாமை ஒழிப்பு முன்னணியால்
                தொகுக்கப்பட்ட தீண்டாமை - வன்கொடுமை வடிவங்கள் இவை.
              </p>

              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 my-8">
                <p className="font-medium text-gray-800 mb-4">
                  எந்தவிதக் கட்டணமும் இல்லாமல் மின்னணு புத்தகமாக வெளியாகிறது. தோழர்கள்,
                  நண்பர்களுக்கு, உறவினர்களுக்கு இதை அனுப்பி வையுங்கள்.
                </p>
                <div className="flex flex-col items-start gap-4">
                  <a
                    href="https://drive.google.com/uc?export=download&id=1AW4lnRRaZ8KQqAI3W5jYHnQxrLCbSdOe"
                    onClick={handleDownload}
                    className="inline-flex items-center px-4 py-3 md:px-6 md:py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200 group no-underline text-sm md:text-base"
                  >
                    <svg
                      className="w-5 h-5 mr-2 group-hover:animate-bounce"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    பதிவிறக்கம் (Download PDF)
                  </a>
                  <span className="text-sm font-medium text-gray-500 ml-1">
                    {downloadCount} downloads
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xl font-bold text-gray-900">
                தமிழ்நாடு தீண்டாமை ஒழிப்பு முன்னணி - மாநிலக்குழு.
              </p>
              <button
                onClick={handleWhatsAppShare}
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                title="Share on WhatsApp"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
