import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
})

export const metadata: Metadata = {
  title: 'Gratitude Letters',
  description: 'Transform your love into beautiful poetry. Share your heart with those who matter most.',
  openGraph: {
    title: 'Gratitude Letters',
    description: 'Transform your love into beautiful poetry. Share your heart with those who matter most.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1530686350401-7de25243dd89?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        width: 2342,
        height: 1561,
        alt: 'Beautiful gratitude poem with warm colors and flowers',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gratitude Letters',
    description: 'Transform your love into beautiful poetry. Share your heart with those who matter most.',
    images: ['https://images.unsplash.com/photo-1530686350401-7de25243dd89?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
