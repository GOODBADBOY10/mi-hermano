'use client'
import { useState, useEffect } from 'react'

const links = [
  { label: 'Our Story', href: '#story' },
  { label: 'Details', href: '#details' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Venue', href: '#venue' },
  { label: 'RSVP', href: '#rsvp' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-blur
        ${scrolled ? 'bg-[#020B18]/90 border-b border-gold-500/20 py-3' : 'py-5 sm:py-6'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Initials */}
        <a href="#hero" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold-500/60 flex items-center justify-center
            group-hover:border-gold-400 transition-colors">
            <span className="font-display text-gold-400 text-xs sm:text-sm font-semibold tracking-widest">A&R</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-xs tracking-[0.2em] uppercase text-white/60
                  hover:text-gold-400 transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* RSVP CTA */}
        <a
          href="#rsvp"
          className="hidden md:block px-4 lg:px-5 py-2 border border-gold-500/50 text-gold-400
        font-sans text-xs tracking-widest uppercase hover:bg-gold-500/10
        hover:border-gold-400 transition-all duration-300 shrink-0"
        >
          RSVP Now
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-gold-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
          <span className={`block w-6 h-px bg-gold-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-gold-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {
        menuOpen && (
          <div className="md:hidden bg-[#040f1e]/98 border-t border-gold-500/20 py-6">
            <ul className="flex flex-col items-center gap-5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-sans text-sm tracking-[0.2em] uppercase text-white/70
                  hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a href="#rsvp" onClick={() => setMenuOpen(false)}
                  className="px-8 py-3 border border-gold-500/50 text-gold-400
                  font-sans text-xs tracking-widest uppercase hover:bg-gold-500/10 transition-all duration-300">
                  RSVP Now
                </a>
              </li>
            </ul>
          </div >
        )
      }
    </nav >
  )
}