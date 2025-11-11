// server.js
// API Full CRUD + Relatórios + Admin Completo + POST Público + Autenticação

import express from 'express';
import cors from 'cors';
import pool from './db.js';
import bcrypt from 'bcryptjs'; // Importa o bcrypt
import jwt from 'jsonwebtoken'; // Importa o jsonwebtoken
// Importa o middleware (verifique se o caminho está correto)
import authMiddleware from './middleware/authMiddleware.js'; 

const app = express();
const PORT = process.env.PORT || 3001;
// Defina sua chave secreta no .env ou use esta
const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-muito-segura';

// === Middlewares ===
app.use(cors());
app.use(express.json()); // <-- ESTA LINHA É CRUCIAL PARA O LOGIN FUNCIONAR

// ===================================
// === ROTAS DE AUTENTICAÇÃO (Login/Cadastro) ===
// ===================================

// POST /api/auth/register (Cadastro)
app.post('/api/auth/register', async (req, res) => {
  console.log('POST /api/auth/register', req.body);
  const { nome, email, senha, cpf, telefone } = req.body;
  const idTipoUsuario = 1; // 1 = Doador (padrão)

  if (!nome || !email || !senha || !cpf) {
    return res.status(400).json({ message: 'Nome, email, senha e CPF são obrigatórios.' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    const sql = `
      INSERT INTO usuarios (nome, email, senha, cpf, telefone, id_tipo_usuario) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [nome, email, senhaHash, cpf, telefone || null, idTipoUsuario];
    const [result] = await pool.query(sql, values);
    res.status(201).json({ id: result.insertId, nome: nome, email: email });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email ou CPF já cadastrado.' });
    }
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

// POST /api/auth/login (Login)
app.post('/api/auth/login', async (req, res) => {
  console.log('POST /api/auth/login', req.body);
  
  // O React agora envia 'tipo' (com 't' minúsculo), então lemos 'tipo'
  const { email, senha, tipo } = req.body; // tipo = 'Doador' ou 'Administrador'

  if (!email || !senha || !tipo) {
    return res.status(400).json({ message: 'Email, senha e tipo são obrigatórios.' });
  }

  try {
    const sql = `
      SELECT u.*, tu.descricao as tipo_descricao
      FROM usuarios u
      JOIN tipos_usuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
      WHERE u.email = ? AND tu.descricao = ?
    `;
    const [rows] = await pool.query(sql, [email, tipo]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }
    const user = rows[0];

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const payload = { id: user.id_usuario, tipo: user.tipo_descricao };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Correção: Envia o token E o objeto do usuário
    res.json({ 
      token,
      user: {
        id: user.id_usuario,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo_descricao
      } 
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro no servidor durante o login.' });
  }
});


// ===================================
// === ROTAS PROTEGIDAS (Admin e Doador) ===
// (O "Segurança" authMiddleware é aplicado aqui)
// ===================================

// --- Rotas de Atividades ---
// GET (Público - não precisa de auth)
app.get('/api/atividades', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM atividades ORDER BY id_atividade DESC');
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar atividades.' }); }
});
// POST (Protegido)
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
// PUT (Protegido)
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
// DELETE (Protegido)
app.delete('/api/atividades/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM atividades WHERE id_atividade = ?';
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Atividade não encontrada.' });
    res.status(200).json({ message: 'Atividade excluída com sucesso.' });
  } catch (error) { res.status(500).json({ message: 'Erro ao excluir atividade.' }); }
});

// --- Rotas de Eventos ---
// GET (Público)
app.get('/api/eventos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM eventos ORDER BY id_evento DESC');
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar eventos.' }); }
});
// POST (Protegido)
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
// PUT (Protegido)
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
// DELETE (Protegido)
app.delete('/api/eventos/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM eventos WHERE id_evento = ?';
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Evento não encontrado.' });
    res.status(200).json({ message: 'Evento excluído com sucesso.' });
  } catch (error) { res.status(500).json({ message: 'Erro ao excluir evento.' }); }
});

// --- Rotas de Relatórios (Doações) ---
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
// GET (Protegido)
app.get('/api/admin/doacoes', authMiddleware, async (req, res) => {
  const { whereSql, params } = construirFiltrosWhere(req.query);
  const sql = `SELECT * FROM vw_relatorio_doacoes ${whereSql} ORDER BY data_doacao DESC`;
  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar dados das doações.' }); }
});
// GET (Protegido)
app.get('/api/admin/grafico-doacoes', authMiddleware, async (req, res) => {
  const { whereSql, params } = construirFiltrosWhere(req.query);
  const sql = `
    SELECT MONTH(data_doacao) as mes, SUM(valor) as total
    FROM vw_relatorio_doacoes ${whereSql}
    GROUP BY MONTH(data_doacao) ORDER BY mes ASC
  `;
  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar dados do gráfico.' }); }
});
// GET (Protegido - Doador vê seu próprio histórico)
app.get('/api/doador/doacoes', authMiddleware, async (req, res) => {
  const idDoador = req.user.id; 
  const sql = `SELECT * FROM vw_relatorio_doacoes WHERE id_usuario = ? ORDER BY data_doacao DESC`;
  try {
    const [rows] = await pool.query(sql, [idDoador]);
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar seu histórico de doações.' }); }
});

// --- Rotas de Documentos (Transparência) ---
// GET (Público)
app.get('/api/documentos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM documentos ORDER BY id_documento DESC');
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar documentos.' }); }
});
// POST (Protegido)
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
// PUT (Protegido)
app.put('/api/documentos/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { titulo, categoria, url_pdf } = req.body;
  if (!titulo || !categoria || !url_pdf) return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  const sql = `UPDATE documentos SET titulo = ?, categoria = ?, url_pdf = ? WHERE id_documento = ?`;
  try {
    await pool.query(sql, [titulo, categoria, url_pdf, id]);
    const [updatedRow] = await pool.query('SELECT * FROM documentos WHERE id_documento = ?', [id]);
    res.status(200).json(updatedRow[0]);
  } catch (error) { res.status(500).json({ message: 'Erro ao atualizar documento.' }); }
});
// DELETE (Protegido)
app.delete('/api/documentos/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM documentos WHERE id_documento = ?';
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Documento não encontrado.' });
    res.status(200).json({ message: 'Documento excluído com sucesso.' });
  } catch (error) { res.status(500).json({ message: 'Erro ao excluir documento.' }); }
});


// --- Rotas da Ouvidoria ---
// GET (Protegido)
app.get('/api/ouvidoria', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ouvidoria ORDER BY id_mensagem DESC');
    res.json(rows);
  } catch (error) { res.status(500).json({ message: 'Erro ao buscar mensagens.' }); }
});
// POST (Público)
app.post('/api/ouvidoria', async (req, res) => {
  const { isAnonimo, nome, email, tipo, mensagem } = req.body;
  if (!tipo || !mensagem) return res.status(400).json({ message: 'Tipo e Mensagem são obrigatórios.' });
  if (!isAnonimo && (!nome || !email)) return res.status(400).json({ message: 'Nome e Email são obrigatórios.' });
  const sql = `
    INSERT INTO ouvidoria (tipo, mensagem, email_contato, status, data_envio) 
    VALUES (?, ?, ?, 'Novo', NOW())
  `;
  const values = [ tipo, mensagem, isAnonimo ? null : email ];
  try {
    await pool.query(sql, values);
    res.status(201).json({ message: 'Manifestação enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar mensagem da ouvidoria:', error);
    res.status(500).json({ message: 'Erro ao salvar sua mensagem no banco.' });
  }
});
// DELETE (Protegido)
app.delete('/api/ouvidoria/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM ouvidoria WHERE id_mensagem = ?';
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Mensagem não encontrada.' });
    res.status(200).json({ message: 'Mensagem excluída com sucesso.' });
  } catch (error) { res.status(500).json({ message: 'Erro ao excluir mensagem.' }); }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor da API rodando em http://localhost:${PORT}`);
});