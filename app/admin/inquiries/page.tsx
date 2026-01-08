'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiMail, FiTrash2, FiPhone } from 'react-icons/fi';
import { MdMarkEmailRead } from 'react-icons/md';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceType?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const fetchInquiries = async () => {
    try {
      let url = '/api/inquiries';
      if (filter === 'unread') url += '?read=false';
      if (filter === 'read') url += '?read=true';

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !currentStatus }),
      });

      const data = await res.json();

      if (data.success) {
        fetchInquiries();
      }
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        fetchInquiries();
      } else {
        alert(data.message || 'Error deleting inquiry');
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      alert('Failed to delete inquiry');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inquiries Management</h1>
          <p className="text-gray-600">Manage customer inquiries and contact requests</p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
            }`}
          >
            All Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              filter === 'unread'
                ? 'bg-success-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              filter === 'read'
                ? 'bg-gray-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
            }`}
          >
            Read
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No inquiries found</h3>
            <p className="text-gray-600">When customers contact you, their inquiries will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry._id}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all ${
                  !inquiry.read ? 'border-l-4 border-success-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{inquiry.name}</h3>
                      {!inquiry.read && (
                        <span className="bg-success-500 text-white text-xs px-3 py-1 rounded-full">
                          New
                        </span>
                      )}
                      {inquiry.serviceType && (
                        <span className="bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full">
                          {inquiry.serviceType}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <FiMail />
                        <a href={`mailto:${inquiry.email}`} className="hover:text-primary-600">
                          {inquiry.email}
                        </a>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FiPhone />
                        <a href={`tel:${inquiry.phone}`} className="hover:text-primary-600">
                          {inquiry.phone}
                        </a>
                      </span>
                      <span className="text-gray-500">{formatDate(inquiry.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleReadStatus(inquiry._id, inquiry.read)}
                      className="text-primary-600 hover:text-primary-700 p-2"
                      title={inquiry.read ? 'Mark as unread' : 'Mark as read'}
                    >
                      {inquiry.read ? <MdMarkEmailRead className="text-xl" /> : <FiMail className="text-xl" />}
                    </button>
                    <button
                      onClick={() => handleDelete(inquiry._id)}
                      className="text-red-600 hover:text-red-700 p-2"
                      title="Delete inquiry"
                    >
                      <FiTrash2 className="text-xl" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
                </div>

                <div className="flex items-center space-x-3 mt-4">
                  <a
                    href={`https://wa.me/${inquiry.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-success-500 hover:bg-success-600 text-white px-4 py-2 rounded-lg transition-all text-sm"
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-all text-sm"
                  >
                    <FiMail />
                    <span>Email</span>
                  </a>
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="flex items-center space-x-2 bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg transition-all text-sm"
                  >
                    <FiPhone />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
