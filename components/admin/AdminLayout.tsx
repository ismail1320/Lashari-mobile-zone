'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiHome, FiPackage, FiMail, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/verify');
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
      } else {
        router.replace('/admin/login');
      }
    } catch (err) {
      router.replace('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.replace('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { icon: <FiHome />, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: <FiPackage />, label: 'Services', href: '/admin/services' },
    { icon: <FiMail />, label: 'Inquiries', href: '/admin/inquiries' },
    { icon: <FiSettings />, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary-600">Admin Panel</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-gray-700"
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div className="flex">
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6">
            <Link href="/" className="flex items-center space-x-2 mb-8">
              <span className="text-3xl">📱</span>
              <div>
                <h2 className="text-xl font-bold text-primary-600">Lashari Mobile</h2>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </Link>

            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
              >
                <span className="text-xl"><FiLogOut /></span>
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <main className="flex-1 p-6 lg:p-8 mt-16 lg:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
