import Link from 'next/link'

export default function Fallback() {
  return (
    <main className="min-h-screen bg-fyf-noir flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6">
        <div className="mb-8">
          <h1 className="font-display text-6xl font-bold mb-4 text-fyf-coral">
            404
          </h1>
          <h2 className="font-display text-3xl font-bold mb-4 text-fyf-cream">
            Page Not Found
          </h2>
          <p className="text-fyf-steel text-lg mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, even the best life plans need adjustments!
          </p>
        </div>

        <div className="bg-fyf-charcoal p-8 rounded-xl border border-fyf-smoke mb-8">
          <h3 className="font-display text-xl font-bold mb-4 text-fyf-mint">
            What would you like to do?
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/"
              className="bg-fyf-coral hover:bg-fyf-coral-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Go Home
            </Link>
            
            <Link 
              href="/life-weeks"
              className="bg-fyf-mint hover:bg-fyf-mint-dark text-fyf-noir font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Life Visualization
            </Link>
            
            <Link 
              href="/guide"
              className="bg-fyf-mauve hover:bg-fyf-mauve-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Content Guide
            </Link>
            
            <Link 
              href="/profile"
              className="border-2 border-fyf-steel text-fyf-steel hover:bg-fyf-steel hover:text-fyf-noir font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Your Profile
            </Link>
          </div>
        </div>

        <div className="text-fyf-steel">
          <p className="mb-2">
            Need help? <Link href="/transparenz" className="text-fyf-mint hover:text-fyf-mint-dark">Contact Support</Link>
          </p>
          <p className="text-sm">
            Error Code: 404 | FYF - Fuck Your Future
          </p>
        </div>
      </div>
    </main>
  )
}

