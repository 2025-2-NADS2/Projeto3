// server.js
// API Full CRUD para Atividades e Eventos

import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// === Middlewares ===
app.use(cors());
app.use(express.json());

// === Rota de Teste ===
app.get('/', (req, res) => {
  res.json({ message: 'API do Instituto Alma está funcionando!' });
});

// ===================================
// === ROTAS DE ATIVIDADES (CRUD) ===
// ===================================

// GET (Read)
app.get('/api/atividades', async (req, res) => {
  console.log('GET /api/atividades');
  try {
    const [rows] = await pool.query('SELECT * FROM atividades ORDER BY id_atividade DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar atividades.' });
  }
});

// POST (Create)
app.post('/api/atividades', async (req, res) => {
  console.log('POST /api/atividades');
  const { titulo, img_url, desc_curta, desc_longa } = req.body;
  if (!titulo || !desc_curta) {
    return res.status(400).json({ message: 'Título e Descrição Curta são obrigatórios.' });
  }
  const sql = `INSERT INTO atividades (titulo, img_url, desc_curta, desc_longa) VALUES (?, ?, ?, ?)`;
  const values = [titulo, img_url || null, desc_curta, desc_longa || null];
  try {
    const [result] = await pool.query(sql, values);
    const [newRow] = await pool.query('SELECT * FROM atividades WHERE id_atividade = ?', [result.insertId]);
    res.status(201).json(newRow[0]); // Retorna o objeto completo
  } catch (error) {
    res.status(500).json({ message: 'Erro ao inserir atividade.' });
  }
});

// PUT (Update/Editar)
app.put('/api/atividades/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, img_url, desc_curta, desc_longa } = req.body;
  console.log(`PUT /api/atividades/${id}`);
  
  if (!titulo || !desc_curta) {
    return res.status(400).json({ message: 'Título e Descrição Curta são obrigatórios.' });
  }

  const sql = `
    UPDATE atividades 
    SET titulo = ?, img_url = ?, desc_curta = ?, desc_longa = ?
    WHERE id_atividade = ?
  `;
  const values = [titulo, img_url || null, desc_curta, desc_longa || null, id];

  try {
    await pool.query(sql, values);
    const [updatedRow] = await pool.query('SELECT * FROM atividades WHERE id_atividade = ?', [id]);
    res.status(200).json(updatedRow[0]); // Retorna o objeto atualizado
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error);
    res.status(500).json({ message: 'Erro ao atualizar dados no banco.' });
  }
});


// DELETE (Excluir)
app.delete('/api/atividades/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /api/atividades/${id}`);
  const sql = 'DELETE FROM atividades WHERE id_atividade = ?';
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Atividade não encontrada.' });
    }
    res.status(200).json({ message: 'Atividade excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir dados do banco.' });
  }
});


// ===================================
// === ROTAS DE EVENTOS (CRUD) ===
// ===================================

// GET (Read)
app.get('/api/eventos', async (req, res) => {
  console.log('GET /api/eventos');
  try {
    const [rows] = await pool.query('SELECT * FROM eventos ORDER BY id_evento DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar eventos.' });
  }
});

// POST (Create)
app.post('/api/eventos', async (req, res) => {
  console.log('POST /api/eventos');
  const { titulo, data_evento, img_url, desc_curta, desc_longa } = req.body;
  if (!titulo || !desc_curta || !data_evento) {
    return res.status(400).json({ message: 'Título, Data e Descrição Curta são obrigatórios.' });
  }
  const sql = `INSERT INTO eventos (titulo, data_evento, img_url, desc_curta, desc_longa) VALUES (?, ?, ?, ?, ?)`;
  const values = [titulo, data_evento, img_url || null, desc_curta, desc_longa || null];
  try {
    const [result] = await pool.query(sql, values);
    const [newRow] = await pool.query('SELECT * FROM eventos WHERE id_evento = ?', [result.insertId]);
    res.status(201).json(newRow[0]); // Retorna o objeto completo
  } catch (error) {
    res.status(500).json({ message: 'Erro ao inserir evento.' });
  }
});

// PUT (Update/Editar)
app.put('/api/eventos/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, data_evento, img_url, desc_curta, desc_longa } = req.body;
  console.log(`PUT /api/eventos/${id}`);

  if (!titulo || !desc_curta || !data_evento) {
    return res.status(400).json({ message: 'Título, Data e Descrição Curta são obrigatórios.' });
  }

  const sql = `
    UPDATE eventos 
    SET titulo = ?, data_evento = ?, img_url = ?, desc_curta = ?, desc_longa = ?
    WHERE id_evento = ?
  `;
  const values = [titulo, data_evento, img_url || null, desc_curta, desc_longa || null, id];

  try {
    await pool.query(sql, values);
    const [updatedRow] = await pool.query('SELECT * FROM eventos WHERE id_evento = ?', [id]);
    res.status(200).json(updatedRow[0]); // Retorna o objeto atualizado
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    res.status(500).json({ message: 'Erro ao atualizar dados no banco.' });
  }
});


// DELETE (Excluir)
app.delete('/api/eventos/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /api/eventos/${id}`);
  const sql = 'DELETE FROM eventos WHERE id_evento = ?';
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }
    res.status(200).json({ message: 'Evento excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir dados do banco.' });
  }
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor da API rodando em http://localhost:${PORT}`);
});