import express from 'express';
import { MessageController } from '../controllers/message.controller';
import { checkAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Überprüfe, ob die Route für ungelesene Nachrichten vorhanden ist
console.log('MessageController.getUnreadCount:', typeof MessageController.getUnreadCount);

// Füge die Route für ungelesene Nachrichten hinzu (falls sie fehlt)
router.get('/unread', checkAuth, MessageController.getUnreadCount);

// Prüfe, ob die MessageController-Methoden definiert sind
console.log('MessageController methods:', Object.getOwnPropertyNames(MessageController));
console.log('getAllMessages method:', typeof MessageController.getAllMessages);
console.log('getMessageById method:', typeof MessageController.getMessageById);

// Nachrichten-Routen
router.get('/', checkAuth, MessageController.getAllMessages);
router.post('/', MessageController.createMessage); // ohne Auth für Kontaktformular
router.get('/:id', checkAuth, MessageController.getMessageById);
router.put('/:id/read', checkAuth, MessageController.markAsRead);
router.delete('/:id', checkAuth, MessageController.deleteMessage);

export default router;