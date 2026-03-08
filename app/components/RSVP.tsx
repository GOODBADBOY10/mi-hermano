'use client'
import { useState, useEffect, useRef } from 'react'

type FormData = {
  name: string
  email: string
  guests: string
  attendance: 'yes' | 'no' | ''
  meal: string
  song: string
  message: string
}

const meals = ['Jollof Rice', 'Fried Rice', 'Semo & Ewedu', 'Amala and Gbegiri']

// ─── IV Card Generator ────────────────────────────────────────────────────────
async function downloadIVCard(form: FormData) {
  // Dynamically import to keep bundle lean
  const jsPDFModule = await import('jspdf')
  const jsPDF = jsPDFModule.default

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [148, 105] })
  const W = 148
  const H = 105

  const centeredText = (text: string, y: number, charSpace: number) => {
    doc.setCharSpace(charSpace)
    doc.text(text, (W / 2) - (text.length * charSpace) / 2, y, { align: 'center' })
    doc.setCharSpace(0)
  }

  // ── Background ──
  doc.setFillColor(2, 11, 24) // deep navy
  doc.rect(0, 0, W, H, 'F')

  // ── Decorative border (outer) ──
  doc.setDrawColor(192, 37, 125)
  doc.setLineWidth(0.4)
  doc.rect(4, 4, W - 8, H - 8)

  // ── Decorative border (inner thin) ──
  doc.setDrawColor(192, 37, 125, 0.3)
  doc.setLineWidth(0.15)
  doc.rect(6, 6, W - 12, H - 12)

  // ── Corner ornaments ──
  const corners = [[8, 8], [W - 8, 8], [8, H - 8], [W - 8, H - 8]]
  doc.setDrawColor(192, 37, 125)
  doc.setLineWidth(0.5)
  corners.forEach(([x, y]) => {
    const s = 4
    const dx = x < W / 2 ? 1 : -1
    const dy = y < H / 2 ? 1 : -1
    doc.line(x, y, x + dx * s, y)
    doc.line(x, y, x, y + dy * s)
  })

  // Header label
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6)
  doc.setTextColor(192, 37, 125)
  centeredText('YOU ARE CORDIALLY INVITED', 18, 3)

  // Subtitle
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.5)
  doc.setTextColor(192, 37, 125)
  centeredText('WEDDING CELEBRATION', 40, 2)

  // Guest label
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6)
  doc.setTextColor(255, 255, 255, 0.45)
  centeredText('GUEST', 51, 2)

  // ── Divider line ──
  doc.setDrawColor(192, 37, 125)
  doc.setLineWidth(0.2)
  doc.line(W / 2 - 20, 21, W / 2 + 20, 21)

  // ── Couple names (display) ──
  doc.setFont('times', 'italic')
  doc.setFontSize(22)
  doc.setTextColor(255, 255, 255)
  doc.text('Abdul-Hakeem & Soliha', W / 2, 34, { align: 'center' })


  // ── Divider ──
  doc.setDrawColor(255, 255, 255, 0.15)
  doc.setLineWidth(0.15)
  doc.line(12, 44, W - 12, 44)

  doc.setFont('times', 'italic')
  doc.setFontSize(15)
  doc.setTextColor(255, 255, 255)
  doc.text(form.name || 'Valued Guest', W / 2, 59, { align: 'center' })

  // ── Details row ──
  const detailsY = 70
  const cols = [
    { label: 'DATE', value: 'June 06, 2026' },
    { label: 'GUESTS', value: `${form.guests} ${parseInt(form.guests) === 1 ? 'Guest' : 'Guests'}` },
    { label: 'MEAL', value: form.meal ? form.meal.split(' ')[0] + (form.meal.split(' ')[1] ? ' ' + form.meal.split(' ')[1] : '') : 'TBC' },
    { label: 'VENUE', value: 'Ede Grammar School' },
  ]

  const colW = (W - 24) / cols.length
  cols.forEach((col, i) => {
    const x = 12 + colW * i + colW / 2
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(5.5)
    doc.setTextColor(192, 37, 125)
    doc.setCharSpace(1.5)
    doc.text(col.label, x, detailsY, { align: 'center' })
    doc.setCharSpace(0)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(255, 255, 255)
    doc.text(col.value, x, detailsY + 6, { align: 'center' })
  })

  // ── Vertical separators between cols ──
  doc.setDrawColor(192, 37, 125, 0.3)
  doc.setLineWidth(0.15)
  for (let i = 1; i < cols.length; i++) {
    const x = 12 + colW * i
    doc.line(x, detailsY - 4, x, detailsY + 8)
  }

  // ── Bottom divider ──
  doc.setDrawColor(255, 255, 255, 0.1)
  doc.setLineWidth(0.15)
  doc.line(12, 82, W - 12, 82)

  // ── Footer ──
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(5.5)
  doc.setTextColor(255, 255, 255, 0.25)
  centeredText('Please present this card at the entrance on the day of the event', 89, 1)

  // ── Attendance status badge ──
  if (form.attendance === 'yes') {
    doc.setFillColor(192, 37, 125)
    doc.roundedRect(W / 2 - 14, 93, 28, 6, 1, 1, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(5.5)
    doc.setTextColor(255, 255, 255)
    centeredText('CONFIRMED', 97.2, 1.5)  // ✅ uses helper
  }

  doc.save(`${form.name.replace(/\s+/g, '_') || 'Guest'}_Invitation.pdf`)
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function RSVP() {
  const ref = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState<FormData>({
    name: '', email: '', guests: '1', attendance: '', meal: '', song: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  // Track individual results for user feedback
  const [emailSent, setEmailSent] = useState<boolean | null>(null)
  const [cardDownloaded, setCardDownloaded] = useState<boolean | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.attendance) {
      setErrorMsg('Please fill in your name, email and attendance.')
      return
    }
    setErrorMsg('')
    setStatus('loading')
    setEmailSent(null)
    setCardDownloaded(null)

    // ── Run both in parallel — each fails independently ──
    const [emailResult, cardResult] = await Promise.allSettled([
      // 1. Send email
      fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }).then(res => { if (!res.ok) throw new Error('Email failed') }),

      // 2. Download IV card
      downloadIVCard(form),
    ])

    const emailOk = emailResult.status === 'fulfilled'
    const cardOk = cardResult.status === 'fulfilled'

    setEmailSent(emailOk)
    setCardDownloaded(cardOk)

    if (emailOk || cardOk) {
      // At least one succeeded — show success
      setStatus('success')
      setTimeout(() => {
        setForm({ name: '', email: '', guests: '1', attendance: '', meal: '', song: '', message: '' })
        setStatus('idle')
        setEmailSent(null)
        setCardDownloaded(null)
      }, 8000)
    } else {
      // Both failed
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="rsvp" ref={ref} className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #071428 0%, #020B18 60%)' }}>

      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-24
        bg-linear-to-b from-[#c0257d]/30 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 fade-up">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#c0257d]/60 mb-4">
            You&apos;re Invited
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            <span className="gold-shimmer">RSVP</span>
          </h2>
          <p className="font-serif text-white/40 italic text-base sm:text-lg">
            Kindly respond by May 26, 2026
          </p>
        </div>

        <div className="fade-up border border-[#c0257d]/20 bg-navy-800/30 p-6 sm:p-8 md:p-12 gold-glow"
          style={{ backdropFilter: 'blur(20px)' }}>

          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 border border-[#c0257d]/50 rounded-full flex items-center justify-center mx-auto mb-6 gold-glow">
                <svg className="w-7 h-7 text-[#e040a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="font-display text-3xl text-white mb-3">Thank You!</h3>
              <p className="font-serif text-white/50 text-lg italic mb-6">
                We can&apos;t wait to celebrate with you.
              </p>

              {/* ── Individual status feedback ── */}
              <div className="flex flex-col items-center gap-2 text-xs font-sans tracking-wide">
                <div className={`flex items-center gap-2 ${emailSent ? 'text-emerald-400' : 'text-red-400/70'}`}>
                  <span>{emailSent ? '✓' : '✗'}</span>
                  <span>{emailSent ? 'Confirmation email sent' : 'Email could not be sent — check your inbox later'}</span>
                </div>
                <div className={`flex items-center gap-2 ${cardDownloaded ? 'text-emerald-400' : 'text-red-400/70'}`}>
                  <span>{cardDownloaded ? '✓' : '✗'}</span>
                  <span>{cardDownloaded ? 'Invitation card downloaded' : 'Card download failed — please reload and try again'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">

              <div className="fade-up">
                <p className="font-sans text-xs tracking-[0.25em] uppercase text-white/40 mb-4">
                  Will you be joining us?
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { value: 'yes', label: 'Joyfully Accepts' },
                    { value: 'no', label: 'Regretfully Declines' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setForm(prev => ({ ...prev, attendance: opt.value as 'yes' | 'no' }))}
                      className={`py-3 sm:py-4 border font-sans text-xs tracking-widest uppercase transition-all duration-300
                        ${form.attendance === opt.value
                          ? 'border-[#c0257d] bg-[#c0257d]/10 text-[#e040a0]'
                          : 'border-white/20 text-white/40 hover:border-[#c0257d]/40 hover:text-white/60'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 fade-up delay-100">
                {[
                  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof FormData]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="gold-input w-full bg-navy-900/60 border border-white/10 px-4 py-3
                        font-serif text-white/80 placeholder-white/20 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 fade-up delay-200">
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    style={{ background: '#020B18' }}
                    className="gold-input w-full border border-white/10 px-4 py-3
    font-serif text-white/80 transition-all duration-300 appearance-none"
                  >
                    {['1', '2', '3', '4'].map(n => (
                      <option key={n} value={n} style={{ background: '#020B18' }}>
                        {n} {n === '1' ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                    Meal Preference
                  </label>
                  <select
                    name="meal"
                    value={form.meal}
                    onChange={handleChange}
                    style={{ background: '#020B18' }}
                    className="gold-input w-full border border-white/10 px-4 py-3
    font-serif text-white/70 transition-all duration-300 appearance-none"
                  >
                    <option value="" style={{ background: '#020B18' }}>Select a meal</option>
                    {meals.map(m => (
                      <option key={m} value={m} style={{ background: '#020B18' }}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="fade-up delay-300">
                <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                  Song Request
                </label>
                <input type="text" name="song" value={form.song} onChange={handleChange}
                  placeholder="What song will get you on the dance floor?"
                  className="gold-input w-full bg-navy-900/60 border border-white/10 px-4 py-3
                    font-serif text-white/80 placeholder-white/20 transition-all duration-300" />
              </div>

              <div className="fade-up delay-400">
                <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
                  Message to the Couple
                </label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                  placeholder="Share your wishes, a memory, or words of love..."
                  className="gold-input w-full bg-navy-900/60 border border-white/10 px-4 py-3
                    font-serif text-white/80 placeholder-white/20 transition-all duration-300 resize-none" />
              </div>

              {errorMsg && (
                <p className="text-red-400 font-sans text-xs tracking-wide text-center">{errorMsg}</p>
              )}

              <div className="fade-up delay-500 pt-2">
                <button onClick={handleSubmit} disabled={status === 'loading'}
                  className={`w-full py-4 sm:py-5 font-sans text-xs tracking-[0.3em] uppercase font-semibold
                    transition-all duration-300
                    ${status === 'loading'
                      ? 'bg-[#c0257d]/40 text-white/40 cursor-wait'
                      : status === 'error'
                        ? 'bg-red-500/80 text-white cursor-pointer'
                        : 'bg-[#c0257d] text-white hover:bg-[#e040a0] hover:shadow-[0_0_40px_rgba(192,37,125,0.5)]'
                    }`}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending RSVP & Downloading Card...
                    </span>
                  ) : status === 'error' ? 'Try Again' : 'Send RSVP & Download Invitation'}
                </button>
                <p className="text-center font-sans text-[10px] tracking-wide text-white/20 mt-3 uppercase">
                  Your invitation card will download automatically
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}



// 'use client'
// import { useState, useEffect, useRef } from 'react'

// type FormData = {
//   name: string
//   email: string
//   guests: string
//   attendance: 'yes' | 'no' | ''
//   meal: string
//   song: string
//   message: string
// }

// const meals = ['Grilled Beef & Truffle Sauce', 'Pan-Seared Sea Bass', 'Vegetarian Wellington', 'Jollof Rice & Chicken (Nigerian)']

// export default function RSVP() {
//   const ref = useRef<HTMLDivElement>(null)
//   const [form, setForm] = useState<FormData>({
//     name: '', email: '', guests: '1', attendance: '', meal: '', song: '', message: '',
//   })
//   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
//   const [errorMsg, setErrorMsg] = useState('')

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
//       { threshold: 0.1 }
//     )
//     ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
//     return () => observer.disconnect()
//   }, [])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = async (e: React.MouseEvent) => {
//     e.preventDefault()
//     if (!form.name || !form.email || !form.attendance) {
//       setErrorMsg('Please fill in your name, email and attendance.')
//       return
//     }
//     setErrorMsg('')
//     setStatus('loading')

//     try {
//       const res = await fetch('/api/rsvp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       })

//       if (!res.ok) throw new Error('Failed to submit')

//       setStatus('success')
//       setTimeout(() => {
//         setForm({ name: '', email: '', guests: '1', attendance: '', meal: '', song: '', message: '' })
//         setStatus('idle')
//       }, 6000)

//     } catch {
//       setStatus('error')
//       setErrorMsg('Something went wrong. Please try again.')
//       setTimeout(() => setStatus('idle'), 4000)
//     }
//   }

//   return (
//     <section id="rsvp" ref={ref} className="py-28 relative overflow-hidden"
//       style={{ background: 'radial-gradient(ellipse at 50% 0%, #071428 0%, #020B18 60%)' }}>

//       <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-24
//         bg-linear-to-b from-gold-500/30 to-transparent" />

//       <div className="max-w-3xl mx-auto px-6">
//         <div className="text-center mb-14 fade-up">
//           <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold-500/60 mb-4">
//             You&apos;re Invited
//           </p>
//           <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
//             <span className="gold-shimmer">RSVP</span>
//           </h2>
//           <p className="font-serif text-white/40 italic text-lg">
//             Kindly respond by March 28, 2025
//           </p>
//         </div>

//         <div className="fade-up border border-gold-500/20 bg-navy-800/30 p-8 md:p-12 gold-glow"
//           style={{ backdropFilter: 'blur(20px)' }}>

//           {status === 'success' ? (
//             <div className="text-center py-10">
//               <div className="w-16 h-16 border border-gold-500/50 rounded-full flex items-center justify-center mx-auto mb-6 gold-glow">
//                 <svg className="w-7 h-7 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
//                 </svg>
//               </div>
//               <h3 className="font-display text-3xl text-white mb-3">Thank You!</h3>
//               <p className="font-serif text-white/50 text-lg italic">
//                 Your RSVP is confirmed. Check your email for details!
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-8">

//               {/* Attendance */}
//               <div className="fade-up">
//                 <p className="font-sans text-xs tracking-[0.25em] uppercase text-white/40 mb-4">
//                   Will you be joining us?
//                 </p>
//                 <div className="grid grid-cols-2 gap-4">
//                   {[
//                     { value: 'yes', label: 'Joyfully Accepts' },
//                     { value: 'no', label: 'Regretfully Declines' },
//                   ].map((opt) => (
//                     <button
//                       key={opt.value}
//                       onClick={() => setForm(prev => ({ ...prev, attendance: opt.value as 'yes' | 'no' }))}
//                       className={`py-4 border font-sans text-xs tracking-widest uppercase transition-all duration-300
//                         ${form.attendance === opt.value
//                           ? 'border-gold-500 bg-gold-500/10 text-gold-400'
//                           : 'border-white/20 text-white/40 hover:border-gold-500/40 hover:text-white/60'
//                         }`}
//                     >
//                       {opt.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Name & Email */}
//               <div className="grid md:grid-cols-2 gap-6 fade-up delay-100">
//                 {[
//                   { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
//                   { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
//                 ].map((field) => (
//                   <div key={field.name}>
//                     <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
//                       {field.label}
//                     </label>
//                     <input
//                       type={field.type}
//                       name={field.name}
//                       value={form[field.name as keyof FormData]}
//                       onChange={handleChange}
//                       placeholder={field.placeholder}
//                       className="gold-input w-full bg-navy-900/60 border border-white/10 px-4 py-3
//                         font-serif text-white/80 placeholder-white/20 transition-all duration-300"
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Guests & Meal */}
//               <div className="grid md:grid-cols-2 gap-6 fade-up delay-200">
//                 <div>
//                   <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
//                     Number of Guests
//                   </label>
//                   <select
//                     name="guests"
//                     value={form.guests}
//                     onChange={handleChange}
//                     className="gold-input w-full bg-navy-900/60 border border-white/10 px-4 py-3
//                       font-serif text-white/80 transition-all duration-300 appearance-none"
//                   >
//                     {['1', '2', '3', '4'].map(n => (
//                       <option key={n} value={n}>{n} {n === '1' ? 'Guest' : 'Guests'}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
//                     Meal Preference
//                   </label>
//                   <select
//                     name="meal"
//                     value={form.meal}
//                     onChange={handleChange}
//                     className="gold-input w-full bg-navy-900/60 border border-white/10 px-4 py-3
//                       font-serif text-white/70 transition-all duration-300 appearance-none"
//                   >
//                     <option value="">Select a meal</option>
//                     {meals.map(m => <option key={m} value={m}>{m}</option>)}
//                   </select>
//                 </div>
//               </div>

//               {/* Song */}
//               <div className="fade-up delay-300">
//                 <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
//                   Song Request
//                 </label>
//                 <input
//                   type="text"
//                   name="song"
//                   value={form.song}
//                   onChange={handleChange}
//                   placeholder="What song will get you on the dance floor?"
//                   className="gold-input w-full bg-navy-900/60 border border-white/10 px-4 py-3
//                     font-serif text-white/80 placeholder-white/20 transition-all duration-300"
//                 />
//               </div>

//               {/* Message */}
//               <div className="fade-up delay-400">
//                 <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
//                   Message to the Couple
//                 </label>
//                 <textarea
//                   name="message"
//                   value={form.message}
//                   onChange={handleChange}
//                   rows={4}
//                   placeholder="Share your wishes, a memory, or words of love..."
//                   className="gold-input w-full bg-navy-900/60 border border-white/10 px-4 py-3
//                     font-serif text-white/80 placeholder-white/20 transition-all duration-300 resize-none"
//                 />
//               </div>

//               {/* Error message */}
//               {errorMsg && (
//                 <p className="text-red-400 font-sans text-xs tracking-wide text-center">{errorMsg}</p>
//               )}

//               {/* Submit */}
//               <div className="fade-up delay-500 pt-2">
//                 <button
//                   onClick={handleSubmit}
//                   disabled={status === 'loading'}
//                   className={`w-full py-5 font-sans text-xs tracking-[0.3em] uppercase font-semibold
//                     transition-all duration-300
//                     ${status === 'loading'
//                       ? 'bg-gold-500/40 text-navy-950/40 cursor-wait'
//                       : status === 'error'
//                         ? 'bg-red-500/80 text-white cursor-pointer'
//                         : 'bg-gold-500 text-navy-950 hover:bg-gold-400 hover:shadow-[0_0_40px_rgba(212,168,67,0.4)]'
//                     }`}
//                 >
//                   {status === 'loading' ? (
//                     <span className="flex items-center justify-center gap-3">
//                       <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                       </svg>
//                       Sending RSVP...
//                     </span>
//                   ) : status === 'error' ? 'Try Again' : 'Send My RSVP'}
//                 </button>
//                 <p className="text-center font-sans text-[10px] tracking-wide text-white/20 mt-3 uppercase">
//                   You&apos;ll receive a confirmation email shortly
//                 </p>
//               </div>

//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   )
// }
