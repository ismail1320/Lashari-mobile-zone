'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  MessageSquare,
  Mail,
  Phone,
  Search,
  Filter,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  X,
  ExternalLink
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Inquiry {
  _id: string
  name: string
  email: string
  phone: string
  serviceType: string
  message: string
  status: 'new' | 'read' | 'replied' | 'closed'
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'read', label: 'Read' },
    { value: 'replied', label: 'Replied' },
    { value: 'closed', label: 'Closed' }
  ]

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries')
      const data = await response.json()
      setInquiries(data.inquiries || [])
    } catch (error) {
      console.error('Error fetching inquiries:', error)
      toast.error('Failed to load inquiries')
    } finally {
      setLoading(false)
    }
  }

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || inquiry.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const markAsRead = async (inquiryId: string) => {
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true, status: 'read' }),
      })

      if (response.ok) {
        toast.success('Inquiry marked as read')
        fetchInquiries()
      } else {
        throw new Error('Failed to update inquiry')
      }
    } catch (error) {
      toast.error('Failed to update inquiry')
    }
  }

  const updateInquiryStatus = async (inquiryId: string, status: string) => {
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast.success(`Inquiry marked as ${status}`)
        fetchInquiries()
      } else {
        throw new Error('Failed to update inquiry status')
      }
    } catch (error) {
      toast.error('Failed to update inquiry status')
    }
  }

  const deleteInquiry = async (inquiryId: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return
    
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Inquiry deleted successfully')
        fetchInquiries()
      } else {
        throw new Error('Failed to delete inquiry')
      }
    } catch (error) {
      toast.error('Failed to delete inquiry')
    }
  }

  const viewInquiryDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    setShowDetailModal(true)
    
    // Mark as read when viewing
    if (!inquiry.isRead) {
      markAsRead(inquiry._id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800'
      case 'read': return 'bg-blue-100 text-blue-800'
      case 'replied': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Eye className="w-4 h-4" />
      case 'read': return <EyeOff className="w-4 h-4" />
      case 'replied': return <MessageSquare className="w-4 h-4" />
      case 'closed': return <X className="w-4 h-4" />
      default: return <Eye className="w-4 h-4" />
    }
  }

  if (loading) {
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
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-sm text-gray-600">Inquiries Management</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Customer Inquiries</h2>
            <p className="text-gray-600 mt-2">
              Manage customer inquiries and messages
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">
              Total: {filteredInquiries.length} inquiries
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              All Inquiries ({filteredInquiries.length})
            </h3>
          </div>
          
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No inquiries found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Customer inquiries will appear here'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${!inquiry.isRead ? 'bg-red-500' : 'bg-gray-300'}`} />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                            <div className="text-sm text-gray-500 flex items-center space-x-2">
                              <Mail className="w-3 h-3" />
                              <span>{inquiry.email}</span>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center space-x-2">
                              <Phone className="w-3 h-3" />
                              <span>{inquiry.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {inquiry.serviceType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(inquiry.status)}`}>
                          {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                        <br />
                        <span className="text-xs">
                          {new Date(inquiry.createdAt).toLocaleTimeString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => viewInquiryDetails(inquiry)}
                          className="text-primary-600 hover:text-primary-700"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="text-blue-600 hover:text-blue-700"
                          title="Reply via Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://wa.me/${inquiry.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700"
                          title="Reply via WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => deleteInquiry(inquiry._id)}
                          className="text-red-600 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {showDetailModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                Inquiry Details
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{selectedInquiry.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900">{selectedInquiry.email}</p>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900">{selectedInquiry.phone}</p>
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://wa.me/${selectedInquiry.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <p className="text-gray-900">{selectedInquiry.serviceType}</p>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <div className="flex flex-wrap gap-2">
                  {['new', 'read', 'replied', 'closed'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateInquiryStatus(selectedInquiry._id, status)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        selectedInquiry.status === status
                          ? 'bg-primary-100 text-primary-800 border-primary-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4 pt-4 border-t">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.serviceType} Inquiry`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>
                <a
                  href={`https://wa.me/${selectedInquiry.phone}?text=Hello ${selectedInquiry.name}, regarding your ${selectedInquiry.serviceType} inquiry:`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reply via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}