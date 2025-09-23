import React from 'react';
import styles from './AboutUs.module.css';

function AboutUs() {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.imagem}>
        <figure>
          <img src="https://placehold.co/1200x400" alt="Foto" />
          <div className={styles.alma}>
            <p>Sobre o INSTITUTO ALMA.</p>
          </div>
        </figure>
      </section>

      <section className={styles.historia}>
        <h2 className={styles.titulo}>Nossa História</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          velit quae veniam totam dicta facilis iste? Consequuntur doloribus,
          commodi quod veniam dolorem repellat temporibus veritatis quibusdam
          facilis blanditiis eos earum. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Cupiditate velit quae veniam totam dicta facilis
          iste? Consequuntur doloribus, commodi quod veniam dolorem repellat
          temporibus veritatis quibusdam facilis blanditiis eos earum. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Cupiditate velit
          quae veniam totam dicta facilis iste? Consequuntur doloribus, commodi
          quod veniam dolorem repellat temporibus veritatis quibusdam facilis
          blanditiis eos earum? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Cupiditate velit quae veniam totam dicta facilis
          iste? Consequuntur doloribus, commodi quod veniam dolorem repellat
          temporibus veritatis quibusdam facilis blanditiis eos earum?
        </p>
        <div className={styles.ima}>
          <img src="https://placehold.co/800x400" alt="Vídeo Institucional" />
        </div>
      </section>

      <section className={styles.valores}>
        <div className={styles.bloco}>
          <h2>Missão</h2>
          <img src="" alt="Foto" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            dolores saepe qui quis beatae ducimus voluptate aperiam quod velit
            animi, fugit tenetur neque alias eligendi repellendus, eveniet quia
            perferendis nobis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quas, dolores saepe qui quis beatae ducimus
            voluptate aperiam quod velit animi, fugit tenetur neque alias
            eligendi repellendus, eveniet quia perferendis nobis.
          </p>
        </div>
        <div className={styles.bloco}>
          <h2>Valores</h2>
          <img src="" alt="Foto" />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Praesentium neque iusto eveniet laudantium maiores quae quo eligendi
            cumque, repellat saepe temporibus soluta incidunt, et sapiente
            debitis culpa aspernatur impedit alias. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quas, dolores saepe qui quis beatae
            ducimus voluptate aperiam quod velit animi, fugit tenetur neque
            alias eligendi repellendus, eveniet quia perferendis nobis.
          </p>
        </div>
        <div className={styles.bloco}>
          <h2>Premissa</h2>
          <img src="" alt="Foto" />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Praesentium neque iusto eveniet laudantium maiores quae quo eligendi
            cumque, repellat saepe temporibus soluta incidunt, et sapiente
            debitis culpa aspernatur impedit alias. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quas, dolores saepe qui quis beatae
            ducimus voluptate aperiam quod velit animi, fugit tenetur neque
            alias eligendi repellendus, eveniet quia perferendis nobis.
          </p>
        </div>
      </section>

      <section className={styles.fundador}>
        <article className={styles.fun}>
          <h2>Fundador</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repudiandae, dignissimos ipsa? Adipisci aut amet odio delectus
            mollitia ratione eligendi cum voluptate tempore tenetur architecto
            omnis atque, earum nemo eos. Adipisci. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repudiandae, dignissimos ipsa? Adipisci aut amet odio delectus
            mollitia ratione eligendi cum voluptate tempore tenetur architecto
            omnis atque, earum nemo eos. Adipisci. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repudiandae, dignissimos ipsa? Adipisci aut amet odio delectus
            mollitia ratione eligendi cum voluptate tempore tenetur architecto
            omnis atque, earum nemo eos. Adipisci.
          </p>
        </article>
        <img
          src="https://placehold.co/400x600"
          alt="Foto do Fundador do INSTITUTO ALMA."
        />
      </section>
    </main>
  );
}

export default AboutUs;