import React from 'react';
import './Header.css'; // Stelle sicher, dass diese CSS-Datei existiert

export const Header: React.FC = () => {
  return (
    <header className="portfolio-header">
      <div className="container header-container">
        <h1 className="portfolio-title">Max Mustermann</h1>
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
    </header>
  );
};