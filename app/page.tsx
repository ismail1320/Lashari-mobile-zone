import Link from 'next/link'
import { 
  MessageCircle, 
  Phone, 
  Mail,
  Star,
  Wrench,
  Battery,
  Droplets,
  Monitor,
  Settings,
  Zap,
  MapPin,
  Clock,
  Shield,
  Award,
  Users
} from 'lucide-react'

export default function HomePage() {
  const services = [
    {
      icon: Monitor,
      name: 'Screen Repair',
      description: 'Professional screen replacement for all phone models',
      price: 'From ₹1,500'
    },
    {
      icon: Battery,
      name: 'Battery Replacement',
      description: 'High-quality battery replacement with warranty',
      price: 'From ₹800'
    },
    {
      icon: Droplets,
      name: 'Water Damage',
      description: 'Expert water damage repair and recovery',
      price: 'From ₹2,000'
    },
    {
      icon: Settings,
      name: 'Software Issues',
      description: 'OS installation, malware removal, and software fixes',
      price: 'From ₹500'
    },
    {
      icon: Wrench,
      name: 'Hardware Repair',
      description: 'Complete hardware diagnosis and repair',
      price: 'From ₹1,000'
    },
    {
      icon: Zap,
      name: 'Charging Port',
      description: 'Charging port cleaning and replacement',
      price: 'From ₹600'
    }
  ]

  const testimonials = [
    {
      name: 'Ahmad Khan',
      rating: 5,
      review: 'Excellent service! My phone screen was replaced perfectly within 2 hours. Very professional staff.',
      service: 'Screen Repair'
    },
    {
      name: 'Fatima Ali',
      rating: 5,
      review: 'Best mobile repair shop in the area. They saved my water-damaged phone. Highly recommended!',
      service: 'Water Damage Repair'
    },
    {
      name: 'Hassan Raza',
      rating: 5,
      review: 'Quick and affordable battery replacement. Great customer service and honest pricing.',
      service: 'Battery Replacement'
    },
    {
      name: 'Ayesha Sheikh',
      rating: 5,
      review: 'Professional service with warranty. My phone works like new after software issues fix.',
      service: 'Software Issues'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                Expert Mobile Repair Services
              </h1>
              <p className="text-xl text-primary-100">
                Fast, reliable, and affordable mobile phone repair. We fix all brands and models with genuine parts and warranty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/03445979016?text=Hello, I need help with mobile repair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent flex items-center justify-center space-x-2 text-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href="tel:03445979016"
                  className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 flex items-center justify-center space-x-2 text-lg"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold mb-2">Need Help Right Now?</h3>
                <p className="text-primary-100 mb-6">
                  Get instant support and quick repairs
                </p>
                <div className="space-y-3">
                  <a
                    href="https://maps.app.goo.gl/oEkYqEHkykhbRshn7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    📍 Get Directions
                  </a>
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Open Daily 10:00 AM - 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional mobile repair services with genuine parts and warranty
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card group hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <service.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-accent-600 font-medium">{service.price}</p>
                  </div>
                </div>
                <p className="text-gray-600">{service.description}</p>
                <Link 
                  href="/contact" 
                  className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Get Quote →
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary text-lg">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Warranty Guaranteed</h3>
              <p className="text-gray-600">All repairs come with warranty for peace of mind</p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
              <p className="text-gray-600">Most repairs completed within 2-4 hours</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Technicians</h3>
              <p className="text-gray-600">Experienced professionals with 5+ years in mobile repair</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real reviews from satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.review}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-accent-700 text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Fix Your Phone?
          </h2>
          <p className="text-xl mb-8 text-accent-100">
            Contact us now for a quick quote and same-day service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/03445979016?text=Hello, I need help with mobile repair"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline border-white text-white hover:bg-white hover:text-accent-600 flex items-center justify-center space-x-2 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href="tel:03445979016"
              className="bg-white text-accent-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 text-lg"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}