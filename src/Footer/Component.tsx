import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, Header } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { CategoryNav } from '@/Header/CategoryNav'
import { Socials } from '@/Header/Socials'

export async function Footer() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  const navItems = headerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-4 flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Section 1: Branding */}
          <div className="flex flex-col gap-2 max-w-sm">
            <Link className="flex items-center gap-2" href="/">
              <div className="w-8 h-8 relative flex-shrink-0">
                {/* Adjusting Logo sizing to fit footer context if needed, or rely on Logo's own sizing */}
                <Logo />
              </div>
              <span className="font-bold text-base leading-tight">
                Tamil Nadu Untouchability Eradication Front
              </span>
            </Link>
            <p className="text-gray-400 text-xs">
              Working towards a society free from caste-based discrimination.
            </p>
            <div className="mt-1">
              <Socials />
            </div>
          </div>

          {/* Section 2: Navigation (Mirrored from Header) */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row flex-wrap gap-4 items-center justify-end">
              <CategoryNav />
              <nav className="flex flex-row flex-wrap gap-4 items-center">
                {navItems.map(({ link }, i) => {
                  return (
                    <CMSLink
                      className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                      key={i}
                      {...link}
                    />
                  )
                })}
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  தொடர்புக்கு
                </Link>
              </nav>
            </div>
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
