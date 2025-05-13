import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="portfolio-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Kontakt</h3>
            <p>Email: deine.email@example.com</p>
            <p>LinkedIn: linkedin.com/in/deinprofil</p>
            <p>GitHub: github.com/deinusername</p>
          </div>
          <div className="footer-section">
            <h3>Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projekte</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>© {new Date().getFullYear()} Cool Interactive Portfolio. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};