import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Se não houver token, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  // Se houver token, renderiza o componente
  return <>{children}</>;
};

export default ProtectedRoute;