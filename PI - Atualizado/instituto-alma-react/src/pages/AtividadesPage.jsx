// src/pages/AtividadesPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Importamos nossos dados
import atividadesData from '../data/atividades.json';

export default function AtividadesPage() {
  
  // === LÓGICA DO MODAL (substituindo detalhe-atividade.js) ===
  
  // 1. Criamos um 'estado' para saber qual atividade está no modal
  // Por padrão, é 'null' (nenhuma)
  const [modalData, setModalData] = useState(null);

  // 2. Função para ABRIR o modal
  // Ela recebe o objeto 'atividade' inteiro
  const openModal = (atividade) => {
    setModalData(atividade);
    // Adiciona as classes para travar o scroll (do seu CSS original)
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
  };

  // 3. Função para FECHAR o modal
  const closeModal = () => {
    setModalData(null);
    // Remove as classes para destravar o scroll
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  };

  // === FIM DA LÓGICA DO MODAL ===


  return (
    <>
      <section className="hero-section-simple">
        <div className="container">
          <h1>Nossas Atividades</h1>
          <p>Projetos contínuos que transformam vidas todos os dias.</p>
        </div>
      </section>

      <section className="all-events-section"> 
        <div className="container">
          <div className="events-grid">
            
            {/* Agora usamos .map() para exibir TODOS os cards */}
            {atividadesData.map((atividade) => (
              <article className="event-grid-card" key={atividade.id}>
                {/* ATENÇÃO AQUI:
                  O seu 'detalhe-atividade.js' usava <a> com 'data-attributes'.
                  Em React, vamos usar um <button> ou <div> com 'onClick'.
                  Usar <button> é melhor para acessibilidade.
                  
                  Removemos o <a> e o 'href' e adicionamos o 'onClick'.
                */}
                <button 
                  className="event-card-button" // Usamos um botão para o 'onClick'
                  onClick={() => openModal(atividade)}
                >
                  <img src={atividade.img} alt={atividade.title} />
                  <div className="card-body">
                    <h3>{atividade.title}</h3>
                    <p>{atividade.short_desc}</p>
                    <span className="card-link">Ver detalhes →</span>
                  </div>
                </button>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* === HTML DO MODAL ===
        O modal agora vive dentro da página.
        Ele só é visível se 'modalData' NÃO for 'null'.
      */}
      {modalData && (
        <div 
          id="activity-modal" 
          className="modal-overlay show"
          // Adicionamos um onClick no fundo para fechar
          onClick={(e) => {
            // Fecha só se clicar no fundo (overlay)
            if (e.target.id === 'activity-modal') {
              closeModal();
            }
          }}
        >
          <div className="modal-content">
          
            <header className="modal-header">
              {/* Os dados vêm do 'estado' modalData */}
              <h2 id="modal-title">{modalData.title}</h2>
              <button 
                id="modal-close" 
                className="modal-close-btn" 
                onClick={closeModal} // Botão de fechar
              >
                &times;
              </button>
            </header>

            <section className="modal-body">
              <img 
                id="modal-image" 
                src={modalData.img} 
                alt={modalData.title} 
                className="modal-image-main" 
              />
              <p id="modal-description">{modalData.long_desc}</p>
            </section>
          
            <footer className="modal-footer">
              <Link to="/doe" className="btn btn-primary">Quero Ajudar</Link>
            </footer>

          </div>
        </div>
      )}
    </>
  );
}