'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiSave } from 'react-icons/fi';

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    storeName: '',
    phone: '',
    email: '',
    whatsappNumber: '',
    whatsappChannel: '',
    googleMapsLink: '',
    address: '',
    businessHours: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();

      if (data.success) {
        setFormData(data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.message || 'Error saving settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your website settings and contact information</p>
        </div>

        {success && (
          <div className="bg-success-100 border border-success-500 text-success-700 px-4 py-3 rounded-lg mb-6">
            Settings saved successfully!
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Business Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Store Name *</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Lashari Mobile Zone"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="03445979016"
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
                  placeholder="ik4937444@gmail.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">WhatsApp Number *</label>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="03445979016"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">WhatsApp Channel Link *</label>
                <input
                  type="url"
                  name="whatsappChannel"
                  value={formData.whatsappChannel}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="https://whatsapp.com/channel/..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Google Maps Link *</label>
                <input
                  type="url"
                  name="googleMapsLink"
                  value={formData.googleMapsLink}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="https://maps.app.goo.gl/..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="input-field resize-none"
                  placeholder="Lashari Mobile Zone, Main Market"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Business Hours *</label>
                <input
                  type="text"
                  name="businessHours"
                  value={formData.businessHours}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="10:00 AM to 10:00 PM (Daily)"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave />
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start space-x-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>Changes to settings will be reflected across the entire website immediately.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>Make sure to provide accurate contact information for customer inquiries.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>WhatsApp number should be in the format: 03XXXXXXXXX (without spaces or special characters)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>Google Maps link should be the shareable link from Google Maps.</span>
            </li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
