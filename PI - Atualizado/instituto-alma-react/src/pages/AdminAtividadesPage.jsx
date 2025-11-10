// src/pages/AdminAtividadesPage.jsx

import React, { useState, useEffect } from 'react';

export default function AdminAtividadesPage() {
  
  // === ESTADO PARA O FORMULÁRIO ===
  const [titulo, setTitulo] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [descCurta, setDescCurta] = useState('');
  const [descLonga, setDescLonga] = useState('');
  
  // === ESTADO PARA A TABELA ===
  // CORREÇÃO 1: Garantir que é um array vazio
  const [atividadesList, setAtividadesList] = useState([]); 
  const [loading, setLoading] = useState(true);

  // === ESTADO: MODO DE EDIÇÃO ===
  const [editingId, setEditingId] = useState(null);

  // === FUNÇÃO PARA BUSCAR DADOS (GET) - CORRIGIDA ===
  const fetchAtividades = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/atividades');
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setAtividadesList(data);
      } else {
        console.error("Erro: A API de Atividades não retornou um array.", data);
        setAtividadesList([]); // Garante que seja um array
      }

    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
      setAtividadesList([]); // Garante array vazio em caso de falha total
    } finally {
      setLoading(false);
    }
  };

  // Carrega os dados da API quando a página abre
  useEffect(() => {
    fetchAtividades();
  }, []);

  // === LIMPAR O FORMULÁRIO ===
  const resetForm = () => {
    setTitulo('');
    setImgUrl('');
    setDescCurta('');
    setDescLonga('');
    setEditingId(null);
  };

  // === FUNÇÃO DE ENVIO DO FORMULÁRIO (POST ou PUT) ===
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const atividadeData = { titulo, img_url: imgUrl, desc_curta: descCurta, desc_longa: descLonga };
    const isEditing = editingId !== null;
    const url = isEditing ? `http://localhost:3001/api/atividades/${editingId}` : 'http://localhost:3001/api/atividades';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atividadeData),
      });
      if (!response.ok) throw new Error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} a atividade`);
      const savedOrUpdatedAtividade = await response.json();
      if (isEditing) {
        setAtividadesList(atividadesList.map(item => item.id_atividade === editingId ? savedOrUpdatedAtividade : item));
        alert('Atividade atualizada com sucesso!');
      } else {
        setAtividadesList([savedOrUpdatedAtividade, ...atividadesList]);
        alert('Nova atividade salva com sucesso!');
      }
      resetForm();
    } catch (error) {
      console.error('Falha ao enviar atividade:', error);
      alert(`Erro ao salvar: ${error.message}`);
    }
  };

  // === FUNÇÃO: CARREGAR PARA EDITAR ===
  const handleEditClick = (atividade) => {
    setEditingId(atividade.id_atividade);
    setTitulo(atividade.titulo);
    setImgUrl(atividade.img_url || '');
    setDescCurta(atividade.desc_curta);
    setDescLonga(atividade.desc_longa || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // === FUNÇÃO (DELETE) ===
  const handleDelete = async (idParaExcluir) => {
    if (editingId === idParaExcluir) resetForm();
    try {
      const response = await fetch(`http://localhost:3001/api/atividades/${idParaExcluir}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Falha ao excluir a atividade.');
      setAtividadesList(atividadesList.filter(a => a.id_atividade !== idParaExcluir));
      alert('Atividade excluída com sucesso!');
    } catch (error) {
      alert(`Erro ao excluir: ${error.message}`);
    }
  };

  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Gerenciar Atividades</h1>
        <p>Crie, edite ou exclua as postagens da página "Nossas Atividades".</p>
      </header>
      
      {/* Seção 1: Formulário (dinâmico) */}
      <section className="management-section">
        <h2>{editingId ? 'Editar Atividade' : 'Adicionar Nova Atividade'}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          {/* Input Título */}
          <div className="input-group">
            <label htmlFor="ativ-titulo">Título da Atividade</label>
            <input 
              type="text" id="ativ-titulo" placeholder="Ex: Projeto Sopa Fraterna"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required 
            />
          </div>
          {/* Input Imagem URL */}
          <div className="input-group">
            <label htmlFor="ativ-imagem">URL da Imagem de Capa</label>
            <input 
              type="text" id="ativ-imagem" placeholder="Ex: /images/minha-foto.jpg"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <small>Use uma URL (ex: /images/foto.jpg) da sua pasta /public.</small>
          </div>
          {/* Input Descrição Curta */}
          <div className="input-group">
            <label htmlFor="ativ-desc-curta">Descrição Curta (para o card)</label>
            <input 
              type="text" id="ativ-desc-curta" placeholder="Uma frase curta que aparece no card." maxLength="100"
              value={descCurta}
              onChange={(e) => setDescCurta(e.target.value)}
              required
            />
          </div>
          {/* Input Descrição Longa */}
          <div className="input-group">
            <label htmlFor="ativ-desc-longa">Descrição Completa (para o modal)</label>
            <textarea 
              id="ativ-desc-longa" rows="6" placeholder="O texto completo que aparecerá no modal 'Ver detalhes'..."
              value={descLonga}
              onChange={(e) => setDescLonga(e.target.value)}
            ></textarea>
          </div>
          {/* Botões */}
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Atualizar Atividade' : 'Salvar Atividade'}
          </button>
          {editingId && (
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={resetForm}
              style={{ marginLeft: '10px' }}
            >
              Cancelar Edição
            </button>
          )}
        </form>
      </section>
      
      {/* Seção 2: Tabela (com 'onClick' no botão editar) */}
      <section className="management-section">
        <h2>Atividades Publicadas</h2>
        
        {loading && <p>Carregando tabela de atividades...</p>}

        {/* CORREÇÃO 2: Adicionar a verificação de segurança aqui */}
        {!loading && Array.isArray(atividadesList) && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Título</th>
                <th>Descrição Curta</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Só mapeia se a lista estiver preenchida */}
              {atividadesList.length > 0 ? (
                atividadesList.map((atividade) => (
                  <tr key={atividade.id_atividade}>
                    <td>
                      <img 
                        src={atividade.img_url || '/images/teste.jpg'}
                        alt={atividade.titulo} 
                        style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                      />
                    </td>
                    <td>{atividade.titulo}</td>
                    <td>{atividade.desc_curta}</td>
                    <td>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '5px 10px' }}
                        onClick={() => handleEditClick(atividade)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '5px 10px', marginLeft: '5px' }}
                        onClick={() => handleDelete(atividade.id_atividade)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                // Mensagem amigável se a tabela estiver vazia
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>Nenhuma atividade cadastrada ainda.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        

      </section>
    </main>
  );
}