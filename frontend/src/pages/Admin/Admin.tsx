import React, { useState, useEffect } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { ProjectsAdmin } from './ProjectsAdmin';
import './Admin.css';

// WICHTIG: Die AdminLayout-Komponente NICHT hier importieren oder nutzen

export const Admin: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  
  useEffect(() => {
    // Bestimme den aktiven Abschnitt aus URL-Parametern
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    
    if (section) {
      setActiveSection(section);
    }
  }, []);
  
  // Direkt die Komponente rendern, OHNE AdminLayout
  return (
    <>
      {activeSection === 'dashboard' && <AdminDashboard />}
      {activeSection === 'projects' && <ProjectsAdmin />}
      {activeSection === 'skills' && <div className="admin-placeholder">Skills-Verwaltung (In Entwicklung)</div>}
      {activeSection === 'messages' && <div className="admin-placeholder">Nachrichtenverwaltung (In Entwicklung)</div>}
      {activeSection === 'settings' && <div className="admin-placeholder">Einstellungen (In Entwicklung)</div>}
    </>
  );
};