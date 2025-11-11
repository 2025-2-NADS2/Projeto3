// src/pages/TransparenciaPage.jsx

import React, { useState, useEffect } from 'react';

// Função helper para renderizar a lista de relatórios
const ReportList = ({ reports }) => (
  <ul className="report-list">
    {reports.map((doc) => (
      <li key={doc.id_documento}>
        <a href={doc.url_pdf} target="_blank" rel="noopener noreferrer">
          <span className="report-icon">PDF</span>
          <span className="report-title">{doc.titulo}</span>
          <span className="report-download">Baixar</span>
        </a>
      </li>
    ))}
  </ul>
);

export default function TransparenciaPage() {

  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/documentos');
        const data = await response.json();
        setDocumentos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
        setDocumentos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDocumentos();
  }, []);

  // Filtramos os dados em listas separadas
  const relatoriosFinanceiros = documentos.filter(
    doc => doc.categoria === 'Relatório Financeiro'
  );
  const relatoriosAtividades = documentos.filter(
    doc => doc.categoria === 'Relatório de Atividades'
  );
  
  // === AQUI ESTÁ A CORREÇÃO DO BUG ===
  const relatoriosEstatuto = documentos.filter(
    doc => doc.categoria === 'Estatuto e Governança'
  );

  return (
    <>
      <section className="hero-section-simple">
        <div className="container">
          <h1>Transparência</h1>
          <p>Acreditamos que a confiança é a base do nosso trabalho. Veja nossos relatórios.</p>
        </div>
      </section>

      {/* Seção Estática (Governança) */}
      <section className="governance-section">
        <div className="container">
          <h2 className="section-title">Governança e Documentos</h2>
          <p className="section-subtitle">Somos uma associação privada, sem fins lucrativos, legalmente constituída e comprometida com nossos objetivos sociais.</p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <h3>Nossos Dados</h3>
              <ul className="governance-list">
                <li><strong>Razão Social:</strong> ALMA INSTITUTO DE DESENVOLVIMENTO SOCIAL</li>
                <li><strong>CNPJ:</strong> 43.677.395/0001-74</li>
                <li><strong>Natureza Jurídica:</strong> 399-9 - Associação Privada</li>
                <li><strong>Sede:</strong> São Paulo - SP</li>
              </ul>
            </div>
            <div className="stat-item">
              <h3>Conselho Diretor</h3>
              <p>Nossa diretoria atua de forma <strong>100% voluntária</strong>...</p>
              <ul className="governance-list">
                <li><strong>Presidente:</strong> Silvio Luiz Lemos Silva</li>
                <li><strong>Diretora:</strong> Monica Fatima de Mello Lemos Silva</li>
                <li><strong>Diretora:</strong> Lucilange Lopes de Souza</li>
              </ul>
            </div>
            <div className="stat-item">
              <h3>Estatuto Social</h3>
              <p>Nosso estatuto rege todas as nossas atividades...</p>
              <a 
                href="/documentos/estatuto.pdf" // Assumindo que você colocará o PDF em /public/documentos/estatuto.pdf
                className="btn btn-secondary" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Baixar Estatuto
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Dinâmica (Prestação de Contas) */}
      <section className="transparency-reports-section">
        <div className="container">
          <h2 className="section-title">Prestação de Contas</h2>
          
          <div className="transparency-content-wrapper">
            
            <div className="transparency-info-text">
              <h3>De onde vêm nossos recursos?</h3>
              <p>Nossas fontes de recursos vêm de diversas frentes...</p>
              <ul>
                <li>Doações de pessoas físicas e jurídicas;</li>
                <li>Recursos governamentais;</li>
                <li>Campanhas e eventos;</li>
                <li>Contribuições dos associados.</li>
              </ul>
              <p>Todo o valor arrecadado é integralmente aplicado na manutenção...</p>
            </div>

            <div className="transparency-report-lists">
              
              {loading && <p>Carregando relatórios...</p>}

              {!loading && relatoriosFinanceiros.length > 0 && (
                <>
                  <h4>Relatórios Financeiros</h4>
                  <ReportList reports={relatoriosFinanceiros} />
                </>
              )}

              {!loading && relatoriosAtividades.length > 0 && (
                <>
                  <h4 style={{ marginTop: '30px' }}>Relatórios de Atividades</h4>
                  <ReportList reports={relatoriosAtividades} />
                </>
              )}

              {/* === BLOCO DO BUG CORRIGIDO === */}
              {!loading && relatoriosEstatuto.length > 0 && (
                <>
                  <h4 style={{ marginTop: '30px' }}>Estatuto e Governança</h4>
                  <ReportList reports={relatoriosEstatuto} />
                </>
              )}

              {!loading && documentos.length === 0 && (
                <p>Nenhum relatório publicado no momento.</p>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}