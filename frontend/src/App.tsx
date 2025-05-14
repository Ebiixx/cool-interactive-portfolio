import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin/Admin';
import { Login } from './pages/Admin/Login';
import { AdminLayout } from './layouts/AdminLayout'; // Stelle sicher, dass der richtige Pfad verwendet wird
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './styles/App.css';

function AppContent() {
  const { isAuthenticated, isAdmin, login } = useAuth();
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/admin') {
      setShowAdminPage(true);
    } else if (currentPath === '/backend') {
      setShowLoginPage(true);
    }
  }, []);

  // Wenn wir auf der Admin-Seite sind und authentifiziert
  if (showAdminPage) {
    // Wenn nicht authentifiziert oder kein Admin, zeige Login-Seite
    if (!isAuthenticated || !isAdmin) {
      return <Login onLoginSuccess={login} />;
    }
    // Hier das AdminLayout verwenden und Admin-Komponente als Kind übergeben
    return (
      <AdminLayout>
        <Admin />
      </AdminLayout>
    );
  }
  
  // Wenn wir auf der Login-Seite sind
  if (showLoginPage) {
    // Wenn bereits authentifiziert, leite zum Admin-Bereich weiter
    if (isAuthenticated && isAdmin) {
      window.location.href = '/admin';
      return <div>Weiterleitung...</div>;
    }
    // Ansonsten zeige Login-Seite
    return <Login onLoginSuccess={token => {
      login(token);
      window.location.href = '/admin';
    }} />;
  }
  
  // Standard: Zeige normale Portfolio-Seite
  return (
    <div className="app">
      <Header />
      
      <main>
        <section id="home">
          <Home />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;