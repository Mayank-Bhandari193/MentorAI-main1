import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Route Guard: Jab tak user registered/logged in na ho, dashboard access nahi hoga
function ProtectedRoute({ children }) {
  const user = localStorage.getItem('currentUser') || localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('currentUser') || localStorage.getItem('user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Session parse error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-indigo-400 font-mono text-sm">
        Initializing MentorAI...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Login / Register Route */}
        <Route
          path="/login"
          element={
            currentUser ? <Navigate to="/" replace /> : <Login />
          }
        />

        {/* 2. Main Dashboard Route (Strictly Protected) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 3. Catch-all fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}