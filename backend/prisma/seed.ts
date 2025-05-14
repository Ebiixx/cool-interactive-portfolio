import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Bestehende Projekte löschen
  await prisma.project.deleteMany({});
  
  // Demo-Projekte erstellen
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Eine moderne E-Commerce-Plattform mit React, Node.js und MongoDB.',
      imageUrl: 'https://via.placeholder.com/350x200?text=E-Commerce',
      demoUrl: 'https://example.com/demo/ecommerce',
      githubUrl: 'https://github.com/example/ecommerce',
      tags: 'React,Node.js,MongoDB,Redux',
      featured: true,
      order: 1
    },
    {
      title: 'Social Media Dashboard',
      description: 'Ein Social Media Analytics Dashboard mit Echtzeit-Updates.',
      imageUrl: 'https://via.placeholder.com/350x200?text=Dashboard',
      demoUrl: 'https://example.com/demo/dashboard',
      githubUrl: 'https://github.com/example/dashboard',
      tags: 'React,D3.js,Firebase,Material UI',
      featured: false,
      order: 2
    },
    {
      title: 'Portfolio Website',
      description: 'Ein interaktives Portfolio mit 3D-Elementen und Animationen.',
      imageUrl: 'https://via.placeholder.com/350x200?text=Portfolio',
      demoUrl: 'https://example.com/demo/portfolio',
      githubUrl: 'https://github.com/example/portfolio',
      tags: 'React,Three.js,Framer Motion,Tailwind CSS',
      featured: true,
      order: 0
    }
  ];
  
  for (const project of projects) {
    await prisma.project.create({
      data: project
    });
  }
  
  console.log('Seed-Daten wurden erfolgreich eingefügt.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });