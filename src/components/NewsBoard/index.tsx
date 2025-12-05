import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface Post {
  id: string
  title: string
  slug: string
  publishedAt: string
  heroImage?: Media | string | null
}

interface NewsBoardProps {
  posts: Post[]
}

export const NewsBoard: React.FC<NewsBoardProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Blackboard texture overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,.03) 2px,
            rgba(255,255,255,.03) 4px
          )`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Chalkboard Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
            <span className="font-handwriting" style={{ fontFamily: 'cursive' }}>
              தகவல் பலகை
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-300 opacity-60"></div>
          </h2>
          <p className="text-yellow-100 text-lg mt-6 opacity-80">News Board</p>
        </div>

        {/* Notice Board Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post) => {
            const date = new Date(post.publishedAt)
            const formattedDate = date.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })

            let imageUrl = ''
            if (post.heroImage && typeof post.heroImage === 'object') {
              imageUrl = post.heroImage.url || ''
            }

            return (
              <Link href={`/posts/${post.slug}`} key={post.id} className="group">
                <div className="bg-yellow-50 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-1 relative">
                  {/* Pin/Thumbtack */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full shadow-lg flex items-center justify-center z-10">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  </div>

                  {/* Paper notice */}
                  <div className="p-6 pt-8">
                    {imageUrl && (
                      <div className="relative w-full h-40 mb-4 rounded overflow-hidden border-4 border-gray-200">
                        <Image src={imageUrl} alt={post.title} fill className="object-cover" />
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">{formattedDate}</span>
                      <span className="text-red-500 font-semibold group-hover:underline">
                        Read →
                      </span>
                    </div>
                  </div>

                  {/* Tape effect at corners */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-200 opacity-40 rotate-45 transform translate-x-4 -translate-y-4"></div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Chalk dust effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent pointer-events-none"></div>
      </div>
    </section>
  )
}
