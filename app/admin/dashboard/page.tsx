'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { FiPackage, FiMail, FiUsers, FiTrendingUp } from 'react-icons/fi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalInquiries: 0,
    unreadInquiries: 0,
    recentInquiries: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [servicesRes, inquiriesRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/inquiries'),
      ]);

      const servicesData = await servicesRes.json();
      const inquiriesData = await inquiriesRes.json();

      if (servicesData.success && inquiriesData.success) {
        setStats({
          totalServices: servicesData.count,
          totalInquiries: inquiriesData.count,
          unreadInquiries: inquiriesData.data.filter((i: any) => !i.read).length,
          recentInquiries: inquiriesData.data.slice(0, 5),
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: <FiPackage className="text-4xl" />,
      label: 'Total Services',
      value: stats.totalServices,
      color: 'bg-primary-500',
    },
    {
      icon: <FiMail className="text-4xl" />,
      label: 'Total Inquiries',
      value: stats.totalInquiries,
      color: 'bg-secondary-500',
    },
    {
      icon: <FiTrendingUp className="text-4xl" />,
      label: 'Unread Inquiries',
      value: stats.unreadInquiries,
      color: 'bg-success-500',
    },
    {
      icon: <FiUsers className="text-4xl" />,
      label: 'Happy Customers',
      value: '1000+',
      color: 'bg-primary-600',
    },
  ];

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back to Lashari Mobile Zone Admin Panel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className={`${card.color} text-white w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{card.value}</h3>
              <p className="text-gray-600">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Inquiries</h2>
              <Link href="/admin/inquiries" className="text-primary-600 hover:text-primary-700 font-medium">
                View All →
              </Link>
            </div>

            {stats.recentInquiries.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No inquiries yet</p>
            ) : (
              <div className="space-y-3">
                {stats.recentInquiries.map((inquiry: any) => (
                  <div
                    key={inquiry._id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                        <p className="text-sm text-gray-600">{inquiry.email}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{inquiry.message}</p>
                      </div>
                      {!inquiry.read && (
                        <span className="bg-success-500 text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/services"
                className="block bg-primary-50 hover:bg-primary-100 text-primary-700 font-semibold px-4 py-3 rounded-lg transition-colors"
              >
                📱 Manage Services
              </Link>
              <Link
                href="/admin/inquiries"
                className="block bg-secondary-50 hover:bg-secondary-100 text-secondary-700 font-semibold px-4 py-3 rounded-lg transition-colors"
              >
                📧 View Inquiries
              </Link>
              <Link
                href="/admin/settings"
                className="block bg-success-50 hover:bg-success-100 text-success-700 font-semibold px-4 py-3 rounded-lg transition-colors"
              >
                ⚙️ Update Settings
              </Link>
              <Link
                href="/"
                target="_blank"
                className="block bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold px-4 py-3 rounded-lg transition-colors"
              >
                🌐 View Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
