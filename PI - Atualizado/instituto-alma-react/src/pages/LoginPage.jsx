// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  
  const navigate = useNavigate();

  // Estado para os formulários
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [activeTab, setActiveTab] = useState('doador');
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Função de Login Unificada
  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o formulário de recarregar
    setError(null);
    setLoading(true);

    const userType = activeTab; // 'doador' ou 'admin'

    try {
      // 1. Chama a API de Login
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha, userType })
      });

      const data = await response.json();

      if (!response.ok) {
        // Se a API retornar um erro (401, 400, 500)
        throw new Error(data.message || 'Erro ao tentar logar.');
      }

      // 2. SUCESSO! Salva o Token e os dados do usuário
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 3. Redireciona para o painel correto
      if (data.user.tipo === 'Administrador') {
        navigate('/admin/dashboard');
      } else {
        navigate('/doador/painel');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reseta o formulário ao trocar de aba
  const changeTab = (tab) => {
    setActiveTab(tab);
    setEmail('');
    setSenha('');
    setError(null);
  };

  return (
    <>
      <div className="login-tabs">
        <button 
          className={`tab-btn ${activeTab === 'doador' ? 'active' : ''}`} 
          onClick={() => changeTab('doador')}
        >
          Sou Doador
        </button>
        <button 
          className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`} 
          onClick={() => changeTab('admin')}
        >
          Sou Administrador
        </button>
      </div>

      {/* ATENÇÃO: Agora temos UM formulário que muda de contexto */}
      <form className="login-form active" onSubmit={handleLogin}>
        
        {/* Título muda baseado na aba */}
        {activeTab === 'doador' ? (
          <>
            <h2>Acesse seu portal</h2>
            <p>Acompanhe o impacto da sua doação.</p>
          </>
        ) : (
          <>
            <h2>Painel Administrativo</h2>
            <p>Acesso exclusivo para a equipe do instituto.</p>
          </>
        )}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" id="email" required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input 
            type="password" id="senha" required 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {/* Mostra link de "Esqueci a senha" e "Cadastro" só para doador */}
        {activeTab === 'doador' && (
          <a href="#" className="forgot-password">Esqueceu sua senha?</a>
        )}

        {/* Mostra erros da API */}
        {error && (
          <p style={{ color: 'var(--state-error)', marginBottom: '15px' }}>
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        
        {activeTab === 'doador' && (
          <p className="signup-link">Não tem uma conta? <Link to="/cadastro">Cadastre-se agora</Link></p>
        )}
      </form>
    </>
  );
}