import React from 'react';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="portfolio-header">
      <div className="header-container">
        {/* Linker Platzhalter */}
        <div className="left-placeholder"></div>
        
        {/* Mittlerer Bereich mit Titel */}
        <div className="center-section">
          <h1 className="portfolio-title">Max Mustermann</h1>
        </div>
        
        {/* Rechter Bereich mit Navigation */}
        <div className="right-section">
          <nav className="header-nav">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">Über Mich</a></li>
              <li><a href="#projects">Projekte</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Kontakt</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};