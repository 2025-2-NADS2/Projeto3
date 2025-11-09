// src/pages/AdminEventosPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// 1. Importamos os dados dos eventos
import eventosData from '../data/eventos.json';

export default function AdminEventosPage() {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Novo evento salvo! (simulação)');
  };

  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Gerenciar Eventos</h1>
        <p>Crie, edite ou exclua os posts da página "Eventos".</p>
      </header>

      {/* Seção 1: Formulário de Novo Evento */}
      <section className="management-section">
        <h2>Adicionar Novo Evento</h2>
        {/* Usamos o mesmo formulário do admin-eventos.html */}
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="evento-titulo">Título do Evento</label>
            <input type="text" id="evento-titulo" placeholder="Ex: Festa de Natal Comunitária" />
          </div>

          <div className="input-group">
            <label htmlFor="evento-data">Data do Evento</label>
            <input type="date" id="evento-data" />
          </div>
          
          <div className="input-group">
            <label htmlFor="evento-imagem">Imagem de Capa (Upload)</label>
            <input type="file" id="evento-imagem" accept="image/png, image/jpeg" />
          </div>

          <div className="input-group">
            <label htmlFor="evento-desc-curta">Descrição Curta (para o card)</label>
            <input type="text" id="evento-desc-curta" placeholder="Uma frase curta que aparece no card." maxLength="100" />
          </div>

          <div className="input-group">
            <label htmlFor="evento-desc-longa">Descrição Completa (para o modal)</label>
            <textarea id="evento-desc-longa" rows="6" placeholder="O texto completo que aparecerá no modal 'Ver detalhes'..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Salvar Evento</button>
        </form>
      </section>
      
      {/* Seção 2: Tabela de Eventos Publicados */}
      <section className="management-section">
        <h2>Eventos Publicados</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Título</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* 2. Usamos .map() para ler os dados do eventos.json */}
            {eventosData.map((evento) => (
              <tr key={evento.id}>
                {/* O JSON tem 'date' (ex: "15 DEZ 2024") 
                    Se tivéssemos uma data 'ISO' (2024-12-15) seria melhor,
                    mas vamos usar o que temos.
                */}
                <td>{evento.date}</td>
                <td>{evento.title}</td>
                <td>
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