'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/Language'

interface Category {
  id: string
  title: string
  slug: string
  parent: Category | null
  breadcrumbs: Array<{
    doc: string
    url: string
    label: string
    id: string
  }>
}

interface CategoryResponse {
  docs: Category[]
}

export const CategoryNav: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { language } = useLanguage()

  // Helper function to format slug into display name (for English)
  const formatSlugToName = (slug: string): string => {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Get display name based on language
  const getDisplayName = (category: Category): string => {
    if (language === 'ta') {
      return category.title // Show Tamil title from API
    } else {
      return formatSlugToName(category.slug) // Show formatted English slug
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories')
        const data: CategoryResponse = await response.json()
        setCategories(data.docs)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Get parent categories (categories without a parent) sorted in ascending order
  const parentCategories = categories
    .filter((cat) => !cat.parent)
    .sort((a, b) => a.slug.localeCompare(b.slug))

  // Get children for a specific parent sorted in ascending order
  const getChildren = (parentId: string) => {
    return categories
      .filter((cat) => cat.parent && cat.parent.id === parentId)
      .sort((a, b) => a.slug.localeCompare(b.slug))
  }

  const handleMouseEnter = (categoryId: string) => {
    setOpenDropdown(categoryId)
  }

  const handleMouseLeave = () => {
    setOpenDropdown(null)
  }

  if (loading) {
    return (
      <nav className="flex items-center gap-1">
        <div className="h-8 w-24 bg-white/20 animate-pulse rounded"></div>
        <div className="h-8 w-24 bg-white/20 animate-pulse rounded"></div>
        <div className="h-8 w-24 bg-white/20 animate-pulse rounded"></div>
      </nav>
    )
  }

  return (
    <nav className="flex items-center gap-2">
      {parentCategories.map((category) => {
        const children = getChildren(category.id)
        const hasChildren = children.length > 0

        return (
          <div
            key={category.id}
            className="relative"
            onMouseEnter={() => hasChildren && handleMouseEnter(category.id)}
            onMouseLeave={handleMouseLeave}
          >
            {hasChildren ? (
              <button
                className="px-4 py-2 text-white hover:bg-white/10 rounded transition-all duration-200 flex items-center gap-1 font-medium"
                aria-haspopup="true"
                aria-expanded={openDropdown === category.id}
              >
                {getDisplayName(category)}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === category.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            ) : (
              <Link
                href={`/${category.slug}`}
                className="px-4 py-2 text-white hover:bg-white/10 rounded transition-all duration-200 block font-medium"
              >
                {getDisplayName(category)}
              </Link>
            )}

            {/* Dropdown Menu */}
            {hasChildren && openDropdown === category.id && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md overflow-hidden min-w-[200px] z-50 animate-fadeIn">
                {children.map((child) => (
                  <Link
                    key={child.id}
                    href={`/${child.slug}`}
                    className="block px-4 py-3 text-gray-800 hover:bg-[#D32F2F] hover:text-white transition-all duration-200"
                  >
                    {getDisplayName(child)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
