// src/pages/OuvidoriaPage.jsx

// 1. Importamos o 'useState' para controlar o formulário
import React, { useState } from 'react';

export default function OuvidoriaPage() {
  
  // 2. Criamos um 'estado' para o checkbox "anônimo"
  // Por padrão, ele começa desmarcado (false)
  const [isAnonimo, setIsAnonimo] = useState(false);

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
            
            {/* Esta parte é estática (copiada do HTML) */}
            <div className="ouvidoria-info">
              <h3>O que é a Ouvidoria?</h3>
              <p>A Ouvidoria do Instituto Alma é o seu canal de comunicação direto, seguro e imparcial. Use este espaço para enviar denúncias, reclamações, sugestões ou elogios sobre nossas atividades e serviços.</p>
              <p>Garantimos a análise, o tratamento adequado da sua manifestação e, se você desejar, o sigilo ou anonimato.</p>
              
              <h3>Como Funciona?</h3>
              <ol>
                <li><strong>Registro:</strong> Você preenche o formulário ao lado. Se não for anônimo, receberá um e-mail de confirmação.</li>
                <li><strong>Análise:</strong> Nossa equipe de Ouvidoria analisa a manifestação e a encaminha para a área responsável, preservando sua identidade (se solicitado).</li>
                <li><strong>Resposta:</strong> Você receberá uma resposta conclusiva dentro do prazo estipulado (ex: 10 dias úteis).</li>
              </ol>

              <h3>Outros Canais</h3>
              <p>Se preferir não usar o formulário, você também pode nos contatar por:</p>
              <ul>
                <li><strong>E-mail:</strong> ouvidoria@institutoalma.org</li>
                <li><strong>Telefone:</strong> (XX) XXXX-XXXX (Seg. a Sex. das 9h às 18h)</li>
              </ul>
            </div>

            {/* Esta parte é o formulário interativo */}
            <div className="ouvidoria-form-wrapper">
              <form className="ouvidoria-form">

                <div className="input-group-checkbox">
                  {/* 3. Ligamos o 'estado' ao checkbox:
                      - 'checked' nos diz se ele deve estar marcado.
                      - 'onChange' atualiza o 'estado' quando o usuário clica.
                  */}
                  <input 
                    type="checkbox" 
                    id="anonimo"
                    checked={isAnonimo}
                    onChange={(e) => setIsAnonimo(e.target.checked)}
                  />
                  <label htmlFor="anonimo">Desejo fazer uma manifestação anônima</label>
                </div>

                {/* 4. LÓGICA DO FORMULÁRIO:
                   - Usamos '{!isAnonimo && ...}'
                   - Isso significa: "Só mostre este bloco de código
                     se 'isAnonimo' for FALSO."
                   - Se o usuário marcar a caixa, 'isAnonimo' vira 'true'
                     e este bloco desaparece!
                */}
                {!isAnonimo && (
                  <>
                    <div className="input-group" id="grupo-nome">
                      <label htmlFor="nome">Seu Nome</label>
                      {/* O campo só é obrigatório se NÃO for anônimo */}
                      <input type="text" id="nome" required={!isAnonimo} />
                    </div>
                    <div className="input-group" id="grupo-email">
                      <label htmlFor="email">Seu E-mail (para acompanhamento)</label>
                      <input type="email" id="email" required={!isAnonimo} />
                    </div>
                  </>
                )}
                
                <div className="input-group">
                  <label htmlFor="tipo">Tipo de Manifestação</label>
                  <select id="tipo" required>
                    <option value="" disabled selected>Selecione o tipo...</option>
                    <option value="denuncia">Denúncia (Assédio, Fraude, Ética, etc.)</option>
                    <option value="reclamacao">Reclamação</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="elogio">Elogio</option>
                    <option value="duvida">Dúvida sobre Processos</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="mensagem">Mensagem</label>
                  <textarea id="mensagem" rows="6" required></textarea>
                </div>

                <div className="input-group">
                  <label htmlFor="anexo">Anexar Arquivos (Opcional)</label>
                  <small>Envie evidências (PDF, JPG, PNG) de até 5MB.</small>
                  <input type="file" id="anexo" accept=".pdf,.jpg,.jpeg,.png" />
                </div>

                <button type="submit" className="btn btn-primary btn-full">Enviar Mensagem</button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}