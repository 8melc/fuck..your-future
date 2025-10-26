'use client';

import Link from 'next/link'
import { useState } from 'react'

export default function Transparenz() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const corePrinciples = [
    {
      id: 'tool-not-coach',
      title: 'Tool not Coach',
      description: 'Der User ist Akteur, nicht Produkt. FYF reagiert auf das Verhalten des Users – nicht umgekehrt.',
      details: 'Alles Sichtbare resultiert aus bewusster Auswahl. Keine versteckten Algorithmen oder Manipulation.',
      icon: '🔧'
    },
    {
      id: 'user-ownership',
      title: 'User Ownership',
      description: 'Jede Interaktion beginnt und endet beim User. User steuert, FYF folgt.',
      details: 'Du wählst Content-Formate, Themen und Limits. Du definierst, wann FYF schweigt. Keine versteckten Elemente.',
      icon: '👤'
    },
    {
      id: 'transparency',
      title: 'Transparenz',
      description: 'Alles ist rückverfolgbar – Content, Methode, Quelle.',
      details: 'Jedes "Warum sehe ich das?" erklärbar on click. Interface kommuniziert Logik, nicht Befehl.',
      icon: '🔍'
    },
    {
      id: 'limits-freedom',
      title: 'Limits = Freedom',
      description: 'Begrenzung ist ein Feature – sie macht Zeit spürbar.',
      details: 'Kein Endless Scroll. Keine Belohnungssysteme. Kein Algorithmic Push. Zeit nach Bedeutung, nicht nach Länge.',
      icon: '⏰'
    }
  ]

  const scientificMethods = [
    {
      name: 'Life in Weeks',
      author: 'Tim Urban',
      description: 'Visualisierung des Lebens als Raster von Wochen (ca. 4.000 Wochen bei 80 Jahren).',
      source: 'https://waitbutwhy.com/2014/05/life-weeks.html',
      application: 'Hero-Visualisierung beim Onboarding, macht Endlichkeit sichtbar.'
    },
    {
      name: 'PERMA-Modell',
      author: 'Martin Seligman',
      description: 'Framework für Wohlbefinden: Positive Emotion, Engagement, Relationships, Meaning, Achievement.',
      source: 'https://ppc.sas.upenn.edu/learn-more/perma-theory-well-being-and-perma-workshops',
      application: 'Content-Filter nach PERMA-Dimensionen, personalisierte Empfehlungen.'
    },
    {
      name: 'Deep Work',
      author: 'Cal Newport',
      description: 'Fokussierte, ablenkungsfreie Arbeit an kognitiv anspruchsvollen Aufgaben.',
      source: 'https://calnewport.com/deep-habits-the-importance-of-planning-every-minute-of-your-work-day/',
      application: 'Guide schlägt Deep-Work-Sessions vor, Content-Limit verhindert Doomscrolling.'
    },
    {
      name: 'Self-Determination Theory',
      author: 'Deci & Ryan',
      description: 'Theorie der intrinsischen Motivation: Autonomy, Competence, Relatedness.',
      source: 'https://selfdeterminationtheory.org/',
      application: 'Guide respektiert Autonomie, Content fördert Kompetenz, People/Events fördern Relatedness.'
    }
  ]

  const faqs = [
    {
      question: "Warum sehe ich bestimmte Inhalte?",
      answer: "Jeder Content hat einen 'Warum sehe ich das?'-Button. Klick drauf und erfahre die genaue Begründung basierend auf deinen Einstellungen, PERMA-Profil oder wissenschaftlichen Methoden."
    },
    {
      question: "Wie verdient FYF Geld?",
      answer: "Transparent: Premium-Features, Events, Coaching. Keine Datenverkäufe, keine versteckten Kosten. Core-Tools bleiben kostenlos. Alle Einnahmequellen sind hier dokumentiert."
    },
    {
      question: "Werden meine Daten verkauft?",
      answer: "Nein. Niemals. Deine Daten gehören dir. Du kannst sie jederzeit exportieren oder löschen. Wir nutzen sie nur für deine Personalisierung – und das transparent."
    },
    {
      question: "Ist FYF wissenschaftlich fundiert?",
      answer: "Ja. Wir basieren auf 8 etablierten wissenschaftlichen Konzepten (PERMA, Deep Work, SDT, etc.). Alle Quellen sind verlinkt und nachvollziehbar."
    },
    {
      question: "Kann ich FYF komplett ausschalten?",
      answer: "Ja. 'Halt die Fresse'-Button stoppt alle Nudges. Du bestimmst Frequenz, Themen und Limits. Autonomie ist Bedingung, nicht Option."
    },
    {
      question: "Wie funktioniert der Guide?",
      answer: "Guide kommentiert, fragt, spiegelt – niemals erzieht. Er übersetzt Daten in Bedeutung, nicht Bewertung. Wenn er spricht, hat das Grund, Rhythmus und Grenze."
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





