import React from 'react'

export const LeadersBanner: React.FC = () => {
  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full rounded-2xl overflow-hidden shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://tnuef.com/api/media/file/tnuefleaders.jpeg"
            alt="TNUEF Leaders"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
