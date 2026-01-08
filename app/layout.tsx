import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lashari Mobile Zone - Professional Mobile Repair Services',
  description: 'Expert mobile phone repair services including screen repair, battery replacement, water damage repair, and more. Fast, reliable, and affordable service.',
  keywords: 'mobile repair, phone repair, screen repair, battery replacement, Lashari Mobile Zone',
  authors: [{ name: 'Lashari Mobile Zone' }],
  openGraph: {
    title: 'Lashari Mobile Zone - Professional Mobile Repair Services',
    description: 'Expert mobile phone repair services. Fast, reliable, and affordable.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
