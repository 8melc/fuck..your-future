import Link from 'next/link'

export default function Access() {
  return (
    <main className="min-h-screen bg-fyf-noir flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6">
        <h1 className="font-display text-4xl font-bold mb-4 text-fyf-coral">
          Access Denied
        </h1>
        <p className="text-fyf-steel text-lg mb-8">
          You don't have access to this page. Please contact support if you believe this is an error.
        </p>
        <Link 
          href="/"
          className="bg-fyf-coral hover:bg-fyf-coral-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Go Home
        </Link>
      </div>
    </main>
  )
}