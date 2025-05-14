import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Stellt sicher, dass die Verbindung beim Beenden der App geschlossen wird
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});