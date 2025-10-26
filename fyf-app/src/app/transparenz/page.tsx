import Link from 'next/link'
import TransparencyGrid from '@/components/TransparencyGrid'
import { transparencyContent } from '@/data/transparencyContent'
import './transparency.css'

export default function Transparenz() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--fyf-bg)', color: 'var(--fyf-offwhite)', fontFamily: 'var(--fyf-font-sans)' }}>
      {/* Header - Feedboard Pattern */}
      <header className="py-8 px-6 border-b" style={{ borderColor: 'var(--fyf-border)' }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-display text-2xl font-bold" style={{ color: 'var(--fyf-mint)', fontFamily: 'var(--fyf-font-display)' }}>
            FYF
          </Link>
          <nav className="flex gap-6">
            <Link href="/life-weeks" className="transition-colors" style={{ color: 'var(--fyf-muted)' }}>
              Life Weeks
            </Link>
            <Link href="/feedboard" className="transition-colors" style={{ color: 'var(--fyf-muted)' }}>
              Guide
            </Link>
            <Link href="/people" className="transition-colors" style={{ color: 'var(--fyf-muted)' }}>
              People
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section - Feedboard Pattern */}
      <section className="py-16 px-6" style={{ background: 'radial-gradient(circle at top right, rgba(78, 205, 196, 0.08), transparent 60%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--fyf-offwhite)', fontFamily: 'var(--fyf-font-display)' }}>
            Transparenz
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-medium" style={{ color: 'var(--fyf-mint)' }}>
            Transparenz ist kein Feature. Es ist unser System.
          </p>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--fyf-muted)' }}>
            Wir geben dir nicht mehr Zeit – wir geben sie dir zurück.
          </p>
        </div>
      </section>

            {/* Transparency Grid - Compact Lexicon Pattern */}
            <section className="px-6" style={{ padding: '40px clamp(20px, 4vw, 56px) 40px' }}>
              <div className="max-w-7xl mx-auto">
                <TransparencyGrid tiles={transparencyContent.tiles} />
              </div>
            </section>
    </div>
  )
}





