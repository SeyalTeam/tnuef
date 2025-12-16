'use client'

import React from 'react'
import Link from 'next/link'

// import type { Header as HeaderType } from '@/payload-types'
// import { CMSLink } from '@/components/Link'

import { useLanguage } from '@/providers/Language'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HeaderNav: React.FC<{ data: any; className?: string }> = ({ className }) => {
  const { language } = useLanguage()

  const navItems = [
    {
      href: '/#gallery',
      label: {
        ta: 'புகைப்படங்கள்',
        en: 'Gallery',
      },
    },
    {
      href: '/introduction',
      label: {
        ta: 'அறிமுகம்',
        en: 'Introduction',
      },
    },
    {
      href: '/category/press-news',
      label: {
        ta: 'பத்திரிக்கை செய்திகள்',
        en: 'Press News',
      },
    },
    {
      href: '/category/news-board',
      label: {
        ta: 'தகவல் பலகை',
        en: 'News Board',
      },
    },
    {
      href: '/contact',
      label: {
        ta: 'தொடர்புக்கு',
        en: 'Contact',
      },
    },
  ]

  return (
    <nav className={`flex gap-6 items-center ${className || ''}`}>
      {navItems.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="text-white hover:text-gray-200 font-medium text-lg whitespace-nowrap"
        >
          {language === 'ta' ? item.label.ta : item.label.en}
        </Link>
      ))}
    </nav>
  )
}
