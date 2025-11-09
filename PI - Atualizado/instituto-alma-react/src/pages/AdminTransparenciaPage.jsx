// src/pages/AdminTransparenciaPage.jsx

import React from 'react';

// 1. Importamos os dados dos documentos
import documentosData from '../data/documentosTransparencia.json';

export default function AdminTransparenciaPage() {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Novo documento salvo! (simulação)');
  };

  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Gerenciar Transparência</h1>
        <p>Faça o upload de novos relatórios (PDF) para a página de transparência.</p>
      </header>

      {/* Seção 1: Formulário de Novo Documento */}
      <section className="management-section">
        <h2>Novo Documento (PDF)</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="pdf-titulo">Título do Documento</label>
            <input type="text" id="pdf-titulo" placeholder="Ex: Relatório Financeiro - 2024" />
          </div>
          
          <div className="input-group">
            <label htmlFor="pdf-categoria">Categoria</label>
            <select id="pdf-categoria">
              <option value="financeiro">Relatório Financeiro</option>
              <option value="atividades">Relatório de Atividades</option>
              <option value="estatuto">Estatuto e Governança</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="pdf-file">Arquivo (PDF)</label>
            <input type="file" id="pdf-file" accept=".pdf" />
            <small>Apenas arquivos .pdf são permitidos.</small>
          </div>

          <button type="submit" className="btn btn-primary">Salvar Documento</button>
        </form>
      </section>
      
      {/* Seção 2: Tabela de Documentos Publicados */}
      <section className="management-section">
        <h2>Documentos Publicados</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* 2. Usamos .map() para ler os dados do JSON */}
            {documentosData.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.titulo}</td>
                <td>{doc.categoria}</td>
                <td>
                  <a href="#" className="btn btn-danger" style={{ padding: '5px 10px' }}>Excluir</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}