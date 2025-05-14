import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_only_for_development';
const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const generateToken = (userId: number, isAdmin: boolean): string => {
  return jwt.sign(
    { userId, isAdmin },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token: string): { userId: number; isAdmin: boolean } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; isAdmin: boolean };
    return decoded;
  } catch (error) {
    return null;
  }
};