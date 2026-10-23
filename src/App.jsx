import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('currentUser') || localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Bina Signup/Login ke Dashboard access nahi hoga
  if (!currentUser) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <Dashboard user={currentUser} onLogout={handleLogout} />;
}