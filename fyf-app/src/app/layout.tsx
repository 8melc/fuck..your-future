import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import PauseOverlay from '../components/PauseOverlay'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body bg-fyf-noir text-fyf-cream antialiased">
        {children}
        <PauseOverlay />
      </body>
    </html>
  )
}