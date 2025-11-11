// server.js
// API com Rotas de Admin Protegidas por JWT

import express from 'express';
import cors from 'cors';
import pool from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// IMPORTA O NOSSO "SEGURANÇA"
import authMiddleware from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3001;
// Defina a chave secreta (deve ser a mesma no authMiddleware)
const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-muito-segura';

// === Middlewares ===
app.use(cors());
app.use(express.json());

// ===================================
// === ROTAS PÚBLICAS (Autenticação) ===
// ===================================
// (Não precisam de authMiddleware)

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  const { nome, email, senha, cpf, tipo_usuario_id = 1 } = req.body; // Padrão 1 = Doador
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }
  try {
    const [existingUser] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    const sql = 'INSERT INTO usuarios (nome, email, senha, cpf, id_tipo_usuario) VALUES (?, ?, ?, ?, ?)';
    const [result] = await pool.query(sql, [nome, email, senhaHash, cpf || null, tipo_usuario_id]);
    res.status(201).json({ message: 'Usuário criado com sucesso!', userId: result.insertId });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    const payload = {
      id: user.id_usuario,
      tipo_usuario_id: user.id_tipo_usuario // Inclui o tipo de usuário no token
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); // Token expira em 1 dia
    res.json({ 
      token, 
      tipo_usuario_id: user.id_tipo_usuario // Envia o tipo para o React
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no servidor durante o login.' });
  }
});


// ===========================================
// === ROTAS PÚBLICAS (Leitura de Conteúdo) ===
// ===========================================
// (Não precisam de authMiddleware)

// GET /api/atividades (Público)
app.get('/api/atividades', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM atividades ORDER BY id_atividade DESC');
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar atividades.' }); }
});

// GET /api/eventos (Público)
app.get('/api/eventos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM eventos ORDER BY id_evento DESC');
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar eventos.' }); }
});

// GET /api/documentos (Público)
app.get('/api/documentos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM documentos ORDER BY id_documento DESC');
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar documentos.' }); }
});

// POST /api/ouvidoria (Público)
app.post('/api/ouvidoria', async (req, res) => {
  const { isAnonimo, nome, email, tipo, mensagem } = req.body;
  if (!tipo || !mensagem) return res.status(400).json({ message: 'Tipo e Mensagem são obrigatórios.' });
  if (!isAnonimo && (!nome || !email)) return res.status(400).json({ message: 'Nome e Email são obrigatórios.' });
  const sql = `INSERT INTO ouvidoria (tipo, mensagem, email_contato, status, nome_contato) VALUES (?, ?, ?, 'Novo', ?)`;
  const values = [ tipo, mensagem, isAnonimo ? null : email, isAnonimo ? null : nome ];
  try {
    await pool.query(sql, values);
    res.status(201).json({ message: 'Manifestação enviada com sucesso!' });
  } catch (error) { res.status(500).json({ message: 'Erro ao salvar sua mensagem no banco.' }); }
});


// ===================================
// === ROTAS PROTEGIDAS (Admin & Doador) ===
// ===================================
// (Todas as rotas abaixo AGORA usam o 'authMiddleware')

// --- Atividades ---
// Adicionamos 'authMiddleware' antes da função async
app.post('/api/atividades', authMiddleware, async (req, res) => {
  const { titulo, img_url, desc_curta, desc_longa } = req.body;
  if (!titulo || !desc_curta) return res.status(400).json({ message: 'Título e Descrição Curta são obrigatórios.' });
  const sql = `INSERT INTO atividades (titulo, img_url, desc_curta, desc_longa) VALUES (?, ?, ?, ?)`;
  const values = [titulo, img_url || null, desc_curta, desc_longa || null];
  try {
    const [result] = await pool.query(sql, values);
    const [newRow] = await pool.query('SELECT * FROM atividades WHERE id_atividade = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (error) { res.status(500).json({ message: 'Erro ao inserir atividade.' }); }
});

app.put('/api/atividades/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { titulo, img_url, desc_curta, desc_longa } = req.body;
  if (!titulo || !desc_curta) return res.status(400).json({ message: 'Título e Descrição Curta são obrigatórios.' });
  const sql = `UPDATE atividades SET titulo = ?, img_url = ?, desc_curta = ?, desc_longa = ? WHERE id_atividade = ?`;
  const values = [titulo, img_url || null, desc_curta, desc_longa || null, id];
  try {
    await pool.query(sql, values);
    const [updatedRow] = await pool.query('SELECT * FROM atividades WHERE id_atividade = ?', [id]);
    res.status(200).json(updatedRow[0]);
  } catch (error) { res.status(500).json({ message: 'Erro ao atualizar atividade.' }); }
});

app.delete('/api/atividades/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM atividades WHERE id_atividade = ?';
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Atividade não encontrada.' });
    res.status(200).json({ message: 'Atividade excluída com sucesso.' });
  } catch (error) { res.status(500).json({ message: 'Erro ao excluir atividade.' }); }
});

// --- Eventos ---
app.post('/api/eventos', authMiddleware, async (req, res) => {
  const { titulo, data_evento, img_url, desc_curta, desc_longa } = req.body;
  if (!titulo || !desc_curta || !data_evento) return res.status(400).json({ message: 'Título, Data e Descrição Curta são obrigatórios.' });
  const sql = `INSERT INTO eventos (titulo, data_evento, img_url, desc_curta, desc_longa) VALUES (?, ?, ?, ?, ?)`;
  const values = [titulo, data_evento, img_url || null, desc_curta, desc_longa || null];
  try {
    const [result] = await pool.query(sql, values);
    const [newRow] = await pool.query('SELECT * FROM eventos WHERE id_evento = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (error) { res.status(500).json({ message: 'Erro ao inserir evento.' }); }
});

app.put('/api/eventos/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { titulo, data_evento, img_url, desc_curta, desc_longa } = req.body;
  if (!titulo || !desc_curta || !data_evento) return res.status(400).json({ message: 'Título, Data e Descrição Curta são obrigatórios.' });
  const sql = `UPDATE eventos SET titulo = ?, data_evento = ?, img_url = ?, desc_curta = ?, desc_longa = ? WHERE id_evento = ?`;
  const values = [titulo, data_evento, img_url || null, desc_curta, desc_longa || null, id];
  try {
    await pool.query(sql, values);
    const [updatedRow] = await pool.query('SELECT * FROM eventos WHERE id_evento = ?', [id]);
    res.status(200).json(updatedRow[0]);
  } catch (error) { res.status(500).json({ message: 'Erro ao atualizar evento.' }); }
});

app.delete('/api/eventos/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM eventos WHERE id_evento = ?';
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Evento não encontrado.' });
    res.status(200).json({ message: 'Evento excluído com sucesso.' });
  } catch (error) { res.status(500).json({ message: 'Erro ao excluir evento.' }); }
});

// --- Relatórios (Doações) ---
// (Note que as rotas de GET do admin/doador também devem ser protegidas!)
app.get('/api/admin/doacoes', authMiddleware, async (req, res) => {
  const { whereSql, params } = construirFiltrosWhere(req.query);
  const sql = `SELECT * FROM vw_relatorio_doacoes ${whereSql} ORDER BY data_doacao DESC`;
  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar dados das doações.' }); }
});

app.get('/api/admin/grafico-doacoes', authMiddleware, async (req, res) => {
  const { whereSql, params } = construirFiltrosWhere(req.query);
  const sql = `SELECT MONTH(data_doacao) as mes, SUM(valor) as total FROM vw_relatorio_doacoes ${whereSql} GROUP BY MONTH(data_doacao) ORDER BY mes ASC`;
  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar dados do gráfico.' }); }
});

// --- Documentos (Transparência) ---
app.post('/api/documentos', authMiddleware, async (req, res) => {
  const { titulo, categoria, url_pdf } = req.body;
  if (!titulo || !categoria || !url_pdf) return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  const sql = `INSERT INTO documentos (titulo, categoria, url_pdf) VALUES (?, ?, ?)`;
  try {
    const [result] = await pool.query(sql, [titulo, categoria, url_pdf]);
    const [newRow] = await pool.query('SELECT * FROM documentos WHERE id_documento = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (error) { res.status(500).json({ message: 'Erro ao salvar documento.' }); }
});

app.put('/api/documentos/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { titulo, categoria, url_pdf } = req.body;
  if (!titulo || !categoria || !url_pdf) return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  const sql = `UPDATE documentos SET titulo = ?, categoria = ?, url_pdf = ? WHERE id_documento = ?`;
  const values = [titulo, categoria, url_pdf, id];
  try {
    await pool.query(sql, values);
    const [updatedRow] = await pool.query('SELECT * FROM documentos WHERE id_documento = ?', [id]);
    res.status(200).json(updatedRow[0]);
  } catch (error) { res.status(500).json({ message: 'Erro ao atualizar documento.' }); }
});

app.delete('/api/documentos/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM documentos WHERE id_documento = ?';
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Documento não encontrado.' });
    res.status(200).json({ message: 'Documento excluído com sucesso.' });
  } catch (error) { res.status(500).json({ message: 'Erro ao excluir documento.' }); }
});


// --- Ouvidoria (Admin) ---
app.get('/api/ouvidoria', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ouvidoria ORDER BY id_mensagem DESC');
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar mensagens.' }); }
});

app.delete('/api/ouvidoria/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM ouvidoria WHERE id_mensagem = ?';
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Mensagem não encontrada.' });
    res.status(200).json({ message: 'Mensagem excluída com sucesso.' });
  } catch (error) { res.status(500).json({ message: 'Erro ao excluir mensagem.' }); }
});

// ===================================
// === ROTAS PROTEGIDAS (Doador) ===
// ===================================
// (Aqui você pode adicionar rotas específicas do doador, se necessário,
//  por exemplo, para atualizar seus próprios dados ou ver seu histórico
//  Note que o GET do histórico do admin já está protegido,
//  precisaríamos de um específico para o doador que filtre pelo ID do token)


// --- Função Helper (movida para o final) ---
const construirFiltrosWhere = (query) => {
  const { data_inicio, data_fim, status } = query;
  const params = [];
  const whereClauses = [];
  if (data_inicio) {
    whereClauses.push('data_doacao >= ?');
    params.push(data_inicio);
  }
  if (data_fim) {
    whereClauses.push('data_doacao <= ?');
    params.push(data_fim + ' 23:59:59');
  }
  if (status) {
    whereClauses.push('status_pagamento = ?');
    params.push(status);
  }
  const whereSql = whereClauses.length > 0 ? ' WHERE ' + whereClauses.join(' AND ') : '';
  return { whereSql, params };
};

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor da API rodando em http://localhost:${PORT}`);
});