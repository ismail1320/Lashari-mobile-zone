'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSettings(data.data);
        }
      })
      .catch((err) => console.error('Error fetching settings:', err));
  }, []);

  const phone = settings?.phone || '03445979016';
  const email = settings?.email || 'ik4937444@gmail.com';
  const whatsappNumber = settings?.whatsappNumber || '03445979016';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl">📱</div>
            <div>
              <h1 className="text-2xl font-bold text-primary-600">
                Lashari Mobile Zone
              </h1>
              <p className="text-xs text-gray-600">Professional Repair Services</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={`tel:${phone}`}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all"
            >
              <FiPhone />
              <span>Call Now</span>
            </a>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-success-500 text-white px-4 py-2 rounded-lg hover:bg-success-600 transition-all"
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            className="lg:hidden text-2xl text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all"
                >
                  <FiPhone />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-success-500 text-white px-4 py-2 rounded-lg hover:bg-success-600 transition-all"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
