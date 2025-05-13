import React from 'react';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="container">
        <div className="hero">
          <h1>Willkommen zu meinem interaktiven Portfolio</h1>
          <p className="hero-subtitle">
            Frontend-Entwicklung mit modernen Technologien und kreativen Animationen
          </p>
          <div className="cta-buttons">
            <a href="#projects" className="btn btn-primary">Projekte ansehen</a>
            <a href="#contact" className="btn btn-outline">Kontakt aufnehmen</a>
          </div>
        </div>
      </div>
    </div>
  );
};