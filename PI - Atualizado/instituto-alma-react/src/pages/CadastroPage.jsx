// src/pages/CadastroPage.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CadastroPage() {
  
  const navigate = useNavigate();

  // Função de "cadastro" falsa
  const handleCadastro = (e) => {
    e.preventDefault();
    console.log('Cadastrando usuário...');
    // Após o cadastro, o mais comum é enviar o usuário
    // para o painel do doador ou de volta para o login.
    // Vamos enviá-lo para o painel do doador.
    navigate('/doador/painel');
  };

  return (
    // O seu cadastro.html não tinha o layout de tela dividida,
    // mas o login.html tinha. Vou assumir que você quer que
    // o cadastro também tenha (assim como no seu login.html).
    
    // Se o seu cadastro.html era tela cheia, me avise.
    // Por enquanto, estamos usando o AuthLayout.

    <form className="login-form active" onSubmit={handleCadastro}>
      <h2>Crie sua conta de Doador</h2>
      <p>Faça parte da nossa comunidade e ajude a transformar vidas.</p>
      
      <div className="input-group">
        <label htmlFor="nome">Nome Completo</label>
        <input type="text" id="nome" required />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
      </div>
      <div className="input-group">
        <label htmlFor="cpf">CPF (para recibos)</label>
        <input type="text" id="cpf" placeholder="000.000.000-00" required />
      </div>
      <div className="input-group">
        <label htmlFor="telefone">Telefone / Celular</label>
        <input type="tel" id="telefone" placeholder="(11) 99999-9999" />
      </div>
      <div className="input-group">
        <label htmlFor="senha">Crie uma Senha</label>
        <input type="password" id="senha" required />
      </div>
      <button type="submit" className="btn btn-primary btn-full">Criar Conta</button>
      <p className="signup-link">Já tem uma conta? <Link to="/login">Faça Login</Link></p>
    </form>
  );
}