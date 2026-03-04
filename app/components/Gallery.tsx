'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const photos = [
  { id: 1, span: 'col-span-2 row-span-2', src: '/city.jpg', label: 'Engagement Shoot' },
  { id: 2, span: 'col-span-1 row-span-1', src: '/city.jpg', label: 'Our First Trip' },
  { id: 3, span: 'col-span-1 row-span-1', src: '/city.jpg', label: 'The Proposal' },
  { id: 4, span: 'col-span-1 row-span-1', src: '/city.jpg', label: 'Engagement Party' },
  { id: 5, span: 'col-span-1 row-span-1', src: '/city.jpg', label: 'City Walk' },
  { id: 6, span: 'col-span-2 row-span-1', src: '/city.jpg', label: 'Together in Abuja' },
]

// const photos = [
//   { id: 1, span: 'col-span-2 row-span-2', src: '/images/engagement.jpg', label: 'Engagement Shoot' },
//   { id: 2, span: 'col-span-1 row-span-1', src: '/images/trip.jpg', label: 'Our First Trip' },
//   { id: 3, span: 'col-span-1 row-span-1', src: '/images/proposal.jpg', label: 'The Proposal' },
//   { id: 4, span: 'col-span-1 row-span-1', src: '/images/party.jpg', label: 'Engagement Party' },
//   { id: 5, span: 'col-span-1 row-span-1', src: '/images/city.jpg', label: 'City Walk' },
//   { id: 6, span: 'col-span-2 row-span-1', src: '/images/abuja.jpg', label: 'Together in Abuja' },
// ]

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.isIntersecting && e.target.classList.add('visible')
        ),
      { threshold: 0.1 }
    )

    ref.current
      ?.querySelectorAll('.fade-up')
      .forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-20 sm:py-28 relative bg-[#020B18]"
    >
      {/* Vertical Accent Line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-24
        bg-linear-to-b from-transparent to-[#c0257d]/30"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 fade-up">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#c0257d]/60 mb-4">
            Captured Moments
          </p>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white">
            Our <span className="gold-shimmer">Gallery</span>
          </h2>

          <p className="font-serif text-white/40 italic mt-3 sm:mt-4 text-base sm:text-lg">
            A few of our favourite frames
          </p>
        </div>

        {/* Grid */}
        <div
          className="fade-up grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3"
          style={{ gridTemplateRows: 'repeat(3, minmax(120px, 1fr))' }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`${photo.span} relative overflow-hidden cursor-pointer group min-h-32 sm:min-h-40
              border border-white/5 hover:border-[#c0257d]/40 transition-all duration-500`}
              onMouseEnter={() => setHovered(photo.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Real Image */}
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Cinematic Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent
                flex items-end p-2 sm:p-4 transition-opacity duration-300
                ${hovered === photo.id ? 'opacity-100' : 'opacity-0'}`}
              >
                <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase text-[#e040a0]">
                  {photo.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="fade-up text-center mt-6 font-sans text-xs tracking-widest uppercase text-white/20">
          Memories we will cherish forever
        </p>
      </div>
    </section>
  )
}

// 'use client'
// import { useEffect, useRef, useState } from 'react'

// const photos = [
//   { id: 1, span: 'col-span-2 row-span-2', bg: 'from-navy-800 to-[#c0257d]/20', label: 'Engagement Shoot' },
//   { id: 2, span: 'col-span-1 row-span-1', bg: 'from-navy-800 to-[#c0257d]/10', label: 'Our First Trip' },
//   { id: 3, span: 'col-span-1 row-span-1', bg: 'from-navy-700 to-[#c0257d]/15', label: 'The Proposal' },
//   { id: 4, span: 'col-span-1 row-span-1', bg: 'from-navy-800 to-[#c0257d]/20', label: 'Engagement Party' },
//   { id: 5, span: 'col-span-1 row-span-1', bg: 'from-navy-700 to-[#c0257d]/10', label: 'City Walk' },
//   { id: 6, span: 'col-span-2 row-span-1', bg: 'from-navy-800 to-[#c0257d]/5', label: 'Together in Abuja' },
// ]

// export default function Gallery() {
//   const ref = useRef<HTMLDivElement>(null)
//   const [hovered, setHovered] = useState<number | null>(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
//       { threshold: 0.1 }
//     )
//     ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
//     return () => observer.disconnect()
//   }, [])

//   return (
//     <section id="gallery" ref={ref} className="py-20 sm:py-28 relative" style={{ background: '#020B18' }}>
//       <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-24
//         bg-linear-to-b from-transparent to-[#c0257d]/30" />

//       <div className="max-w-6xl mx-auto px-4 sm:px-6">
//         <div className="text-center mb-10 sm:mb-16 fade-up">
//           <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#c0257d]/60 mb-4">
//             Captured Moments
//           </p>
//           <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white">
//             Our <span className="gold-shimmer">Gallery</span>
//           </h2>
//           <p className="font-serif text-white/40 italic mt-3 sm:mt-4 text-base sm:text-lg">
//             A few of our favourite frames
//           </p>
//         </div>

//         <div className="fade-up grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3"
//           style={{ gridTemplateRows: 'repeat(3, minmax(120px, 1fr))' }}>
//           {photos.map((photo) => (
//             <div
//               key={photo.id}
//               className={`${photo.span} relative overflow-hidden cursor-pointer group min-h-30 sm:min-h-40
//                 border border-white/5 hover:border-[#c0257d]/40 transition-all duration-500`}
//               onMouseEnter={() => setHovered(photo.id)}
//               onMouseLeave={() => setHovered(null)}
//             >
//               <div className={`absolute inset-0 bg-linear-to-br ${photo.bg} transition-transform
//                 duration-700 group-hover:scale-105`} />

//               <div className="absolute inset-0 opacity-10"
//                 style={{
//                   backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(192,37,125,0.3) 1px, transparent 0)',
//                   backgroundSize: '24px 24px',
//                 }} />

//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="font-display text-3xl sm:text-5xl text-white/10">0{photo.id}</span>
//               </div>

//               <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
//                 <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#e040a0] mb-1 sm:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
//                   <rect x="3" y="3" width="18" height="18" rx="2"/>
//                   <circle cx="8.5" cy="8.5" r="1.5"/>
//                   <path d="M21 15l-5-5L5 21"/>
//                 </svg>
//                 <span className="text-[10px] sm:text-xs text-white/40 tracking-wider">Add Photo</span>
//               </div>

//               <div className={`absolute inset-0 bg-navy-950/60 flex items-end p-2 sm:p-4
//                 transition-opacity duration-300 ${hovered === photo.id ? 'opacity-100' : 'opacity-0'}`}>
//                 <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase text-[#e040a0]">
//                   {photo.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <p className="fade-up text-center mt-4 sm:mt-6 font-sans text-xs tracking-widest uppercase text-white/20">
//           Replace placeholders with your actual photos
//         </p>
//       </div>
//     </section>
//   )
// }

// 'use client'
// import { useEffect, useRef, useState } from 'react'

// // Placeholder photos using gradients (replace with real images)
// const photos = [
//   { id: 1, span: 'col-span-2 row-span-2', bg: 'from-navy-800 to-emerald-wedding/40', label: 'Engagement Shoot' },
//   { id: 2, span: 'col-span-1 row-span-1', bg: 'from-navy-800 to-gold-500/20', label: 'Our First Trip' },
//   { id: 3, span: 'col-span-1 row-span-1', bg: 'from-navy-700 to-emerald-wedding/20', label: 'The Proposal' },
//   { id: 4, span: 'col-span-1 row-span-1', bg: 'from-navy-800 to-gold-500/30', label: 'Engagement Party' },
//   { id: 5, span: 'col-span-1 row-span-1', bg: 'from-navy-700 to-emerald-wedding/30', label: 'City Walk' },
//   { id: 6, span: 'col-span-2 row-span-1', bg: 'from-navy-800 to-gold-500/10', label: 'Together in Abuja' },
// ]

// export default function Gallery() {
//   const ref = useRef<HTMLDivElement>(null)
//   const [hovered, setHovered] = useState<number | null>(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
//       { threshold: 0.1 }
//     )
//     ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
//     return () => observer.disconnect()
//   }, [])

//   return (
//     <section id="gallery" ref={ref} className="py-28 relative" style={{ background: '#020B18' }}>
//       {/* Decorative element */}
//       <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-24
//         bg-linear-to-b from-transparent to-gold-500/30" />

//       <div className="max-w-6xl mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-16 fade-up">
//           <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold-500/60 mb-4">
//             Captured Moments
//           </p>
//           <h2 className="font-display text-5xl md:text-6xl text-white">
//             Our <span className="gold-shimmer">Gallery</span>
//           </h2>
//           <p className="font-serif text-white/40 italic mt-4 text-lg">
//             A few of our favourite frames
//           </p>
//         </div>

//         {/* Grid */}
//         <div className="fade-up grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-3 h-150 md:h-175">
//           {photos.map((photo) => (
//             <div
//               key={photo.id}
//               className={`${photo.span} relative overflow-hidden cursor-pointer group
//                 border border-white/5 hover:border-gold-500/40 transition-all duration-500`}
//               onMouseEnter={() => setHovered(photo.id)}
//               onMouseLeave={() => setHovered(null)}
//             >
//               {/* Gradient placeholder */}
//               <div className={`absolute inset-0 bg-linear-to-b ${photo.bg} transition-transform
//                 duration-700 group-hover:scale-105`} />

//               {/* Overlay pattern */}
//               <div className="absolute inset-0 opacity-20"
//                 style={{
//                   backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212,168,67,0.3) 1px, transparent 0)`,
//                   backgroundSize: '24px 24px',
//                 }}
//               />

//               {/* Photo number placeholder */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="font-display text-5xl text-white/10">0{photo.id}</span>
//               </div>

//               {/* Replace message */}
//               <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
//                 <svg className="w-8 h-8 text-gold-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
//                   <rect x="3" y="3" width="18" height="18" rx="2"/>
//                   <circle cx="8.5" cy="8.5" r="1.5"/>
//                   <path d="M21 15l-5-5L5 21"/>
//                 </svg>
//                 <span className="text-xs text-white/40 tracking-wider">Add Photo</span>
//               </div>

//               {/* Hover overlay */}
//               <div className={`absolute inset-0 bg-navy-950/60 flex items-end p-4
//                 transition-opacity duration-300 ${hovered === photo.id ? 'opacity-100' : 'opacity-0'}`}>
//                 <span className="font-sans text-xs tracking-widest uppercase text-gold-400">
//                   {photo.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <p className="fade-up text-center mt-6 font-sans text-xs tracking-widest uppercase text-white/20">
//           ✦ Replace placeholders with your actual photos ✦
//         </p>
//       </div>
//     </section>
//   )
// }
