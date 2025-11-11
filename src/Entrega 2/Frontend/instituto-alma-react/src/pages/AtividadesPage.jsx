// src/pages/AtividadesPage.jsx

// 1. Importamos 'useState' e 'useEffect'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 2. REMOVEMOS a importação do JSON estático
// import atividadesData from '../data/atividades.json';

export default function AtividadesPage() {
  
  // 3. Criamos um 'estado' para guardar os dados que virão da API
  const [atividadesData, setAtividadesData] = useState([]); // Começa como array vazio
  const [loading, setLoading] = useState(true); // Estado de "carregando"
  
  // === LÓGICA DO MODAL (continua igual) ===
  const [modalData, setModalData] = useState(null);

  const openModal = (atividade) => {
    setModalData(atividade);
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setModalData(null);
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  };
  // === FIM DA LÓGICA DO MODAL ===

  // 4. EFEITO PARA BUSCAR OS DADOS (A MÁGICA ACONTECE AQUI)
  useEffect(() => {
    // Esta função é chamada assim que a página carrega
    const fetchAtividades = async () => {
      try {
        setLoading(true); // Avisa que estamos carregando
        
        // 5. Chamamos a sua API (que está na porta 3001)
        const response = await fetch('http://localhost:3001/api/atividades');
        
        // 6. Pegamos a resposta em JSON
        const data = await response.json();
        
        // 7. Colocamos os dados da API no nosso 'estado'
        setAtividadesData(data);

      } catch (error) {
        console.error('Erro ao buscar atividades da API:', error);
      } finally {
        setLoading(false); // Termina o "carregando"
      }
    };

    fetchAtividades();
  }, []); // O '[]' vazio significa que isso roda SÓ UMA VEZ


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
          
          {/* 8. Lógica de Carregamento */}
          {loading && (
            <p style={{ textAlign: 'center' }}>Carregando atividades do banco de dados...</p>
          )}

          {!loading && atividadesData.length === 0 && (
            <p style={{ textAlign: 'center' }}>Nenhuma atividade encontrada no banco de dados.</p>
          )}

          <div className="events-grid">
            {/* 9. O .map() agora lê os dados do 'estado' (que veio da API) */}
            {atividadesData.map((atividade) => (
              <article className="event-grid-card" key={atividade.id_atividade}>
                <button 
                  className="event-card-button"
                  onClick={() => openModal(atividade)}
                >
                  {/* Atenção: o nome da coluna no banco é 'img_url' */}
                  <img src={atividade.img_url || '/images/placeholder.jpg'} alt={atividade.titulo} />
                  <div className="card-body">
                    <h3>{atividade.titulo}</h3>
                    {/* Atenção: o nome da coluna no banco é 'desc_curta' */}
                    <p>{atividade.desc_curta}</p>
                    <span className="card-link">Ver detalhes →</span>
                  </div>
                </button>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* === MODAL (Agora lê colunas do banco) === */}
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
              <button id="modal-close" className="modal-close-btn" onClick={closeModal}>
                &times;
              </button>
            </header>
            <section className="modal-body">
              <img 
                id="modal-image" 
                src={modalData.img_url || '/images/placeholder.jpg'}
                alt={modalData.titulo} 
                className="modal-image-main" 
              />
              {/* Atenção: o nome da coluna no banco é 'desc_longa' */}
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