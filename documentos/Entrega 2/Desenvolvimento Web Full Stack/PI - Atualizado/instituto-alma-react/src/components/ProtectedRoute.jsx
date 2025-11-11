// instituto-alma-react/src/components/ProtectedRoute.jsx
// Este componente é o "segurança" do nosso frontend

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. Verifica se o token existe no localStorage
  const token = localStorage.getItem('token');

  // 2. Se não houver token, redireciona para a página de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Se houver um token, permite o acesso à rota (ex: /admin/dashboard)
  // <Outlet /> é o componente da rota que o usuário tentou acessar
  return <Outlet />;
};

export default ProtectedRoute;