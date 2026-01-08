'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSettings(data.data);
        }
      })
      .catch((err) => console.error('Error fetching settings:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          message: '',
        });
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  const phone = settings?.phone || '03445979016';
  const email = settings?.email || 'ik4937444@gmail.com';
  const whatsappNumber = settings?.whatsappNumber || '03445979016';
  const address = settings?.address || 'Lashari Mobile Zone, Main Market';
  const businessHours = settings?.businessHours || '10:00 AM to 10:00 PM (Daily)';
  const googleMapsLink = settings?.googleMapsLink || 'https://maps.app.goo.gl/oEkYqEHkykhbRshn7';
  const whatsappChannel = settings?.whatsappChannel || 'https://whatsapp.com/channel/0029Vb7abWp1NCrVZvN8M00g';

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-gray-50">
        <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-lg text-white/90">
                Get in touch with us for fast and reliable mobile repair services
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                
                {success && (
                  <div className="bg-success-100 border border-success-500 text-success-700 px-4 py-3 rounded-lg mb-4">
                    Your inquiry has been submitted successfully! We'll contact you soon.
                  </div>
                )}

                {error && (
                  <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="03XX XXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Service Type</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select a service</option>
                      <option value="Screen Repair">Screen Repair</option>
                      <option value="Battery Replacement">Battery Replacement</option>
                      <option value="Water Damage">Water Damage</option>
                      <option value="Software Issues">Software Issues</option>
                      <option value="Hardware Repair">Hardware Repair</option>
                      <option value="Phone Cleaning">Phone Cleaning</option>
                      <option value="Charging Port Repair">Charging Port Repair</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Tell us about your device issue..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>

                <div className="mt-6 space-y-3">
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full bg-success-500 hover:bg-success-600 text-white font-semibold py-3 rounded-lg transition-all"
                  >
                    <FaWhatsapp className="text-xl" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center space-x-2 w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-all"
                  >
                    <FaPhoneAlt />
                    <span>Call Us Now</span>
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <FaPhoneAlt className="text-primary-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                        <a href={`tel:${phone}`} className="text-gray-600 hover:text-primary-600">
                          {phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-success-100 p-3 rounded-lg">
                        <FaWhatsapp className="text-success-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                        <a
                          href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-success-600"
                        >
                          {whatsappNumber}
                        </a>
                        <br />
                        <a
                          href={whatsappChannel}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-success-600 hover:underline"
                        >
                          Join Our Channel
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-secondary-100 p-3 rounded-lg">
                        <FaEnvelope className="text-secondary-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <a href={`mailto:${email}`} className="text-gray-600 hover:text-secondary-600 break-all">
                          {email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <FaMapMarkerAlt className="text-primary-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                        <p className="text-gray-600">{address}</p>
                        <a
                          href={googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:underline mt-1 inline-block"
                        >
                          Get Directions →
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-success-100 p-3 rounded-lg">
                        <FaClock className="text-success-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                        <p className="text-gray-600">{businessHours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Find Us on Map</h3>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.0000000000000!2d0.0000000000000000!3d0.0000000000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAwJzAwLjAiTiAwMMKwMDAnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890000!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <a
                    href={googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    <FaMapMarkerAlt className="mr-2" />
                    Open in Google Maps
                  </a>
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
