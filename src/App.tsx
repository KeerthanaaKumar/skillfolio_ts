import React, { useState } from 'react';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { StudentDashboard } from './components/StudentDashboard';
import { Submissions } from './components/Submissions';
import { EventDiscovery } from './components/EventDiscovery';
import { Portfolio } from './components/Portfolio';
import { Reports } from './components/Reports';
import { FacultyDashboard } from './components/FacultyDashboard';

type UserType = 'student' | 'faculty' | null;

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (userType: UserType, credentials: any) => {
    // Mock authentication - in real app, validate credentials with backend
    console.log('Login attempt:', userType, credentials);
    setCurrentUser(userType);
    setCurrentPage(userType === 'student' ? 'dashboard' : 'faculty-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Show login screen if not authenticated
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  // Render appropriate page content
  const renderPageContent = () => {
    if (currentUser === 'faculty') {
      switch (currentPage) {
        case 'faculty-dashboard':
        case 'verification':
        case 'analytics':
          return <FacultyDashboard />;
        default:
          return <FacultyDashboard />;
      }
    }

    // Student pages
    switch (currentPage) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'submissions':
        return <Submissions />;
      case 'events':
        return <EventDiscovery />;
      case 'portfolio':
        return <Portfolio />;
      case 'reports':
        return <Reports />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <Layout
      userType={currentUser}
      currentPage={currentPage}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {renderPageContent()}
    </Layout>
  );
}