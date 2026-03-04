'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; r: number; speed: number; opacity: number; pulse: number }[] = []
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.6 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.pulse += 0.01
        p.opacity = 0.2 + Math.sin(p.pulse) * 0.3
        p.y -= p.speed
        if (p.y < -5) p.y = canvas.height + 5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(192, 37, 125, ${Math.max(0, p.opacity)})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #071428 0%, #040f1e 40%, #020B18 100%)',
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 'min(700px, 100vw)',
            height: 'min(700px, 100vw)',
            background: 'radial-gradient(circle, rgba(192,37,125,0.1) 0%, rgba(192,37,125,0.04) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* Corner ornaments */}
      <div className="hidden sm:block absolute top-24 left-8 md:left-16 opacity-30">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="#c0257d" />
          <circle cx="8" cy="8" r="3" fill="#c0257d" opacity="0.6" />
        </svg>
      </div>
      <div className="hidden sm:block absolute top-24 right-8 md:right-16 opacity-30 rotate-90">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="#c0257d" />
          <circle cx="8" cy="8" r="3" fill="#c0257d" opacity="0.6" />
        </svg>
      </div>
      <div className="hidden sm:block absolute bottom-24 left-8 md:left-16 opacity-30 -rotate-90">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="#c0257d" />
          <circle cx="8" cy="8" r="3" fill="#c0257d" opacity="0.6" />
        </svg>
      </div>
      <div className="hidden sm:block absolute bottom-24 right-8 md:right-16 opacity-30 rotate-180">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="#c0257d" />
          <circle cx="8" cy="8" r="3" fill="#c0257d" opacity="0.6" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-5xl mx-auto">
        <p
          className="font-sans text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#e040a0]/80 mb-6 sm:mb-8"
          style={{ animation: 'fadeUp 0.8s ease 0.2s both' }}
        >
          We&apos;re getting married
        </p>

        <h1
          className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] leading-none tracking-tight mb-1"
          style={{ animation: 'fadeUp 1s ease 0.4s both' }}
        >
          <span className="gold-shimmer">Abdul-Hakeem</span>
        </h1>

        <div
          className="my-1 sm:my-2"
          style={{ animation: 'float 5s ease-in-out infinite, fadeUp 1s ease 0.6s both' }}
        >
          <span className="font-serif text-3xl sm:text-5xl md:text-7xl text-[#c0257d]/80 italic">&amp;</span>
        </div>

        <h1
          className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] leading-none tracking-tight"
          style={{ animation: 'fadeUp 1s ease 0.8s both' }}
        >
          <span className="gold-shimmer">Ruqayyah</span>
        </h1>

        <div
          className="mt-8 sm:mt-10 flex items-center gap-3 sm:gap-4"
          style={{ animation: 'fadeUp 1s ease 1s both' }}
        >
          <span className="h-px w-8 sm:w-12 bg-[#c0257d]/40" />
          <p className="font-sans text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/50">
            July 12, 2026 &middot; Osun, Nigeria
          </p>
          <span className="h-px w-8 sm:w-12 bg-[#c0257d]/40" />
        </div>

        <div
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
          style={{ animation: 'fadeUp 1s ease 1.2s both' }}
        >
          <a
            href="#rsvp"
            className="px-8 sm:px-10 py-4 bg-[#c0257d] text-white font-sans text-xs tracking-widest uppercase
          font-semibold hover:bg-[#e040a0] transition-all duration-300 text-center
          hover:shadow-[0_0_30px_rgba(192,37,125,0.5)]"
          >
            RSVP Now
          </a>
          <a
            href="#story"
            className="px-8 sm:px-10 py-4 border border-white/20 text-white/70 font-sans text-xs tracking-widest uppercase
        hover:border-[#c0257d]/50 hover:text-[#e040a0] transition-all duration-300 text-center"
          >
            Our Story
          </a>
        </div>
      </div >

      {/* Scroll indicator */}
      < div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        style={{ animation: 'fadeIn 1s ease 2s both' }
        }
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
        <div className="w-px h-10 bg-linear-to-b from-[#c0257d]/60 to-transparent animate-pulse" />
      </div >
    </section >
  )
}

// 'use client'
// import { useEffect, useRef } from 'react'

// export default function Hero() {
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext('2d')
//     if (!ctx) return

//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight

//     const particles: { x: number; y: number; r: number; speed: number; opacity: number; pulse: number }[] = []
//     for (let i = 0; i < 120; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         r: Math.random() * 1.5 + 0.3,
//         speed: Math.random() * 0.3 + 0.05,
//         opacity: Math.random() * 0.6 + 0.1,
//         pulse: Math.random() * Math.PI * 2,
//       })
//     }

//     let animId: number
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height)
//       particles.forEach((p) => {
//         p.pulse += 0.01
//         p.opacity = 0.2 + Math.sin(p.pulse) * 0.3
//         p.y -= p.speed
//         if (p.y < -5) p.y = canvas.height + 5
//         ctx.beginPath()
//         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
//         ctx.fillStyle = `rgba(212, 168, 67, ${Math.max(0, p.opacity)})`
//         ctx.fill()
//       })
//       animId = requestAnimationFrame(animate)
//     }
//     animate()

//     const onResize = () => {
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight
//     }
//     window.addEventListener('resize', onResize)
//     return () => {
//       cancelAnimationFrame(animId)
//       window.removeEventListener('resize', onResize)
//     }
//   }, [])

//   return (
//     <section
//       id="hero"
//       className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
//       style={{
//         background: 'radial-gradient(ellipse at 50% 40%, #071428 0%, #040f1e 40%, #020B18 100%)',
//       }}
//     >
//       <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

//       {/* Radial glow */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full"
//           style={{
//             background: 'radial-gradient(circle, rgba(26,107,74,0.12) 0%, rgba(212,168,67,0.06) 40%, transparent 70%)',
//           }}
//         />
//       </div>

//       {/* Corner ornaments */}
//       <div className="absolute top-24 left-8 md:left-16 opacity-30">
//         <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
//           <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="#d4a843" />
//           <circle cx="8" cy="8" r="3" fill="#d4a843" opacity="0.6" />
//         </svg>
//       </div>
//       <div className="absolute top-24 right-8 md:right-16 opacity-30 rotate-90">
//         <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
//           <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="#d4a843" />
//           <circle cx="8" cy="8" r="3" fill="#d4a843" opacity="0.6" />
//         </svg>
//       </div>
//       <div className="absolute bottom-24 left-8 md:left-16 opacity-30 -rotate-90">
//         <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
//           <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="#d4a843" />
//           <circle cx="8" cy="8" r="3" fill="#d4a843" opacity="0.6" />
//         </svg>
//       </div>
//       <div className="absolute bottom-24 right-8 md:right-16 opacity-30 rotate-180">
//         <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
//           <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="#d4a843" />
//           <circle cx="8" cy="8" r="3" fill="#d4a843" opacity="0.6" />
//         </svg>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 text-center px-6 flex flex-col items-center">
//         <p
//           className="font-sans text-xs tracking-[0.4em] uppercase text-gold-500/80 mb-8"
//           style={{ animation: 'fadeUp 0.8s ease 0.2s both' }}
//         >
//           We&apos;re getting married
//         </p>

//         <h1
//           className="font-display text-7xl md:text-9xl lg:text-[11rem] leading-none tracking-tight mb-2"
//           style={{ animation: 'fadeUp 1s ease 0.4s both' }}
//         >
//           <span className="gold-shimmer">Abdul-Hakeem</span>
//         </h1>

//         <div
//           className="my-2"
//           style={{ animation: 'float 5s ease-in-out infinite, fadeUp 1s ease 0.6s both' }}
//         >
//           <span className="font-serif text-5xl md:text-7xl text-emerald-500/80 italic">&amp;</span>
//         </div>

//         <h1
//           className="font-display text-7xl md:text-9xl lg:text-[11rem] leading-none tracking-tight"
//           style={{ animation: 'fadeUp 1s ease 0.8s both' }}
//         >
//           <span className="gold-shimmer">Ruqayyah</span>
//         </h1>

//         <div
//           className="mt-10 flex items-center gap-4"
//           style={{ animation: 'fadeUp 1s ease 1s both' }}
//         >
//           <span className="h-px w-12 bg-gold-500/40" />
//           <p className="font-sans text-sm tracking-[0.3em] uppercase text-white/50">
//             July 12, 2026 &middot; Osun, Nigeria
//           </p>
//           <span className="h-px w-12 bg-gold-500/40" />
//         </div>

//         <div
//           className="mt-12 flex flex-col sm:flex-row gap-4"
//           style={{ animation: 'fadeUp 1s ease 1.2s both' }}
//         >
//           <a
//             href="#rsvp"
//             className="px-10 py-4 bg-gold-500 text-navy-950 font-sans text-xs tracking-widest uppercase
//               font-semibold hover:bg-gold-400 transition-all duration-300
//               hover:shadow-[0_0_30px_rgba(212,168,67,0.4)]"
//           >
//             RSVP Now
//           </a>
//           <a
//             href="#story"
//             className="px-10 py-4 border border-white/20 text-white/70 font-sans text-xs tracking-widest uppercase
//               hover:border-gold-500/50 hover:text-gold-400 transition-all duration-300"
//           >
//             Our Story
//           </a>
//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <div
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
//         style={{ animation: 'fadeIn 1s ease 2s both' }}
//       >
//         <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
//         <div className="w-px h-10 bg-linear-to-b from-gold-500/60 to-transparent animate-pulse" />
//       </div>
//     </section>
//   )
// }