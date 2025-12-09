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

interface LatestPostsProps {
  posts: Post[]
}

export const LatestPosts: React.FC<LatestPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-12 bg-gradient-to-br from-red-50 via-white to-red-50/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const date = new Date(post.publishedAt)
            const day = date.getDate()
            const month = date.toLocaleString('default', { month: 'short' })
            const year = date.getFullYear()

            let imageUrl = ''
            let imageAlt = post.title

            if (post.heroImage && typeof post.heroImage === 'object') {
              if (post.heroImage.url) {
                imageUrl = post.heroImage.url
              }
              if (post.heroImage.alt) {
                imageAlt = post.heroImage.alt
              }
            }

            return (
              <Link href={`/posts/${post.slug}`} key={post.id} className="group block">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="mt-auto flex items-center text-gray-500 text-sm">
                      <span className="font-medium text-gray-900 mr-1">{day}</span>
                      <span className="mr-1">{month},</span>
                      <span>{year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
