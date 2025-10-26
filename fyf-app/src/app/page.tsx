import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-fyf-noir">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark opacity-50"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 gradient-coral-mint bg-clip-text text-transparent">
            FYF
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-8 text-fyf-steel">
            Fuck Your Future
          </p>
          <p className="text-lg md:text-xl mb-12 text-fyf-bone max-w-2xl mx-auto">
            Deine Zeit läuft. Lass uns das ändern. Visualisiere dein Leben, finde deine Menschen und lebe bewusst.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/life-weeks" 
              className="px-8 py-4 bg-fyf-coral hover:bg-fyf-coral-dark text-white font-semibold rounded-lg transition-all duration-300 glow-coral"
            >
              Start Life Visualization
            </Link>
            <Link 
              href="/people" 
              className="px-8 py-4 border-2 border-fyf-mint text-fyf-mint hover:bg-fyf-mint hover:text-fyf-noir font-semibold rounded-lg transition-all duration-300"
            >
              Discover People
            </Link>
            <Link 
              href="/access" 
              className="px-8 py-4 border-2 border-fyf-mauve text-fyf-mauve hover:bg-fyf-mauve hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-center mb-16 text-fyf-cream">
            Entdecke FYF
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <Link href="/life-weeks" className="group">
              <div className="bg-fyf-charcoal p-8 rounded-xl hover:bg-fyf-smoke transition-all duration-300 border border-fyf-smoke hover:border-fyf-coral">
                <h3 className="font-display text-2xl font-bold mb-4 text-fyf-coral group-hover:text-fyf-coral-dark">
                  Life in Weeks
                </h3>
                <p className="text-fyf-steel">
                  Visualisiere dein Leben in Wochen und verstehe die Kostbarkeit der Zeit.
                </p>
              </div>
            </Link>

            <Link href="/profile" className="group">
              <div className="bg-fyf-charcoal p-8 rounded-xl hover:bg-fyf-smoke transition-all duration-300 border border-fyf-smoke hover:border-fyf-mint">
                <h3 className="font-display text-2xl font-bold mb-4 text-fyf-mint group-hover:text-fyf-mint-dark">
                  Profile
                </h3>
                <p className="text-fyf-steel">
                  Entdecke Sarah Chen's Profil und verbinde dich mit ihr.
                </p>
              </div>
            </Link>

            <Link href="/feedboard" className="group">
              <div className="bg-fyf-charcoal p-8 rounded-xl hover:bg-fyf-smoke transition-all duration-300 border border-fyf-smoke hover:border-fyf-mauve">
                <h3 className="font-display text-2xl font-bold mb-4 text-fyf-mauve">
                  Guide
                </h3>
                <p className="text-fyf-steel">
                  AI-gestützte Empfehlungen und kuratierte Inhalte für dein Wachstum.
                </p>
              </div>
            </Link>

            <Link href="/events" className="group">
              <div className="bg-fyf-charcoal p-8 rounded-xl hover:bg-fyf-smoke transition-all duration-300 border border-fyf-smoke hover:border-fyf-coral">
                <h3 className="font-display text-2xl font-bold mb-4 text-fyf-coral">
                  Events
                </h3>
                <p className="text-fyf-steel">
                  Nimm am FYF Festival und Workshops teil, um dein Wachstum zu beschleunigen.
                </p>
              </div>
            </Link>

            <Link href="/people" className="group">
              <div className="bg-fyf-charcoal p-8 rounded-xl hover:bg-fyf-smoke transition-all duration-300 border border-fyf-smoke hover:border-fyf-mint">
                <h3 className="font-display text-2xl font-bold mb-4 text-fyf-mint">
                  People
                </h3>
                <p className="text-fyf-steel">
                  Entdecke Menschen, die zu dir passen und verbinde dich mit ihnen.
                </p>
              </div>
            </Link>

            <Link href="/access" className="group">
              <div className="bg-fyf-charcoal p-8 rounded-xl hover:bg-fyf-smoke transition-all duration-300 border border-fyf-smoke hover:border-fyf-coral">
                <h3 className="font-display text-2xl font-bold mb-4 text-fyf-coral">
                  Access
                </h3>
                <p className="text-fyf-steel">
                  Erstelle dein Profil und werde Teil der FYF-Community.
                </p>
              </div>
            </Link>

            <Link href="/transparenz" className="group">
              <div className="bg-fyf-charcoal p-8 rounded-xl hover:bg-fyf-smoke transition-all duration-300 border border-fyf-smoke hover:border-fyf-mauve">
                <h3 className="font-display text-2xl font-bold mb-4 text-fyf-mauve">
                  Transparenz
                </h3>
                <p className="text-fyf-steel">
                  Erfahre mehr über unsere Werte und finde Antworten auf häufige Fragen.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-fyf-charcoal">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-fyf-steel mb-4">
            © 2024 FYF - Fuck Your Future. Alle Rechte vorbehalten.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/credits" className="text-fyf-steel hover:text-fyf-coral transition-colors">
              Credits
            </Link>
            <Link href="/transparenz" className="text-fyf-steel hover:text-fyf-coral transition-colors">
              Transparenz
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}