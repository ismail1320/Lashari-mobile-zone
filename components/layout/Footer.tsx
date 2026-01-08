'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from 'react-icons/md';

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);

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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-4xl">📱</div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Lashari Mobile Zone
                </h3>
                <p className="text-sm text-gray-400">Professional Repair Services</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted mobile repair shop. Fast, reliable, and affordable service
              for all smartphone brands.
            </p>
            <div className="flex space-x-4">
              <a
                href={`https://wa.me/${settings?.whatsappNumber?.replace(/\D/g, '') || '03445979016'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-success-500 transition-colors"
              >
                <FaWhatsapp />
              </a>
              <a
                href="#"
                className="text-2xl text-gray-400 hover:text-primary-500 transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-2xl text-gray-400 hover:text-pink-500 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-2xl text-gray-400 hover:text-primary-400 transition-colors"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Screen Repair</li>
              <li className="text-gray-400">Battery Replacement</li>
              <li className="text-gray-400">Water Damage Repair</li>
              <li className="text-gray-400">Software Issues</li>
              <li className="text-gray-400">Hardware Repair</li>
              <li className="text-gray-400">Phone Cleaning</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MdPhone className="text-primary-500 mt-1 flex-shrink-0" />
                <a
                  href={`tel:${settings?.phone || '03445979016'}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {settings?.phone || '03445979016'}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MdEmail className="text-primary-500 mt-1 flex-shrink-0" />
                <a
                  href={`mailto:${settings?.email || 'ik4937444@gmail.com'}`}
                  className="text-gray-400 hover:text-white transition-colors break-all"
                >
                  {settings?.email || 'ik4937444@gmail.com'}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MdLocationOn className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  {settings?.address || 'Lashari Mobile Zone, Main Market'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <MdAccessTime className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  {settings?.businessHours || '10:00 AM to 10:00 PM (Daily)'}
                </span>
              </li>
            </ul>

            <div className="mt-4">
              <a
                href={settings?.whatsappChannel || 'https://whatsapp.com/channel/0029Vb7abWp1NCrVZvN8M00g'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-success-500 text-white px-4 py-2 rounded-lg hover:bg-success-600 transition-all"
              >
                <FaWhatsapp />
                <span className="text-sm">Join Our Channel</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Lashari Mobile Zone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
