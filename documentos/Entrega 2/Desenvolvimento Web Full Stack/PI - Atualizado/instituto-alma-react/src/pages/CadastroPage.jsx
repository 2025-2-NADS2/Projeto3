// src/pages/CadastroPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CadastroPage() {
  
  const navigate = useNavigate();

  // Estados para o formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  
  const [error, setError] = useState(null); // Para erros do formulário
  const [loading, setLoading] = useState(false); // Para o botão de "carregando"

  // Função de "cadastro" real
  const handleCadastro = async (e) => {
    e.preventDefault();
    setError(null); // Limpa erros antigos

    // 1. Validação de senha no frontend
    if (senha !== confirmaSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    // 2. Monta o objeto para a API
    const dadosCadastro = {
      nome,
      email,
      senha,
      cpf,
      telefone,
      tipo_usuario_id: 1 // 1 = Doador (padrão)
    };

    try {
      // 3. Chama a API de Registro
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosCadastro)
      });

      const data = await response.json();

      if (!response.ok) {
        // Se a API retornar um erro (ex: 409 - Email já existe)
        throw new Error(data.message || 'Erro ao cadastrar.');
      }

      // 4. Sucesso!
      alert('Usuário criado com sucesso! Você será redirecionado para o login.');
      navigate('/login'); // Redireciona para o login

    } catch (err) {
      // Pega erros da API ou do fetch
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form active" onSubmit={handleCadastro}>
      <h2>Crie sua conta de Doador</h2>
      <p>Faça parte da nossa comunidade e ajude a transformar vidas.</p>
      
      <div className="input-group">
        <label htmlFor="nome">Nome Completo</label>
        <input 
          type="text" id="nome" required 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input 
          type="email" id="email" required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="cpf">CPF (para recibos)</label>
        <input 
          type="text" id="cpf" placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="telefone">Telefone / Celular</label>
        <input 
          type="tel" id="telefone" placeholder="(11) 99999-9999" 
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="senha">Crie uma Senha (mín. 6 caracteres)</label>
        <input 
          type="password" id="senha" required 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="confirma-senha">Confirme sua Senha</label>
        <input 
          type="password" id="confirma-senha" required 
          value={confirmaSenha}
          onChange={(e) => setConfirmaSenha(e.target.value)}
        />
      </div>

      {/* Mostra erros de validação ou da API */}
      {error && (
        <p style={{ color: 'var(--state-error)', marginBottom: '15px' }}>
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
        {loading ? 'Criando...' : 'Criar Conta'}
      </button>
      <p className="signup-link">Já tem uma conta? <Link to="/login">Faça Login</Link></p>
    </form>
  );
}