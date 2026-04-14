import React, { useState, useEffect } from 'react';
import heroImg from '../assets/family_uploaded.jpg';

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="app-header">
      <button 
        className="theme-toggle-btn" 
        onClick={toggleTheme}
        aria-label="Toggle Dark Mode"
        title="Toggle Dark Mode"
      >
        {isDark ? '🌙' : '☀️'}
      </button>
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
