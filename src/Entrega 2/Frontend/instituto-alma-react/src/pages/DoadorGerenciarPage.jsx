// src/pages/DoadorGerenciarPage.jsx

import React from 'react';

export default function DoadorGerenciarPage() {

  const handleDataSubmit = (e) => {
    e.preventDefault();
    alert('Dados salvos! (simulação)');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert('Senha alterada! (simulação)');
  };

  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Gerenciar Meus Dados</h1>
        <p>Mantenha suas informações de contato e segurança atualizadas.</p>
      </header>

      {/* Seção 1: Dados Pessoais */}
      <section className="management-section">
        <h2>Meus Dados Pessoais</h2>
        <form className="admin-form" onSubmit={handleDataSubmit}>
          <div className="input-group">
            <label htmlFor="nome">Nome Completo</label>
            <input type="text" id="nome" value="Nome Completo do Doador" disabled />
            <small>O nome não pode ser alterado. Entre em contato com a ouvidoria se houver erro.</small>
          </div>
          
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" value="doador@email.com" disabled />
          </div>

          <div className="input-group">
            <label htmlFor="cpf">CPF</label>
            <input type="text" id="cpf" value="123.456.789-00" disabled />
          </div>

          <div className="input-group">
            <label htmlFor="telefone">Telefone / Celular</label>
            <input type="tel" id="telefone" placeholder="(11) 99999-9999" />
          </div>

          <button type="submit" className="btn btn-primary">Salvar Alterações</button>
        </form>
      </section>
      
      {/* Seção 2: Alterar Senha */}
      <section className="management-section">
        <h2>Alterar Senha</h2>
        <form className="admin-form" onSubmit={handlePasswordSubmit}>
          <div className="input-group">
            <label htmlFor="senha-atual">Senha Atual</label>
            <input type="password" id="senha-atual" required />
          </div>
          <div className="input-group">
            <label htmlFor="senha-nova">Nova Senha</label>
            <input type="password" id="senha-nova" required />
          </div>
          <div className="input-group">
            <label htmlFor="senha-confirma">Confirmar Nova Senha</label>
            <input type="password" id="senha-confirma" required />
          </div>
          
          <button type="submit" className="btn btn-primary">Alterar Senha</button>
        </form>
      </section>
    </main>
  );
}