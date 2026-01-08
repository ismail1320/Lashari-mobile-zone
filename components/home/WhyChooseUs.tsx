'use client';

import { FaCheckCircle, FaTools, FaClock, FaShieldAlt, FaThumbsUp, FaDollarSign } from 'react-icons/fa';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaTools className="text-4xl text-primary-600" />,
      title: 'Expert Technicians',
      description: 'Certified and experienced professionals handling your devices with care and expertise.',
    },
    {
      icon: <FaClock className="text-4xl text-secondary-600" />,
      title: 'Fast Service',
      description: 'Most repairs completed within 30-60 minutes. Same day service available for urgent repairs.',
    },
    {
      icon: <FaShieldAlt className="text-4xl text-success-600" />,
      title: 'Warranty Included',
      description: 'All repairs come with warranty. Your satisfaction and device safety is our priority.',
    },
    {
      icon: <FaCheckCircle className="text-4xl text-primary-600" />,
      title: 'Quality Parts',
      description: 'We use only high-quality original and compatible parts for all repairs.',
    },
    {
      icon: <FaDollarSign className="text-4xl text-secondary-600" />,
      title: 'Affordable Prices',
      description: 'Transparent and competitive pricing with no hidden charges. Best value for money.',
    },
    {
      icon: <FaThumbsUp className="text-4xl text-success-600" />,
      title: 'Customer Satisfaction',
      description: '1000+ happy customers and 5-star ratings. We go the extra mile for you.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Lashari Mobile Zone?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to providing the best mobile repair experience with quality service and customer satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
