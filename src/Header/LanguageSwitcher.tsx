'use client'
import React from 'react'
import { useLanguage } from '@/providers/Language'

export const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 text-white font-medium hover:text-gray-200 transition-colors"
    >
      <span className={language === 'en' ? 'font-bold' : 'opacity-70'}>EN</span>
      <span>|</span>
      <span className={language === 'ta' ? 'font-bold' : 'opacity-70'}>TA</span>
    </button>
  )
}
