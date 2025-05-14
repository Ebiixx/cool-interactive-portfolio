import { Request, Response } from 'express';
import { prisma } from '../services/prisma.service';
import { comparePasswords, generateToken, hashPassword } from '../utils/auth.utils';
import { LoginRequest, UserDTO } from '../models/user.model';

export class AuthController {
  // Registrierung eines neuen Benutzers
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password, firstName, lastName }: UserDTO = req.body;

      // Überprüfe, ob Pflichtfelder vorhanden sind
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email and password are required' });
      }

      // Überprüfe, ob der Benutzername oder die E-Mail-Adresse bereits existiert
      const existingUser = await (prisma as any).user.findFirst({
        where: {
          OR: [
            { username },
            { email }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      // Passwort hashen und Benutzer erstellen
      const hashedPassword = await hashPassword(password);

      const newUser = await (prisma as any).user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          firstName: firstName || null,
          lastName: lastName || null,
          isAdmin: false // Standardmäßig kein Admin
        }
      });

      // Sende Antwort ohne Passwort
      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }

  // Login eines Benutzers
  static async login(req: Request, res: Response) {
    try {
      const { username, password }: LoginRequest = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      // Benutzer finden
      const user = await (prisma as any).user.findUnique({
        where: { username }
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Passwort überprüfen
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Aktualisiere den letzten Login-Zeitpunkt
      await (prisma as any).user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() }
      });

      // Token generieren
      const token = generateToken(user.id, user.isAdmin);

      // Sende Antwort ohne Passwort
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json({
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  }

  // Admin-Konto erstellen (für Seed-Zwecke)
  static async createAdmin(req: Request, res: Response) {
    try {
      const { username, email, password, adminSecret }: UserDTO & { adminSecret: string } = req.body;

      // Überprüfe Admin-Secret
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ error: 'Invalid admin secret' });
      }

      // Überprüfe, ob Pflichtfelder vorhanden sind
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email and password are required' });
      }

      // Überprüfe, ob der Benutzername oder die E-Mail-Adresse bereits existiert
      const existingUser = await (prisma as any).user.findFirst({
        where: {
          OR: [
            { username },
            { email }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      // Passwort hashen und Admin-Benutzer erstellen
      const hashedPassword = await hashPassword(password);

      const newAdmin = await (prisma as any).user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          isAdmin: true
        }
      });

      // Sende Antwort ohne Passwort
      const { password: _, ...adminWithoutPassword } = newAdmin;
      res.status(201).json(adminWithoutPassword);
    } catch (error) {
      console.error('Admin creation error:', error);
      res.status(500).json({ error: 'Failed to create admin user' });
    }
  }

  // Benutzerdetails abrufen
  static async getProfile(req: Request & { userId?: number }, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await (prisma as any).user.findUnique({
        where: { id: req.userId }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Sende Antwort ohne Passwort
      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Failed to get user profile' });
    }
  }
}