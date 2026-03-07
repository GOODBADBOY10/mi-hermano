'use client'
import { useEffect, useRef } from 'react'

const story = [
  {
    year: '2018',
    title: 'First Meeting',
    body: "It was a rainy Tuesday evening at a mutual friend's dinner party in Lagos. Abdul-Hakeem arrived late, Soliha was already there - and somehow, by the end of the night, they'd talked until midnight, long after everyone else had left.",
    icon: '*',
  },
  {
    year: '2019',
    title: 'The First Date',
    body: 'A walk along the waterfront that was supposed to last an hour turned into a five-hour adventure through the city. They ended up sharing jollof rice from a street vendor and discovering they both had the same obscure taste in jazz.',
    icon: '<3',
  },
  {
    year: '2021',
    title: 'Moving In Together',
    body: "After two years of \"this feels right,\" they finally made it official - sharing a home and a growing plant collection that James insists he doesn't secretly love watering.",
    icon: '#',
  },
  {
    year: '2024',
    title: 'The Proposal',
    body: "On a quiet evening in December, James got down on one knee at the very bench in the park where they had their first serious conversation. Eleanor said yes before he'd even finished the question.",
    icon: '<>',
  },
  {
    year: '2026',
    title: 'Forever Starts Here',
    body: "After all the planning, the laughs, the late nights and early mornings - it all leads to this one perfect day. We can't wait to celebrate with everyone who made us who we are.",
    icon: 'x',
  },
]

export default function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.fade-up')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="story" ref={sectionRef} className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: '#020B18' }}>

      {/* Background accent */}
      <div className="absolute right-0 top-1/4 w-64 sm:w-96 h-64 sm:h-96 opacity-5 pointer-events-none">
        <svg viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="180" stroke="#c0257d" strokeWidth="1" />
          <circle cx="200" cy="200" r="130" stroke="#c0257d" strokeWidth="1" />
          <circle cx="200" cy="200" r="80" stroke="#c0257d" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20 fade-up">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#c0257d]/60 mb-4">
            Chapter One
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4 sm:mb-6">
            Our <span className="gold-shimmer">Story</span>
          </h2>
          <p className="font-serif text-base sm:text-lg text-white/40 italic max-w-md mx-auto">
            Every great love story starts somewhere. Ours started with bad weather and good timing.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {story.map((item, i) => (
            <div
              key={item.year}
              className={`fade-up delay-${(i + 1) * 100} relative flex flex-col md:flex-row md:items-start md:gap-8 mb-8 sm:mb-16
                ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Content card */}
              <div className="flex-1">
                <div
                  className="p-5 sm:p-6 border border-[#c0257d]/20 bg-navy-800/40
                    hover:border-[#c0257d]/40 transition-all duration-500 hover:gold-glow md:mr-8"
                  style={{ backdropFilter: 'blur(10px)' }}
                >
                  <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#c0257d]/60 block mb-2">
                    {item.year}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl text-white mb-2 sm:mb-3">{item.title}</h3>
                  <p className="font-serif text-white/50 leading-relaxed text-sm sm:text-base">{item.body}</p>
                </div>
              </div>

              {/* Center icon - desktop only */}
              <div className="hidden md:flex flex-col items-center gap-2 pt-6 relative z-10">
                <div className="w-12 h-12 border border-[#c0257d]/50 bg-navy-950 flex items-center justify-center
                  gold-glow rounded-full">
                  <span className="text-[#e040a0] text-lg">{item.icon}</span>
                </div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 'use client'
// import { useEffect, useRef } from 'react'

// const story = [
//   {
//     year: '2018',
//     title: 'First Meeting',
//     body: "It was a rainy Tuesday evening at a mutual friend's dinner party in Lagos. James arrived late, Eleanor was already there - and somehow, by the end of the night, they'd talked until midnight, long after everyone else had left.",
//     icon: '*',
//   },
//   {
//     year: '2019',
//     title: 'The First Date',
//     body: 'A walk along the waterfront that was supposed to last an hour turned into a five-hour adventure through the city. They ended up sharing jollof rice from a street vendor and discovering they both had the same obscure taste in jazz.',
//     icon: '<3',
//   },
//   {
//     year: '2021',
//     title: 'Moving In Together',
//     body: "After two years of \"this feels right,\" they finally made it official - sharing a home and a growing plant collection that James insists he doesn't secretly love watering.",
//     icon: '#',
//   },
//   {
//     year: '2024',
//     title: 'The Proposal',
//     body: "On a quiet evening in December, James got down on one knee at the very bench in the park where they had their first serious conversation. Eleanor said yes before he'd even finished the question.",
//     icon: '<>',
//   },
//   {
//     year: '2025',
//     title: 'Forever Starts Here',
//     body: "After all the planning, the laughs, the late nights and early mornings - it all leads to this one perfect day. We can't wait to celebrate with everyone who made us who we are.",
//     icon: 'x',
//   },
// ]

// export default function OurStory() {
//   const sectionRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('visible')
//           }
//         })
//       },
//       { threshold: 0.1 }
//     )

//     const elements = sectionRef.current?.querySelectorAll('.fade-up')
//     elements?.forEach((el) => observer.observe(el))
//     return () => observer.disconnect()
//   }, [])

//   return (
//     <section id="story" ref={sectionRef} className="py-28 relative overflow-hidden"
//       style={{ background: '#020B18' }}>
//       {/* Background accent */}
//       <div className="absolute right-0 top-1/4 w-96 h-96 opacity-5 pointer-events-none">
//         <svg viewBox="0 0 400 400" fill="none">
//           <circle cx="200" cy="200" r="180" stroke="#d4a843" strokeWidth="1" />
//           <circle cx="200" cy="200" r="130" stroke="#d4a843" strokeWidth="1" />
//           <circle cx="200" cy="200" r="80" stroke="#d4a843" strokeWidth="1" />
//         </svg>
//       </div>

//       <div className="max-w-5xl mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-20 fade-up">
//           <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold-500/60 mb-4">
//             Chapter One
//           </p>
//           <h2 className="font-display text-5xl md:text-6xl text-white mb-6">
//             Our <span className="gold-shimmer">Story</span>
//           </h2>
//           <p className="font-serif text-lg text-white/40 italic max-w-md mx-auto">
//             Every great love story starts somewhere. Ours started with bad weather and good timing.
//           </p>
//         </div>

//         {/* Timeline */}
//         <div className="relative timeline-line">
//           {story.map((item, i) => (
//             <div
//               key={item.year}
//               className={`fade-up delay-${(i + 1) * 100} relative flex items-start gap-8 mb-16
//                 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
//             >
//               {/* Content card */}
//               <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
//                 <div
//                   className={`inline-block p-6 border border-gold-500/20 bg-navy-800/40
//                     hover:border-gold-500/40 transition-all duration-500 hover:gold-glow
//                     ${i % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
//                   style={{ backdropFilter: 'blur(10px)' }}
//                 >
//                   <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold-500/60 block mb-2">
//                     {item.year}
//                   </span>
//                   <h3 className="font-display text-2xl text-white mb-3">{item.title}</h3>
//                   <p className="font-serif text-white/50 leading-relaxed text-base">{item.body}</p>
//                 </div>
//               </div>

//               {/* Center icon */}
//               <div className="hidden md:flex flex-col items-center gap-2 pt-6 relative z-10">
//                 <div
//                   className="w-12 h-12 border border-gold-500/50 bg-navy-950 flex items-center justify-center
//                     gold-glow rounded-full"
//                 >
//                   <span className="text-gold-400 text-lg">{item.icon}</span>
//                 </div>
//               </div>

//               {/* Spacer for alternating */}
//               <div className="hidden md:block flex-1" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
