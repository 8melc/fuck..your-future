import Link from 'next/link'

export default function Login() {
  return (
    <main className="min-h-screen bg-fyf-noir flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-4xl font-bold text-fyf-coral">
            FYF
          </Link>
          <p className="text-fyf-steel mt-2">Welcome back</p>
        </div>

        <div className="bg-fyf-charcoal p-8 rounded-xl border border-fyf-smoke">
          <h1 className="font-display text-2xl font-bold mb-6 text-fyf-cream">
            Sign In
          </h1>
          
          <form className="space-y-4">
            <div>
              <label className="block text-fyf-steel mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-fyf-carbon border border-fyf-smoke text-fyf-cream px-4 py-3 rounded-lg focus:border-fyf-coral focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-fyf-steel mb-2">Password</label>
              <input
                type="password"
                className="w-full bg-fyf-carbon border border-fyf-smoke text-fyf-cream px-4 py-3 rounded-lg focus:border-fyf-coral focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-fyf-coral hover:bg-fyf-coral-dark text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-fyf-steel">
              Don't have an account?{' '}
              <Link href="/profile" className="text-fyf-mint hover:text-fyf-mint-dark">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
