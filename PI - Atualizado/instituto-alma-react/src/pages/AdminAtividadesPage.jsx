// src/pages/AdminAtividadesPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// 1. Importamos os dados das atividades
import atividadesData from '../data/atividades.json';

export default function AdminAtividadesPage() {

  const handleSubmit = (e) => {
    e.preventDefault();
    // No futuro, aqui você enviaria os dados do formulário
    // para a API para criar uma nova atividade.
    alert('Nova atividade salva! (simulação)');
  };

  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Gerenciar Atividades</h1>
        <p>Crie, edite ou exclua as postagens da página "Nossas Atividades".</p>
      </header>

      {/* Seção 1: Formulário de Nova Atividade */}
      <section className="management-section">
        <h2>Adicionar Nova Atividade</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="ativ-titulo">Título da Atividade</label>
            <input type="text" id="ativ-titulo" placeholder="Ex: Projeto Sopa Fraterna" />
          </div>
          
          <div className="input-group">
            <label htmlFor="ativ-imagem">Imagem de Capa (Upload)</label>
            <input type="file" id="ativ-imagem" accept="image/png, image/jpeg" />
            <small>Envie uma imagem (JPG ou PNG) para a capa do card.</small>
          </div>

          <div className="input-group">
            <label htmlFor="ativ-desc-curta">Descrição Curta (para o card)</label>
            <input type="text" id="ativ-desc-curta" placeholder="Uma frase curta que aparece no card." maxLength="100" />
          </div>

          <div className="input-group">
            <label htmlFor="ativ-desc-longa">Descrição Completa (para o modal)</label>
            <textarea id="ativ-desc-longa" rows="6" placeholder="O texto completo que aparecerá no modal 'Ver detalhes'..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Salvar Atividade</button>
        </form>
      </section>
      
      {/* Seção 2: Tabela de Atividades Publicadas */}
      <section className="management-section">
        <h2>Atividades Publicadas</h2>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Título</th>
              <th>Descrição Curta</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* 2. Usamos .map() para ler os dados do JSON */}
            {atividadesData.map((atividade) => (
              <tr key={atividade.id}>
                <td>
                  <img 
                    src={`/${atividade.img}`} // Adicionamos a barra '/' para pegar da pasta /public
                    alt={atividade.title} 
                    style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                </td>
                <td>{atividade.title}</td>
                <td>{atividade.short_desc}</td>
                <td>
                  {/* Por enquanto, os links de Ações não fazem nada */}
                  <a href="#" className="btn btn-secondary" style={{ padding: '5px 10px' }}>Editar</a>
                  <a href="#" className="btn btn-danger" style={{ padding: '5px 10px', marginLeft: '5px' }}>Excluir</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}