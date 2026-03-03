'use client'
import { useState, useEffect, useRef } from 'react'

const faqs = [
  {
    q: "Is there parking available at the venue?",
    a: "Yes! The Grand Pavilion offers complimentary valet parking for all guests. Simply pull up to the front entrance and our team will take care of your vehicle.",
  },
  {
    q: "Are children welcome at the wedding?",
    a: "We adore your little ones, however this is an adults-only evening. We hope this gives parents a chance to relax and enjoy the celebration. Thank you for understanding!",
  },
  {
    q: "What is the dress code exactly?",
    a: "Black Tie — we encourage floor-length gowns for women and black tuxedos or formal suits for men. Please avoid white, ivory, or champagne tones out of respect for the bride. Looking sharp is the only requirement!",
  },
  {
    q: "Can I bring a plus-one?",
    a: "Due to venue capacity, we can only accommodate guests named on the invitation. If you're unsure whether your plus-one is included, please reach out directly.",
  },
  {
    q: "Are there hotel recommendations nearby?",
    a: "Yes! We've secured a room block at Eko Hotel & Suites (5 minutes from the venue). Mention \"James & Eleanor Wedding\" when booking for a discounted rate.",
  },
  {
    q: "When is the RSVP deadline?",
    a: "Please RSVP no later than March 28, 2025 so we can give our caterers and venue the final headcount. Late RSVPs may not be accommodated.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-28 relative" style={{ background: '#020B18' }}>
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold-500/60 mb-4">
            Good to Know
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white">
            <span className="gold-shimmer">FAQ</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`fade-up delay-${(i % 4) * 100} border transition-all duration-300 cursor-pointer
                ${open === i
                  ? 'border-gold-500/40 bg-navy-800/50'
                  : 'border-white/10 bg-navy-800/20 hover:border-gold-500/20'
                }`}
              style={{ backdropFilter: 'blur(10px)' }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between px-6 py-5">
                <h3 className={`font-serif text-base transition-colors
                  ${open === i ? 'text-gold-400' : 'text-white/70'}`}>
                  {faq.q}
                </h3>
                <span className={`text-gold-500/60 text-xl transition-transform duration-300 ml-4 shrink-0
                  ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </div>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="font-serif text-white/50 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="fade-up mt-12 text-center">
          <p className="font-serif text-white/30 italic text-base">
            Still have questions?{' '}
            <a href="mailto:james.eleanor.wedding@gmail.com"
              className="text-gold-500/60 hover:text-gold-400 transition-colors underline underline-offset-4">
              Email us directly
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
