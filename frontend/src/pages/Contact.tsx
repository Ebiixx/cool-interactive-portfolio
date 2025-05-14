import React, { useState } from 'react';
import './Contact.css';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('Sende Nachricht:', formData); // Protokollierung für Debug-Zwecke
      
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      // Fehlerprüfung vor dem Versuch, JSON zu parsen
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Nachricht konnte nicht gesendet werden.');
        } else {
          // Wenn keine JSON-Antwort, verwende statusText
          throw new Error(`Fehler: ${response.status} ${response.statusText}`);
        }
      }
      
      // Versuch, die Antwort als JSON zu parsen
      const data = await response.json();
      
      // Erfolg
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitSuccess(true);
      
      // Nach 5 Sekunden die Erfolgsmeldung zurücksetzen
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error('Kontaktformular-Fehler:', err);
      setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="contact-container">
      <h2 className="section-title">Kontakt</h2>
      <p className="section-description">
        Haben Sie Fragen oder möchten Sie mit mir zusammenarbeiten? Füllen Sie das Formular aus, und ich werde mich bei Ihnen melden.
      </p>
      
      {submitSuccess && (
        <div className="success-message">
          Vielen Dank für Ihre Nachricht! Ich werde mich in Kürze bei Ihnen melden.
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ihr Name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">E-Mail *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Ihre E-Mail-Adresse"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">Betreff</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Betreff der Nachricht"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Nachricht *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Ihre Nachricht"
            rows={5}
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
        </button>
      </form>
      
      <div className="contact-info">
        <h3>Alternative Kontaktmöglichkeiten</h3>
        <div className="info-item">
          <span className="info-icon">📧</span>
          <span className="info-text">email@example.com</span>
        </div>
        <div className="info-item">
          <span className="info-icon">📱</span>
          <span className="info-text">+49 123 456789</span>
        </div>
        <div className="info-item">
          <span className="info-icon">🔗</span>
          <span className="info-text">linkedin.com/in/username</span>
        </div>
        <div className="info-item">
          <span className="info-icon">💼</span>
          <span className="info-text">github.com/username</span>
        </div>
      </div>
    </div>
  );
};