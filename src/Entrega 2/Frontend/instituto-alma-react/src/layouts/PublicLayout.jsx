// src/layouts/PublicLayout.jsx

import React from 'react';
// Importamos o Outlet e o NavLink do React Router
import { Outlet, Link, NavLink } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <>
      {/* Convertemos todos os <a> para <Link> ou <NavLink>.
        O <NavLink> adiciona a classe "active" automaticamente
        quando a rota corresponde ao link.
      */}
      <header className="main-header">
        <div className="container">
          <Link to="/" className="logo"><strong>IA</strong> Instituto Alma</Link>
          <nav className="main-nav">
            <ul>
              <li><NavLink to="/sobre">Sobre Nós</NavLink></li>
              <li><NavLink to="/atividades">Nossas Atividades</NavLink></li>
              <li><NavLink to="/eventos">Eventos</NavLink></li>
              <li><NavLink to="/transparencia">Transparência</NavLink></li>
              <li><NavLink to="/ouvidoria">Ouvidoria</NavLink></li>
            </ul>
          </nav>
          <div className="header-buttons">
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/doe" className="btn btn-primary">Doe Agora</Link>
          </div>
          {/* O botão de menu mobile será adicionado depois */}
        </div>
      </header>

      <main>
        {/* É AQUI QUE O CONTEÚDO DA PÁGINA SERÁ RENDERIZADO */}
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <h3 className="footer-logo"><strong>IA</strong> Instituto Alma</h3>
              <p>Transformando vidas através da educação, cultura e solidariedade.</p>
            </div>
            <div className="footer-nav">
              <h4>Navegação</h4>
              <ul>
                <li><Link to="/sobre">Sobre Nós</Link></li>
                <li><Link to="/atividades">Atividades</Link></li>
                <li><Link to="/eventos">Eventos</Link></li>
                <li><Link to="/transparencia">Transparência</Link></li>
              </ul>
            </div>
            <div className="footer-help">
              <h4>Como Ajudar</h4>
              <ul>
                <li><Link to="/doe">Fazer Doação</Link></li>
                {/* O link aponta direto para o painel do doador */}
                <li><Link to="/doador/painel">Portal do Doador</Link></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Contato</h4>
              <p>Rua das Flores, 123<br />Centro, São Paulo/SP</p>
              <p><Link to="/ouvidoria">Ouvidoria</Link></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>©2025 Instituto Alma. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}