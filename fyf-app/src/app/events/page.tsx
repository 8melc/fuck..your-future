import Link from 'next/link'

export default function Events() {
  const events = [
    {
      title: "Life Planning Workshop",
      date: "2024-11-15",
      time: "19:00 - 21:00",
      location: "Online",
      description: "Learn how to create a meaningful life plan using visualization techniques.",
      price: "Free"
    },
    {
      title: "Goal Setting Masterclass",
      date: "2024-11-22",
      time: "18:30 - 20:30",
      location: "Berlin",
      description: "Master the art of setting and achieving meaningful goals.",
      price: "€29"
    },
    {
      title: "Time Management Intensive",
      date: "2024-12-05",
      time: "10:00 - 16:00",
      location: "Online",
      description: "A deep dive into effective time management strategies.",
      price: "€49"
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
            <Link href="/feedboard" className="text-fyf-steel hover:text-fyf-mint transition-colors">
              Guide
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="font-display text-4xl font-bold mb-8 text-fyf-cream">
          Events & Workshops
        </h1>

        <p className="text-fyf-steel text-lg mb-12 max-w-3xl">
          Join our community events and workshops to accelerate your personal growth journey. 
          Learn from experts and connect with like-minded individuals.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div key={index} className="bg-fyf-charcoal p-8 rounded-xl border border-fyf-smoke hover:border-fyf-coral transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-2xl font-bold text-fyf-cream">
                  {event.title}
                </h3>
                <span className="bg-fyf-coral text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {event.price}
                </span>
              </div>
              
              <div className="space-y-2 mb-4 text-fyf-steel">
                <p>📅 {event.date}</p>
                <p>🕐 {event.time}</p>
                <p>📍 {event.location}</p>
              </div>
              
              <p className="text-fyf-bone mb-6">
                {event.description}
              </p>
              
              <button className="w-full bg-fyf-coral hover:bg-fyf-coral-dark text-white font-semibold py-3 rounded-lg transition-colors">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}