import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/auth.utils';

const prisma = new PrismaClient();

async function main() {
  try {
    const adminPassword = await hashPassword('admin123');
    
    // Überprüfen, ob bereits ein Admin-Benutzer existiert
    const existingAdmin = await (prisma as any).user.findFirst({
      where: {
        isAdmin: true
      }
    });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    // Admin-Benutzer erstellen
    const admin = await (prisma as any).user.create({
      data: {
        username: 'admin',
        email: 'admin@example.com',
        password: adminPassword,
        isAdmin: true,
        firstName: 'Admin',
        lastName: 'User'
      }
    });

    console.log('Admin user created:', admin.username);
  } catch (e) {
    console.error('Error creating admin user:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();