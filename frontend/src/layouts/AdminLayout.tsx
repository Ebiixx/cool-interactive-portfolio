import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './AdminLayout.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
   const history = useHistory();
  const location = useLocation(); // Prüfe, dass dies nicht undefined ist
  const [activeSection, setActiveSection] = useState('dashboard');
  
  useEffect(() => {
    // Sicherheitscheck hinzufügen
    if (!location) {
      console.error("Location ist undefined - Router-Kontext fehlt möglicherweise");
      return;
    }
    
    // Aktiven Abschnitt aus URL-Parameter oder Pfad ermitteln
    const urlParams = new URLSearchParams(location.search);
    const section = urlParams.get('section');
    
    if (section) {
      setActiveSection(section);
    } else if (location.pathname === '/admin') {
      setActiveSection('dashboard');
    } else {
      // Pfad wie /admin/messages parsen
      const pathSection = location.pathname.split('/').pop();
      if (pathSection && pathSection !== 'admin') {
        setActiveSection(pathSection);
      }
    }
  }, [location]);
  
  // Fallback, wenn location undefined ist
  const navigateTo = (section: string) => {
    if (history) {
      history.push(`/admin?section=${section}`);
    } else {
      console.error("History ist undefined - Router-Kontext fehlt möglicherweise");
    }
  };
  
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
          <button className="close-sidebar-button" onClick={() => history.push('/')}>
            &larr;
          </button>
        </div>
        
        <nav className="admin-nav">
          <ul>
            <li 
              className={activeSection === 'dashboard' ? 'active' : ''} 
              onClick={() => navigateTo('dashboard')}
            >
              <span className="nav-icon">📊</span>
              Dashboard
            </li>
            <li 
              className={activeSection === 'projects' ? 'active' : ''} 
              onClick={() => navigateTo('projects')}
            >
              <span className="nav-icon">📂</span>
              Projekte
            </li>
            <li 
              className={activeSection === 'skills' ? 'active' : ''} 
              onClick={() => navigateTo('skills')}
            >
              <span className="nav-icon">💼</span>
              Skills
            </li>
            <li 
              className={activeSection === 'messages' ? 'active' : ''} 
              onClick={() => navigateTo('messages')}
            >
              <span className="nav-icon">📨</span>
              Nachrichten
              {/* Optional: Badge für ungelesene Nachrichten */}
            </li>
            <li 
              className={activeSection === 'settings' ? 'active' : ''} 
              onClick={() => navigateTo('settings')}
            >
              <span className="nav-icon">⚙️</span>
              Einstellungen
            </li>
          </ul>
        </nav>
      </aside>
      
      <main className="admin-content">
        <header className="admin-header">
          <div className="admin-header-title">
            Admin
          </div>
          <div className="admin-header-actions">
            <button className="logout-button" onClick={() => {
              // Logout-Logik hier
              history.push('/');
            }}>Logout</button>
          </div>
        </header>
        
        <div className="admin-main-content">
          {children}
        </div>
      </main>
    </div>
  );
};