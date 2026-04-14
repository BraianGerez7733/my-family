import React from 'react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="hero-image-container">
        <img src="/family.jpg" alt="Foto Familiar" className="hero-image" />
      </div>
      <h1 className="app-title">Organizador Familiar</h1>
      <p className="app-subtitle">Tu planificador sincronizado y simplificado</p>
    </header>
  );
}
