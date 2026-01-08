'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Settings,
  Save,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Eye,
  EyeOff,
  Lock,
  User
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminSettingsPage() {
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Lashari Mobile Zone',
    address: 'Your Business Address Here',
    phone: '03445979016',
    email: 'ik4937444@gmail.com',
    whatsappNumber: '03445979016',
    whatsappChannel: 'https://whatsapp.com/channel/0029Vb7abWp1NCrVZvN8M00g',
    businessHours: '10:00 AM - 10:00 PM (Daily)',
    googleMapsUrl: 'https://maps.app.goo.gl/oEkYqEHkykhbRshn7'
  })

  const [adminCredentials, setAdminCredentials] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: 'admin@lasharimobilezone.com'
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const [activeTab, setActiveTab] = useState('business')

  useEffect(() => {
    // Load business info from environment variables or API
    loadBusinessInfo()
  }, [])

  const loadBusinessInfo = () => {
    setBusinessInfo({
      name: process.env.NEXT_PUBLIC_SITE_NAME || 'Lashari Mobile Zone',
      address: process.env.NEXT_PUBLIC_ADDRESS || 'Your Business Address Here',
      phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '03445979016',
      email: process.env.NEXT_PUBLIC_EMAIL || 'ik4937444@gmail.com',
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '03445979016',
      whatsappChannel: process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL || 'https://whatsapp.com/channel/0029Vb7abWp1NCrVZvN8M00g',
      businessHours: process.env.NEXT_PUBLIC_BUSINESS_HOURS || '10:00 AM - 10:00 PM (Daily)',
      googleMapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || 'https://maps.app.goo.gl/oEkYqEHkykhbRshn7'
    })
  }

  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusinessInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAdminCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdminCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const saveBusinessInfo = async () => {
    try {
      // In a real app, this would save to database
      toast.success('Business information saved successfully!')
      // Note: In production, you would save this to a database and update environment variables
    } catch (error) {
      toast.error('Failed to save business information')
    }
  }

  const updatePassword = async () => {
    if (!adminCredentials.currentPassword || !adminCredentials.newPassword || !adminCredentials.confirmPassword) {
      toast.error('Please fill in all password fields')
      return
    }

    if (adminCredentials.newPassword !== adminCredentials.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    if (adminCredentials.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long')
      return
    }

    try {
      // In a real app, this would update the admin password
      toast.success('Password updated successfully!')
      setAdminCredentials({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        email: adminCredentials.email
      })
    } catch (error) {
      toast.error('Failed to update password')
    }
  }

  const tabs = [
    { id: 'business', label: 'Business Information', icon: Settings },
    { id: 'admin', label: 'Admin Credentials', icon: Lock }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-2 rounded-lg">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-sm text-gray-600">Settings</p>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                View Website
              </Link>
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Settings</h2>
          <p className="text-gray-600">Manage your business information and admin preferences</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 bg-primary-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'business' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={businessInfo.name}
                        onChange={handleBusinessInfoChange}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={businessInfo.phone}
                          onChange={handleBusinessInfoChange}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={businessInfo.email}
                          onChange={handleBusinessInfoChange}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MessageCircle className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="whatsappNumber"
                          name="whatsappNumber"
                          value={businessInfo.whatsappNumber}
                          onChange={handleBusinessInfoChange}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="businessHours" className="block text-sm font-medium text-gray-700 mb-2">
                        Business Hours
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="businessHours"
                          name="businessHours"
                          value={businessInfo.businessHours}
                          onChange={handleBusinessInfoChange}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="whatsappChannel" className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp Channel Link
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MessageCircle className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          id="whatsappChannel"
                          name="whatsappChannel"
                          value={businessInfo.whatsappChannel}
                          onChange={handleBusinessInfoChange}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        value={businessInfo.address}
                        onChange={handleBusinessInfoChange}
                        className="input-field pl-10 resize-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="googleMapsUrl" className="block text-sm font-medium text-gray-700 mb-2">
                      Google Maps URL
                    </label>
                    <input
                      type="url"
                      id="googleMapsUrl"
                      name="googleMapsUrl"
                      value={businessInfo.googleMapsUrl}
                      onChange={handleBusinessInfoChange}
                      className="input-field"
                      placeholder="https://maps.app.goo.gl/..."
                    />
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={saveBusinessInfo}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Business Information</span>
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                      Note: In a production environment, these changes would be saved to your database and environment variables.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Admin Credentials</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={adminCredentials.email}
                          onChange={handleAdminCredentialsChange}
                          className="input-field pl-10"
                          disabled
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Contact your developer to change the admin email.</p>
                    </div>

                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPasswords.current ? 'text' : 'password'}
                          id="currentPassword"
                          name="currentPassword"
                          value={adminCredentials.currentPassword}
                          onChange={handleAdminCredentialsChange}
                          className="input-field pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPasswords.new ? 'text' : 'password'}
                          id="newPassword"
                          name="newPassword"
                          value={adminCredentials.newPassword}
                          onChange={handleAdminCredentialsChange}
                          className="input-field pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.new ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPasswords.confirm ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={adminCredentials.confirmPassword}
                          onChange={handleAdminCredentialsChange}
                          className="input-field pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={updatePassword}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Update Password</span>
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        Default credentials are: admin@lasharimobilezone.com / admin123
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}