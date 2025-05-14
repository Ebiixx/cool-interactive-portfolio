import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';
import { ProjectsAdmin } from './ProjectsAdmin';
import { MessagesAdmin } from './MessagesAdmin';
import './Admin.css';

export const Admin: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const location = useLocation();
  
  useEffect(() => {
    // Bestimme den aktiven Abschnitt aus URL-Parametern
    const urlParams = new URLSearchParams(location.search);
    const section = urlParams.get('section');
    
    if (section) {
      setActiveSection(section);
    } else {
      // Wenn kein section-Parameter, prüfe auf Pfad
      const pathSection = location.pathname.split('/').pop();
      if (pathSection && pathSection !== 'admin') {
        setActiveSection(pathSection);
      }
    }
  }, [location]);
  
  return (
    <>
      {activeSection === 'dashboard' && <AdminDashboard />}
      {activeSection === 'projects' && <ProjectsAdmin />}
      {activeSection === 'messages' && <MessagesAdmin />}
      {activeSection === 'skills' && <div className="admin-placeholder">Skills-Verwaltung (In Entwicklung)</div>}
      {activeSection === 'settings' && <div className="admin-placeholder">Einstellungen (In Entwicklung)</div>}
    </>
  );
};