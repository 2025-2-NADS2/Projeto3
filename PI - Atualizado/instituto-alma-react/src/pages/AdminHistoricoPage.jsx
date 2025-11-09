// src/pages/AdminHistoricoPage.jsx

import React from 'react';

// 1. Importamos os DOIS arquivos JSON necessários
import graficoData from '../data/graficosDoacoesAdmin.json';
import doacoesData from '../data/doacoesAdmin.json';

export default function AdminHistoricoPage() {

  const handleFilter = (e) => {
    e.preventDefault();
    alert('Filtrando relatório... (simulação)');
  };

  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Histórico Geral de Doações</h1>
        <p>Filtre e acompanhe todas as contribuições recebidas.</p>
      </header>

      {/* Seção 1: Filtros (Formulário estático) */}
      <section className="management-section">
        <h2>Filtrar Relatório</h2>
        <form className="admin-filters" onSubmit={handleFilter}>
          <div className="input-group">
            <label htmlFor="data-inicio">Data Início</label>
            <input type="date" id="data-inicio" />
          </div>
          <div className="input-group">
            <label htmlFor="data-fim">Data Fim</label>
            <input type="date" id="data-fim" />
          </div>
          <div className="input-group">
            <label htmlFor="status-pgto">Status</label>
            <select id="status-pgto">
              <option value="">Todos</option>
              <option value="confirmado">Confirmado</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">🔍 Filtrar</button>
          <button type="button" className="btn btn-secondary">📄 Exportar CSV</button>
        </form>
      </section>
      
      {/* Seção 2: Gráfico (Dinâmico com JSON) */}
      <section className="management-section">
        <h2>Receita Mensal (Visão Anual)</h2>
        
        <div className="chart-container">
          {/* 2. É EXATAMENTE AQUI que fazemos o .map() que você previu! */}
          {graficoData.map((mes) => (
            <div 
              key={mes.mes}
              className="chart-bar" 
              // Convertemos 'height: 60%' para o objeto de estilo do React
              style={{ height: mes.percentual }} 
            >
              <span className="bar-value">R$ {mes.valor.toFixed(2).replace('.', ',')}</span>
              <div className="bar-label">{mes.mes}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção 3: Tabela de Doações (Dinâmico com JSON) */}
      <section className="management-section">
        <h2>Relatório de Doações</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID da Doação</th>
              <th>Nome do Doador</th>
              <th>E-mail</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* 3. Usamos .map() para ler o JSON das doações */}
            {doacoesData.map((doacao) => (
              <tr key={doacao.id}>
                <td>{doacao.id}</td>
                <td>{doacao.doador}</td>
                <td>{doacao.email}</td>
                <td>R$ {doacao.valor.toFixed(2).replace('.', ',')}</td>
                <td>{doacao.data}</td>
                <td>{doacao.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}