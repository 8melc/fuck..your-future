import Link from 'next/link'

export default function Credits() {
  return (
    <main className="min-h-screen bg-fyf-noir">
      <header className="py-8 px-6 border-b border-fyf-charcoal">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-display text-2xl font-bold text-fyf-coral">
            FYF
          </Link>
          <nav className="flex gap-6">
            <Link href="/life-weeks" className="text-fyf-steel hover:text-fyf-mint transition-colors">
              Life Weeks
            </Link>
            <Link href="/guide" className="text-fyf-steel hover:text-fyf-mint transition-colors">
              Guide
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="font-display text-4xl font-bold mb-8 text-fyf-cream">
          Credits & Monetization
        </h1>

        <div className="space-y-12">
          {/* Credits Section */}
          <div className="bg-fyf-charcoal p-8 rounded-xl border border-fyf-smoke">
            <h2 className="font-display text-2xl font-bold mb-6 text-fyf-coral">
              Credits
            </h2>
            
            <div className="space-y-4 text-fyf-steel">
              <p>
                <strong className="text-fyf-cream">Concept Inspiration:</strong> The "Life in Weeks" visualization 
                was inspired by Tim Urban's powerful TED talk and Wait But Why blog post.
              </p>
              
              <p>
                <strong className="text-fyf-cream">Design System:</strong> Custom FYF color palette and typography 
                system created specifically for this project.
              </p>
              
              <p>
                <strong className="text-fyf-cream">Fonts:</strong> Space Grotesk and Inter fonts from Google Fonts.
              </p>
              
              <p>
                <strong className="text-fyf-cream">Technology Stack:</strong> Built with Next.js, React, TypeScript, 
                and Tailwind CSS.
              </p>
            </div>
          </div>

          {/* Monetization Section */}
          <div className="bg-fyf-charcoal p-8 rounded-xl border border-fyf-smoke">
            <h2 className="font-display text-2xl font-bold mb-6 text-fyf-mint">
              Monetization & Support
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold mb-3 text-fyf-cream">
                  Premium Features
                </h3>
                <ul className="space-y-2 text-fyf-steel">
                  <li>• Advanced goal tracking and analytics</li>
                  <li>• Personalized content recommendations</li>
                  <li>• Priority access to workshops and events</li>
                  <li>• One-on-one coaching sessions</li>
                  <li>• Export and backup your data</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-display text-xl font-bold mb-3 text-fyf-cream">
                  Support Options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-fyf-carbon p-4 rounded-lg border border-fyf-smoke">
                    <h4 className="font-semibold text-fyf-coral mb-2">Free</h4>
                    <p className="text-fyf-steel text-sm">Basic life visualization and goal setting</p>
                  </div>
                  
                  <div className="bg-fyf-carbon p-4 rounded-lg border border-fyf-smoke">
                    <h4 className="font-semibold text-fyf-mint mb-2">Pro</h4>
                    <p className="text-fyf-steel text-sm">€9.99/month - Advanced features and analytics</p>
                  </div>
                  
                  <div className="bg-fyf-carbon p-4 rounded-lg border border-fyf-smoke">
                    <h4 className="font-semibold text-fyf-mauve mb-2">Premium</h4>
                    <p className="text-fyf-steel text-sm">€29.99/month - Coaching and personal support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Section */}
          <div className="bg-fyf-charcoal p-8 rounded-xl border border-fyf-smoke text-center">
            <h2 className="font-display text-2xl font-bold mb-4 text-fyf-mauve">
              Support Our Mission
            </h2>
            <p className="text-fyf-steel mb-6">
              Help us keep FYF free and accessible to everyone. Your support allows us to 
              continue developing tools that help people live more intentional lives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-fyf-coral hover:bg-fyf-coral-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Donate €5
              </button>
              <button className="bg-fyf-mint hover:bg-fyf-mint-dark text-fyf-noir font-semibold px-6 py-3 rounded-lg transition-colors">
                Donate €15
              </button>
              <button className="border-2 border-fyf-mauve text-fyf-mauve hover:bg-fyf-mauve hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Custom Amount
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

