'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import { FiSearch } from 'react-icons/fi';

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'all',
    'Screen Repair',
    'Battery Replacement',
    'Water Damage',
    'Software Issues',
    'Hardware Repair',
    'Phone Cleaning',
    'Charging Port Repair',
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [selectedCategory, searchQuery, services]);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
        setFilteredServices(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = services;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((service) => service.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-gray-50">
        <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
              <p className="text-lg text-white/90">
                Professional mobile repair services for all brands and models
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="relative max-w-md mx-auto mb-6">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                    }`}
                  >
                    {category === 'all' ? 'All Services' : category}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                <p className="mt-4 text-gray-600">Loading services...</p>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No services found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service, index) => (
                  <div
                    key={service._id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-2xl font-bold text-primary-600">
                        Rs. {service.price}
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {service.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-12 bg-primary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Can't Find What You Need?
              </h2>
              <p className="text-gray-600 mb-6">
                Contact us for any specific repair services not listed above. We handle all types of mobile repairs!
              </p>
              <a
                href="https://wa.me/03445979016"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-success-500 hover:bg-success-600 text-white font-semibold px-8 py-3 rounded-lg transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
