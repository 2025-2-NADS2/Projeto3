// src/pages/EventosPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// NÃO importamos mais o JSON estático

export default function EventosPage() {
  
  // === ESTADO PARA A LISTA E LOADING ===
  const [eventosList, setEventosList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // === ESTADO PARA O MODAL ===
  const [modalData, setModalData] = useState(null);

  // === FUNÇÃO PARA BUSCAR DADOS (GET) ===
  const fetchEventos = async () => {
    try {
      setLoading(true);
      // Busca os dados da API
      const response = await fetch('http://localhost:3001/api/eventos');
      const data = await response.json();
      setEventosList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      setEventosList([]);
    } finally {
      setLoading(false);
    }
  };

  // Roda a busca quando a página carrega
  useEffect(() => {
    fetchEventos();
  }, []);

  // === FUNÇÕES DO MODAL ===
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

  // Função para formatar a data (Ex: 25 DEZ 2024)
  const formatarDataCard = (dataSQL) => {
    if (!dataSQL) return '';
    const data = new Date(dataSQL);
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', timeZone: 'UTC' }).toUpperCase();
  };


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
            
            {loading ? (
              <p>Carregando eventos...</p>
            ) : (
              eventosList.length > 0 ? (
                eventosList.map((evento) => (
                  <article className="event-grid-card" key={evento.id_evento}>
                    {/* Usamos o <button> para o onClick do modal */}
                    <button 
                      className="event-card-button"
                      onClick={() => openModal(evento)}
                    >
                      <img src={evento.img_url || '/images/teste.jpg'} alt={evento.titulo} />
                      <div className="card-body">
                        <span className="event-date">{formatarDataCard(evento.data_evento)}</span>
                        <h3>{evento.titulo}</h3>
                        <p>{evento.desc_curta}</p>
                        <span className="card-link">Ver detalhes →</span>
                      </div>
                    </button>
                  </article>
                ))
              ) : (
                <p>Nenhum evento agendado no momento.</p>
              )
            )}

          </div>
        </div>
      </section>

      {/* === HTML DO MODAL === */}
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
              <h2 id="modal-title">{modalData.titulo}</h2>
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
                src={modalData.img_url || '/images/teste.jpg'} 
                alt={modalData.titulo} 
                className="modal-image-main" 
              />
              <p id="modal-description">{modalData.desc_longa}</p>
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