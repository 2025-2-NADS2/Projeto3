// db.js
// Configura a conexão com o banco de dados

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env
dotenv.config();

// Cria o "pool" de conexões
// Um pool é mais eficiente do que criar uma conexão para cada consulta
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testa a conexão (opcional, mas bom para debug)
pool.getConnection()
  .then(connection => {
    console.log('✅ Conectado ao banco de dados MySQL!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao banco de dados:', err.message);
  });

export default pool;