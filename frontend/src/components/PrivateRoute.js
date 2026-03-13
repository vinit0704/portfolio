import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <div style={{ color: '#00ffff', textAlign: 'center', marginTop: 100 }}>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return children;
};

export default PrivateRoute;