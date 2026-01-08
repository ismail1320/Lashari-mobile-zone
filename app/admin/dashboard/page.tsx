'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard,
  Wrench,
  MessageSquare,
  Settings,
  LogOut,
  Users,
  TrendingUp,
  Phone,
  Mail,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalInquiries: 0,
    unreadInquiries: 0,
    todayInquiries: 0
  })
  const [recentInquiries, setRecentInquiries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch services count
      const servicesResponse = await fetch('/api/services')
      const servicesData = await servicesResponse.json()
      
      // Fetch inquiries count
      const inquiriesResponse = await fetch('/api/inquiries')
      const inquiriesData = await inquiriesResponse.json()
      
      // Calculate stats
      const today = new Date().toISOString().split('T')[0]
      const todayInquiries = inquiriesData.inquiries?.filter((inquiry: any) => 
        inquiry.createdAt.split('T')[0] === today
      ).length || 0
      
      const unreadInquiries = inquiriesData.inquiries?.filter((inquiry: any) => 
        !inquiry.isRead
      ).length || 0

      setStats({
        totalServices: servicesData.services?.length || 0,
        totalInquiries: inquiriesData.inquiries?.length || 0,
        unreadInquiries,
        todayInquiries
      })
      
      // Set recent inquiries (latest 5)
      setRecentInquiries(inquiriesData.inquiries?.slice(0, 5) || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      toast.success('Logged out successfully')
      router.push('/admin/login')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-2 rounded-lg">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-sm text-gray-600">Lashari Mobile Zone</p>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                View Website
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h2>
          <p className="text-gray-600">
            Welcome to the Lashari Mobile Zone admin panel. Here's what's happening with your business.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Services</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalServices}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-lg">
                <Wrench className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/services" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Manage Services →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalInquiries}</p>
              </div>
              <div className="bg-accent-100 p-3 rounded-lg">
                <MessageSquare className="w-6 h-6 text-accent-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/inquiries" className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                View All Inquiries →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread Inquiries</p>
                <p className="text-3xl font-bold text-red-600">{stats.unreadInquiries}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/inquiries?status=new" className="text-red-600 hover:text-red-700 text-sm font-medium">
                Check New Messages →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Inquiries</p>
                <p className="text-3xl font-bold text-secondary-600">{stats.todayInquiries}</p>
              </div>
              <div className="bg-secondary-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/inquiries?date=today" className="text-secondary-600 hover:text-secondary-700 text-sm font-medium">
                Today's Messages →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/admin/services/new"
                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors"
              >
                <Wrench className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-600">Add New Service</span>
              </Link>
              
              <Link
                href="/admin/inquiries"
                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-accent-400 hover:bg-accent-50 transition-colors"
              >
                <MessageSquare className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-600">View Inquiries</span>
              </Link>
              
              <Link
                href="/admin/settings"
                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-secondary-400 hover:bg-secondary-50 transition-colors"
              >
                <Settings className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-600">Settings</span>
              </Link>
              
              <a
                href="https://wa.me/03445979016"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
              >
                <Phone className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-600">WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-600" />
                <a href="tel:03445979016" className="text-gray-700 hover:text-primary-600">
                  03445979016
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-600" />
                <a href="mailto:ik4937444@gmail.com" className="text-gray-700 hover:text-primary-600">
                  ik4937444@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-primary-600" />
                <a 
                  href="https://wa.me/03445979016" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary-600"
                >
                  WhatsApp Chat
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">10:00 AM - 10:00 PM (Daily)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Inquiries</h3>
            <Link 
              href="/admin/inquiries"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All →
            </Link>
          </div>
          
          {recentInquiries.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No inquiries yet</p>
              <p className="text-sm text-gray-400">Customer inquiries will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentInquiries.map((inquiry: any) => (
                <div key={inquiry._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{inquiry.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        inquiry.isRead 
                          ? 'bg-gray-100 text-gray-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {inquiry.isRead ? 'Read' : 'New'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{inquiry.serviceType}</p>
                    <p className="text-sm text-gray-500 mt-1">{inquiry.message.substring(0, 100)}...</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(inquiry.createdAt).toLocaleDateString()} at {new Date(inquiry.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="p-2 text-gray-400 hover:text-primary-600"
                      title="Reply via Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://wa.me/${inquiry.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-accent-600"
                      title="Reply via WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}