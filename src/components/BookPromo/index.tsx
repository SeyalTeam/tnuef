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

  return (
    <section className="bg-white py-12 md:py-20 lg:py-24">
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
                <div className="flex items-center gap-4">
                  <a
                    href="https://drive.google.com/uc?export=download&id=1AW4lnRRaZ8KQqAI3W5jYHnQxrLCbSdOe"
                    onClick={handleDownload}
                    className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200 group no-underline whitespace-nowrap"
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
                  <span className="text-lg font-bold text-gray-700">{downloadCount} downloads</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xl font-bold text-gray-900">
                தமிழ்நாடு தீண்டாமை ஒழிப்பு முன்னணி - மாநிலக்குழு.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
