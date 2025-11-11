// src/layouts/AuthLayout.jsx

import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    // O <main> é o container principal, como no seu login.html
    <main className="login-container">
      <div className="form-column">
        <div className="form-wrapper">
          <Link to="/" className="logo"><strong>IA</strong> Instituto Alma</Link>
          
          {/* É AQUI QUE O FORMULÁRIO DE LOGIN OU CADASTRO SERÁ RENDERIZADO */}
          <Outlet />

        </div>
      </div>
      <div className="image-column">
        {/* A imagem de fundo é controlada pelo login-style.css */}
        <div className="image-text">
          <h1>Juntos, construímos um futuro melhor.</h1>
          <p>Sua participação é a peça que faltava para transformar ainda mais vidas.</p>
        </div>
      </div>
    </main>
  );
}