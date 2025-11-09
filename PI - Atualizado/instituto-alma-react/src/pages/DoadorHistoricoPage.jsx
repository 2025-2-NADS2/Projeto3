// src/pages/DoadorHistoricoPage.jsx

import React from 'react';

// 1. Importamos os dados do Doador
import graficoData from '../data/graficoDoacoesDoador.json'; // Atenção ao 's' em 'graficos'
import doacoesData from '../data/doacoesDoador.json';

export default function DoadorHistoricoPage() {

  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Meu Histórico de Doações</h1>
        <p>Acompanhe e baixe os recibos de todas as suas contribuições.</p>
      </header>

      <section className="admin-management">
        
        {/* Seção 1: Gráfico do Doador */}
        <div className="management-section">
          <h2>Seu Impacto (Doações Mensais - Anual)</h2>
          <p>Veja aqui um gráfico do seu histórico de contribuições ao longo do ano.</p>
          
          <div className="chart-container">
            {/* 2. O grande momento! Lendo o JSON para criar o gráfico */}
            {graficoData.map((mes) => (
              <div 
                key={mes.mes}
                className="chart-bar" 
                style={{ height: mes.percentual }} 
              >
                <span className="bar-value">R$ {mes.valor.toFixed(2).replace('.', ',')}</span>
                <div className="bar-label">{mes.mes}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção 2: Tabela de Doações do Doador */}
        <div className="management-section">
          <h2>Todas as Minhas Doações</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Recibo</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {/* 3. Lendo o JSON para criar a tabela */}
              {doacoesData.map((doacao) => (
                <tr key={doacao.recibo}>
                  <td>{doacao.recibo}</td>
                  <td>R$ {doacao.valor.toFixed(2).replace('.', ',')}</td>
                  <td>{doacao.data}</td>
                  <td>{doacao.status}</td>
                  <td><a href={doacao.url_pdf} target="_blank" rel="noopener noreferrer">Baixar PDF</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}