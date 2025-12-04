import React from 'react'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'

export const Socials: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="https://www.facebook.com/tnueforg/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-200 transition-colors"
        aria-label="Facebook"
      >
        <Facebook size={20} />
      </Link>
      <Link
        href="https://x.com/tnueforg"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-200 transition-colors"
        aria-label="Twitter/X"
      >
        <Twitter size={20} />
      </Link>
      <Link
        href="https://www.instagram.com/untouchablity"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-200 transition-colors"
        aria-label="Instagram"
      >
        <Instagram size={20} />
      </Link>
      <Link
        href="https://www.youtube.com/@tnuef-%E0%AE%A4%E0%AE%A4%E0%AF%80%E0%AE%92%E0%AE%AE%E0%AF%81"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-200 transition-colors"
        aria-label="YouTube"
      >
        <Youtube size={20} />
      </Link>
    </div>
  )
}
