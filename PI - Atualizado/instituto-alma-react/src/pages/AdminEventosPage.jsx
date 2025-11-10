// src/pages/AdminEventosPage.jsx

import React, { useState, useEffect } from 'react';

export default function AdminEventosPage() {

  // === ESTADO PARA O FORMULÁRIO ===
  const [titulo, setTitulo] = useState('');
  const [dataEvento, setDataEvento] = useState(''); 
  const [imgUrl, setImgUrl] = useState('');
  const [descCurta, setDescCurta] = useState('');
  const [descLonga, setDescLonga] = useState('');
  
  // === ESTADO PARA A TABELA ===
  const [eventosList, setEventosList] = useState([]);
  const [loading, setLoading] = useState(true);

  // === NOVO ESTADO: MODO DE EDIÇÃO ===
  const [editingId, setEditingId] = useState(null);

  // === FUNÇÃO PARA BUSCAR DADOS (GET) ===
  const fetchEventos = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/eventos');
      const data = await response.json();
      setEventosList(data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os dados da API quando a página abre
  useEffect(() => {
    fetchEventos();
  }, []);

  // === LIMPAR O FORMULÁRIO ===
  const resetForm = () => {
    setTitulo('');
    setDataEvento('');
    setImgUrl('');
    setDescCurta('');
    setDescLonga('');
    setEditingId(null); // Sai do modo de edição
  };

  // === FUNÇÃO DE ENVIO DO FORMULÁRIO (POST ou PUT) ===
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    const eventoData = {
      titulo: titulo,
      data_evento: dataEvento,
      img_url: imgUrl,
      desc_curta: descCurta,
      desc_longa: descLonga
    };

    const isEditing = editingId !== null;
    const url = isEditing 
      ? `http://localhost:3001/api/eventos/${editingId}` 
      : 'http://localhost:3001/api/eventos';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventoData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} o evento`);
      }
      
      const savedOrUpdatedEvento = await response.json();

      if (isEditing) {
        // Modo Edição: Atualiza o item na lista
        setEventosList(eventosList.map(item => 
          item.id_evento === editingId ? savedOrUpdatedEvento : item
        ));
        alert('Evento atualizado com sucesso!');
      } else {
        // Modo Criação: Adiciona o novo item no topo
        setEventosList([savedOrUpdatedEvento, ...eventosList]);
        alert('Novo evento salvo com sucesso!');
      }
      
      resetForm(); // Limpa o formulário

    } catch (error) {
      console.error('Falha ao enviar evento:', error);
      alert(`Erro ao salvar: ${error.message}`);
    }
  };

  // === NOVA FUNÇÃO: CARREGAR PARA EDITAR ===
  const handleEditClick = (evento) => {
    setEditingId(evento.id_evento);
    
    // IMPORTANTE: Formata a data (do banco) para o formato YYYY-MM-DD (do input)
    const dataFormatada = evento.data_evento ? evento.data_evento.split('T')[0] : '';
    
    setTitulo(evento.titulo);
    setDataEvento(dataFormatada);
    setImgUrl(evento.img_url || '');
    setDescCurta(evento.desc_curta);
    setDescLonga(evento.desc_longa || '');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // === FUNÇÃO (DELETE) ===
  const handleDelete = async (idParaExcluir) => {
    if (editingId === idParaExcluir) {
      resetForm();
    }
    
    try {
      const response = await fetch(`http://localhost:3001/api/eventos/${idParaExcluir}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Falha ao excluir o evento.');
      }
      setEventosList(eventosList.filter(e => e.id_evento !== idParaExcluir));
      alert('Evento excluído com sucesso!');
    } catch (error) {
      alert(`Erro ao excluir: ${error.message}`);
    }
  };

  // Função para formatar a data (opcional, mas melhora a exibição)
  const formatarDataTabela = (dataSQL) => {
    if (!dataSQL) return 'N/A';
    const [ano, mes, dia] = dataSQL.split('T')[0].split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Gerenciar Eventos</h1>
        <p>Crie, edite ou exclua os posts da página "Eventos".</p>
      </header>

      {/* Seção 1: Formulário (dinâmico) */}
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
      
      {/* Seção 2: Tabela (com 'onClick' no botão editar) */}
      <section className="management-section">
        <h2>Eventos Publicados</h2>
        
        {loading && <p>Carregando tabela de eventos...</p>}
        
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
      </section>
    </main>
  );
}