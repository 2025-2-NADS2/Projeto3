// src/pages/OuvidoriaPage.jsx

import React, { useState } from 'react';

export default function OuvidoriaPage() {
  
  // === ESTADOS PARA O FORMULÁRIO ===
  const [isAnonimo, setIsAnonimo] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState(''); // Armazena o valor do <select>
  const [mensagem, setMensagem] = useState('');
  
  const [statusEnvio, setStatusEnvio] = useState(null); // 'sucesso', 'erro', ou null

  // === FUNÇÃO DE ENVIO (POST) ===
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setStatusEnvio('carregando'); // (Opcional: para mostrar um spinner)

    const dadosFormulario = {
      isAnonimo,
      nome: isAnonimo ? null : nome,
      email: isAnonimo ? null : email,
      tipo,
      mensagem
    };

    try {
      const response = await fetch('http://localhost:3001/api/ouvidoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosFormulario),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.message || 'Erro ao enviar mensagem.');
      }

      // Sucesso!
      setStatusEnvio('sucesso');
      // Limpa o formulário
      setIsAnonimo(false);
      setNome('');
      setEmail('');
      setTipo('');
      setMensagem('');

    } catch (error) {
      console.error('Erro no formulário de ouvidoria:', error);
      setStatusEnvio('erro');
    }
  };

  // Limpa os campos de nome/email se o usuário marcar "anônimo"
  const handleAnonimoChange = (e) => {
    const checked = e.target.checked;
    setIsAnonimo(checked);
    if (checked) {
      setNome('');
      setEmail('');
    }
  };

  return (
    <>
      <section className="hero-section-simple">
        <div className="container">
          <h1>Ouvidoria</h1>
          <p>Este é o seu canal direto conosco. Envie sua sugestão, dúvida ou reclamação.</p>
        </div>
      </section>

      <section className="ouvidoria-section">
        <div className="container">
          <div className="ouvidoria-container">
            
            <div className="ouvidoria-info">
              <h3>O que é a Ouvidoria?</h3>
              <p>A Ouvidoria do Instituto Alma é o seu canal de comunicação direto, seguro e imparcial...</p>
              <h3>Como Funciona?</h3>
              <ol>
                <li><strong>Registro:</strong> Você preenche o formulário ao lado...</li>
                <li><strong>Análise:</strong> Nossa equipe de Ouvidoria analisa a manifestação...</li>
                <li><strong>Resposta:</strong> Você receberá uma resposta conclusiva...</li>
              </ol>
              <h3>Outros Canais</h3>
              <ul>
                <li><strong>E-mail:</strong> ouvidoria@institutoalma.org</li>
                <li><strong>Telefone:</strong> (XX) XXXX-XXXX (Seg. a Sex. das 9h às 18h)</li>
              </ul>
            </div>

            <div className="ouvidoria-form-wrapper">
              
              {/* === FORMULÁRIO CONTROLADO PELO REACT === */}
              <form className="ouvidoria-form" onSubmit={handleSubmit}>

                <div className="input-group-checkbox">
                  <input 
                    type="checkbox" 
                    id="anonimo"
                    checked={isAnonimo}
                    onChange={handleAnonimoChange}
                  />
                  <label htmlFor="anonimo">Desejo fazer uma manifestação anônima</label>
                </div>

                {/* Só mostra se NÃO for anônimo */}
                {!isAnonimo && (
                  <>
                    <div className="input-group" id="grupo-nome">
                      <label htmlFor="nome">Seu Nome</label>
                      <input 
                        type="text" id="nome" 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required={!isAnonimo} 
                      />
                    </div>
                    <div className="input-group" id="grupo-email">
                      <label htmlFor="email">Seu E-mail (para acompanhamento)</label>
                      <input 
                        type="email" id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={!isAnonimo} 
                      />
                    </div>
                  </>
                )}
                
                <div className="input-group">
                  <label htmlFor="tipo">Tipo de Manifestação</label>
                  <select 
                    id="tipo" 
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                  >
                    <option value="" disabled>Selecione o tipo...</option>
                    <option value="Denúncia">Denúncia (Assédio, Fraude, Ética, etc.)</option>
                    <option value="Reclamação">Reclamação</option>
                    <option value="Sugestão">Sugestão</option>
                    <option value="Elogio">Elogio</option>
                    <option value="Dúvida">Dúvida sobre Processos</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="mensagem">Mensagem</label>
                  <textarea 
                    id="mensagem" rows="6" 
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    required 
                  ></textarea>
                </div>

                {/* O Upload de arquivos (anexo) é uma funcionalidade avançada (Multer)
                    que faremos depois. Por enquanto, vamos desabilitá-lo. */}
                <div className="input-group" style={{ display: 'none' }}>
                  <label htmlFor="anexo">Anexar Arquivos (Opcional)</label>
                  <input type="file" id="anexo" accept=".pdf,.jpg,.jpeg,.png" />
                </div>

                <button type="submit" className="btn btn-primary btn-full">Enviar Mensagem</button>

                {/* === MENSAGENS DE FEEDBACK === */}
                {statusEnvio === 'sucesso' && (
                  <p style={{ color: 'var(--state-success)', marginTop: '15px' }}>
                    ✅ Mensagem enviada com sucesso! Obrigado.
                  </p>
                )}
                {statusEnvio === 'erro' && (
                  <p style={{ color: 'var(--state-error)', marginTop: '15px' }}>
                    ❌ Erro ao enviar. Tente novamente mais tarde.
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}