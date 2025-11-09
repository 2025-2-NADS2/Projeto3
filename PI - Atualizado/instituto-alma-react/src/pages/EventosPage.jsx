// src/pages/EventosPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Importamos os dados dos eventos
import eventosData from '../data/eventos.json';

export default function EventosPage() {
  
  // === LÓGICA DO MODAL (Reutilizada) ===
  const [modalData, setModalData] = useState(null);

  const openModal = (evento) => {
    setModalData(evento);
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setModalData(null);
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  };
  // === FIM DA LÓGICA DO MODAL ===

  return (
    <>
      <section className="hero-section-simple">
        <div className="container">
          <h1>Nossos Eventos</h1>
          <p>Fique por dentro de tudo o que acontece no Instituto Alma e participe conosco!</p>
        </div>
      </section>

      <section className="all-events-section">
        <div className="container">
          <div className="events-grid">
            
            {/* Usamos .map() para exibir TODOS os cards de eventos */}
            {eventosData.map((evento) => (
              <article className="event-grid-card" key={evento.id}>
                {/* Usamos o mesmo <button> com onClick da página de Atividades.
                  O CSS que você adicionou no style.css já cuida do estilo dele.
                */}
                <button 
                  className="event-card-button"
                  onClick={() => openModal(evento)}
                >
                  <img src={evento.img} alt={evento.title} />
                  <div className="card-body">
                    {/* O card de evento tem uma data, que adicionamos aqui */}
                    <span className="event-date">{evento.date}</span>
                    <h3>{evento.title}</h3>
                    <p>{evento.short_desc}</p>
                    <span className="card-link">Ver detalhes →</span>
                  </div>
                </button>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* === HTML DO MODAL ===
        Exatamente o mesmo modal, mas alimentado com 'modalData' (que é um evento)
      */}
      {modalData && (
        <div 
          id="activity-modal" 
          className="modal-overlay show"
          onClick={(e) => {
            if (e.target.id === 'activity-modal') closeModal();
          }}
        >
          <div className="modal-content">
          
            <header className="modal-header">
              <h2 id="modal-title">{modalData.title}</h2>
              <button 
                id="modal-close" 
                className="modal-close-btn" 
                onClick={closeModal}
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
              {/* Usamos a descrição longa (long_desc) do JSON */}
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