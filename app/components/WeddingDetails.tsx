'use client'
import { useEffect, useRef } from 'react'

const details = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
    label: 'Date',
    value: 'Saturday, July 12',
    sub: '2026',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 3"/>
      </svg>
    ),
    label: 'Ceremony',
    value: '10:00 AM',
    sub: 'Reception from 2:00 PM',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
    label: 'Venue',
    value: 'Ede Grammar School',
    sub: 'Ede, Osun',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    label: 'Dress Code',
    value: 'Magenta',
    sub: 'Formal & elegant attire',
  },
]

export default function WeddingDetails() {
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
    <section id="details" ref={ref} className="py-20 sm:py-28 relative"
      style={{ background: 'linear-gradient(180deg, #020B18 0%, #071428 50%, #020B18 100%)' }}>

      {/* Accent bar */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32
        bg-linear-to-b from-transparent via-[#c0257d] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20 fade-up">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#c0257d]/60 mb-4">
            The Celebration
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white">
            Wedding <span className="gold-shimmer">Details</span>
          </h2>
        </div>

        {/* Detail cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-20">
          {details.map((d, i) => (
            <div
              key={d.label}
              className={`fade-up delay-${(i + 1) * 100} group p-4 sm:p-8 border border-[#c0257d]/20
                bg-navy-800/30 hover:border-[#c0257d]/50 hover:bg-navy-800/60
                transition-all duration-500 hover:gold-glow text-center`}
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <div className="flex justify-center mb-3 sm:mb-4 text-[#c0257d]/70 group-hover:text-[#e040a0] transition-colors">
                {d.icon}
              </div>
              <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/40 mb-2 sm:mb-3">
                {d.label}
              </p>
              <p className="font-display text-base sm:text-xl text-white mb-1">{d.value}</p>
              <p className="font-serif text-xs sm:text-sm text-white/40 italic">{d.sub}</p>
            </div>
          ))}
        </div>

        {/* Schedule */}
        <div className="fade-up border border-[#c0257d]/20 bg-navy-800/30 p-6 sm:p-10 md:p-14"
          style={{ backdropFilter: 'blur(10px)' }}>
          <div className="ornament mb-8 sm:mb-10">
            <h3 className="font-display text-xl sm:text-2xl text-white/90 whitespace-nowrap">Day Schedule</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-6">
            {[
              { time: '9:00 AM', event: 'Guest Arrival & Welcome Drinks', type: 'Foyer, Grand Pavilion' },
              { time: '11:00 AM', event: 'Wedding Ceremony', type: 'Main Field' },
              { time: '1:00 PM', event: 'Couple Photos & Cocktail Hour', type: 'Garden Terrace' },
              { time: '2:00 PM', event: 'Reception Doors Open', type: 'Ballroom, Level 2' },
              { time: '5:00 PM', event: 'Dinner & Speeches', type: 'Ballroom' },
              { time: '6:00 PM', event: 'First Dance & Evening Party', type: 'Dance Floor Opens' },
            ].map((item) => (
              <div key={item.time} className="flex items-start gap-3 sm:gap-5 py-3 sm:py-4 border-b border-white/5 last:border-0">
                <span className="font-sans text-[10px] sm:text-xs tracking-wider text-[#c0257d]/70 w-14 sm:w-16 shrink-0 pt-0.5">
                  {item.time}
                </span>
                <div>
                  <p className="font-serif text-white/80 text-sm sm:text-base">{item.event}</p>
                  <p className="font-sans text-[10px] sm:text-xs tracking-wide text-white/30 mt-0.5 uppercase">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dress code note */}
        <div className="fade-up mt-6 sm:mt-8 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-4 px-4 sm:px-8 py-3 sm:py-4
            border border-[#c0257d]/40 bg-[#c0257d]/10 text-[#e040a0]">
            <span className="text-base sm:text-lg">*</span>
            <p className="font-sans text-[9px] sm:text-xs tracking-widest uppercase">
              Dress Code: Magenta - Formal Evening Wear Required
            </p>
            <span className="text-base sm:text-lg">*</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// 'use client'
// import { useEffect, useRef } from 'react'

// const details = [
//   {
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
//         <rect x="3" y="4" width="18" height="18" rx="2"/>
//         <path d="M16 2v4M8 2v4M3 10h18"/>
//       </svg>
//     ),
//     label: 'Date',
//     value: 'Saturday, July 12',
//     sub: '2026',
//   },
//   {
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
//         <circle cx="12" cy="12" r="9"/>
//         <path d="M12 7v5l3 3"/>
//       </svg>
//     ),
//     label: 'Ceremony',
//     value: '10:00 AM',
//     sub: 'Reception from 2:00 PM',
//   },
//   {
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
//         <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
//         <circle cx="12" cy="9" r="2.5"/>
//       </svg>
//     ),
//     label: 'Venue',
//     value: 'Ede Grammar School',
//     sub: 'Ede, Osun',
//   },
//   {
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
//         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//       </svg>
//     ),
//     label: 'Dress Code',
//     value: 'Magenta',
//     sub: 'Formal & elegant attire',
//   },
// ]

// export default function WeddingDetails() {
//   const ref = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
//       { threshold: 0.1 }
//     )
//     ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
//     return () => observer.disconnect()
//   }, [])

//   return (
//     <section id="details" ref={ref} className="py-28 relative"
//       style={{ background: 'linear-gradient(180deg, #020B18 0%, #071428 50%, #020B18 100%)' }}>
//       {/* Emerald accent bar */}
//       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-linear-to-b from-transparent via-emerald-wedding to-transparent" />

//       <div className="max-w-6xl mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-20 fade-up">
//           <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold-500/60 mb-4">
//             The Celebration
//           </p>
//           <h2 className="font-display text-5xl md:text-6xl text-white">
//             Wedding <span className="gold-shimmer">Details</span>
//           </h2>
//         </div>

//         {/* Detail cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
//           {details.map((d, i) => (
//             <div
//               key={d.label}
//               className={`fade-up delay-${(i + 1) * 100} group p-8 border border-gold-500/20
//                 bg-navy-800/30 hover:border-gold-500/50 hover:bg-navy-800/60
//                 transition-all duration-500 hover:gold-glow text-center`}
//               style={{ backdropFilter: 'blur(10px)' }}
//             >
//               <div className="flex justify-center mb-4 text-gold-500/70 group-hover:text-gold-400 transition-colors">
//                 {d.icon}
//               </div>
//               <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">
//                 {d.label}
//               </p>
//               <p className="font-display text-xl text-white mb-1">{d.value}</p>
//               <p className="font-serif text-sm text-white/40 italic">{d.sub}</p>
//             </div>
//           ))}
//         </div>

//         {/* Schedule */}
//         <div className="fade-up border border-gold-500/20 bg-navy-800/30 p-10 md:p-14"
//           style={{ backdropFilter: 'blur(10px)' }}>
//           <div className="ornament mb-10">
//             <h3 className="font-display text-2xl text-white/90 whitespace-nowrap">Day Schedule</h3>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             {[
//               { time: '9:00 AM', event: 'Guest Arrival & Welcome Drinks', type: 'Foyer, Grand Pavilion' },
//               { time: '11:00 AM', event: 'Wedding Ceremony', type: 'Main Field' },
//               { time: '1:00 PM', event: 'Couple Photos & Cocktail Hour', type: 'Garden Terrace' },
//               { time: '2:00 PM', event: 'Reception Doors Open', type: 'Ballroom, Level 2' },
//               { time: '5:00 PM', event: 'Dinner & Speeches', type: 'Ballroom' },
//               { time: '6:00 PM', event: 'First Dance & Evening Party', type: 'Dance Floor Opens' },
//             ].map((item) => (
//               <div key={item.time} className="flex items-start gap-5 py-4 border-b border-white/5 last:border-0">
//                 <span className="font-sans text-xs tracking-wider text-gold-500/70 w-16 shrink-0 pt-0.5">
//                   {item.time}
//                 </span>
//                 <div>
//                   <p className="font-serif text-white/80 text-base">{item.event}</p>
//                   <p className="font-sans text-xs tracking-wide text-white/30 mt-0.5 uppercase">{item.type}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Dress code note */}
//         <div className="fade-up mt-8 text-center">
//           <div
//             className="inline-flex items-center gap-4 px-8 py-4 border border-emerald-wedding/40
//               bg-emerald-wedding/10 text-emerald-light"
//           >
//             <span className="text-lg">✦</span>
//             <p className="font-sans text-xs tracking-widest uppercase">
//               Dress Code: Magenta — Formal Evening Wear Required
//             </p>
//             <span className="text-lg">✦</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }