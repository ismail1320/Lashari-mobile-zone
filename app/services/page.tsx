'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Filter,
  MessageCircle,
  Phone,
  ChevronRight,
  Wrench,
  Battery,
  Droplets,
  Monitor,
  Settings,
  Zap,
  Headphones,
  Camera,
  Volume2,
  Power,
  RotateCcw
} from 'lucide-react'

interface Service {
  _id: string
  name: string
  description: string
  price: number
  category: string
  icon: string
  duration: string
  isActive: boolean
}

const categoryIcons = {
  'Screen Repair': Monitor,
  'Battery Replacement': Battery,
  'Water Damage': Droplets,
  'Software Issues': Settings,
  'Hardware Repair': Wrench,
  'Phone Cleaning': Zap,
  'Charging Port Repair': Zap,
  'Camera Repair': Camera,
  'Speaker/Microphone': Headphones,
  'Power Button Repair': Power,
  'Volume Button Repair': Volume2,
  'Headphone Jack Repair': Headphones,
  'Other': RotateCcw
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState('All')

  const categories = [
    'All',
    'Screen Repair',
    'Battery Replacement',
    'Water Damage',
    'Software Issues',
    'Hardware Repair',
    'Phone Cleaning',
    'Charging Port Repair',
    'Camera Repair',
    'Speaker/Microphone',
    'Power Button Repair',
    'Volume Button Repair',
    'Headphone Jack Repair',
    'Other'
  ]

  const priceRanges = [
    'All',
    'Under ₹500',
    '₹500 - ₹1000',
    '₹1000 - ₹2000',
    'Above ₹2000'
  ]

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data.services || [])
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory
    
    const matchesPrice = () => {
      if (priceRange === 'All') return true
      const price = service.price
      switch (priceRange) {
        case 'Under ₹500': return price < 500
        case '₹500 - ₹1000': return price >= 500 && price <= 1000
        case '₹1000 - ₹2000': return price > 1000 && price <= 2000
        case 'Above ₹2000': return price > 2000
        default: return true
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice()
  })

  const getIconComponent = (iconName: string) => {
    return categoryIcons[iconName as keyof typeof categoryIcons] || Wrench
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Services
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Professional mobile repair services for all brands and models. 
              Fast, reliable, and affordable solutions with warranty.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container-max section-padding">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container-max section-padding">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredServices.length} of {services.length} services
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => {
                  const IconComponent = getIconComponent(service.category)
                  return (
                    <div key={service._id} className="card group hover:scale-105">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                          <IconComponent className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.category}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-accent-600">₹{service.price}</p>
                          <p className="text-sm text-gray-500">Duration: {service.duration}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          href={`/contact?service=${encodeURIComponent(service.name)}`}
                          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-lg transition-colors font-medium"
                        >
                          Get Quote
                        </Link>
                        <a
                          href="https://wa.me/03445979016?text=Hello, I need help with mobile repair"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-accent-600 hover:bg-accent-700 text-white p-2 rounded-lg transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-accent-700 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Help Choosing a Service?
            </h2>
            <p className="text-xl text-accent-100 mb-8">
              Our experts are here to help you find the right solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/03445979016?text=Hello, I need help choosing a service"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-white text-white hover:bg-white hover:text-accent-600 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Support</span>
              </a>
              <a
                href="tel:03445979016"
                className="bg-white text-accent-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}