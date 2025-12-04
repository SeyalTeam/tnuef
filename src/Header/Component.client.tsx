'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Socials } from './Socials'
import { LanguageSwitcher } from './LanguageSwitcher'
import { CategoryNav } from './CategoryNav'
import { useLanguage } from '@/providers/Language'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { language } = useLanguage()
  const pathname = usePathname()

  // Organization titles based on language
  const orgTitle =
    language === 'ta'
      ? 'தமிழ்நாடு தீண்டாமை ஒழிப்பு முன்னணி'
      : 'Tamil Nadu Untouchability Eradication Front'

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="relative z-20 w-full" {...(theme ? { 'data-theme': theme } : {})}>
      {/* Top Bar (Black) - Full Width */}
      <div className="bg-black text-white py-1">
        <div className="w-full px-4 flex justify-end items-center gap-4">
          <LanguageSwitcher />
          <Socials />
        </div>
      </div>

      {/* Main Header (Red) - Full Width */}
      <div className="bg-[#D32F2F] text-white shadow-md">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          {/* Left Side: Logo + Title */}
          <Link href="/" className="flex items-center gap-4 flex-shrink-0">
            <Logo loading="eager" priority="high" className="h-16 w-auto" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-wide uppercase">{orgTitle}</span>
            </div>
          </Link>

          {/* Right Side: Category Navigation */}
          <div className="flex items-center gap-6">
            <CategoryNav />
            <HeaderNav data={data} />
          </div>
        </div>
      </div>
    </header>
  )
}
