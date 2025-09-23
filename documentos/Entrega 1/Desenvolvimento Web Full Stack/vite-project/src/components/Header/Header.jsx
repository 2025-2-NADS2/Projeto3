import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.container}>
        {/* Logo que redireciona para "/" */}
        <Link to="/" className={styles.logo}>
          <img src="https://placehold.co/32x38" alt="Logo do Instituto" />
        </Link>

        <nav className={styles.mainNav}>
          <ul>
            <li><Link to="/about">Sobre Nós</Link></li>
            <li><a href="#">Nossas Atividades</a></li>
            <li><a href="#">Portal do doador</a></li>
            <li><a href="#">Transparência</a></li>
            <li><a href="#">Eventos</a></li>
          </ul>
        </nav>

        {/* Botão DOE - AQUI que redireciona para "/donate" */}
        <Link to="/donate" className={`${styles.btn} ${styles.btnDoador}`}>
          DOE - AQUI
        </Link>
      </div>
    </header>
  );
}

export default Header;
