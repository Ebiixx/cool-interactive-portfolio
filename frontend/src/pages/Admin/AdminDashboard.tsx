import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; 
import { useHistory, useLocation } from 'react-router-dom';
import './AdminDashboard.css';

export const AdminDashboard: React.FC = () => {
  const { token } = useAuth(); 
  const [unreadMessages, setUnreadMessages] = useState(0);
  const history = useHistory();

  const fetchUnreadCount = async () => {
    try {
      if (!token) {
        console.error('Kein Authentifizierungstoken vorhanden');
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/messages/unread', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Fehler beim Laden der Nachrichtenzahl');
      }
      
      const data = await response.json();
      setUnreadMessages(data.count);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUnreadCount();
    }
  }, [token]);

  // Navigieren zu entsprechenden Seiten beim Klick auf die Karten
  const navigateToSection = (section: string) => {
    history.push(`/admin?section=${section}`);
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <div className="dashboard-stats">
        <div 
          className="stat-card" 
          onClick={() => navigateToSection('projects')}
        >
          <h3>Projekte</h3>
          <div className="stat-value">3</div>
          <div className="stat-desc">Aktive Projekte</div>
          <div className="card-overlay">
            <span>Projekte verwalten</span>
          </div>
        </div>
        
        <div 
          className="stat-card" 
          onClick={() => navigateToSection('messages')}
        >
          <h3>Nachrichten</h3>
          <div className="stat-value">{unreadMessages}</div>
          <div className="stat-desc">Neue Nachrichten</div>
          <div className="card-overlay">
            <span>Nachrichten anzeigen</span>
          </div>
        </div>
        
        <div 
          className="stat-card" 
          onClick={() => navigateToSection('analytics')}
        >
          <h3>Besucher</h3>
          <div className="stat-value">256</div>
          <div className="stat-desc">Letzte 30 Tage</div>
          <div className="card-overlay">
            <span>Analysen anzeigen</span>
          </div>
        </div>
        
        <div 
          className="stat-card" 
          onClick={() => navigateToSection('skills')}
        >
          <h3>Skills</h3>
          <div className="stat-value">12</div>
          <div className="stat-desc">Eingetragene Fähigkeiten</div>
          <div className="card-overlay">
            <span>Skills verwalten</span>
          </div>
        </div>
      </div>
      
      {/* Add back the activity history section */}
      <div className="dashboard-recent">
        <h2>Letzte Aktivitäten</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div>
              <div className="activity-title">Neues Projekt hinzugefügt</div>
              <div className="activity-desc">E-Commerce Platform</div>
            </div>
            <div className="activity-time">Vor 2 Stunden</div>
          </div>
          
          <div className="activity-item">
            <div>
              <div className="activity-title">Nachricht erhalten</div>
              <div className="activity-desc">Anfrage für Zusammenarbeit</div>
            </div>
            <div className="activity-time">Gestern</div>
          </div>
          
          <div className="activity-item">
            <div>
              <div className="activity-title">Skill aktualisiert</div>
              <div className="activity-desc">React auf 90% gesetzt</div>
            </div>
            <div className="activity-time">Vor 3 Tagen</div>
          </div>
        </div>
      </div>
    </div>
  );
};