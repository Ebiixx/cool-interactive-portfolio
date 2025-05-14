import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './MessagesAdmin.css';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const MessagesAdmin: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { token } = useAuth();
  
  // Nachrichten laden
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Fehler beim Laden der Nachrichten');
      }
      
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };
  
  // Beim ersten Rendern laden
  useEffect(() => {
    fetchMessages();
  }, [token]);
  
  // Nachricht als gelesen markieren
  const markAsRead = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Fehler beim Markieren als gelesen');
      }
      
      // Lokale Nachrichtenliste aktualisieren
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === id ? { ...msg, isRead: true } : msg
        )
      );
      
      // Die ausgewählte Nachricht aktualisieren, falls sie die aktuell geöffnete ist
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, isRead: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    }
  };
  
  // Nachricht löschen
  const deleteMessage = async (id: number) => {
    if (!window.confirm('Möchten Sie diese Nachricht wirklich löschen?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Fehler beim Löschen der Nachricht');
      }
      
      // Nachricht aus der Liste entfernen
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
      
      // Wenn die gelöschte Nachricht die aktuell ausgewählte war, auswahl zurücksetzen
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    }
  };
  
  // Nachricht auswählen und als gelesen markieren
  const selectMessage = (message: Message) => {
    setSelectedMessage(message);
    
    // Falls noch nicht als gelesen markiert
    if (!message.isRead) {
      markAsRead(message.id);
    }
  };
  
  // Formatiere Datum
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('de-DE', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="messages-admin">
      <h1>Nachrichten</h1>
      
      {error && <div className="messages-error">{error}</div>}
      
      <div className="messages-container">
        <div className="messages-list">
          <div className="messages-list-header">
            <h2>Eingang</h2>
            <button onClick={fetchMessages} className="refresh-button">
              Aktualisieren
            </button>
          </div>
          
          {loading ? (
            <div className="loading-indicator">Nachrichten werden geladen...</div>
          ) : messages.length === 0 ? (
            <div className="empty-state">Keine Nachrichten vorhanden</div>
          ) : (
            <ul className="message-items">
              {messages.map(message => (
                <li 
                  key={message.id} 
                  className={`message-item ${!message.isRead ? 'unread' : ''} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                  onClick={() => selectMessage(message)}
                >
                  <div className="message-sender">{message.name}</div>
                  <div className="message-subject">{message.subject || '(Kein Betreff)'}</div>
                  <div className="message-date">{formatDate(message.createdAt)}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="message-detail">
          {selectedMessage ? (
            <>
              <div className="message-header">
                <h3>{selectedMessage.subject || '(Kein Betreff)'}</h3>
                <div className="message-actions">
                  <button 
                    onClick={() => deleteMessage(selectedMessage.id)} 
                    className="delete-button"
                  >
                    Löschen
                  </button>
                </div>
              </div>
              
              <div className="message-meta">
                <div><strong>Von:</strong> {selectedMessage.name} ({selectedMessage.email})</div>
                <div><strong>Datum:</strong> {formatDate(selectedMessage.createdAt)}</div>
              </div>
              
              <div className="message-content">
                {selectedMessage.message}
              </div>
              
              <div className="message-reply">
                <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`} className="reply-button">
                  Antworten
                </a>
              </div>
            </>
          ) : (
            <div className="empty-detail">
              Wählen Sie eine Nachricht aus, um den Inhalt anzuzeigen.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};