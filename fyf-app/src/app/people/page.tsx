import Link from 'next/link'

export default function People() {
  const people = [
    {
      name: "Sarah Chen",
      role: "Life Coach",
      bio: "Helping people find clarity in their life goals and create actionable plans.",
      image: "👩‍💼",
      expertise: ["Goal Setting", "Life Planning", "Mindset"]
    },
    {
      name: "Marcus Rodriguez",
      role: "Productivity Expert",
      bio: "Specialist in time management and building sustainable productivity systems.",
      image: "👨‍💻",
      expertise: ["Time Management", "Productivity", "Habits"]
    },
    {
      name: "Dr. Emma Thompson",
      role: "Psychologist",
      bio: "Research-based approaches to behavior change and personal development.",
      image: "👩‍⚕️",
      expertise: ["Psychology", "Behavior Change", "Mental Health"]
    }
  ]

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

      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="font-display text-4xl font-bold mb-8 text-fyf-cream">
          Community & People
        </h1>

        <p className="text-fyf-steel text-lg mb-12 max-w-3xl">
          Connect with our community of experts, coaches, and like-minded individuals 
          who are passionate about personal growth and life transformation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {people.map((person, index) => (
            <div key={index} className="bg-fyf-charcoal p-6 rounded-xl border border-fyf-smoke hover:border-fyf-mint transition-colors">
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">{person.image}</div>
                <h3 className="font-display text-xl font-bold text-fyf-cream">
                  {person.name}
                </h3>
                <p className="text-fyf-mint font-semibold">{person.role}</p>
              </div>
              
              <p className="text-fyf-steel mb-4 text-center">
                {person.bio}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {person.expertise.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-fyf-mint text-fyf-noir px-2 py-1 rounded text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <button className="w-full mt-4 bg-fyf-mint hover:bg-fyf-mint-dark text-fyf-noir font-semibold py-2 rounded-lg transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>

        <div className="bg-fyf-charcoal p-8 rounded-xl border border-fyf-smoke text-center">
          <h2 className="font-display text-2xl font-bold mb-4 text-fyf-cream">
            Join Our Community
          </h2>
          <p className="text-fyf-steel mb-6">
            Connect with thousands of people on their personal development journey.
          </p>
          <button className="bg-fyf-coral hover:bg-fyf-coral-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Join Community
          </button>
        </div>
      </div>
    </main>
  )
}