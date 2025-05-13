import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="portfolio-header">
      <div className="container">
        <h1>Frontend Showcase</h1>
        <nav>
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