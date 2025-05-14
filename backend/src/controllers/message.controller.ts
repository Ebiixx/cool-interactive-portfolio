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

      const newMessage = await prisma.message.create({
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

  // Alle Nachrichten abrufen
  static async getAllMessages(req: Request, res: Response) {
    try {
      const messages = await prisma.message.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }

  // Eine Nachricht nach ID abrufen
  static async getMessageById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const messageId = parseInt(id);
      
      if (isNaN(messageId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      
      const message = await prisma.message.findUnique({
        where: {
          id: messageId  // Stelle sicher, dass dies eine Zahl ist
        }
      });

      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      return res.status(200).json(message);
    } catch (error) {
      console.error('Error fetching message:', error);
      return res.status(500).json({ error: 'Failed to fetch message' });
    }
  }

  // Ungelesene Nachrichten zählen
  static async getUnreadCount(req: Request, res: Response) {
    try {
      // Hier hat die Methode in deinem Code bereits die AuthRequest-Schnittstelle verwendet, 
      // aber der Aufruf in den Routes könnte ein Request-Objekt statt AuthRequest verwenden
      console.log('getUnreadCount called, auth:', (req as any).user);
      
      const count = await prisma.message.count({
        where: { isRead: false }
      });

      return res.status(200).json({ count });
    } catch (error) {
      console.error('Get unread count error:', error);
      return res.status(500).json({ error: 'Failed to get unread count' });
    }
  }
  
  // Nachricht als gelesen markieren
  static async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const messageId = parseInt(id);
      
      if (isNaN(messageId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      
      const message = await prisma.message.update({
        where: { id: messageId },
        data: { isRead: true }
      });

      return res.status(200).json(message);
    } catch (error) {
      console.error('Error marking message as read:', error);
      return res.status(500).json({ error: 'Failed to mark message as read' });
    }
  }

  // Nachricht löschen
  static async deleteMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const messageId = parseInt(id);
      
      if (isNaN(messageId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      
      await prisma.message.delete({
        where: { id: messageId }
      });

      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting message:', error);
      return res.status(500).json({ error: 'Failed to delete message' });
    }
  }
}