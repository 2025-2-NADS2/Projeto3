// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 1. IMPORTAMOS OS DADOS DOS NOSSOS ARQUIVOS JSON
import atividadesData from '../data/atividades.json';
import eventosData from '../data/eventos.json';


// Slides do carrossel principal
const slides = [
  { img: "images/Sopa-Dono.jpg", alt: "Voluntários servindo a comunidade" },
  { img: "images/Capa.Instituto.Criança.JPG", alt: "Crianças participando de atividades" },
  { img: "images/teste.jpg", alt: "Equipe do Instituto Alma" }
];

export default function HomePage() {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [currentIndex]); 

  
  return (
    <>
      {/* ===== SEÇÃO HERO (CARROSSEL) ===== */}
      <section className="hero-section">
        <div className="hero-carousel">
          <div className="carousel-track">
            {slides.map((slide, index) => (
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
            {slides.map((slide, slideIndex) => (
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
      
      {/* ===== SEÇÃO ATIVIDADES ===== */}
      <section id="atividades" className="activities-section">
        <div className="container">
          <h2 className="section-title">Nossas Atividades</h2>
          <p className="section-subtitle">Conheça alguns dos nossos principais projetos que estão transformando vidas.</p>
          
          {/* 2. OS CARDS DE ATIVIDADES AGORA VÊM DO JSON */}
          <div className="activities-grid">
            {/* Usamos .slice(0, 4) para pegar apenas os 4 primeiros */}
            {atividadesData.slice(0, 4).map((atividade) => (
              // Usamos a estrutura do 'event-grid-card' do seu style.css
              <article className="event-grid-card" key={atividade.id}>
                <Link to={`/atividades`}> {/* Eventualmente isso levará para /atividades/id */}
                  <img src={atividade.img} alt={atividade.title} />
                  <div className="card-body">
                    <h3>{atividade.title}</h3>
                    <p>{atividade.short_desc}</p>
                    <span className="card-link">Ver detalhes →</span>
                  </div>
                </Link>
              </article>
            ))}
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
        <div className="container">
          <h2 className="section-title">Como Ajudar</h2>
          <p className="section-subtitle">Existem diversas maneiras de contribuir com nossa causa.</p>
          <div className="help-grid">
            <div className="value-card">
              <h3>Doe Agora</h3>
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

      {/* ===== SEÇÃO EVENTOS (SLIDER) ===== */}
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
            {/* 3. OS CARDS DE EVENTOS AGORA VÊM DO JSON */}
            <div className="events-slider-track">
              {eventosData.map((evento) => (
                // Usamos a classe 'event-slide-card' do seu index.html
                <article className="event-slide-card" key={evento.id}>
                  {/* Baseado na estrutura do 'event-grid-card' */}
                  <Link to={`/eventos`}>
                    <img src={evento.img} alt={evento.title} />
                    <div className="card-body">
                      <span className="event-date">{evento.date}</span>
                      <h3>{evento.title}</h3>
                      <p>{evento.short_desc}</p>
                      <span className="card-link">Ver detalhes →</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO TRANSPARÊNCIA ===== */}
      <section id="transparencia" className="transparency-section">
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