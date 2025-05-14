import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin/Admin';
import { Login } from './pages/Admin/Login';
import { AdminLayout } from './layouts/AdminLayout';
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
      <Router>
        <AdminLayout>
          <Admin />
        </AdminLayout>
      </Router>
    );
  }
  
  // If we're on the login page
  if (showLoginPage) {
    // If already authenticated, redirect to admin area
    if (isAuthenticated && isAdmin) {
      window.location.href = '/admin';
      return <div>Weiterleitung...</div>;
    }
    // Otherwise show login page
    return <Login onLoginSuccess={token => {
      login(token);
      window.location.href = '/admin';
    }} />;
  }
  
  // Standard: Show normal portfolio page
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