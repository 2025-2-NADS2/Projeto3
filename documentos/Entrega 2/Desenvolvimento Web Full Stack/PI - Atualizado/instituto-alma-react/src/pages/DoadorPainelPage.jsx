// src/pages/DoadorPainelPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// 1. Importamos os dados das doações do DOADOR
import doacoesDoadorData from '../data/doacoesDoador.json';

export default function DoadorPainelPage() {

  // Pegamos as 2 últimas doações para o painel
  const ultimasDoacoes = doacoesDoadorData.slice(0, 2);

  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Meu Painel</h1>
        {/* No futuro, este nome viria da API/login */}
        <p>Bem-vindo(a) de volta, [Nome do Doador]!</p>
      </header>

      {/* Os cards de estatística do doador.html eram os mesmos do admin.html.
          No futuro, você pode querer criar um JSON separado para eles.
          Por enquanto, vamos deixá-los estáticos.
      */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-icon">💰</div>
          <div className="stat-card-info">
            <h3>Total Arrecadado (Geral)</h3>
            <p>R$ 14.580,00</p>
            <small>Total de 120 doações</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">✉️</div>
          <div className="stat-card-info">
            <h3>Novas Mensagens (Geral)</h3>
            <p>3</p>
            <small>Da Ouvidoria</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🗓️</div>
          <div className="stat-card-info">
            <h3>Próximo Evento (Geral)</h3>
            <p>Festa de Natal</p>
            <small>Em 15/12/2024</small>
          </div>
        </div>
      </section>

      <section className="admin-management">
        <div className="management-section">
          <h2>Histórico Recente</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Recibo</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* 2. Usamos .map() para ler os dados do doador */}
              {ultimasDoacoes.map((doacao) => (
                <tr key={doacao.recibo}>
                  <td><a href={doacao.url_pdf}>{doacao.recibo}</a></td>
                  <td>R$ {doacao.valor.toFixed(2).replace('.', ',')}</td>
                  <td>{doacao.data}</td>
                  <td>{doacao.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link 
            to="/doador/historico" 
            style={{ marginTop: '20px', display: 'inline-block', fontWeight: '600' }}
          >
            Ver todo o histórico →
          </Link>
        </div>
      </section>
    </main>
  );
}