import { Request, Response } from 'express';
import * as path from 'path';

export class UploadController {
  // Wichtig: Statische Methode für den direkten Zugriff
  static async uploadImage(req: Request, res: Response) {
    try {
      // Die Datei wurde durch multer bereits gespeichert
      if (!req.file) {
        return res.status(400).json({ error: 'Keine Datei hochgeladen' });
      }

      // Erstelle die URL für das Frontend
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const filePath = `/uploads/${req.file.filename}`;
      const fileUrl = `${baseUrl}${filePath}`;

      return res.status(200).json({
        success: true,
        fileUrl: fileUrl,
        filename: req.file.filename
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).json({ error: 'Fehler beim Hochladen der Datei' });
    }
  }
}