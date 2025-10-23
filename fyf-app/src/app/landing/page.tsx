export default function LandingPage() {
  return (
    <div className="min-h-screen bg-fyf-noir text-fyf-cream">
      <main className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* Logo */}
          <div className="mb-12">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 bg-gradient-to-br from-fyf-coral to-fyf-mint rounded-full flex items-center justify-center">
              <span className="font-righteous text-4xl md:text-5xl text-fyf-noir">FYF</span>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-6">
            <h1 className="font-righteous text-[42px] md:text-[72px] leading-[0.95] text-fyf-cream">
              Zeit als Vermögen
            </h1>
            
            <p className="font-roboto-mono text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Deine Wochen sind dein wertvollstes Kapital. 
              <br />
              Starte mit deinem Geburtsdatum und erhalte sofort deinen Life-in-Weeks Impact.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="max-w-3xl mx-auto">
            <p className="font-body text-fyf-steel text-lg leading-relaxed">
              FYF hilft dir, verbleibende Lebenszeit sichtbar zu machen und bewusst zu investieren.
              <br />
              Transformiere deine Zeitwahrnehmung und lebe bewusster.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <a 
              href="/life-weeks"
              className="inline-flex items-center justify-center bg-[#95ff8d] text-black font-bold py-4 px-10 rounded-full shadow-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#95ff8d]/25"
            >
              Life-Weeks öffnen
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}