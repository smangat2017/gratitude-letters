import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Gratitude Letters',
  description: 'Transform your love into beautiful poetry. Share your heart with those who matter most.',
  openGraph: {
    title: 'Gratitude Letters',
    description: 'Transform your love into beautiful poetry. Share your heart with those who matter most.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1597605953084-526402cea0ab?q=80&w=967&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        width: 967,
        height: 644,
        alt: 'Beautiful gratitude poem with warm colors and flowers',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gratitude Letters',
    description: 'Transform your love into beautiful poetry. Share your heart with those who matter most.',
    images: ['https://images.unsplash.com/photo-1597605953084-526402cea0ab?q=80&w=967&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  )
}
