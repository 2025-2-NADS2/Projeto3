import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import AboutUs from './components/AboutUs/AboutUs';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';
import Donation from './components/Donation/Donation';

import './App.css';

function App() {
  return (
    <Router>
      <Header /> {/* Fixo no topo */}
      
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/donate" element={<Donation />} />
      </Routes>
      
      <Footer /> {/* Fixo no rodapé */}
    </Router>
  );
}

export default App;

