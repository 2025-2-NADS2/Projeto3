// src/pages/AdminEventosPage.jsx
import React, { useState, useEffect } from 'react';
import authFetch from '../utils/authFetch'; // <-- IMPORTA O HELPER

export default function AdminEventosPage() {
  
  const [titulo, setTitulo] = useState('');
  const [dataEvento, setDataEvento] = useState(''); 
  const [imgUrl, setImgUrl] = useState('');
  const [descCurta, setDescCurta] = useState('');
  const [descLonga, setDescLonga] = useState('');
<<<<<<< HEAD
  const [eventosList, setEventosList] = useState([]);
  const [loading, setLoading] = useState(true);
=======
  
  // === ESTADO PARA A TABELA ===
  // AQUI ESTÁ A CORREÇÃO: Inicializamos com um array vazio []
  const [eventosList, setEventosList] = useState([]); 
  const [loading, setLoading] = useState(true);

  // === ESTADO: MODO DE EDIÇÃO ===
>>>>>>> 34fa2e265cdd613667973805371315e7450e6602
  const [editingId, setEditingId] = useState(null);

  const fetchEventos = async () => {
    try {
      setLoading(true);
<<<<<<< HEAD
      // TROCA 'fetch' POR 'authFetch'
      const response = await authFetch('http://localhost:3001/api/eventos');
      if (!response.ok) {
        if (response.status === 401) window.location.href = '/login';
        throw new Error('Erro ao buscar eventos');
      }
      const data = await response.json();
      setEventosList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      setEventosList([]);
=======
      const response = await fetch('http://localhost:3001/api/eventos');
      
      // Verificação de erro da API
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Verificação se a data é um array (segurança)
      if (Array.isArray(data)) {
        setEventosList(data);
      } else {
        console.error("Erro: A API não retornou um array.", data);
        setEventosList([]); // Garante que seja um array
      }

    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      setEventosList([]); // Em caso de falha total, define como array vazio
>>>>>>> 34fa2e265cdd613667973805371315e7450e6602
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const resetForm = () => {
<<<<<<< HEAD
    setTitulo(''); setDataEvento(''); setImgUrl(''); setDescCurta(''); setDescLonga(''); setEditingId(null);
=======
    setTitulo('');
    setDataEvento('');
    setImgUrl('');
    setDescCurta('');
    setDescLonga('');
    setEditingId(null); 
>>>>>>> 34fa2e265cdd613667973805371315e7450e6602
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const eventoData = { titulo, data_evento: dataEvento, img_url: imgUrl, desc_curta: descCurta, desc_longa: descLonga };
    const isEditing = editingId !== null;
    const url = isEditing ? `http://localhost:3001/api/eventos/${editingId}` : 'http://localhost:3001/api/eventos';
    const method = isEditing ? 'PUT' : 'POST';
    try {
      // TROCA 'fetch' POR 'authFetch'
      const response = await authFetch(url, {
        method: method,
        body: JSON.stringify(eventoData),
      });
      if (!response.ok) throw new Error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} o evento`);
      const savedData = await response.json();
      if (isEditing) {
<<<<<<< HEAD
        setEventosList(eventosList.map(item => item.id_evento === editingId ? savedData : item));
        alert('Evento atualizado com sucesso!');
      } else {
        setEventosList([savedData, ...eventosList]);
        alert('Novo evento salvo com sucesso!');
      }
      resetForm();
=======
        setEventosList(eventosList.map(item => 
          item.id_evento === editingId ? savedOrUpdatedEvento : item
        ));
        alert('Evento atualizado com sucesso!');
      } else {
        setEventosList([savedOrUpdatedEvento, ...eventosList]);
        alert('Novo evento salvo com sucesso!');
      }
      
      resetForm(); 

>>>>>>> 34fa2e265cdd613667973805371315e7450e6602
    } catch (error) {
      alert(`Erro ao salvar: ${error.message}`);
    }
  };

<<<<<<< HEAD
  const handleEditClick = (evento) => {
    setEditingId(evento.id_evento);
=======
  // === FUNÇÃO: CARREGAR PARA EDITAR ===
  const handleEditClick = (evento) => {
    setEditingId(evento.id_evento);
    
>>>>>>> 34fa2e265cdd613667973805371315e7450e6602
    const dataFormatada = evento.data_evento ? evento.data_evento.split('T')[0] : '';
    setTitulo(evento.titulo);
    setDataEvento(dataFormatada);
    setImgUrl(evento.img_url || '');
    setDescCurta(evento.desc_curta);
    setDescLonga(evento.desc_longa || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (idParaExcluir) => {
    if (editingId === idParaExcluir) resetForm();
    try {
      // TROCA 'fetch' POR 'authFetch'
      const response = await authFetch(`http://localhost:3001/api/eventos/${idParaExcluir}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Falha ao excluir o evento.');
      setEventosList(eventosList.filter(e => e.id_evento !== idParaExcluir));
      alert('Evento excluído com sucesso!');
    } catch (error) {
      alert(`Erro ao excluir: ${error.message}`);
    }
  };

<<<<<<< HEAD
=======
  // Função para formatar a data
>>>>>>> 34fa2e265cdd613667973805371315e7450e6602
  const formatarDataTabela = (dataSQL) => {
    if (!dataSQL) return 'N/A';
    const [ano, mes, dia] = dataSQL.split('T')[0].split('-');
    return `${dia}/${mes}/${ano}`;
  };

  // ... (O JSX do 'return' continua exatamente o mesmo) ...
  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Gerenciar Eventos</h1>
        <p>Crie, edite ou exclua os posts da página "Eventos".</p>
      </header>
      <section className="management-section">
        <h2>{editingId ? 'Editar Evento' : 'Adicionar Novo Evento'}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="evento-titulo">Título do Evento</label>
            <input 
              type="text" id="evento-titulo" placeholder="Ex: Festa de Natal Comunitária"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="evento-data">Data do Evento</label>
            <input 
              type="date" id="evento-data"
              value={dataEvento}
              onChange={(e) => setDataEvento(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="evento-imagem">URL da Imagem de Capa</label>
            <input 
              type="text" id="evento-imagem" placeholder="Ex: /images/festa-natal.jpg"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="evento-desc-curta">Descrição Curta (para o card)</label>
            <input 
              type="text" id="evento-desc-curta" placeholder="Uma frase curta que aparece no card." maxLength="100"
              value={descCurta}
              onChange={(e) => setDescCurta(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="evento-desc-longa">Descrição Completa (para o modal)</label>
            <textarea 
              id="evento-desc-longa" rows="6" placeholder="O texto completo que aparecerá no modal 'Ver detalhes'..."
              value={descLonga}
              onChange={(e) => setDescLonga(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Atualizar Evento' : 'Salvar Evento'}
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
        <h2>Eventos Publicados</h2>
        {loading && <p>Carregando tabela de eventos...</p>}
<<<<<<< HEAD
=======
        
        {/* CORREÇÃO DE SEGURANÇA: Só renderiza a tabela se 'eventosList' for um array */}
>>>>>>> 34fa2e265cdd613667973805371315e7450e6602
        {!loading && Array.isArray(eventosList) && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Título</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {eventosList.map((evento) => (
                <tr key={evento.id_evento}>
                  <td>{formatarDataTabela(evento.data_evento)}</td>
                  <td>{evento.titulo}</td>
                  <td>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '5px 10px' }}
                      onClick={() => handleEditClick(evento)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-danger" 
                      style={{ padding: '5px 10px', marginLeft: '5px' }}
                      onClick={() => handleDelete(evento.id_evento)}
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
