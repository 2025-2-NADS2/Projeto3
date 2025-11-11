// src/pages/AdminOuvidoriaPage.jsx
import React, { useState, useEffect } from 'react';
import authFetch from '../utils/authFetch'; // <-- IMPORTA O HELPER

export default function AdminOuvidoriaPage() {

  const [mensagensList, setMensagensList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null); 

  const fetchMensagens = async () => {
    try {
      setLoading(true);
      // TROCA 'fetch' POR 'authFetch'
      const response = await authFetch('http://localhost:3001/api/ouvidoria');
      if (!response.ok) {
        if (response.status === 401) window.location.href = '/login';
        throw new Error('Erro ao buscar mensagens');
      }
      const data = await response.json();
      setMensagensList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      setMensagensList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMensagens();
  }, []);

  const handleDelete = async (idParaExcluir) => {
    try {
      // TROCA 'fetch' POR 'authFetch'
      const response = await authFetch(`http://localhost:3001/api/ouvidoria/${idParaExcluir}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Falha ao excluir a mensagem.');
      setMensagensList(mensagensList.filter(msg => msg.id_mensagem !== idParaExcluir));
      alert('Mensagem excluída com sucesso!');
    } catch (error) {
      alert(`Erro ao excluir: ${error.message}`);
    }
  };
  
  const formatarData = (dataSQL) => {
    if (!dataSQL) return 'N/A';
    const data = new Date(dataSQL);
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
  };
  
  const openModal = (msg) => setModalData(msg);
  const closeModal = () => setModalData(null);

  // ... (O JSX do 'return' continua o mesmo, só trocamos 'a' por 'button') ...
  return (
    <main className="admin-content">
      <header className="admin-header">
        <h1>Mensagens da Ouvidoria</h1>
        <p>Veja aqui as manifestações enviadas pelo site.</p>
      </header>
      <section className="management-section">
        <h2>Mensagens Recebidas</h2>
        {loading && <p>Carregando mensagens...</p>}
        {!loading && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>De</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {mensagensList.length > 0 ? (
                mensagensList.map((msg) => (
                  <tr key={msg.id_mensagem}>
                    <td>{formatarData(msg.data_envio)}</td>
                    <td>{msg.tipo}</td>
                    <td>{msg.email_contato || (msg.nome_contato || 'Anônimo')}</td>
                    <td>{msg.status}</td>
                    <td>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '5px 10px' }}
                        onClick={() => openModal(msg)}
                      >
                        Ver Mensagem
                      </button>
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '5px 10px', marginLeft: '5px' }}
                        onClick={() => handleDelete(msg.id_mensagem)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>Nenhuma mensagem recebida.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>

      {/* --- Modal --- */}
      {modalData && (
        <div 
          id="activity-modal" 
          className="modal-overlay show"
          onClick={(e) => { if (e.target.id === 'activity-modal') closeModal(); }}
        >
          <div className="modal-content">
            <header className="modal-header">
              <h2 id="modal-title">{modalData.tipo}</h2>
              <button id="modal-close" className="modal-close-btn" onClick={closeModal}>&times;</button>
            </header>
            <section className="modal-body" style={{paddingTop: '10px'}}>
              <p><strong>De:</strong> {modalData.email_contato || (modalData.nome_contato || 'Anônimo')}</p>
              <p><strong>Data:</strong> {formatarData(modalData.data_envio)}</p>
              <p><strong>Status:</strong> {modalData.status}</p>
              <hr style={{margin: '15px 0'}} />
              <p><strong>Mensagem:</strong></p>
              <p style={{whiteSpace: 'pre-wrap'}}>{modalData.mensagem}</p>
            </section>
            <footer className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>Fechar</button>
            </footer>
          </div>
        </div>
      )}
    </main>
  );
}