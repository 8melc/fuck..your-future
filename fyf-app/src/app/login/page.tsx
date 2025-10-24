import Link from 'next/link'

export function LoginView() {
  return (
    <main className="min-h-screen bg-fyf-noir flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <Link href="/landing" className="font-righteous text-4xl font-bold text-fyf-mint">
            FYF
          </Link>
          <p className="font-roboto-mono text-fyf-steel mt-2">Deine Zeit entdecken</p>
        </div>

        <div className="bg-fyf-charcoal p-8 rounded-xl border border-fyf-smoke">
          <h1 className="font-righteous text-2xl font-bold mb-6 text-fyf-cream">
            STEP 2: Login via Geburtsdatum
          </h1>

          <p className="font-roboto-mono text-fyf-steel text-sm mb-6">
            Kein klassischer Account nötig. Gib einfach dein Geburtsdatum ein.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block font-roboto-mono text-fyf-steel mb-2 text-sm uppercase tracking-tight">
                Geburtsdatum
              </label>
              <input
                type="date"
                className="w-full bg-fyf-carbon border border-fyf-smoke text-fyf-cream px-4 py-3 rounded-lg focus:border-fyf-mint focus:outline-none font-roboto-mono"
                required
              />
            </div>

            <div>
              <label className="block font-roboto-mono text-fyf-steel mb-2 text-sm uppercase tracking-tight">
                Wunsch-Zielalter (optional)
              </label>
              <input
                type="number"
                min="18"
                max="120"
                className="w-full bg-fyf-carbon border border-fyf-smoke text-fyf-cream px-4 py-3 rounded-lg focus:border-fyf-mint focus:outline-none font-roboto-mono"
                placeholder="z.B. 80"
              />
              <p className="font-roboto-mono text-fyf-steel text-xs mt-1 opacity-70">
                Standard: 80 Jahre
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-fyf-mint hover:bg-fyf-mint/90 text-fyf-noir font-righteous font-bold py-3 rounded-lg transition-colors"
            >
              Zeit visualisieren
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-roboto-mono text-fyf-steel text-xs">
              <Link href="/landing" className="text-fyf-mint hover:text-fyf-mint/80 transition">
                ← Zurück zur Landing Page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function Login() {
  return <LoginView />
}
