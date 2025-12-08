import { Menu, X } from 'lucide-react'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
    setMobileMenuOpen(false)
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
      <div className="bg-[#D32F2F] text-white shadow-md relative">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          {/* Left Side: Logo + Title */}
          <Link href="/" className="flex items-center gap-4 flex-shrink-0 z-30 relative">
            <Logo loading="eager" priority="high" className="h-12 md:h-16 w-auto" />
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-bold tracking-wide uppercase leading-tight max-w-[200px] md:max-w-none">
                {orgTitle}
              </span>
            </div>
          </Link>

          {/* Right Side: Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <CategoryNav />
            <HeaderNav data={data} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white z-30 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`fixed inset-0 bg-[#D32F2F] z-20 transition-transform duration-300 ease-in-out lg:hidden pt-24 px-4 overflow-y-auto ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-8 pb-10">
            <div className="border-b border-white/20 pb-6">
              <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-4">
                Categories
              </h3>
              <CategoryNav isMobile={true} closeMobileMenu={() => setMobileMenuOpen(false)} />
            </div>

            <div>
              <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-4">
                Menu
              </h3>
              <HeaderNav data={data} className="flex-col !items-start !gap-4" />
            </div>

            {/* Mobile Footer in Drawer */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex flex-wrap gap-4">
                <LanguageSwitcher />
                <Socials />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
