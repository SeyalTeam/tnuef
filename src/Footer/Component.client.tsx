'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from '@/Header/Nav'
import { Socials } from '@/Header/Socials'
import { useLanguage } from '@/providers/Language'

// Ensure we have a dummy data object since HeaderNav expects it, even if unused for now
const dummyData = {}

export function FooterClient() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const orgTitle =
    language === 'ta'
      ? 'தமிழ்நாடு தீண்டாமை ஒழிப்பு முன்னணி'
      : 'Tamil Nadu Untouchability Eradication Front'

  if (!mounted) {
    return (
      <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
        <div className="container py-4 flex flex-col gap-4 md:gap-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Skeleton or initial state */}
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-4 flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Section 1: Branding */}
          <div className="flex flex-col gap-2 max-w-sm">
            <Link className="flex items-center gap-2" href="/">
              <div className="w-8 h-8 relative flex-shrink-0">
                <Logo />
              </div>
              <span className="font-bold text-base leading-tight whitespace-nowrap">
                {orgTitle}
              </span>
            </Link>
            {/* Removed Slogan */}
            <div className="mt-1">
              <Socials />
            </div>
          </div>

          {/* Section 2: Navigation (Shared with Header) */}
          <div className="flex flex-col gap-2">
            <HeaderNav
              data={dummyData}
              className="flex-row flex-wrap gap-4 items-center justify-end !text-sm"
            />
          </div>
        </div>

        {/* Section 3: Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 pt-2 border-t border-gray-800">
          <div className="text-[10px] text-gray-500">
            © {new Date().getFullYear()} TNUEF. All rights reserved.
          </div>
          <div className="text-[10px] text-gray-500">
            Powered by{' '}
            <Link
              href="https://vseyal.com"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              VSeyal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
