import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ImageUploader.css';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImageUrl?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, currentImageUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const { token } = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dateivalidierung
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Nur Bilder (JPEG, PNG, GIF, WEBP) sind erlaubt!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setError('Die Datei ist zu groß! Maximale Größe: 5MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // Erstelle FormData für den Upload
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:5000/api/upload/image', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Upload fehlgeschlagen');
      }

      const data = await response.json();
      
      // Lokale Vorschau setzen
      setPreview(data.fileUrl);
      
      // URL an Parent-Komponente zurückgeben
      onImageUploaded(data.fileUrl);
    } catch (err) {
      setError('Fehler beim Hochladen des Bildes. Bitte versuche es erneut.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="image-uploader">
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Vorschau" />
        </div>
      )}
      
      <div className="upload-controls">
        <label className="upload-button">
          {isUploading ? 'Wird hochgeladen...' : 'Bild hochladen'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
        
        {preview && (
          <button 
            type="button" 
            className="clear-button"
            onClick={() => {
              setPreview(null);
              onImageUploaded('');
            }}
          >
            Bild entfernen
          </button>
        )}
      </div>
      
      {error && <div className="upload-error">{error}</div>}
    </div>
  );
};