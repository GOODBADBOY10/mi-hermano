import type { Metadata } from 'next'
import { Cormorant_Garamond, Playfair_Display, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'AbdulHakeem- & Ruqayyah - July 2026',
  description: 'Join us as we celebrate our wedding day. July 12, 2026.',
  openGraph: {
    title: 'AbdulHakeem & Ruqayyah are getting married!',
    description: 'Join us to celebrate our special day - July 12, 2026',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${playfair.variable} ${jost.variable}`}>
        {children}
      </body>
    </html>
  )
}