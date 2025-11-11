// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  
  const navigate = useNavigate();

  // Estados para o formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [activeTab, setActiveTab] = useState('doador'); // 'doador' ou 'admin'
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // === AQUI ESTÁ A CORREÇÃO ===
    // O backend espera 'tipo', e não 'userType'.
    // E os valores são "Doador" ou "Administrador" (com 'A' maiúsculo)
    const tipoLogin = activeTab === 'admin' ? 'Administrador' : 'Doador';

    const loginData = {
      email: email,
      senha: senha,
      tipo: tipoLogin // Corrigido de 'userType' para 'tipo'
    };

    console.log("Enviando para API:", loginData); // Para depuração

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao tentar logar.');
      }

      // 5. Sucesso! Salva o token e os dados do usuário
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 6. Redireciona para o painel correto
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

  return (
    <>
      <div className="login-tabs">
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

      {/* Formulário único que se adapta */}
      <form className="login-form active" onSubmit={handleSubmit}>
        <h2>{activeTab === 'admin' ? 'Painel Administrativo' : 'Acesse seu portal'}</h2>
        <p>{activeTab === 'admin' ? 'Acesso exclusivo para a equipe.' : 'Acompanhe o impacto da sua doação.'}</p>
        
        <div className="input-group">
          <label htmlFor="email-login">Email</label>
          <input 
            type="email" id="email-login" required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="senha-login">Senha</label>
          <input 
            type="password" id="senha-login" required 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        
        {/* Mostra erros da API aqui */}
        {error && (
          <p style={{ color: 'var(--state-error)', marginBottom: '15px' }}>
            {error}
          </p>
        )}

        {activeTab === 'doador' && (
           <a href="#" className="forgot-password">Esqueceu sua senha?</a>
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