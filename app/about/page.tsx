import { 
  Users, 
  Award, 
  Clock, 
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Shield,
  Wrench,
  Heart
} from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { number: '5+', label: 'Years Experience', icon: Clock },
    { number: '1000+', label: 'Happy Customers', icon: Users },
    { number: '5000+', label: 'Repairs Completed', icon: Wrench },
    { number: '99%', label: 'Customer Satisfaction', icon: Star }
  ]

  const team = [
    {
      name: 'Ahmed Lashari',
      role: 'Founder & Lead Technician',
      experience: '5+ years',
      specialization: 'Hardware & Software Expert',
      description: 'Founder with extensive experience in mobile repair and customer service.'
    },
    {
      name: 'Technical Team',
      role: 'Repair Specialists',
      experience: '3+ years each',
      specialization: 'All Mobile Brands',
      description: 'Skilled technicians trained in latest repair techniques and technologies.'
    }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'We use only genuine parts and provide warranty on all repairs.'
    },
    {
      icon: Clock,
      title: 'Fast Service',
      description: 'Most repairs completed within 2-4 hours while you wait.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go the extra mile for every customer.'
    },
    {
      icon: Award,
      title: 'Expertise',
      description: '5+ years of experience with continuous training on latest technologies.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                About Lashari Mobile Zone
              </h1>
              <p className="text-xl text-primary-100">
                Your trusted partner for professional mobile repair services. We are committed to providing fast, reliable, and affordable solutions for all your mobile device needs.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Located in Your City</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Open Daily 10AM - 10PM</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold mb-2">5+ Years of Excellence</h3>
                <p className="text-primary-100">
                  Serving the community with professional mobile repair services
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded with a vision to provide professional mobile repair services, Lashari Mobile Zone 
                  has been serving the community for over 5 years. What started as a small repair shop 
                  has grown into a trusted name in mobile device repair.
                </p>
                <p>
                  We understand how important your mobile device is in today's world. That's why we're 
                  committed to providing fast, reliable, and affordable repair services. Our experienced 
                  technicians use only genuine parts and provide warranty on all repairs.
                </p>
                <p>
                  Whether it's a cracked screen, water damage, battery replacement, or software issues, 
                  we have the expertise to fix your device right the first time. Customer satisfaction 
                  is our top priority, and we strive to exceed expectations with every repair.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-3xl mb-2">🔧</div>
                  <h4 className="font-semibold text-gray-900">Expert Technicians</h4>
                  <p className="text-sm text-gray-600">Skilled professionals</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="font-semibold text-gray-900">Quick Service</h4>
                  <p className="text-sm text-gray-600">2-4 hours repair</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-3xl mb-2">🛡️</div>
                  <h4 className="font-semibold text-gray-900">Warranty</h4>
                  <p className="text-sm text-gray-600">Guaranteed repairs</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-3xl mb-2">💎</div>
                  <h4 className="font-semibold text-gray-900">Quality Parts</h4>
                  <p className="text-sm text-gray-600">Genuine components</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The experts behind our exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 mb-4">{member.experience} • {member.specialization}</p>
                <p className="text-gray-700">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Lashari Mobile Zone?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Warranty Guaranteed</h3>
              <p className="text-gray-600">
                All our repairs come with warranty. We stand behind our work and ensure your device functions perfectly after repair.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">
                Most repairs are completed within 2-4 hours. We understand the importance of your device and work efficiently.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Service</h3>
              <p className="text-gray-600">
                Our technicians are trained and experienced in handling all brands and models of mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Visit us today or contact us for your mobile repair needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/03445979016?text=Hello, I would like to know more about your services"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent flex items-center justify-center space-x-2 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href="tel:03445979016"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 text-lg"
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