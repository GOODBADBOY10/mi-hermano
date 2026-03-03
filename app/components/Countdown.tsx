'use client'
import { useState, useEffect } from 'react'

const WEDDING_DATE = new Date('2026-07-12T10:00:00')

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
        className="relative w-24 h-24 md:w-32 md:h-32 border border-gold-500/30 flex items-center justify-center gold-glow bg-navy-800/60"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-gold-500/60 rounded-full" />
        <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-gold-500/60 rounded-full" />
        <div className="absolute bottom-1.5 left-1.5 w-1 h-1 bg-gold-500/60 rounded-full" />
        <div className="absolute bottom-1.5 right-1.5 w-1 h-1 bg-gold-500/60 rounded-full" />
        <span className="font-display text-4xl md:text-5xl text-gold-400 font-light">
          {value}
        </span>
      </div>
      <span className="mt-3 font-sans text-[10px] tracking-[0.3em] uppercase text-white/40">
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  // null = not mounted yet, avoids server/client mismatch
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null)

  useEffect(() => {
    // Only start counting after client mounts
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
    <section className="py-28 relative" style={{ background: 'linear-gradient(180deg, #020B18 0%, #040f1e 50%, #020B18 100%)' }}>
      <div className="ornament max-w-2xl mx-auto px-6 mb-16">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold-500/60">
          Counting Down
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="font-serif text-lg md:text-xl text-white/40 italic mb-12">
          The big day arrives in...
        </p>

        <div className="flex items-center justify-center gap-4 md:gap-8">
          <Unit value={display.days} label="Days" />
          <span className="font-display text-3xl text-gold-500/40 mb-8">:</span>
          <Unit value={display.hours} label="Hours" />
          <span className="font-display text-3xl text-gold-500/40 mb-8">:</span>
          <Unit value={display.minutes} label="Minutes" />
          <span className="font-display text-3xl text-gold-500/40 mb-8">:</span>
          <Unit value={display.seconds} label="Seconds" />
        </div>

        <p className="mt-12 font-sans text-xs tracking-[0.3em] uppercase text-white/30">
          July 12, 2026 &middot; 10:00 AM
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
//   const days = Math.floor(diff / (1000 * 60 * 60 * 24))
//   const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
//   const seconds = Math.floor((diff % (1000 * 60)) / 1000)
//   return { days, hours, minutes, seconds }
// }

// function Unit({ value, label }: { value: number; label: string }) {
//   return (
//     <div className="flex flex-col items-center">
//       <div
//         className="relative w-24 h-24 md:w-32 md:h-32 border border-gold-500/30 flex items-center justify-center
//           gold-glow bg-navy-800/60"
//         style={{ backdropFilter: 'blur(10px)' }}
//       >
//         {/* Corner dots */}
//         <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-gold-500/60 rounded-full" />
//         <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-gold-500/60 rounded-full" />
//         <div className="absolute bottom-1.5 left-1.5 w-1 h-1 bg-gold-500/60 rounded-full" />
//         <div className="absolute bottom-1.5 right-1.5 w-1 h-1 bg-gold-500/60 rounded-full" />

//         <span className="font-display text-4xl md:text-5xl text-gold-400 font-light">
//           {pad(value)}
//         </span>
//       </div>
//       <span className="mt-3 font-sans text-[10px] tracking-[0.3em] uppercase text-white/40">
//         {label}
//       </span>
//     </div>
//   )
// }

// export default function Countdown() {
//   const [time, setTime] = useState(getTimeLeft())

//   useEffect(() => {
//     const interval = setInterval(() => setTime(getTimeLeft()), 1000)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <section className="py-28 relative" style={{ background: 'linear-gradient(180deg, #020B18 0%, #040f1e 50%, #020B18 100%)' }}>
//       {/* Top rule */}
//       <div className="ornament max-w-2xl mx-auto px-6 mb-16">
//         <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold-500/60">
//           Counting Down
//         </span>
//       </div>

//       <div className="max-w-4xl mx-auto px-6 text-center">
//         <p className="font-serif text-lg md:text-xl text-white/40 italic mb-12">
//           The big day arrives in...
//         </p>

//         <div className="flex items-center justify-center gap-4 md:gap-8">
//           <Unit value={time.days} label="Days" />

//           <span className="font-display text-3xl text-gold-500/40 mb-8">:</span>

//           <Unit value={time.hours} label="Hours" />

//           <span className="font-display text-3xl text-gold-500/40 mb-8">:</span>

//           <Unit value={time.minutes} label="Minutes" />

//           <span className="font-display text-3xl text-gold-500/40 mb-8">:</span>

//           <Unit value={time.seconds} label="Seconds" />
//         </div>

//         <p className="mt-12 font-sans text-xs tracking-[0.3em] uppercase text-white/30">
//           July 12, 2026 · 10:00 AM
//         </p>
//       </div>
//     </section>
//   )
// }