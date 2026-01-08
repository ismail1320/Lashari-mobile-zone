'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Phone, 
  Mail, 
  MessageCircle,
  Menu,
  X
} from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container-max section-padding">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <a
                href="tel:03445979016"
                className="flex items-center space-x-1 hover:text-primary-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>03445979016</span>
              </a>
              <a
                href="mailto:ik4937444@gmail.com"
                className="flex items-center space-x-1 hover:text-primary-200 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>ik4937444@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline">Business Hours: </span>
              <span className="font-semibold">10:00 AM - 10:00 PM (Daily)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-max section-padding">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-2 rounded-lg">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Lashari Mobile Zone</h1>
              <p className="text-sm text-gray-600">Expert Mobile Repair</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://wa.me/03445979016?text=Hello, I need help with mobile repair"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:03445979016"
              className="btn-primary flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <a
                  href="https://wa.me/03445979016?text=Hello, I need help with mobile repair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:03445979016"
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}