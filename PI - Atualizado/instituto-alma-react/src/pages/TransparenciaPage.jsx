// src/pages/TransparenciaPage.jsx

import React from 'react';

// 1. Importamos os dados dos documentos
import documentosData from '../data/documentosTransparencia.json';

export default function TransparenciaPage() {

  // 2. Filtramos os dados em duas listas separadas
  const relatoriosFinanceiros = documentosData.filter(
    doc => doc.categoria === "Relatório Financeiro"
  );
  
  const relatoriosAtividades = documentosData.filter(
    doc => doc.categoria === "Relatório de Atividades"
  );

  return (
    <>
      <section className="hero-section-simple">
        <div className="container">
          <h1>Transparência</h1>
          <p>Acreditamos que a confiança é a base do nosso trabalho. Veja nossos relatórios.</p>
        </div>
      </section>

      {/* Esta seção é estática, então copiamos direto do HTML */}
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
              <p>Nossa diretoria atua de forma <strong>100% voluntária</strong>, não recebendo qualquer tipo de remuneração, conforme Cláusula 7ª do nosso estatuto.</p>
              <ul className="governance-list">
                <li><strong>Presidente:</strong> Silvio Luiz Lemos Silva</li>
                <li><strong>Diretora:</strong> Monica Fatima de Mello Lemos Silva</li>
                <li><strong>Diretora:</strong> Lucilange Lopes de Souza</li>
                <li><small>(e demais membros listados no QSA)</small></li>
              </ul>
            </div>

            <div className="stat-item">
              <h3>Estatuto Social</h3>
              <p>Nosso estatuto rege todas as nossas atividades e define nosso propósito e regras de funcionamento.</p>
              
              {/* Links para arquivos em /public (como PDFs) podem ser <a> normais */}
              <a 
                href="/documentos/estatuto instituto alma 2021 remuneração clausula.pdf" 
                className="btn btn-secondary" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Baixar Estatuto
              </a>
              {/* NOTA: Para este link funcionar, você precisa criar
                  a pasta /public/documentos/ e colocar o PDF lá.
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Esta seção é dinâmica (vem do JSON) */}
      <section className="transparency-reports-section">
        <div className="container">
          <h2 className="section-title">Prestação de Contas</h2>
          
          <div className="transparency-content-wrapper">
            
            <div className="transparency-info-text">
              <h3>De onde vêm nossos recursos?</h3>
              <p>Nossas fontes de recursos vêm de diversas frentes, conforme detalhado em nosso estatuto (Cláusula 6ª), incluindo:</p>
              <ul>
                <li>Doações de pessoas físicas e jurídicas;</li>
                <li>Recursos governamentais;</li>
                <li>Campanhas e eventos;</li>
                <li>Contribuições dos associados.</li>
              </ul>
              <p>Todo o valor arrecadado é integralmente aplicado na manutenção e desenvolvimento dos nossos objetivos institucionais no território nacional.</p>
            </div>

            <div className="transparency-report-lists">
              
              <h4>Relatórios Financeiros</h4>
              <ul className="report-list">
                {/* 3. Usamos .map() na nossa lista filtrada */}
                {relatoriosFinanceiros.map((doc) => (
                  <li key={doc.id}>
                    <a href={doc.url_pdf} target="_blank" rel="noopener noreferrer">
                      <span className="report-icon">PDF</span>
                      <span className="report-title">{doc.titulo}</span>
                      <span className="report-download">Baixar</span>
                    </a>
                  </li>
                ))}
              </ul>

              <h4 style={{ marginTop: '30px' }}>Relatórios de Atividades</h4>
              <ul className="report-list">
                {/* 4. Usamos .map() na outra lista filtrada */}
                {relatoriosAtividades.map((doc) => (
                  <li key={doc.id}>
                    <a href={doc.url_pdf} target="_blank" rel="noopener noreferrer">
                      <span className="report-icon">PDF</span>
                      <span className="report-title">{doc.titulo}</span>
                      <span className="report-download">Baixar</span>
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}