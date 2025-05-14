import React from 'react';
import './AdminDashboard.css';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Projekte</h3>
          <div className="stat-value">3</div>
          <div className="stat-desc">Aktive Projekte</div>
        </div>
        
        <div className="stat-card">
          <h3>Nachrichten</h3>
          <div className="stat-value">8</div>
          <div className="stat-desc">Neue Nachrichten</div>
        </div>
        
        <div className="stat-card">
          <h3>Besucher</h3>
          <div className="stat-value">256</div>
          <div className="stat-desc">Letzte 30 Tage</div>
        </div>
        
        <div className="stat-card">
          <h3>Skills</h3>
          <div className="stat-value">12</div>
          <div className="stat-desc">Eingetragene Fähigkeiten</div>
        </div>
      </div>
      
      <div className="dashboard-quick-actions">
        <h2>Schnellzugriff</h2>
        <div className="action-buttons">
          <a href="/admin?section=projects" className="action-btn">
            Projekt erstellen
          </a>
          <a href="/admin?section=messages" className="action-btn">
            Nachrichten prüfen
          </a>
          <a href="/admin?section=settings" className="action-btn">
            Einstellungen ändern
          </a>
        </div>
      </div>
      
      <div className="dashboard-recent">
        <h2>Kürzliche Aktivitäten</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-content">
              <div className="activity-title">Neues Projekt hinzugefügt</div>
              <div className="activity-desc">Portfolio Website</div>
            </div>
            <div className="activity-time">Vor 2 Tagen</div>
          </div>
          
          <div className="activity-item">
            <div className="activity-content">
              <div className="activity-title">Neue Nachricht erhalten</div>
              <div className="activity-desc">Von: Max Mustermann</div>
            </div>
            <div className="activity-time">Vor 3 Tagen</div>
          </div>
          
          <div className="activity-item">
            <div className="activity-content">
              <div className="activity-title">Skill aktualisiert</div>
              <div className="activity-desc">React: 90%</div>
            </div>
            <div className="activity-time">Vor 5 Tagen</div>
          </div>
        </div>
      </div>
    </div>
  );
};