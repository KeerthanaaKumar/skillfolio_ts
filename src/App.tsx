import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { StudentDashboard } from './components/StudentDashboard';
import { Submissions } from './components/Submissions';
import { EventDiscovery } from './components/EventDiscovery';
import { Portfolio } from './components/Portfolio';
import { Reports } from './components/Reports';
import { FacultyDashboard } from './components/FacultyDashboard';
import { useAuth } from './hooks/useAuth';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'faculty';
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'student' ? '/dashboard' : '/faculty/dashboard'} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={user ? <Navigate to={user.role === 'student' ? '/dashboard' : '/faculty/dashboard'} replace /> : <Login />} 
        />
        
        {/* Student Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute requiredRole="student">
              <Layout userType="student" currentPage="dashboard">
                <StudentDashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/submissions" 
          element={
            <ProtectedRoute requiredRole="student">
              <Layout userType="student" currentPage="submissions">
                <Submissions />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/events" 
          element={
            <ProtectedRoute requiredRole="student">
              <Layout userType="student" currentPage="events">
                <EventDiscovery />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/portfolio" 
          element={
            <ProtectedRoute requiredRole="student">
              <Layout userType="student" currentPage="portfolio">
                <Portfolio />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute requiredRole="student">
              <Layout userType="student" currentPage="reports">
                <Reports />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        {/* Faculty Routes */}
        <Route 
          path="/faculty/dashboard" 
          element={
            <ProtectedRoute requiredRole="faculty">
              <Layout userType="faculty" currentPage="faculty-dashboard">
                <FacultyDashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/faculty/verify" 
          element={
            <ProtectedRoute requiredRole="faculty">
              <Layout userType="faculty" currentPage="verification">
                <FacultyDashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/faculty/reports" 
          element={
            <ProtectedRoute requiredRole="faculty">
              <Layout userType="faculty" currentPage="analytics">
                <Reports />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        {/* Default redirects */}
        <Route 
          path="/" 
          element={
            user ? (
              <Navigate to={user.role === 'student' ? '/dashboard' : '/faculty/dashboard'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Catch all - redirect to appropriate dashboard or login */}
        <Route 
          path="*" 
          element={
            user ? (
              <Navigate to={user.role === 'student' ? '/dashboard' : '/faculty/dashboard'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}