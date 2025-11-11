// src/pages/AdminTransparenciaPage.jsx
import React, { useState, useEffect } from 'react';
import authFetch from '../utils/authFetch'; // <-- IMPORTA O HELPER

export default function AdminTransparenciaPage() {
  
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Relatório Financeiro');
  const [urlPdf, setUrlPdf] = useState('');
  const [documentosList, setDocumentosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const fetchDocumentos = async () => {
    try {
      setLoading(true);
      // TROCA 'fetch' POR 'authFetch'
      const response = await authFetch('http://localhost:3001/api/documentos');
      if (!response.ok) {
        if (response.status === 401) window.location.href = '/login';
        throw new Error('Erro ao buscar documentos');
      }
      const data = await response.json();
      setDocumentosList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      setDocumentosList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const resetForm = () => {
    setTitulo(''); setCategoria('Relatório Financeiro'); setUrlPdf(''); setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoDocumento = { titulo, categoria, url_pdf: urlPdf };
    const isEditing = editingId !== null;
    const url = isEditing ? `http://localhost:3001/api/documentos/${editingId}` : 'http://localhost:3001/api/documentos';
    const method = isEditing ? 'PUT' : 'POST';
    try {
      // TROCA 'fetch' POR 'authFetch'
      const response = await authFetch(url, {
        method: method,
        body: JSON.stringify(novoDocumento),
      });
      if (!response.ok) throw new Error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} o documento`);
      const savedData = await response.json();
      if (isEditing) {
        setDocumentosList(documentosList.map(item => item.id_documento === editingId ? savedData : item));
        alert('Documento atualizado com sucesso!');
      } else {
        setDocumentosList([savedData, ...documentosList]);
        alert('Documento salvo com sucesso!');
      }
      resetForm();
    } catch (error) {
      alert(`Erro ao salvar: ${error.message}`);
    }
  };

  const handleEditClick = (doc) => {
    setEditingId(doc.id_documento);
    setTitulo(doc.titulo);
    setCategoria(doc.categoria);
    setUrlPdf(doc.url_pdf);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (idParaExcluir) => {
    if (editingId === idParaExcluir) resetForm();
    try {
      // TROCA 'fetch' POR 'authFetch'
      const response = await authFetch(`http://localhost:3001/api/documentos/${idParaExcluir}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Falha ao excluir o documento.');
      setDocumentosList(documentosList.filter(doc => doc.id_documento !== idParaExcluir));
      alert('Documento excluído com sucesso!');
    } catch (error) {
      alert(`Erro ao excluir: ${error.message}`);
    }
  };

  // ... (O JSX do 'return' continua o mesmo, com os botões de editar/cancelar) ...
  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Gerenciar Transparência</h1>
        <p>Faça o upload de novos relatórios (PDF) para a página de transparência.</p>
      </header>
      <section className="management-section">
        <h2>{editingId ? 'Editar Documento' : 'Novo Documento (PDF)'}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="pdf-titulo">Título do Documento</label>
            <input 
              type="text" id="pdf-titulo" 
              placeholder="Ex: Relatório Financeiro - 2024" 
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="pdf-categoria">Categoria</label>
            <select 
              id="pdf-categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="Relatório Financeiro">Relatório Financeiro</option>
              <option value="Relatório de Atividades">Relatório de Atividades</option>
              <option value="Estatuto e Governança">Estatuto e Governança</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="pdf-file">URL do Arquivo (PDF)</label>
            <input 
              type="text" id="pdf-file" 
              placeholder="Ex: /documentos/relatorio-2024.pdf"
              value={urlPdf}
              onChange={(e) => setUrlPdf(e.target.value)}
              required
            />
            <small>Por enquanto, insira a URL do arquivo. O upload faremos depois.</small>
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Atualizar Documento' : 'Salvar Documento'}
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
        <h2>Documentos Publicados</h2>
        {loading && <p>Carregando documentos...</p>}
        {!loading && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {documentosList.length > 0 ? (
                documentosList.map((doc) => (
                  <tr key={doc.id_documento}>
                    <td>
                      <a href={doc.url_pdf} target="_blank" rel="noopener noreferrer">{doc.titulo}</a>
                    </td>
                    <td>{doc.categoria}</td>
                    <td>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '5px 10px' }}
                        onClick={() => handleEditClick(doc)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '5px 10px', marginLeft: '5px' }}
                        onClick={() => handleDelete(doc.id_documento)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>Nenhum documento cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}