// src/pages/HomePage.jsx

// 1. Importamos os 'Hooks' do React: useState e useEffect
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 2. REMOVEMOS as importações de JSON estático

// Slides do carrossel principal (ainda estáticos, o que está correto)
const heroSlides = [
  { img: "images/Sopa-Dono.jpg", alt: "Voluntários servindo a comunidade" },
  { img: "images/Capa.Instituto.Criança.JPG", alt: "Crianças participando de atividades" },
  { img: "images/teste.jpg", alt: "Equipe do Instituto Alma" }
];

export default function HomePage() {
  
  // === ESTADO PARA O CARROSSEL HERO ===
  const [currentIndex, setCurrentIndex] = useState(0);

  // === NOVOS ESTADOS PARA OS DADOS DA API ===
  const [atividades, setAtividades] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  // === LÓGICA DO CARROSSEL HERO (igual a antes) ===
  const nextSlide = () => {
    const newIndex = (currentIndex === heroSlides.length - 1) ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const prevSlide = () => {
    const newIndex = (currentIndex === 0) ? heroSlides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [currentIndex]); 
  
  // === NOVO EFEITO: BUSCAR DADOS DA API ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Busca as duas rotas em paralelo
        const [atividadesRes, eventosRes] = await Promise.all([
          fetch('http://localhost:3001/api/atividades'),
          fetch('http://localhost:3001/api/eventos')
        ]);
        
        const atividadesData = await atividadesRes.json();
        const eventosData = await eventosRes.json();

        // Guarda os 4 primeiros de cada
        setAtividades(Array.isArray(atividadesData) ? atividadesData.slice(0, 4) : []);
        setEventos(Array.isArray(eventosData) ? eventosData.slice(0, 3) : []); // Slider só mostra 3
        
      } catch (error) {
        console.error("Erro ao buscar dados para a Home Page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // '[]' = Roda só uma vez


  return (
    <>
      {/* ===== SEÇÃO HERO (CARROSSEL) ===== */}
      <section className="hero-section">
        <div className="hero-carousel">
          <div className="carousel-track">
            {heroSlides.map((slide, index) => (
              <div 
                className={`carousel-slide ${index === currentIndex ? 'current-slide' : ''}`} 
                key={slide.alt}
              >
                <img src={slide.img} alt={slide.alt} />
              </div>
            ))}
          </div>
          <button className="carousel-button prev" aria-label="Anterior" onClick={prevSlide}>◀</button>
          <button className="carousel-button next" aria-label="Próximo" onClick={nextSlide}>▶</button>
          <div className="carousel-nav">
            {heroSlides.map((slide, slideIndex) => (
              <button 
                key={slideIndex}
                className={`carousel-dot ${currentIndex === slideIndex ? 'current-slide' : ''}`}
                onClick={() => goToSlide(slideIndex)}
              ></button>
            ))}
          </div>
        </div>
        <div className="container hero-text-overlay">
          <h1>Instituto Alma - Transformando Vidas</h1>
          <p>Nossas campanhas capacitam jovens e adultos para um futuro melhor e mais próspero.</p>
          <Link to="/sobre" className="btn btn-secondary">Saiba Mais</Link>
        </div>
      </section>
      
      {/* ===== SEÇÃO ATIVIDADES (AGORA DINÂMICA) ===== */}
      <section id="atividades" className="activities-section">
        <div className="container">
          <h2 className="section-title">Nossas Atividades</h2>
          <p className="section-subtitle">Conheça alguns dos nossos principais projetos que estão transformando vidas.</p>
          
          <div className="activities-grid">
            {loading ? (
              <p>Carregando atividades...</p>
            ) : (
              atividades.map((atividade) => (
                <article className="event-grid-card" key={atividade.id_atividade}>
                  <Link to={`/atividades`}> 
                    <img src={atividade.img_url} alt={atividade.titulo} />
                    <div className="card-body">
                      <h3>{atividade.titulo}</h3>
                      <p>{atividade.desc_curta}</p>
                      <span className="card-link">Ver detalhes →</span>
                    </div>
                  </Link>
                </article>
              ))
            )}
          </div>
          
          <div className="text-center">
            <Link to="/atividades" className="btn btn-primary">Ver Todas as Atividades</Link>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO CTA (CALL TO ACTION) ===== */}
      <section className="cta-section">
        <div className="container">
          <h2>Sua ajuda ilumina caminhos. Faça parte.</h2>
          <p>Sua contribuição é fundamental para continuarmos nosso trabalho e fazer a diferença.</p>
          <Link to="/doe" className="btn btn-secondary">Quero Doar Agora</Link>
        </div>
      </section>

      {/* ===== SEÇÃO COMO AJUDAR ===== */}
      <section className="how-to-help-section">
        {/* ... (conteúdo estático) ... */}
         <div className="container">
                <h2 className="section-title">Como Ajudar</h2>
                <p className="section-subtitle">Existem diversas maneiras de contribuir com nossa causa.</p>
                <div className="help-grid">
                    <div className="value-card"> <h3>Doe Agora</h3>
                        <p>Sua contribuição financeira nos permite comprar alimentos, material escolar e manter nossos projetos ativos.</p>
                        <Link to="/doe" className="btn btn-primary" style={{ marginTop: '15px' }}>Fazer Doação</Link>
                    </div>
                    <div className="value-card">
                        <h3>Seja Voluntário</h3>
                        <p>Dedique seu tempo para ajudar em nossas ações. Sua presença é fundamental para fazermos a diferença.</p>
                        <Link to="/cadastro" className="btn btn-secondary" style={{ marginTop: '15px' }}>Quero ser voluntário</Link>
                    </div>
                    <div className="value-card">
                        <h3>Divulgue</h3>
                        <p>Siga-nos nas redes sociais e compartilhe nossa causa. Quanto mais pessoas souberem, maior será nosso impacto.</p>
                        <a href="#" className="btn btn-secondary" style={{ marginTop: '15px' }}>Ver Redes Sociais</a>
                    </div>
                </div>
         </div>
      </section>

      {/* ===== SEÇÃO EVENTOS (AGORA DINÂMICA) ===== */}
      <section id="eventos" className="events-slider-section">
        <div className="container">
          <div className="events-slider-header">
            <div className="header-text">
              <h2 className="section-title">Fique por dentro dos eventos</h2>
              <Link to="/eventos" className="btn btn-primary">Ver Todos</Link>
            </div>
            <div className="slider-nav">
              <button className="slider-button prev-event" aria-label="Evento anterior">‹</button>
              <button className="slider-button next-event" aria-label="Próximo evento">›</button>
            </div>
          </div>
          <div className="events-slider-container">
            <div className="events-slider-track">
              {loading ? (
                <p>Carregando eventos...</p>
              ) : (
                eventos.map((evento) => (
                  <article className="event-slide-card" key={evento.id_evento}>
                    <Link to={`/eventos`}>
                      <img src={evento.img_url} alt={evento.titulo} />
                      <div className="card-body">
                        <span className="event-date">{new Date(evento.data_evento).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase()}</span>
                        <h3>{evento.titulo}</h3>
                        <p>{evento.desc_curta}</p>
                        <span className="card-link">Ver detalhes →</span>
                      </div>
                    </Link>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO TRANSPARÊNCIA ===== */}
      <section id="transparencia" className="transparency-section">
          {/* ... (conteúdo estático) ... */}
           <div className="container">
                <h2 className="section-title">Transparência</h2>
                <p className="section-subtitle">Acreditamos na transparência total. Acompanhe como seus recursos são aplicados.</p>
                <div className="stats-grid">
                    <div className="stat-item"><span className="stat-number">R$ 2.5M</span><span className="stat-label">Arrecadado em 2024</span></div>
                    <div className="stat-item"><span className="stat-number">1,200</span><span className="stat-label">Pessoas impactadas</span></div>
                    <div className="stat-item"><span className="stat-number">15</span><span className="stat-label">Projetos ativos</span></div>
                    <div className="stat-item"><span className="stat-number">98%</span><span className="stat-label">Recursos em projetos</span></div>
                </div>
                 <div className="text-center">
                    <Link to="/transparencia" className="btn btn-primary">Ver Relatórios Completos</Link>
                </div>
            </div>
      </section>
    </>
  );
}