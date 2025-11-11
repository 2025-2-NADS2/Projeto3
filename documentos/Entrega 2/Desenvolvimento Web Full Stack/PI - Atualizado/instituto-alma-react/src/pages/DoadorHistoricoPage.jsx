// src/pages/DoadorHistoricoPage.jsx
import React, { useState, useEffect } from 'react';
import authFetch from '../utils/authFetch'; // <-- IMPORTA O HELPER

export default function DoadorHistoricoPage() {
  
  // (Estados para os dados)
  const [doacoes, setDoacoes] = useState([]);
  const [graficoData, setGraficoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para formatar os dados do gráfico
  const formatarDadosGrafico = (dadosApi) => {
    const meses = Array(12).fill(0).map((_, i) => ({ mes: i + 1, total: 0 }));
    let maxTotal = 0;
    dadosApi.forEach(item => {
      const mesIndex = item.mes - 1;
      meses[mesIndex].total = item.total;
      if (item.total > maxTotal) maxTotal = item.total;
    });
    return meses.map((item, index) => {
      const nomeMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      return {
        mes: nomeMeses[index],
        valor: item.total,
        percentual: maxTotal === 0 ? '0%' : `${(item.total / maxTotal) * 100}%`
      };
    });
  };

  // Carrega os dados (note que as rotas são /api/admin/...)
  // Em um app maior, criaríamos rotas /api/doador/
  useEffect(() => {
    const fetchDadosDoador = async () => {
      setLoading(true);
      try {
        // TROCA 'fetch' POR 'authFetch'
        // (Ainda usamos as rotas do admin, pois o middleware só verifica se está logado,
        // mas não filtra por usuário ainda. Isso é uma melhoria futura!)
        const [doacoesRes, graficoRes] = await Promise.all([
          authFetch('http://localhost:3001/api/admin/doacoes'),
          authFetch('http://localhost:3001/api/admin/grafico-doacoes')
        ]);
        
        if (!doacoesRes.ok || !graficoRes.ok) {
           if (doacoesRes.status === 401 || graficoRes.status === 401) window.location.href = '/login';
          throw new Error('Erro ao buscar histórico');
        }

        const doacoesData = await doacoesRes.json();
        const graficoApiData = await graficoRes.json();
        
        // Em um app real, a API filtraria as doações para o ID do usuário logado
        // Por agora, ela está mostrando TODAS as doações (igual ao admin)
        setDoacoes(Array.isArray(doacoesData) ? doacoesData : []);
        setGraficoData(formatarDadosGrafico(graficoApiData));
      
      } catch (error) {
        console.error(error);
        alert('Erro ao carregar seu histórico. Verifique o console.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDadosDoador();
  }, []); // Roda só uma vez

  // ... (O JSX do 'return' continua o mesmo) ...
  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Meu Histórico de Doações</h1>
        <p>Acompanhe e baixe os recibos de todas as suas contribuições.</p>
      </header>
      <section className="admin-management">
        <div className="management-section">
          <h2>Seu Impacto (Doações Mensais - Anual)</h2>
          <p>Veja aqui um gráfico do seu histórico de contribuições ao longo do ano.</p>
          <div className="chart-container">
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
        <div className="management-section">
          <h2>Todas as Minhas Doações</h2>
          {loading && <p>Carregando histórico...</p>}
          {!loading && (
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
                {doacoes.length > 0 ? (
                  doacoes.map((doacao) => (
                    <tr key={doacao.id_doacao}>
                      <td>{doacao.id_doacao}</td>
                      <td>R$ {doacao.valor.toFixed(2).replace('.', ',')}</td>
                      <td>{new Date(doacao.data_doacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                      <td>{doacao.status_pagamento}</td>
                      <td><a href="#">Baixar PDF</a></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>Nenhuma doação encontrada.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}