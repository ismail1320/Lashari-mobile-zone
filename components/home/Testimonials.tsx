'use client';

import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface Testimonial {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  service?: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials?featured=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTestimonials(data.data.slice(0, 6));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching testimonials:', err);
        setLoading(false);
      });
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < rating ? 'text-secondary-500' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial._id}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                {renderStars(testimonial.rating)}
                <span className="text-4xl">💬</span>
              </div>
              
              <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                {testimonial.service && (
                  <p className="text-sm text-gray-500">{testimonial.service}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
