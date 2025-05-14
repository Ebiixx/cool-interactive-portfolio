import React, { useState, useEffect } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { ProjectsAdmin } from './ProjectsAdmin';
import { MessagesAdmin } from './MessagesAdmin';  // Import hinzufügen
import './Admin.css';

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
  
  return (
    <>
      {activeSection === 'dashboard' && <AdminDashboard />}
      {activeSection === 'projects' && <ProjectsAdmin />}
      {activeSection === 'messages' && <MessagesAdmin />} {/* Neue Komponente einbinden */}
      {activeSection === 'skills' && <div className="admin-placeholder">Skills-Verwaltung (In Entwicklung)</div>}
      {activeSection === 'settings' && <div className="admin-placeholder">Einstellungen (In Entwicklung)</div>}
    </>
  );
};