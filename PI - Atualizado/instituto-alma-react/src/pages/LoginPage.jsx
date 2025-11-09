// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  
  // 1. Hook para navegação
  // Usaremos isso para redirecionar o usuário após o "login"
  const navigate = useNavigate();

  // 2. Criamos um 'estado' para controlar a aba ativa
  // Começa como 'doador', assim como no seu HTML
  const [activeTab, setActiveTab] = useState('doador');

  // 3. Funções de "login" falsas
  // Elas apenas nos redirecionam para os painéis corretos
  const handleDoadorLogin = (e) => {
    e.preventDefault(); // Impede o formulário de recarregar a página
    // No futuro, aqui você faria a chamada de API
    console.log('Logando como Doador...');
    navigate('/doador/painel'); // Redireciona para o painel do doador
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    console.log('Logando como Admin...');
    navigate('/admin/dashboard'); // Redireciona para o painel do admin
  };

  return (
    <>
      <div className="login-tabs">
        {/* 4. Os botões agora usam 'onClick' para mudar o estado */}
        <button 
          className={`tab-btn ${activeTab === 'doador' ? 'active' : ''}`} 
          onClick={() => setActiveTab('doador')}
        >
          Sou Doador
        </button>
        <button 
          className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`} 
          onClick={() => setActiveTab('admin')}
        >
          Sou Administrador
        </button>
      </div>

      {/* 5. Formulário do Doador
         - Usamos 'onSubmit' para chamar nossa função de login
         - A classe 'active' é controlada pelo 'estado'
      */}
      <form 
        id="form-doador" 
        className={`login-form ${activeTab === 'doador' ? 'active' : ''}`} 
        onSubmit={handleDoadorLogin}
      >
        <h2>Acesse seu portal</h2>
        <p>Acompanhe o impacto da sua doação.</p>
        <div className="input-group">
          <label htmlFor="email-doador">Email</label>
          <input type="email" id="email-doador" required />
        </div>
        <div className="input-group">
          <label htmlFor="senha-doador">Senha</label>
          <input type="password" id="senha-doador" required />
        </div>
        <a href="#" className="forgot-password">Esqueceu sua senha?</a>
        <button type="submit" className="btn btn-primary btn-full">Entrar</button>
        <p className="signup-link">Não tem uma conta? <Link to="/cadastro">Cadastre-se agora</Link></p>
      </form>

      {/* 6. Formulário do Admin */}
      <form 
        id="form-admin" 
        className={`login-form ${activeTab === 'admin' ? 'active' : ''}`}
        onSubmit={handleAdminLogin}
      >
        <h2>Painel Administrativo</h2>
        <p>Acesso exclusivo para a equipe do instituto.</p>
        <div className="input-group">
          <label htmlFor="email-admin">Email</label>
          <input type="email" id="email-admin" required />
        </div>
        <div className="input-group">
          <label htmlFor="senha-admin">Senha</label>
          <input type="password" id="senha-admin" required />
        </div>
        <button type="submit" className="btn btn-primary btn-full">Entrar</button>
      </form>
    </>
  );
}