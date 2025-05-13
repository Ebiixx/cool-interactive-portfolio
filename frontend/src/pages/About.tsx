import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h2 className="section-title">Über Mich</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Ich bin ein leidenschaftlicher Frontend-Entwickler mit einem Auge für Design 
              und einer Vorliebe für interaktive Benutzeroberflächen. Mit mehr als 3 Jahren 
              Erfahrung in der Webentwicklung, entwickle ich moderne Anwendungen mit React, 
              TypeScript und den neuesten Frontend-Technologien.
            </p>
            <p>
              Mein Ziel ist es, Benutzeroberflächen zu schaffen, die nicht nur gut aussehen,
              sondern auch funktional und zugänglich sind. Ich lege großen Wert auf 
              Benutzerfreundlichkeit, Performance und sauberen Code.
            </p>
          </div>
          <div className="skills-overview">
            <h3>Meine Hauptskills</h3>
            <ul>
              <li>React & TypeScript</li>
              <li>Modern CSS (Flexbox, Grid, Animations)</li>
              <li>Responsive Design</li>
              <li>RESTful APIs & GraphQL</li>
              <li>Frontend Architecture</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};