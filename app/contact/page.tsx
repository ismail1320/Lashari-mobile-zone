'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Phone, 
  Mail, 
  MessageCircle,
  MapPin,
  Clock,
  Send,
  User,
  FileText,
  CheckCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface FormData {
  name: string
  email: string
  phone: string
  serviceType: string
  message: string
}

export default function ContactPage() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const services = [
    'Screen Repair',
    'Battery Replacement',
    'Water Damage Repair',
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

  useEffect(() => {
    const service = searchParams.get('service')
    if (service) {
      setFormData(prev => ({
        ...prev,
        serviceType: service
      }))
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          message: ''
        })
        toast.success('Message sent successfully! We will contact you soon.')
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-max section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Thank You!
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Your message has been sent successfully. We will contact you soon to discuss your mobile repair needs.
              </p>
              <div className="space-y-3">
                <p className="text-gray-600">
                  For immediate assistance, you can also:
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/03445979016?text=Hello, I need help with mobile repair"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Chat</span>
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
          </div>
        </div>
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
              Contact Us
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Get in touch with us for fast, professional mobile repair services. 
              We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-gray-50">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="tel:03445979016"
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow group"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Phone className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-primary-600 font-medium">03445979016</p>
              <p className="text-sm text-gray-600 mt-2">Click to call directly</p>
            </a>

            <a
              href="https://wa.me/03445979016?text=Hello, I need help with mobile repair"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow group"
            >
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-200 transition-colors">
                <MessageCircle className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp Chat</h3>
              <p className="text-accent-600 font-medium">Instant Support</p>
              <p className="text-sm text-gray-600 mt-2">Chat with us on WhatsApp</p>
            </a>

            <a
              href="mailto:ik4937444@gmail.com"
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow group"
            >
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors">
                <Mail className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-secondary-600 font-medium">ik4937444@gmail.com</p>
              <p className="text-sm text-gray-600 mt-2">Send us an email</p>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Send us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Needed *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="input-field resize-none"
                    placeholder="Describe your mobile issue or repair needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-3 text-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner w-5 h-5"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information & Map */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Visit Our Store
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">Business Address<br />City, State, Country</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Business Hours</p>
                      <p className="text-gray-600">Daily: 10:00 AM - 10:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-primary-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <a href="tel:03445979016" className="text-primary-600 hover:text-primary-700">
                        03445979016
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a href="mailto:ik4937444@gmail.com" className="text-primary-600 hover:text-primary-700">
                        ik4937444@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/03445979016?text=Hello, I need help with mobile repair"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full btn-accent text-center"
                    >
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Chat on WhatsApp
                    </a>
                    <a
                      href="tel:03445979016"
                      className="block w-full btn-primary text-center"
                    >
                      <Phone className="w-4 h-4 inline mr-2" />
                      Call Now
                    </a>
                    <a
                      href="https://maps.app.goo.gl/oEkYqEHkykhbRshn7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full btn-outline text-center"
                    >
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Get Directions
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">WhatsApp Channel</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Subscribe to our WhatsApp channel for updates and offers
                  </p>
                  <a
                    href="https://whatsapp.com/channel/0029Vb7abWp1NCrVZvN8M00g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 px-4 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Subscribe to Channel
                  </a>
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Find Us
                </h3>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src="https://maps.app.goo.gl/oEkYqEHkykhbRshn7"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    title="Lashari Mobile Zone Location"
                  />
                </div>
                <div className="mt-4 text-center">
                  <a
                    href="https://maps.app.goo.gl/oEkYqEHkykhbRshn7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}