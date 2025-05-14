import express from 'express';
import { MessageController } from '../controllers/message.controller';
import { isAuthenticated, isAdmin } from '../middleware/auth.middleware';

const router = express.Router();

// Öffentliche Route - jeder kann Nachrichten senden
router.post('/', MessageController.createMessage);

// Admin-Routes - nur für Administratoren
router.get('/', isAuthenticated, isAdmin, MessageController.getAllMessages);
router.get('/unread', isAuthenticated, isAdmin, MessageController.getUnreadCount);
router.put('/:id/read', isAuthenticated, isAdmin, MessageController.markAsRead);
router.delete('/:id', isAuthenticated, isAdmin, MessageController.deleteMessage);

export default router;