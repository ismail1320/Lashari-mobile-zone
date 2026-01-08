import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import { FaAward, FaUsers, FaTools, FaClock } from 'react-icons/fa';

export default function AboutPage() {
  const stats = [
    { icon: <FaUsers className="text-4xl" />, number: '1000+', label: 'Happy Customers' },
    { icon: <FaTools className="text-4xl" />, number: '5000+', label: 'Repairs Completed' },
    { icon: <FaAward className="text-4xl" />, number: '5 Years', label: 'Experience' },
    { icon: <FaClock className="text-4xl" />, number: '30-60 min', label: 'Average Repair Time' },
  ];

  const team = [
    {
      name: 'Expert Technicians',
      role: 'Certified Professionals',
      description: 'Our team consists of certified and experienced technicians who handle your devices with utmost care.',
      icon: '👨‍🔧',
    },
    {
      name: 'Quality Assurance',
      role: 'Quality Control Team',
      description: 'Every repair goes through rigorous quality checks to ensure perfect functionality.',
      icon: '✅',
    },
    {
      name: 'Customer Support',
      role: 'Support Team',
      description: '24/7 customer support to assist you with any queries or concerns about your device.',
      icon: '💬',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
              <p className="text-lg text-white/90">
                Your trusted partner for professional mobile repair services
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="text-6xl mb-4">📱</div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Welcome to Lashari Mobile Zone
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Lashari Mobile Zone, we are dedicated to providing top-quality mobile repair services
                  to our valued customers. With years of experience in the industry, we have built a reputation
                  for excellence, reliability, and customer satisfaction.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="mr-3">🎯</span>
                    Our Mission
                  </h3>
                  <p className="text-gray-600">
                    To provide fast, reliable, and affordable mobile repair services while maintaining
                    the highest standards of quality and customer satisfaction. We aim to be the most
                    trusted mobile repair shop in the community.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-secondary-50 to-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="mr-3">👁️</span>
                    Our Vision
                  </h3>
                  <p className="text-gray-600">
                    To become the leading mobile repair service provider by continuously improving our
                    services, adopting the latest technologies, and exceeding customer expectations in
                    every interaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Our Achievements
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
                >
                  <div className="text-primary-600 mb-3 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Meet the dedicated professionals behind Lashari Mobile Zone
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all text-center"
                >
                  <div className="text-6xl mb-4">{member.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Lashari Mobile Zone?
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl mb-3">⚡</div>
                  <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
                  <p className="text-white/90">Most repairs completed within 30-60 minutes</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl mb-3">✅</div>
                  <h3 className="text-xl font-semibold mb-2">Quality Parts</h3>
                  <p className="text-white/90">Original and high-quality compatible parts</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl mb-3">🛡️</div>
                  <h3 className="text-xl font-semibold mb-2">Warranty</h3>
                  <p className="text-white/90">All repairs come with warranty coverage</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl mb-3">💰</div>
                  <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                  <p className="text-white/90">Competitive and transparent pricing</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
