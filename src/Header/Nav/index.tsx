'use client'

import React from 'react'
import Link from 'next/link'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType; className?: string }> = ({
  data,
  className,
}) => {
  const navItems = data?.navItems || []

  return (
    <nav className={`flex gap-6 items-center ${className || ''}`}>
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="text-white hover:text-gray-200 font-medium text-lg"
          />
        )
      })}
      <Link href="/contact" className="text-white hover:text-gray-200 font-medium text-lg">
        தொடர்புக்கு
      </Link>
    </nav>
  )
}
