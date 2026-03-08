'use client'
import { useState, useEffect } from 'react'

const WEDDING_DATE = new Date('2026-05-30T10:00:00')

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function getTimeLeft() {
  const now = new Date()
  const diff = WEDDING_DATE.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32 border border-[#c0257d]/30 flex items-center justify-center gold-glow bg-navy-800/60"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <div className="absolute top-1 left-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#c0257d]/60 rounded-full" />
        <div className="absolute top-1 right-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#c0257d]/60 rounded-full" />
        <div className="absolute bottom-1 left-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#c0257d]/60 rounded-full" />
        <div className="absolute bottom-1 right-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#c0257d]/60 rounded-full" />
        <span className="font-display text-lg sm:text-3xl md:text-5xl text-[#e040a0] font-light">
          {value}
        </span>
      </div>
      <span className="mt-1.5 sm:mt-3 font-sans text-[7px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.3em] uppercase text-white/40">
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null)

  useEffect(() => {
    setTime(getTimeLeft())
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  const display = {
    days: time ? pad(time.days) : '--',
    hours: time ? pad(time.hours) : '--',
    minutes: time ? pad(time.minutes) : '--',
    seconds: time ? pad(time.seconds) : '--',
  }

  return (
    <section className="py-20 sm:py-28 relative" style={{ background: 'linear-gradient(180deg, #020B18 0%, #040f1e 50%, #020B18 100%)' }}>
      <div className="ornament max-w-2xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#c0257d]/60">
          Counting Down
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-serif text-base sm:text-lg md:text-xl text-white/40 italic mb-8 sm:mb-12">
          The big day arrives in...
        </p>

        <div className="flex items-center justify-center gap-1.5 sm:gap-4 md:gap-8">
          <Unit value={display.days} label="Days" />
          <span className="font-display text-base sm:text-3xl text-[#c0257d]/40 mb-5 sm:mb-8">:</span>
          <Unit value={display.hours} label="Hours" />
          <span className="font-display text-base sm:text-3xl text-[#c0257d]/40 mb-5 sm:mb-8">:</span>
          <Unit value={display.minutes} label="Minutes" />
          <span className="font-display text-base sm:text-3xl text-[#c0257d]/40 mb-5 sm:mb-8">:</span>
          <Unit value={display.seconds} label="Seconds" />
        </div>

        <p className="mt-8 sm:mt-12 font-sans text-xs tracking-[0.3em] uppercase text-white/30">
          Saturday 30th May, 2026 &middot; 10:00 AM
        </p>
      </div>
    </section>
  )
}

// 'use client'
// import { useState, useEffect } from 'react'

// const WEDDING_DATE = new Date('2026-07-12T10:00:00')

// function pad(n: number) {
//   return String(n).padStart(2, '0')
// }

// function getTimeLeft() {
//   const now = new Date()
//   const diff = WEDDING_DATE.getTime() - now.getTime()
//   if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
//   return {
//     days: Math.floor(diff / (1000 * 60 * 60 * 24)),
//     hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//     minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
//     seconds: Math.floor((diff % (1000 * 60)) / 1000),
//   }
// }

// function Unit({ value, label }: { value: string; label: string }) {
//   return (
//     <div className="flex flex-col items-center">
//       <div
//         className="relative w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32 border border-gold-500/30 flex items-center justify-center gold-glow bg-navy-800/60"
//         style={{ backdropFilter: 'blur(10px)' }}
//       >
//         <div className="absolute top-1 left-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gold-500/60 rounded-full" />
//         <div className="absolute top-1 right-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gold-500/60 rounded-full" />
//         <div className="absolute bottom-1 left-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gold-500/60 rounded-full" />
//         <div className="absolute bottom-1 right-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gold-500/60 rounded-full" />
//         <span className="font-display text-lg sm:text-3xl md:text-5xl text-gold-400 font-light">
//           {value}
//         </span>
//       </div>
//       <span className="mt-1.5 sm:mt-3 font-sans text-[7px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.3em] uppercase text-white/40">
//         {label}
//       </span>
//     </div>
//   )
// }

// export default function Countdown() {
//   const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null)

//   useEffect(() => {
//     setTime(getTimeLeft())
//     const interval = setInterval(() => setTime(getTimeLeft()), 1000)
//     return () => clearInterval(interval)
//   }, [])

//   const display = {
//     days: time ? pad(time.days) : '--',
//     hours: time ? pad(time.hours) : '--',
//     minutes: time ? pad(time.minutes) : '--',
//     seconds: time ? pad(time.seconds) : '--',
//   }

//   return (
//     <section className="py-20 sm:py-28 relative" style={{ background: 'linear-gradient(180deg, #020B18 0%, #040f1e 50%, #020B18 100%)' }}>
//       <div className="ornament max-w-2xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
//         <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold-500/60">
//           Counting Down
//         </span>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
//         <p className="font-serif text-base sm:text-lg md:text-xl text-white/40 italic mb-8 sm:mb-12">
//           The big day arrives in...
//         </p>

//         <div className="flex items-center justify-center gap-1.5 sm:gap-4 md:gap-8">
//           <Unit value={display.days} label="Days" />
//           <span className="font-display text-base sm:text-3xl text-gold-500/40 mb-5 sm:mb-8">:</span>
//           <Unit value={display.hours} label="Hours" />
//           <span className="font-display text-base sm:text-3xl text-gold-500/40 mb-5 sm:mb-8">:</span>
//           <Unit value={display.minutes} label="Minutes" />
//           <span className="font-display text-base sm:text-3xl text-gold-500/40 mb-5 sm:mb-8">:</span>
//           <Unit value={display.seconds} label="Seconds" />
//         </div>

//         <p className="mt-8 sm:mt-12 font-sans text-xs tracking-[0.3em] uppercase text-white/30">
//           July 12, 2026 &middot; 10:00 AM
//         </p>
//       </div>
//     </section>
//   )
// }