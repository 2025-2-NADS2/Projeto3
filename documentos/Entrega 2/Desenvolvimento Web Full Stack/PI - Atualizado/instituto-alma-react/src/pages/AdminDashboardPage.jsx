// src/pages/AdminDashboardPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// Vamos importar os dados das doações para a tabela de "Últimas Doações"
import doacoesAdminData from '../data/doacoesAdmin.json';

export default function AdminDashboardPage() {
  
  // Pegamos apenas as 3 últimas doações para o dashboard
  const ultimasDoacoes = doacoesAdminData.slice(0, 3);

  return (
    // Esta 'main' é o <main className="admin-content">
    // que será injetado dentro do <AdminLayout>
    <main className="admin-content">
      <header className="admin-header">
        <h1>Dashboard</h1>
        <p>Bem-vindo, Administrador!</p>
      </header>

      {/* Cards de Estatística - Por enquanto estáticos */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-icon">💰</div>
          <div className="stat-card-info">
            <h3>Total Arrecadado</h3>
            <p>R$ 14.580,00</p>
            <small>Total de 120 doações</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">✉️</div>
          <div className="stat-card-info">
            <h3>Novas Mensagens</h3>
            <p>3</p>
            <small>Da Ouvidoria</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🗓️</div>
          <div className="stat-card-info">
            <h3>Próximo Evento</h3>
            <p>Festa de Natal</p>
            <small>Em 15/12/2024</small>
          </div>
        </div>
      </section>

      <section className="admin-management">
        
        <div className="management-section">
          <h2>Gestão de Conteúdo</h2>
          <p>Adicione, edite ou remova imagens e textos das páginas públicas.</p>
          <div className="quick-actions">
            {/* Links para as outras páginas do admin */}
            <Link to="/admin/atividades" className="btn btn-primary">Nova Atividade</Link>
            <Link to="/admin/eventos" className="btn btn-primary">Novo Evento</Link>
            <Link to="/admin/transparencia" className="btn btn-secondary">Upload (PDF)</Link>
          </div>
        </div>

        <div className="management-section">
          <h2>Últimas Doações (Quem contribuiu)</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Doador</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {/* Usamos .map() para ler os dados do JSON */}
              {ultimasDoacoes.map((doacao) => (
                <tr key={doacao.id}>
                  <td>{doacao.doador}</td>
                  {/* Formatamos o valor para R$ */}
                  <td>R$ {doacao.valor.toFixed(2).replace('.', ',')}</td>
                  <td>{doacao.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>
    </main>
  );
}