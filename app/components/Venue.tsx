'use client'
import { useEffect, useRef } from 'react'

export default function Venue() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const address = 'Ede Grammar School, Ede, Osun State, Nigeria'
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  return (
    <section id="venue" ref={ref} className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020B18 0%, #071428 100%)' }}>

      <div className="absolute -left-32 bottom-0 w-96 h-96 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 400 400">
          <polygon points="200,0 400,400 0,400" stroke="#c0257d" strokeWidth="1" fill="none"/>
          <polygon points="200,50 380,400 20,400" stroke="#c0257d" strokeWidth="1" fill="none"/>
          <polygon points="200,100 360,400 40,400" stroke="#c0257d" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 fade-up">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#c0257d]/60 mb-4">Find Us</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white">
            The <span className="gold-shimmer">Venue</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div className="fade-up space-y-6 sm:space-y-8">
            <div className="border border-[#c0257d]/20 bg-navy-800/30 p-6 sm:p-8"
              style={{ backdropFilter: 'blur(10px)' }}>
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-2">Ede Grammar School</h3>
              <p className="font-sans text-xs tracking-widest uppercase text-[#c0257d]/60 mb-4 sm:mb-6">
                Ede, Osun, Nigeria
              </p>
              <p className="font-serif text-white/50 leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">
                Nestled in the heart of Ede, Osun State, the venue features beautiful open grounds
                and elegant spaces. The perfect setting for a day to remember.
              </p>

              <div className="space-y-3">
                {[
                  { icon: '📍', label: 'Ede Grammar School, Ede, Osun State' },
                  { icon: '🚗', label: 'Parking available on arrival' },
                  { icon: '🏨', label: 'Hotel block reserved at Ede Hotel (5 min away)' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-sm sm:text-base mt-0.5">{item.icon}</span>
                    <p className="font-sans text-xs sm:text-sm text-white/50">{item.label}</p>
                  </div>
                ))}
              </div>

              <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-5 sm:px-6 py-3
                  border border-[#c0257d]/40 text-[#e040a0] font-sans text-xs tracking-widest uppercase
                  hover:bg-[#c0257d]/10 hover:border-[#e040a0] transition-all duration-300">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                Open in Google Maps
              </a>
            </div>

            <div className="border border-[#c0257d]/30 bg-[#c0257d]/5 p-4 sm:p-6">
              <h4 className="font-display text-base sm:text-lg text-[#e040a0] mb-3 sm:mb-4">Getting There</h4>
              <div className="space-y-3">
                {[
                  { mode: 'By Car', desc: 'From Osogbo: Take the Osogbo-Ede Expressway to Ede (approx. 45 min).' },
                  { mode: 'By Ride-Hailing', desc: 'Bolt and Uber both service Ede. Show driver: Ede Grammar School.' },
                ].map((item) => (
                  <div key={item.mode}>
                    <span className="font-sans text-[10px] sm:text-xs tracking-wider uppercase text-[#c0257d]/60">{item.mode} - </span>
                    <span className="font-serif text-xs sm:text-sm text-white/40">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fade-up delay-200 relative order-first lg:order-last">
            <div className="border border-[#c0257d]/20 overflow-hidden gold-glow">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                width="100%"
                height="380"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) saturate(1.2)', display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Map"
              />
            </div>
            <p className="font-sans text-xs text-white/20 tracking-widest text-center mt-3 uppercase">
              Tap map to navigate
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// 'use client'
// import { useEffect, useRef } from 'react'

// export default function Venue() {
//   const ref = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
//       { threshold: 0.1 }
//     )
//     ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
//     return () => observer.disconnect()
//   }, [])

//   const address = 'The Grand Pavilion, Victoria Island, Lagos, Nigeria'
//   const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
//   const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD-placeholder&q=${encodeURIComponent(address)}`

//   return (
//     <section id="venue" ref={ref} className="py-28 relative overflow-hidden"
//       style={{ background: 'linear-gradient(180deg, #020B18 0%, #071428 100%)' }}>

//       {/* Background geometric accent */}
//       <div className="absolute -left-32 bottom-0 w-96 h-96 opacity-[0.03] pointer-events-none">
//         <svg viewBox="0 0 400 400">
//           <polygon points="200,0 400,400 0,400" stroke="#d4a843" strokeWidth="1" fill="none"/>
//           <polygon points="200,50 380,400 20,400" stroke="#d4a843" strokeWidth="1" fill="none"/>
//           <polygon points="200,100 360,400 40,400" stroke="#d4a843" strokeWidth="1" fill="none"/>
//         </svg>
//       </div>

//       <div className="max-w-6xl mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-16 fade-up">
//           <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold-500/60 mb-4">
//             Find Us
//           </p>
//           <h2 className="font-display text-5xl md:text-6xl text-white">
//             The <span className="gold-shimmer">Venue</span>
//           </h2>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 items-start">
//           {/* Venue info */}
//           <div className="fade-up space-y-8">
//             <div className="border border-gold-500/20 bg-navy-800/30 p-8" style={{ backdropFilter: 'blur(10px)' }}>
//               <h3 className="font-display text-3xl text-white mb-2">Ede Grammar School</h3>
//               <p className="font-sans text-xs tracking-widest uppercase text-gold-500/60 mb-6">
//                 Ede, Osun, Nigeria
//               </p>
//               <p className="font-serif text-white/50 leading-relaxed mb-6">
//                 Nestled in the heart of Ede, Osun State, The Grand Pavilion is a stunning event space
//                 featuring high ceilings, crystal chandeliers, and sweeping views of the Lagos waterfront.
//                 The perfect setting for a night to remember.
//               </p>

//               <div className="space-y-3">
//                 {[
//                   { icon: '📍', label: '14 Kofo Abayomi Street, Ede, Osun State' },
//                   { icon: '🚗', label: 'Parking available on arrival' },
//                   { icon: '🏨', label: 'Hotel block reserved at Ede Hotel (5 min away)' },
//                 ].map((item) => (
//                   <div key={item.label} className="flex items-start gap-3">
//                     <span className="text-base mt-0.5">{item.icon}</span>
//                     <p className="font-sans text-sm text-white/50">{item.label}</p>
//                   </div>
//                 ))}
//               </div>

//               <a
//                 href={mapsUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-3 mt-8 px-6 py-3 border border-gold-500/40
//                   text-gold-400 font-sans text-xs tracking-widest uppercase
//                   hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-300"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
//                   <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
//                   <circle cx="12" cy="9" r="2.5"/>
//                 </svg>
//                 Open in Google Maps
//               </a>
//             </div>

//             {/* Getting there */}
//             <div className="border border-emerald-wedding/30 bg-emerald-wedding/5 p-6">
//               <h4 className="font-display text-lg text-emerald-light mb-4">Getting There</h4>
//               <div className="space-y-3">
//                 {[
//                   { mode: 'By Car', desc: 'From Osogbo: Take the Osogbo-Ede Expressway to Ede (approx. 45 min).' },
//                   { mode: 'By Ride-Hailing', desc: 'Bolt and Uber both service Ede. Show driver: Ede Grammar School.' },
//                   // { mode: 'By Boat', desc: 'Water taxi from Five Cowries Terminal to Ede Grammar School — scenic and quick!' },
//                 ].map((item) => (
//                   <div key={item.mode}>
//                     <span className="font-sans text-xs tracking-wider uppercase text-gold-500/60">{item.mode} — </span>
//                     <span className="font-serif text-sm text-white/40">{item.desc}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Map embed */}
//           <div className="fade-up delay-200 relative">
//             <div className="border border-gold-500/20 overflow-hidden gold-glow">
//               {/* Google Maps iframe */}
//               <iframe
//                 src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
//                 width="100%"
//                 height="450"
//                 style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) saturate(1.2)' }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Wedding Venue Map"
//               />
//             </div>
//             <p className="font-sans text-xs text-white/20 tracking-widest text-center mt-3 uppercase">
//               ✦ Map styled for display — tap to navigate ✦
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }