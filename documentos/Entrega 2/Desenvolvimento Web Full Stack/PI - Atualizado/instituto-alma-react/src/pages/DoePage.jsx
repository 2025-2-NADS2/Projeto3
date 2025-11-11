// src/pages/DoePage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DoePage() {

  // 1. Criamos um 'estado' para guardar o valor da doação
  // Começa com '50', que era o 'active' no seu HTML
  const [amount, setAmount] = useState('50');

  // 2. Criamos um 'estado' para o valor customizado
  const [customAmount, setCustomAmount] = useState('');

  // 3. Função para selecionar um valor predefinido
  const selectAmount = (value) => {
    setAmount(value);
    setCustomAmount(''); // Limpa o campo customizado
  };

  // 4. Função para quando o usuário digita um valor
  const handleCustomAmountChange = (e) => {
    setAmount(''); // Desmarca os botões predefinidos
    setCustomAmount(e.target.value);
  };

  // 5. Lógica para definir o valor final e o texto do botão
  // Se 'customAmount' tiver algo, ele tem prioridade.
  // Senão, usamos o 'amount' (R$ 30, 50, 100).
  const finalAmount = customAmount || amount || '0';
  const buttonText = `Confirmar Doação de R$ ${finalAmount.replace('.', ',')}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Iniciando processo de doação de R$ ${finalAmount}!`);
    // Aqui você integraria com o PIX ou API de pagamento
  };

  return (
    <>
      <section className="hero-section-simple">
        <div className="container">
          <h1>Sua doação transforma vidas</h1>
          <p>Cada contribuição, não importa o tamanho, nos ajuda a construir um futuro melhor.</p>
        </div>
      </section>

      <section className="donation-page-section">
        <div className="container">
          <form className="donation-wrapper" onSubmit={handleSubmit}>
            <div className="donation-form-container">
              <h3>1. Escolha um valor para doar</h3>
              <div className="amount-selector">
                {/* 6. Botões predefinidos 
                   - 'onClick' chama a função 'selectAmount'
                   - 'className' é 'active' se o 'estado' 'amount' for igual ao valor do botão
                */}
                <button 
                  type="button" 
                  className={`amount-option ${amount === '30' ? 'active' : ''}`}
                  onClick={() => selectAmount('30')}
                >
                  R$ 30
                </button>
                <button 
                  type="button" 
                  className={`amount-option ${amount === '50' ? 'active' : ''}`}
                  onClick={() => selectAmount('50')}
                >
                  R$ 50
                </button>
                <button 
                  type="button" 
                  className={`amount-option ${amount === '100' ? 'active' : ''}`}
                  onClick={() => selectAmount('100')}
                >
                  R$ 100
                </button>
              </div>
              <div className="input-group">
                <label htmlFor="custom-amount">Ou digite outro valor (R$)</label>
                {/* 7. Campo customizado
                   - 'value' é controlado pelo 'estado' 'customAmount'
                   - 'onChange' chama a função 'handleCustomAmountChange'
                */}
                <input 
                  type="text" 
                  id="custom-amount" 
                  placeholder="Ex: 75"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                />
              </div>
              <hr />
              <h3>2. Seus Dados</h3>
              <div className="input-group">
                <label htmlFor="name">Nome completo</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="input-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="input-group">
                <label htmlFor="cpf-doe">CPF (para recibos)</label>
                <input type="text" id="cpf-doe" placeholder="000.000.000-00" required />
              </div>
              <div className="checkbox-group">
                <input type="checkbox" id="create-account" />
                <label htmlFor="create-account">Quero criar uma conta com estes dados para acompanhar minhas doações.</label>
              </div>
              <hr />
              <h3>3. Pagamento</h3>
              <p className="payment-info">Após confirmar, você será redirecionado para um ambiente seguro para concluir o pagamento via PIX.</p>
              
              {/* 8. O texto do botão agora é dinâmico */}
              <button type="submit" className="btn btn-primary btn-full">
                {buttonText}
              </button>
            </div>

            {/* Conteúdo estático lateral (Impacto) */}
            <div className="donation-impact-container">
              <h3>Veja o impacto da sua doação</h3>
              <div className="impact-card">
                <h4>Com R$ 50 você garante:</h4>
                <ul>
                  <li>✔ 1 cesta básica para uma família</li>
                  <li>✔ Kit de higiene para uma gestante</li>
                  <li>✔ Material escolar para uma criança</li>
                </ul>
              </div>
              <p>Seu apoio é o que torna nosso trabalho possível. Agradecemos profundamente por se juntar a nós nesta causa.</p>
              <img src="images/Capa.Instituto.Criança.JPG" alt="Crianças beneficiadas pelo Instituto Alma" />
            </div>
          </form>
        </div>
      </section>
    </>
  );
}