// src/pages/AdminAtividadesPage.jsx
import React, { useState, useEffect } from 'react';
import authFetch from '../utils/authFetch'; // <-- IMPORTA O HELPER

export default function AdminAtividadesPage() {
  
  const [titulo, setTitulo] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [descCurta, setDescCurta] = useState('');
  const [descLonga, setDescLonga] = useState('');
  const [atividadesList, setAtividadesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const fetchAtividades = async () => {
    try {
      setLoading(true);
      // TROCA 'fetch' POR 'authFetch'
      const response = await authFetch('http://localhost:3001/api/atividades'); 
      if (!response.ok) {
        if (response.status === 401) window.location.href = '/login';
        throw new Error('Erro ao buscar atividades');
      }
      const data = await response.json();
      setAtividadesList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
      setAtividadesList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAtividades();
  }, []);

  const resetForm = () => {
    setTitulo(''); setImgUrl(''); setDescCurta(''); setDescLonga(''); setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const atividadeData = { titulo, img_url: imgUrl, desc_curta: descCurta, desc_longa: descLonga };
    const isEditing = editingId !== null;
    const url = isEditing 
      ? `http://localhost:3001/api/atividades/${editingId}`
      : 'http://localhost:3001/api/atividades';
    const method = isEditing ? 'PUT' : 'POST';
    try {
      // TROCA 'fetch' POR 'authFetch'
      const response = await authFetch(url, {
        method: method,
        body: JSON.stringify(atividadeData),
      });
      if (!response.ok) throw new Error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} a atividade`);
      const savedData = await response.json();
      if (isEditing) {
        setAtividadesList(atividadesList.map(item => item.id_atividade === editingId ? savedData : item));
        alert('Atividade atualizada com sucesso!');
      } else {
        setAtividadesList([savedData, ...atividadesList]);
        alert('Nova atividade salva com sucesso!');
      }
      resetForm();
    } catch (error) {
      alert(`Erro ao salvar: ${error.message}`);
    }
  };

  const handleEditClick = (atividade) => {
    setEditingId(atividade.id_atividade);
    setTitulo(atividade.titulo);
    setImgUrl(atividade.img_url || '');
    setDescCurta(atividade.desc_curta);
    setDescLonga(atividade.desc_longa || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (idParaExcluir) => {
    if (editingId === idParaExcluir) resetForm();
    try {
      // TROCA 'fetch' POR 'authFetch'
      const response = await authFetch(`http://localhost:3001/api/atividades/${idParaExcluir}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Falha ao excluir a atividade.');
      setAtividadesList(atividadesList.filter(a => a.id_atividade !== idParaExcluir));
      alert('Atividade excluída com sucesso!');
    } catch (error) {
      alert(`Erro ao excluir: ${error.message}`);
    }
  };

  // ... (O JSX do 'return' continua exatamente o mesmo) ...
  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Gerenciar Atividades</h1>
        <p>Crie, edite ou exclua as postagens da página "Nossas Atividades".</p>
      </header>
      <section className="management-section">
        <h2>{editingId ? 'Editar Atividade' : 'Adicionar Nova Atividade'}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="ativ-titulo">Título da Atividade</label>
            <input 
              type="text" id="ativ-titulo" placeholder="Ex: Projeto Sopa Fraterna"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="ativ-imagem">URL da Imagem de Capa</label>
            <input 
              type="text" id="ativ-imagem" placeholder="Ex: /images/minha-foto.jpg"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <small>Use uma URL (ex: /images/foto.jpg) da sua pasta /public.</small>
          </div>
          <div className="input-group">
            <label htmlFor="ativ-desc-curta">Descrição Curta (para o card)</label>
            <input 
              type="text" id="ativ-desc-curta" placeholder="Uma frase curta que aparece no card." maxLength="100"
              value={descCurta}
              onChange={(e) => setDescCurta(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="ativ-desc-longa">Descrição Completa (para o modal)</label>
            <textarea 
              id="ativ-desc-longa" rows="6" placeholder="O texto completo que aparecerá no modal 'Ver detalhes'..."
              value={descLonga}
              onChange={(e) => setDescLonga(e.target.value)}
            ></textarea>
          </div>
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
      <section className="management-section">
        <h2>Atividades Publicadas</h2>
        {loading && <p>Carregando tabela de atividades...</p>}
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
              {atividadesList.map((atividade) => (
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
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}