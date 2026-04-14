import React, { useState } from 'react';
import heroImg from '../assets/family_uploaded.jpg';

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header className="app-header">
      <div className="hero-image-container">
        <button
          type="button"
          className="hero-image-button"
          aria-pressed={isExpanded}
          aria-label={isExpanded ? 'Reducir foto familiar' : 'Ampliar foto familiar'}
          onClick={() => setIsExpanded((current) => !current)}
        >
          <img
            src={heroImg}
            alt="Foto Familiar"
            className={`hero-image${isExpanded ? ' is-expanded' : ''}`}
          />
        </button>
      </div>
      <h1 className="app-title">Organizador Familiar</h1>
      <p className="app-subtitle">Tu planificador sincronizado y simplificado</p>
    </header>
  );
}
