import React from 'react';
import styles from './MainContent.module.css';

function MainContent() {
  return (
    <main>
      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          <div className={`${styles.carouselSlide} ${styles.currentSlide}`}>
            <img src="https://placehold.co/800x400/F4A261/white?text=IMAGEM+1" alt="Imagem 1" />
          </div>
          <div className={styles.carouselSlide}>
            <img src="https://placehold.co/800x400/2A9D8F/white?text=IMAGEM+2" alt="Imagem 2" />
          </div>
          <div className={styles.carouselSlide}>
            <img src="https://placehold.co/800x400/E76F51/white?text=IMAGEM+3" alt="Imagem 3" />
          </div>
        </div>
        <button className={`${styles.carouselButton} ${styles.prev}`}>◀</button>
        <button className={`${styles.carouselButton} ${styles.next}`}>▶</button>
        <div className={styles.carouselNav}>
          <button className={`${styles.carouselDot} ${styles.currentSlide}`}></button>
          <button className={styles.carouselDot}></button>
          <button className={styles.carouselDot}></button>
        </div>
      </div>

      <section className={styles.aboutSection}>
        <h2 className={styles.sectionTitle}>Nossa História</h2>
        <div className={styles.aboutCard}>
          <div className={styles.aboutText}>
            <p>O Alma Instituto de Desenvolvimento Social é uma associação sem fins lucrativos que nasceu com o objetivo contribuir com aqueles que mais precisam e promover justiça social e dignidade.</p>
            <span className={styles.founderName}>Fundador - Nome</span>
          </div>
          <div className={styles.aboutImage}>
            <img src="https://placehold.co/131x131" alt="Foto do Fundador" />
          </div>
        </div>
      </section>

      <section className={styles.projectsSection}>
        <h2 className={styles.sectionTitle}>Projetos</h2>
        <div className={styles.projectsGrid}>
          <div className={styles.projectCard}>
            <div className={styles.cardImage}>
              <img src="https://placehold.co/120x109/cccccc/333?text=Imagem" alt="Projeto Natal" />
              <span className={styles.cardTag}>Natal</span>
            </div>
            <div className={styles.cardBody}>
              <p>Seja um voluntário nesse dia mágico.</p>
              <a href="#" className={`${styles.btn} ${styles.btnCard}`}>Inscreva-se</a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.cardImage}>
              <img src="https://placehold.co/120x109/cccccc/333?text=Imagem" alt="Projeto Páscoa" />
              <span className={styles.cardTag}>Páscoa</span>
            </div>
            <div className={styles.cardBody}>
              <p>Leve alegria e chocolate para crianças.</p>
              <a href="#" className={`${styles.btn} ${styles.btnCard}`}>Inscreva-se</a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.cardImage}>
              <img src="https://placehold.co/120x109/cccccc/333?text=Imagem" alt="Projeto Inverno" />
              <span className={styles.cardTag}>Inverno</span>
            </div>
            <div className={styles.cardBody}>
              <p>Doe um agasalho e aqueça uma vida.</p>
              <a href="#" className={`${styles.btn} ${styles.btnCard}`}>Inscreva-se</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MainContent;