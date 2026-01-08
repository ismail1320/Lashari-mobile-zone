'use client';

import Link from 'next/link';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6 animate-fade-in">📱</div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
            Need Your Phone Repaired?
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in max-w-2xl mx-auto">
            Get in touch with us today for fast, reliable, and affordable mobile repair services. We're here to help!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <a
              href="https://wa.me/03445979016"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-success-500 hover:bg-success-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaWhatsapp className="text-2xl" />
              <span>Chat on WhatsApp</span>
            </a>
            
            <a
              href="tel:03445979016"
              className="flex items-center space-x-2 bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaPhoneAlt className="text-xl" />
              <span>Call Us Now</span>
            </a>
            
            <Link
              href="/contact"
              className="flex items-center space-x-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Contact Us</span>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-2">📞</div>
              <p className="text-white/90 font-semibold">03445979016</p>
              <p className="text-white/70 text-sm">Call us anytime</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-2">⏰</div>
              <p className="text-white/90 font-semibold">10 AM - 10 PM</p>
              <p className="text-white/70 text-sm">Open daily</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-2">📍</div>
              <p className="text-white/90 font-semibold">Visit Our Store</p>
              <p className="text-white/70 text-sm">Main Market</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
