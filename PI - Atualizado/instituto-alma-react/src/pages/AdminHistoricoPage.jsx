// src/pages/AdminHistoricoPage.jsx
import React, { useState, useEffect } from 'react';
import authFetch from '../utils/authFetch'; // Importa o helper

export default function AdminHistoricoPage() {
  
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [status, setStatus] = useState('');
  const [doacoes, setDoacoes] = useState([]);
  const [graficoData, setGraficoData] = useState([]); 
  const [loading, setLoading] = useState(false);

  // Função para formatar os dados do gráfico
  const formatarDadosGrafico = (dadosApi) => {
    const meses = Array(12).fill(0).map((_, i) => ({ mes: i + 1, total: 0 }));
    let maxTotal = 0;
    
    dadosApi.forEach(item => {
      const mesIndex = item.mes - 1;
      meses[mesIndex].total = item.total;
      if (item.total > maxTotal) {
        maxTotal = item.total;
      }
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

  const handleFilter = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const params = new URLSearchParams();
    if (dataInicio) params.append('data_inicio', dataInicio);
    if (dataFim) params.append('data_fim', dataFim);
    if (status) params.append('status', status);
    const queryString = params.toString();

    try {
      const [doacoesRes, graficoRes] = await Promise.all([
        authFetch(`http://localhost:3001/api/admin/doacoes?${queryString}`),
        authFetch(`http://localhost:3001/api/admin/grafico-doacoes?${queryString}`)
      ]);

      if (!doacoesRes.ok || !graficoRes.ok) {
        // Se o token for inválido (401), redireciona para o login
        if (doacoesRes.status === 401 || graficoRes.status === 401) window.location.href = '/login';
        throw new Error('Erro ao buscar relatórios');
      }

      const doacoesData = await doacoesRes.json();
      const graficoApiData = await graficoRes.json();

      setDoacoes(Array.isArray(doacoesData) ? doacoesData : []);
      setGraficoData(formatarDadosGrafico(graficoApiData));

    } catch (error) {
      console.error(error);
      alert('Erro ao carregar relatórios. Verifique o console.');
    } finally {
      setLoading(false);
    }
  };

  // Carrega os dados iniciais (sem filtro) quando a página abre
  useEffect(() => {
    handleFilter(); 
  }, []); 

  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Histórico Geral de Doações</h1>
        <p>Filtre e acompanhe todas as contribuições recebidas.</p>
      </header>

      <section className="management-section">
        <h2>Filtrar Relatório</h2>
        <form className="admin-filters" onSubmit={handleFilter}>
          <div className="input-group">
            <label htmlFor="data-inicio">Data Início</label>
            <input 
              type="date" id="data-inicio" 
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="data-fim">Data Fim</label>
            <input 
              type="date" id="data-fim"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="status-pgto">Status</label>
            <select 
              id="status-pgto"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Pendente">Pendente</option>
              {/* === CORREÇÃO DO ERRO DE DIGITAÇÃO AQUI === */}
              <option value="Aprovado">Aprovado</option> 
              <option value="Reprovado">Reprovado</option> 
              {/* Era </Tabela>, agora é </option> */}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Filtrando...' : '🔍 Filtrar'}
          </button>
          <button type="button" className="btn btn-secondary">📄 Exportar CSV</button>
        </form>
      </section>
      
      <section className="management-section">
        <h2>Receita Mensal (Visão Anual)</h2>
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
      </section>

      <section className="management-section">
        <h2>Relatório de Doações</h2>
        {loading && <p>Carregando relatório...</p>}
        {!loading && (
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
              {doacoes.length > 0 ? (
                doacoes.map((doacao) => (
                  <tr key={doacao.id_doacao}>
                    <td>{doacao.id_doacao}</td>
                    <td>{doacao.nome_doador}</td>
                    <td>{doacao.email_doador}</td>
                    <td>R$ {doacao.valor.toFixed(2).replace('.', ',')}</td>
                    <td>{new Date(doacao.data_doacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                    <td>{doacao.status_pagamento}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>Nenhuma doação encontrada para os filtros selecionados.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}