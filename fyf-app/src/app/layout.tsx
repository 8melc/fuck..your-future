import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Righteous, Roboto_Mono } from 'next/font/google'
import './globals.css'
import PauseOverlay from '../components/PauseOverlay'
import CookieConsentBanner from '../components/CookieConsentBanner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const righteous = Righteous({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-righteous',
})

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: 'FYF - Fuck Your Future',
  description: 'Transform your life with FYF - Life visualization, goal setting, and personal development tools.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${righteous.variable} ${robotoMono.variable}`}>
      <body className="font-body bg-fyf-noir text-fyf-cream antialiased">
        {children}
        <PauseOverlay />
        <CookieConsentBanner />
      </body>
    </html>
  )
}
