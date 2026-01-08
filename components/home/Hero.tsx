'use client';

import Link from 'next/link';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 animate-fade-in">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
              🏆 Trusted by 1000+ Customers
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in leading-tight">
            Professional Mobile Repair Services
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in max-w-2xl mx-auto">
            Expert repair solutions for all smartphone brands. Fast service, quality parts, and affordable prices. Get your phone fixed today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
            <a
              href="https://wa.me/03445979016"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-success-500 hover:bg-success-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaWhatsapp className="text-2xl" />
              <span>WhatsApp Us</span>
            </a>
            
            <a
              href="tel:03445979016"
              className="flex items-center space-x-2 bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaPhoneAlt className="text-xl" />
              <span>Call Now</span>
            </a>
            
            <Link
              href="/services"
              className="flex items-center space-x-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>View Services</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="text-xl font-semibold mb-1">Fast Service</h3>
              <p className="text-white/80">Same day repairs available</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="text-xl font-semibold mb-1">Quality Parts</h3>
              <p className="text-white/80">Original & compatible parts</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="text-xl font-semibold mb-1">Best Prices</h3>
              <p className="text-white/80">Affordable & transparent pricing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
