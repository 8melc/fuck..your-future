import Link from 'next/link'

export default function Transparenz() {
  const faqs = [
    {
      question: "How does FYF protect my personal data?",
      answer: "We use industry-standard encryption and never sell your personal information. All data is stored securely and you can delete your account at any time."
    },
    {
      question: "Is the life visualization scientifically accurate?",
      answer: "The visualization is based on average life expectancy data, but individual results may vary. It's designed as a tool for perspective, not medical advice."
    },
    {
      question: "How do you make money?",
      answer: "We offer premium features and coaching services. The core visualization tool remains free to ensure accessibility for everyone."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, premium users can export all their data in JSON format. We believe in data portability and user ownership."
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

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="font-display text-4xl font-bold mb-8 text-fyf-cream">
          Ethics & FAQ
        </h1>

        <div className="space-y-12">
          {/* Ethics Section */}
          <div className="bg-fyf-charcoal p-8 rounded-xl border border-fyf-smoke">
            <h2 className="font-display text-2xl font-bold mb-6 text-fyf-coral">
              Our Ethical Principles
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold mb-3 text-fyf-mint">
                  Transparency
                </h3>
                <p className="text-fyf-steel">
                  We believe in complete transparency about how we operate, make money, 
                  and use your data. No hidden fees, no surprise charges, no data selling.
                </p>
              </div>
              
              <div>
                <h3 className="font-display text-xl font-bold mb-3 text-fyf-mint">
                  Accessibility
                </h3>
                <p className="text-fyf-steel">
                  Our core tools remain free because we believe everyone deserves access 
                  to tools that can help them live more intentional lives.
                </p>
              </div>
              
              <div>
                <h3 className="font-display text-xl font-bold mb-3 text-fyf-mint">
                  User Agency
                </h3>
                <p className="text-fyf-steel">
                  You own your data. You control your experience. We provide tools, 
                  not prescriptions. Your life, your choices.
                </p>
              </div>
              
              <div>
                <h3 className="font-display text-xl font-bold mb-3 text-fyf-mint">
                  Evidence-Based
                </h3>
                <p className="text-fyf-steel">
                  Our recommendations are based on research and proven methods, 
                  not just popular trends or unsubstantiated claims.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-fyf-charcoal p-8 rounded-xl border border-fyf-smoke">
            <h2 className="font-display text-2xl font-bold mb-6 text-fyf-mauve">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-fyf-smoke pb-4 last:border-b-0">
                  <h3 className="font-display text-lg font-bold mb-2 text-fyf-cream">
                    {faq.question}
                  </h3>
                  <p className="text-fyf-steel">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-fyf-charcoal p-8 rounded-xl border border-fyf-smoke text-center">
            <h2 className="font-display text-2xl font-bold mb-4 text-fyf-cream">
              Have More Questions?
            </h2>
            <p className="text-fyf-steel mb-6">
              We're here to help. Reach out to us with any questions, concerns, or feedback.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-fyf-coral hover:bg-fyf-coral-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Contact Support
              </button>
              <button className="border-2 border-fyf-mint text-fyf-mint hover:bg-fyf-mint hover:text-fyf-noir font-semibold px-6 py-3 rounded-lg transition-colors">
                Send Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}



