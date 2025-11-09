// src/pages/AdminOuvidoriaPage.jsx

import React from 'react';

// 1. Importamos os dados das mensagens
import mensagensData from '../data/mensagensOuvidoria.json';

export default function AdminOuvidoriaPage() {
  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Mensagens da Ouvidoria</h1>
        <p>Veja aqui as manifestações enviadas pelo site.</p>
      </header>
      
      <section className="management-section">
        <h2>Mensagens Recebidas</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>De</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* 2. Usamos .map() para ler os dados do JSON */}
            {mensagensData.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.data}</td>
                <td>{msg.tipo}</td>
                <td>{msg.de}</td>
                <td>{msg.status}</td>
                <td>
                  <a href="#" className="btn btn-secondary" style={{ padding: '5px 10px' }}>Ver Mensagem</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}