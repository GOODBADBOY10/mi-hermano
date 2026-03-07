'use client'
import { useEffect, useRef, useState } from 'react'

const accounts = [
  {
    name: 'Abdul-Hakeem',
    bank: 'First Bank Nigeria',
    accountNumber: '0231045613',
    accountName: 'Adebisi Abdul-Hakeem Adeniyi',
  },
  {
    name: 'Soliha',
    bank: 'GTBank',
    accountNumber: '0123456789',
    accountName: 'Soliha Adeyemi',
  },
]

export default function Gifts() {
  const ref = useRef(null)
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <section id="gifts" ref={ref} className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020B18 0%, #071428 50%, #020B18 100%)' }}>

      {/* Decorative background rings */}
      <div className="absolute left-0 top-1/3 w-64 sm:w-96 h-64 sm:h-96 opacity-[0.03] pointer-events-none -translate-x-1/2">
        <svg viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="190" stroke="#c0257d" strokeWidth="1" />
          <circle cx="200" cy="200" r="140" stroke="#c0257d" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" stroke="#c0257d" strokeWidth="1" />
        </svg>
      </div>

      {/* Vertical accent line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-24
        bg-linear-to-b from-transparent to-[#c0257d]/30" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 fade-up">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#c0257d]/60 mb-4">
            With Love
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            <span className="gold-shimmer">Gift Registry</span>
          </h2>
          <p className="font-serif text-white/40 italic text-base sm:text-lg max-w-md mx-auto">
            Your presence is the greatest gift of all. But if you'd like to bless us further,
            we are grateful for your generosity.
          </p>
        </div>

        {/* Account cards */}
        <div className="space-y-4 sm:space-y-5 fade-up delay-100">
          {accounts.map((acc, i) => (
            <div key={i}
              className="border border-[#c0257d]/20 bg-navy-800/30 p-6 sm:p-8 hover:border-[#c0257d]/40
                transition-all duration-500 hover:gold-glow"
              style={{ backdropFilter: 'blur(10px)' }}>

              {/* Card header */}
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#c0257d]/60 mb-1">
                    {acc.name}
                  </p>
                  <p className="font-display text-lg sm:text-xl text-white">{acc.bank}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#c0257d]/30 rounded-full
                  flex items-center justify-center text-[#c0257d]/60">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5z" />
                  </svg>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5 mb-5 sm:mb-6" />

              {/* Account details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 mb-1">
                      Account Number
                    </p>
                    <p className="font-serif text-white/80 text-base sm:text-lg tracking-widest">
                      {acc.accountNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(acc.accountNumber, `${i}-number`)}
                    className={`shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 border font-sans text-[10px]
                      tracking-widest uppercase transition-all duration-300
                      ${copied === `${i}-number`
                        ? 'border-[#e040a0]/60 bg-[#c0257d]/20 text-[#e040a0]'
                        : 'border-white/10 text-white/30 hover:border-[#c0257d]/40 hover:text-[#e040a0]'
                      }`}
                  >
                    {copied === `${i}-number` ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 mb-1">
                      Account Name
                    </p>
                    <p className="font-serif text-white/80 text-sm sm:text-base">
                      {acc.accountName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(acc.accountName, `${i}-name`)}
                    className={`shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 border font-sans text-[10px]
                      tracking-widest uppercase transition-all duration-300
                      ${copied === `${i}-name`
                        ? 'border-[#e040a0]/60 bg-[#c0257d]/20 text-[#e040a0]'
                        : 'border-white/10 text-white/30 hover:border-[#c0257d]/40 hover:text-[#e040a0]'
                      }`}
                  >
                    {copied === `${i}-name` ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="fade-up delay-200 mt-8 sm:mt-10 text-center">
          <p className="font-serif text-white/25 italic text-sm sm:text-base">
            Transfers can be made before or on the day of the wedding.
            <br className="hidden sm:block" /> May Allah bless you abundantly in return.
          </p>
        </div>
      </div>
    </section>
  )
}