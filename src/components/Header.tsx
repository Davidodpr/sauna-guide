'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sauna-steam/80 backdrop-blur-md border-b border-sauna-warm/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sauna-copper to-sauna-ember flex items-center justify-center
                          shadow-lg shadow-sauna-copper/30 group-hover:shadow-xl group-hover:shadow-sauna-copper/40
                          transition-all duration-300 group-hover:scale-105">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          </div>
          <span className="font-display text-2xl font-semibold text-sauna-dark">Sauna Guide</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/saunas" className="text-sauna-dark/70 hover:text-sauna-copper transition-colors font-medium">
            Directory
          </Link>
          <Link href="/guides" className="text-sauna-dark/70 hover:text-sauna-copper transition-colors font-medium">
            Protocols
          </Link>
          <Link href="#newsletter" className="px-5 py-2.5 bg-sauna-dark text-white rounded-full font-medium
                                               hover:bg-sauna-charcoal transition-all duration-300
                                               shadow-lg shadow-sauna-dark/20 hover:shadow-xl hover:shadow-sauna-dark/30">
            Get the Protocol
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-sauna-dark hover:text-sauna-copper transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sauna-steam/95 backdrop-blur-md border-t border-sauna-warm/10">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/saunas"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sauna-dark/70 hover:text-sauna-copper transition-colors font-medium py-2"
            >
              Directory
            </Link>
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sauna-dark/70 hover:text-sauna-copper transition-colors font-medium py-2"
            >
              Protocols
            </Link>
            <Link
              href="#newsletter"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-5 py-2.5 bg-sauna-dark text-white rounded-full font-medium
                         hover:bg-sauna-charcoal transition-all duration-300
                         shadow-lg shadow-sauna-dark/20"
            >
              Get the Protocol
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
