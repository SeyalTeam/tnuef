import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { LanguageProvider } from './Language'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
