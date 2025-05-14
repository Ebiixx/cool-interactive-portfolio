import { Request, Response } from 'express';
import { prisma } from '../services/prisma.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class MessageController {
  // Nachricht erstellen (öffentlich zugänglich)
  static async createMessage(req: Request, res: Response) {
    try {
      const { name, email, subject, message } = req.body;

      // Validierung
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email and message are required' });
      }

      // Typ-Assertion verwenden, um den TypeScript-Fehler zu vermeiden
      const newMessage = await (prisma as any).message.create({
        data: {
          name,
          email,
          subject: subject || '(Kein Betreff)',
          message
        }
      });

      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Create message error:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  }

  // Alle Nachrichten abrufen (nur für Admins)
  static async getAllMessages(req: AuthRequest, res: Response) {
    try {
      // Typ-Assertion verwenden
      const messages = await (prisma as any).message.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.status(200).json(messages);
    } catch (error) {
      console.error('Get messages error:', error);
      res.status(500).json({ error: 'Failed to get messages' });
    }
  }

  // Ungelesene Nachrichten zählen
  static async getUnreadCount(req: AuthRequest, res: Response) {
    try {
      // Typ-Assertion verwenden
      const count = await (prisma as any).message.count({
        where: { isRead: false }
      });

      res.status(200).json({ count });
    } catch (error) {
      console.error('Get unread count error:', error);
      res.status(500).json({ error: 'Failed to get unread count' });
    }
  }
  
  // Nachricht als gelesen markieren
  static async markAsRead(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid message ID' });
      }

      // Typ-Assertion verwenden
      const message = await (prisma as any).message.update({
        where: { id },
        data: { isRead: true }
      });

      res.status(200).json(message);
    } catch (error) {
      console.error('Mark as read error:', error);
      res.status(500).json({ error: 'Failed to update message' });
    }
  }

  // Nachricht löschen
  static async deleteMessage(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid message ID' });
      }

      // Typ-Assertion verwenden
      await (prisma as any).message.delete({
        where: { id }
      });

      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error('Delete message error:', error);
      res.status(500).json({ error: 'Failed to delete message' });
    }
  }
}