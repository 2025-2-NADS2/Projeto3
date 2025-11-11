// src/layouts/AdminLayout.jsx

import React, { useState } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';

// Este layout é inteligente! Ele será usado tanto pelo ADMIN quanto pelo DOADOR.
// Já vamos recriar a lógica do 'admin-script.js' aqui usando useState.

export default function AdminLayout() {
  // 1. Recriando o admin-script.js
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 2. Verificando qual painel estamos (Admin ou Doador)
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isDoador = location.pathname.startsWith('/doador');

  return (
    // A classe 'sidebar-open' é controlada pelo React
    <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          {/* O link e o título mudam dependendo da rota */}
          {isAdmin && <Link to="/admin/dashboard" className="logo"><strong>IA</strong> Admin</Link>}
          {isDoador && <Link to="/doador/painel" className="logo"><strong>IA</strong> Portal do Doador</Link>}
        </div>
        
        <nav className="admin-nav">
          {/* 3. Mostra os links corretos para cada painel */}
          {isAdmin && (
            <>
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
              <NavLink to="/admin/atividades">Gerenciar Atividades</NavLink>
              <NavLink to="/admin/eventos">Gerenciar Eventos</NavLink>
              <NavLink to="/admin/transparencia">Gerenciar Transparência</NavLink>
              <NavLink to="/admin/historico">Acompanhar Doações</NavLink>
              <NavLink to="/admin/ouvidoria">Mensagens (Ouvidoria)</NavLink>
            </>
          )}
          
          {isDoador && (
            <>
              <NavLink to="/doador/painel">Meu Painel</NavLink>
              <NavLink to="/doador/historico">Meu Histórico de Doações</NavLink>
              <NavLink to="/doador/gerenciar">Gerenciar Meus Dados</NavLink>
              {/* Link para fazer nova doação */}
              <NavLink to="/doe">Fazer Nova Doação</NavLink>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          {/* O botão 'Sair' provavelmente te levará de volta ao Login */}
          <Link to="/login" className="btn btn-secondary btn-full">Sair</Link>
        </div>
      </aside>

      {/* O botão 'onClick' substitui o addEventListener do admin-script.js */}
      <button className="admin-mobile-toggle" id="mobile-toggle" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      {/* É AQUI QUE O CONTEÚDO DA PÁGINA (DASHBOARD, HISTÓRICO) SERÁ RENDERIZADO */}
      <Outlet />
    </div>
  );
}