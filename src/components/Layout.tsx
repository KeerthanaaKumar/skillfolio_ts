import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './ui/sidebar';
import { Button } from './ui/button';
import { MessageCircle, Home, FileText, Calendar, BarChart3, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
  userType: 'student' | 'faculty';
  currentPage: string;
}

export function Layout({ children, userType, currentPage }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'submissions', label: 'Submissions', icon: FileText, path: '/submissions' },
    { id: 'events', label: 'Event Discovery', icon: Calendar, path: '/events' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/reports' },
    { id: 'portfolio', label: 'Portfolio', icon: Settings, path: '/portfolio' },
  ];

  const facultyNavItems = [
    { id: 'faculty-dashboard', label: 'Dashboard', icon: Home, path: '/faculty/dashboard' },
    { id: 'verification', label: 'Verification', icon: FileText, path: '/faculty/verify' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/faculty/reports' },
  ];

  const navItems = userType === 'student' ? studentNavItems : facultyNavItems;
  const currentPath = location.pathname;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">Skillfolio</h1>
              <p className="text-sm text-gray-500">
                {user?.full_name || user?.username}
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      currentPath === item.path
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Chatbot Button */}
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-700 shadow-lg"
        onClick={() => {/* Handle chatbot */}}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
}