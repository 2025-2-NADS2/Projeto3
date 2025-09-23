import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.mainFooter}>
      <div className={`${styles.container} ${styles.footerContent}`}>
        <img src="https://placehold.co/41x39" alt="Logo do Rodapé" className={styles.footerLogo} />
        <div className={styles.footerInfoBox}>
          <h4>Siga nas redes Sociais!</h4>
          <div className={styles.socialIcons}>
            <a href="#" className={`${styles.socialIcon} ${styles.facebook}`}></a>
            <a href="#" className={`${styles.socialIcon} ${styles.instagram}`}></a>
          </div>
        </div>
        <div className={styles.footerInfoBox}>
          <img src="https://placehold.co/23x19" alt="Ícone de Localização" />
          <p className={styles.address}>Av. Gustavo Adolfo, 1856 - Vila Gustavo, São Paulo - SP</p>
        </div>
        <div className={styles.footerInfoBox}>
          <div className={styles.contactIcon}></div>
          <h4>Contato Cell</h4>
        </div>
      </div>
    </footer>
  );
}

export default Footer;