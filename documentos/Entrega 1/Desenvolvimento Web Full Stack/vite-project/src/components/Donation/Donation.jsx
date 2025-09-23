import React from 'react';
import styles from './Donation.module.css';

function Donation() {
  return (
    <main>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1>Ajude.<br />Doe.</h1>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.container}>
          <p>
            Ainda hoje, milhões de pessoas vivem em povoados isolados no sertão nordestino, a região
            com o maior foco de miséria do país, enfrentando diariamente a fome, sem ter para quem pedir
            ajuda.
          </p>
        </div>
      </section>

      <section className={styles.donationPlanSection}>
        <div className={styles.container}>
          <h2>Plano de Doação</h2>
          <div className={styles.donationToggle}>
            <button className={`${styles.toggleBtn} ${styles.active}`}>MENSAL</button>
            <button className={styles.toggleBtn}>ÚNICA</button>
          </div>
          <div className={styles.donationOptions}>
            <div className={styles.optionCard}>
              <div className={styles.optionImg}>Foto</div>
              <div className={styles.optionDetails}>
                <h3>Cesta Básica</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className={styles.optionAction}>
                <span className={styles.price}>R$ 30 /MÊS</span>
                <a href="#">ESCOLHER</a>
              </div>
            </div>
            <div className={styles.optionCard}>
              <div className={styles.optionImg}>Foto</div>
              <div className={styles.optionDetails}>
                <h3>Gestantes</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className={styles.optionAction}>
                <span className={styles.price}>R$ 50 /MÊS</span>
                <a href="#">ESCOLHER</a>
              </div>
            </div>
            <div className={styles.optionCard}>
              <div className={styles.optionImg}>Foto</div>
              <div className={styles.optionDetails}>
                <h3>Outros</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className={styles.optionAction}>
                <span className={styles.price}>R$ Digite...</span>
                <a href="#">ESCOLHER</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            <div className={styles.formColumn}>
              <h3>Dados Pessoais</h3>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">E-mail:</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="cpf">CPF:</label>
                <input type="text" id="cpf" name="cpf" />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phone">Telefone:</label>
                <input type="tel" id="phone" name="phone" />
              </div>
            </div>
            <div className={styles.formColumn}>
              <h3>Forma de Pagamento</h3>
              <div className={styles.paymentOptions}>
                <div className={styles.paymentOption}>
                  <label htmlFor="pix">PIX</label>
                  <input type="radio" id="pix" name="payment" value="pix" defaultChecked />
                </div>
                <div className={styles.paymentOption}>
                  <label htmlFor="boleto">BOLETO</label>
                  <input type="radio" id="boleto" name="payment" value="boleto" />
                </div>
                <div className={styles.paymentOption}>
                  <label htmlFor="credito">CRÉDITO</label>
                  <input type="radio" id="credito" name="payment" value="credito" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Donation;