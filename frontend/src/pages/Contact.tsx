import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    error: string | null;
  }>({ submitted: false, error: null });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Hier würdest du die API-Anfrage an dein Backend senden
      // const response = await fetch('http://localhost:5000/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // if (!response.ok) throw new Error('Es gab ein Problem beim Senden der Nachricht.');
      
      // Simulieren wir einen erfolgreichen API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus({ submitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus({ 
        submitted: false, 
        error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
      });
    }
  };
  
  return (
    <div className="contact-page">
      <div className="container">
        <h2 className="section-title">Kontaktiere Mich</h2>
        
        {formStatus.submitted ? (
          <div className="success-message">
            <h3>Danke für deine Nachricht!</h3>
            <p>Ich werde mich so schnell wie möglich bei dir melden.</p>
            <button 
              className="btn btn-secondary" 
              onClick={() => setFormStatus({ submitted: false, error: null })}
            >
              Neues Formular
            </button>
          </div>
        ) : (
          <div className="contact-content">
            <div className="contact-info">
              <h3>Lass uns in Kontakt treten</h3>
              <p>
                Du hast ein Projekt im Sinn oder möchtest mehr über meine Arbeit erfahren? 
                Fülle das Formular aus oder kontaktiere mich direkt.
              </p>
              <div className="contact-details">
                <p><strong>Email:</strong> deine.email@example.com</p>
                <p><strong>Standort:</strong> Berlin, Deutschland</p>
                <p><strong>Verfügbarkeit:</strong> Ab sofort für neue Projekte</p>
              </div>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              {formStatus.error && (
                <div className="error-message">{formStatus.error}</div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Nachricht</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">Nachricht senden</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};