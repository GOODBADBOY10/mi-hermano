export default function Footer() {
  return (
    <footer className="py-16 border-t border-gold-500/10"
      style={{ background: '#020B18' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Names */}
        <div className="mb-6">
          <span className="font-display text-4xl text-white/20">Abdul-Hakeem</span>
          <span className="font-serif text-2xl text-gold-500/30 italic mx-3">&</span>
          <span className="font-display text-4xl text-white/20">Ruqayyah</span>
        </div>

        {/* Ornament */}
        <div className="ornament max-w-sm mx-auto mb-6">
          <span className="text-gold-500/30 text-xs">✦</span>
        </div>

        <p className="font-serif text-white/25 italic text-base mb-3">
          "You are my today and all of my tomorrows."
        </p>
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/15">
          April 12, 2025 · Lagos, Nigeria
        </p>

        <p className="font-sans text-[10px] tracking-wider text-white/10 mt-10 uppercase">
          Built with love by the family ✦ James & Eleanor 2025
        </p>
      </div>
    </footer>
  )
}