import React, { useState } from 'react';
import './AdminLayout.css';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li className="sidebar-item active">
              <a href="/admin">Dashboard</a>
            </li>
            <li className="sidebar-item">
              <a href="/admin?section=projects">Projekte</a>
            </li>
            <li className="sidebar-item">
              <a href="/admin?section=skills">Skills</a>
            </li>
            <li className="sidebar-item">
              <a href="/admin?section=messages">Nachrichten</a>
            </li>
            <li className="sidebar-item">
              <a href="/admin?section=settings">Einstellungen</a>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <a href="/" className="back-to-site">Zurück zur Website</a>
        </div>
      </div>
      
      <div className={`admin-content ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
        <header className="admin-header">
          <div className="header-left">
            {!sidebarOpen && (
              <button className="sidebar-toggle-small" onClick={toggleSidebar}>
                ☰
              </button>
            )}
          </div>
          <div className="header-right">
            <span className="admin-user">Admin</span>
          </div>
        </header>
        
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
};