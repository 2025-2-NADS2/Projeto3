// src/App.jsx

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';

// Componente de Proteção
import ProtectedRoute from './components/ProtectedRoute'; // <-- 1. IMPORTA O SEGURANÇA

// Páginas Públicas
import HomePage from './pages/HomePage';
import SobrePage from './pages/SobrePage';
import AtividadesPage from './pages/AtividadesPage';
import EventosPage from './pages/EventosPage';
import TransparenciaPage from './pages/TransparenciaPage';
import OuvidoriaPage from './pages/OuvidoriaPage';
import DoePage from './pages/DoePage';

// Páginas de Autenticação
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';

// Páginas de Admin (Protegidas)
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminAtividadesPage from './pages/AdminAtividadesPage';
import AdminEventosPage from './pages/AdminEventosPage';
import AdminTransparenciaPage from './pages/AdminTransparenciaPage';
import AdminHistoricoPage from './pages/AdminHistoricoPage';
import AdminOuvidoriaPage from './pages/AdminOuvidoriaPage';

// Páginas do Doador (Protegidas)
import DoadorPainelPage from './pages/DoadorPainelPage';
import DoadorHistoricoPage from './pages/DoadorHistoricoPage';
import DoadorGerenciarPage from './pages/DoadorGerenciarPage';

// Criamos o "mapa do site"
const router = createBrowserRouter([
  {
    // === ROTAS PÚBLICAS ===
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sobre', element: <SobrePage /> },
      { path: 'atividades', element: <AtividadesPage /> },
      { path: 'eventos', element: <EventosPage /> },
      { path: 'transparencia', element: <TransparenciaPage /> },
      { path: 'ouvidoria', element: <OuvidoriaPage /> },
      { path: 'doe', element: <DoePage /> },
    ]
  },
  {
    // === ROTAS DE AUTENTICAÇÃO ===
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'cadastro', element: <CadastroPage /> }
    ]
  },
  {
    // === ROTAS DO ADMIN (PROTEGIDAS) ===
    // 2. CRIAMOS UMA ROTA "MÃE" DE PROTEÇÃO
    path: '/admin',
    element: <ProtectedRoute />, // <-- O SEGURANÇA FICA NA PORTA
    children: [
      // 3. TODAS as rotas abaixo agora estão protegidas
      // Elas só serão renderizadas se o usuário estiver logado
      { 
        path: '', // O /admin em si usa o AdminLayout
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> }, 
          { path: 'dashboard', element: <AdminDashboardPage /> },
          { path: 'atividades', element: <AdminAtividadesPage /> },
          { path: 'eventos', element: <AdminEventosPage /> },
          { path: 'transparencia', element: <AdminTransparenciaPage /> },
          { path: 'historico', element: <AdminHistoricoPage /> },
          { path: 'ouvidoria', element: <AdminOuvidoriaPage /> }
        ]
      }
    ]
  },
  {
    // === ROTAS DO DOADOR (PROTEGIDAS) ===
    // 2. FAZEMOS O MESMO PARA O DOADOR
    path: '/doador',
    element: <ProtectedRoute />, // <-- O SEGURANÇA FICA NA PORTA
    children: [
      // 3. TODAS as rotas abaixo agora estão protegidas
      {
        path: '',
        element: <AdminLayout />, // Reutilizando o layout
        children: [
          { index: true, element: <DoadorPainelPage /> },
          { path: 'painel', element: <DoadorPainelPage /> },
          { path: 'historico', element: <DoadorHistoricoPage /> },
          { path: 'gerenciar', element: <DoadorGerenciarPage /> }
        ]
      }
    ]
  }
]);

// O App agora apenas "fornece" o mapa de rotas
function App() {
  return <RouterProvider router={router} />;
}

export default App;