import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lashari Mobile Zone - Expert Mobile Repair Services',
  description: 'Professional mobile phone repair services in your area. Screen repair, battery replacement, water damage repair, and more. Fast, reliable, and affordable.',
  keywords: 'mobile repair, phone repair, screen repair, battery replacement, water damage, software issues, hardware repair',
  authors: [{ name: 'Lashari Mobile Zone' }],
  openGraph: {
    title: 'Lashari Mobile Zone - Expert Mobile Repair Services',
    description: 'Professional mobile phone repair services in your area. Fast, reliable, and affordable.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}