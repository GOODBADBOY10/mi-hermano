export default function Footer() {
  return (
    <footer className="py-16 border-t border-[#c0257d]/10"
      style={{ background: '#020B18' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
          <span className="font-display text-3xl sm:text-4xl text-white/60">Abdul-Hakeem</span>
          <span className="font-serif text-xl sm:text-2xl text-[#c0257d]/80 italic sm:mx-3">&amp;</span>
          <span className="font-display text-3xl sm:text-4xl text-white/60">Ruqayyah</span>
        </div>

        <div className="ornament max-w-sm mx-auto mb-6">
          <span className="text-[#c0257d]/80 text-xs">*</span>
        </div>

        <p className="font-serif text-white/50 italic text-sm sm:text-base mb-3 px-4">
          &quot;You are my today and all of my tomorrows.&quot;
        </p>
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/55">
          June 06, 2026 &middot; Osun, Nigeria
        </p>

        <p className="font-sans text-[10px] tracking-wider text-white/70 mt-10 uppercase">
          Built with love by the family
        </p>
      </div>
    </footer>
  )
}

// export default function Footer() {
//   return (
//     <footer className="py-16 border-t border-gold-500/10"
//       style={{ background: '#020B18' }}>
//       <div className="max-w-4xl mx-auto px-6 text-center">
//         {/* Names - stack on mobile, inline on sm+ */}
//         <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
//           <span className="font-display text-3xl sm:text-4xl text-white/20">Abdul-Hakeem</span>
//           <span className="font-serif text-xl sm:text-2xl text-gold-500/30 italic sm:mx-3">&amp;</span>
//           <span className="font-display text-3xl sm:text-4xl text-white/20">Ruqayyah</span>
//         </div>

//         {/* Ornament */}
//         <div className="ornament max-w-sm mx-auto mb-6">
//           <span className="text-gold-500/30 text-xs">✦</span>
//         </div>

//         <p className="font-serif text-white/25 italic text-sm sm:text-base mb-3 px-4">
//           &quot;You are my today and all of my tomorrows.&quot;
//         </p>
//         <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/15">
//           July 12, 2026 &middot; Osun, Nigeria
//         </p>

//         <p className="font-sans text-[10px] tracking-wider text-white/10 mt-10 uppercase">
//           Built with love by the family
//         </p>
//       </div>
//     </footer>
//   )
// }