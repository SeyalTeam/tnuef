'use client'

import React from 'react'
import Link from 'next/link'

// import type { Header as HeaderType } from '@/payload-types'
// import { CMSLink } from '@/components/Link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HeaderNav: React.FC<{ data: any; className?: string }> = ({ className }) => {
  // const navItems = data?.navItems || []

  return (
    <nav className={`flex gap-6 items-center ${className || ''}`}>
      <Link href="/#gallery" className="text-white hover:text-gray-200 font-medium text-lg">
        புகைப்படங்கள்
      </Link>
      <Link href="/introduction" className="text-white hover:text-gray-200 font-medium text-lg">
        அறிமுகம்
      </Link>
      <Link
        href="/category/press-news"
        className="text-white hover:text-gray-200 font-medium text-lg"
      >
        பத்திரிக்கை செய்திகள்
      </Link>
      <Link
        href="/category/news-board"
        className="text-white hover:text-gray-200 font-medium text-lg"
      >
        தகவல் பலகை
      </Link>
      <Link href="/contact" className="text-white hover:text-gray-200 font-medium text-lg">
        தொடர்புக்கு
      </Link>
    </nav>
  )
}
