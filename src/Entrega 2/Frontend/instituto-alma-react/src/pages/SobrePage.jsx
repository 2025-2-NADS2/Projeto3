// src/pages/SobrePage.jsx

import React from 'react';
// Não precisamos de <Link> aqui, pois o layout já tem.

export default function SobrePage() {
  return (
    <>
      <section className="hero-section-simple">
        <div className="container">
          <h1>Sobre o Instituto Alma</h1>
          <p>Conheça nossa história, nossos valores e quem está por trás deste sonho.</p>
        </div>
      </section>

      <section className="history-section">
        <div className="container">
          <div className="history-content">
            <div className="history-text">
              <h2 className="section-title" style={{ textAlign: 'left' }}>Nossa História</h2>
              <p>O Alma Instituto de Desenvolvimento Social é uma associação sem fins lucrativos que nasceu com o objetivo de contribuir com aqueles que mais precisam e promover justiça social e dignidade. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate velit quae veniam totam dicta facilis iste? Consequuntur doloribus, commodi quod veniam dolorem repellat temporibus veritatis quibusdam facilis blanditiis eos earum.</p>
              <p>Desde a nossa fundação, já impactamos milhares de vidas através de projetos focados em educação, segurança alimentar e desenvolvimento comunitário.</p>
            </div>
            <div className="history-image">
              {/* Este caminho 'images/dono.jpg' funciona porque
                  movemos a pasta 'images' para dentro da 'public' */}
              <img src="images/dono.jpg" alt="Voluntários do Instituto Alma em ação" />
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Nossos Pilares</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Missão</h3>
              <p>Promover o desenvolvimento humano e a inclusão social por meio de ações educativas e de solidariedade, visando a construção de uma sociedade mais justa e igualitária.</p>
            </div>
            <div className="value-card">
              <h3>Visão</h3>
              <p>Ser uma referência de transformação social, reconhecida pela excelência de suas ações e pelo impacto positivo e duradouro na vida das pessoas e comunidades atendidas.</p>
            </div>
            <div className="value-card">
              <h3>Valores</h3>
              <p>Ética, Transparência, Respeito à diversidade, Empatia, Compromisso com a comunidade e Inovação social.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="founder-section">
        <div className="container">
          <div className="founder-content">
            <div className="founder-image">
              <img src="images/dono.jpg" alt="Foto do Fundador do Instituto" />
            </div>
            <div className="founder-text">
              <h2 className="section-title" style={{ textAlign: 'left' }}>Nosso Fundador</h2>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae, dignissimos ipsa? Adipisci aut amet odio delectus mollitia ratione eligendi cum voluptate tempore tenetur architecto omnis atque, earum nemo eos. Adipisci.</p>
              <p><strong>Nome do Fundador</strong><br />Presidente e Fundador do Instituto Alma</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}