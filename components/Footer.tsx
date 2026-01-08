import Link from 'next/link'
import { 
  Phone, 
  Mail, 
  MessageCircle,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-2 rounded-lg">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Lashari Mobile Zone</h3>
                <p className="text-gray-400 text-sm">Expert Mobile Repair</p>
              </div>
            </div>
            <p className="text-gray-400">
              Professional mobile phone repair services with fast, reliable, and affordable solutions. 
              Your trusted partner for all mobile repair needs.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Screen Repair</li>
              <li>Battery Replacement</li>
              <li>Water Damage Repair</li>
              <li>Software Issues</li>
              <li>Hardware Repair</li>
              <li>Charging Port Repair</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <a
                href="tel:03445979016"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>03445979016</span>
              </a>
              <a
                href="mailto:ik4937444@gmail.com"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>ik4937444@gmail.com</span>
              </a>
              <a
                href="https://wa.me/03445979016?text=Hello, I need help with mobile repair"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Business Address<br />City, State, Country</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>10:00 AM - 10:00 PM (Daily)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Lashari Mobile Zone. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Chat Button */}
      <a
        href="https://wa.me/03445979016?text=Hello, I need help with mobile repair"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-accent-500 hover:bg-accent-600 text-white p-4 rounded-full shadow-lg z-50 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </footer>
  )
}