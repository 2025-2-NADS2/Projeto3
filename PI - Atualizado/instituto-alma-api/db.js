// db.js
// Configura a conexão com o banco de dados

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env
dotenv.config();

// Cria o "pool" de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  
  // ===============================================
  // === ADICIONE ESTAS LINHAS PARA CONECTAR AO AZURE ===
  // Isso diz ao Node.js para usar uma conexão segura (SSL)
  // mas para não ser excessivamente rigoroso sobre o certificado.
  // É a correção padrão para conexões locais ao Azure.
  ssl: {
    rejectUnauthorized: false
  }
  // ===============================================
});

// Testa a conexão
pool.getConnection()
  .then(connection => {
    // Adicionamos (Azure) para sabermos que funcionou!
    console.log('✅ Conectado ao banco de dados MySQL (Azure)!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao banco de dados:', err.message);
  });

export default pool;