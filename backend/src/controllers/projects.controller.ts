import { Request, Response } from 'express';
import { prisma } from '../services/prisma.service';
import { ProjectDTO } from '../models/project.model';

export class ProjectsController {
  // Alle Projekte abrufen
  static async getAllProjects(req: Request, res: Response) {
    try {
      const projects = await prisma.project.findMany({
        orderBy: [
          { featured: 'desc' },
          { order: 'asc' },
          { createdAt: 'desc' }
        ]
      });

      // Konvertiere Tags-String zurück in Array
      const formattedProjects = projects.map(project => ({
        ...project,
        tags: project.tags.split(',').filter(tag => tag.trim() !== '')
      }));

      return res.status(200).json(formattedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ error: 'Failed to fetch projects' });
    }
  }

  // Ein Projekt nach ID abrufen
  static async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const project = await prisma.project.findUnique({
        where: { id: parseInt(id) }
      });

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Konvertiere Tags-String zurück in Array
      const formattedProject = {
        ...project,
        tags: project.tags.split(',').filter(tag => tag.trim() !== '')
      };

      return res.status(200).json(formattedProject);
    } catch (error) {
      console.error('Error fetching project:', error);
      return res.status(500).json({ error: 'Failed to fetch project' });
    }
  }

  // Neues Projekt erstellen
  static async createProject(req: Request, res: Response) {
    try {
      const projectData: ProjectDTO = req.body;
      
      // Überprüfe erforderliche Felder
      if (!projectData.title || !projectData.description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }

      // Konvertiere Tags-Array in String
      const tagsString = Array.isArray(projectData.tags) 
        ? projectData.tags.join(',') 
        : '';

      const newProject = await prisma.project.create({
        data: {
          title: projectData.title,
          description: projectData.description,
          imageUrl: projectData.imageUrl || null,
          demoUrl: projectData.demoUrl || null,
          githubUrl: projectData.githubUrl || null,
          tags: tagsString,
          featured: projectData.featured || false,
          order: projectData.order || 0
        }
      });

      // Konvertiere Tags-String zurück in Array für die Antwort
      const formattedProject = {
        ...newProject,
        tags: newProject.tags.split(',').filter(tag => tag.trim() !== '')
      };

      return res.status(201).json(formattedProject);
    } catch (error) {
      console.error('Error creating project:', error);
      return res.status(500).json({ error: 'Failed to create project' });
    }
  }

  // Projekt aktualisieren
  static async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const projectData: ProjectDTO = req.body;

      // Prüfe, ob das Projekt existiert
      const existingProject = await prisma.project.findUnique({
        where: { id: parseInt(id) }
      });

      if (!existingProject) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Konvertiere Tags-Array in String
      const tagsString = Array.isArray(projectData.tags) 
        ? projectData.tags.join(',') 
        : existingProject.tags;

      // Sicherstellen, dass order eine Zahl ist
      let orderValue = existingProject.order;
      if (projectData.order !== undefined) {
        orderValue = typeof projectData.order === 'string' 
          ? parseInt(projectData.order) 
          : projectData.order;
        // Sicherstellen, dass es eine gültige Zahl ist
        if (isNaN(orderValue)) {
          orderValue = existingProject.order;
        }
      }

      const updatedProject = await prisma.project.update({
        where: { id: parseInt(id) },
        data: {
          title: projectData.title || existingProject.title,
          description: projectData.description || existingProject.description,
          imageUrl: projectData.imageUrl !== undefined ? projectData.imageUrl : existingProject.imageUrl,
          demoUrl: projectData.demoUrl !== undefined ? projectData.demoUrl : existingProject.demoUrl,
          githubUrl: projectData.githubUrl !== undefined ? projectData.githubUrl : existingProject.githubUrl,
          tags: tagsString,
          featured: projectData.featured !== undefined ? projectData.featured : existingProject.featured,
          order: orderValue
        }
      });

      // Konvertiere Tags-String zurück in Array für die Antwort
      const formattedProject = {
        ...updatedProject,
        tags: updatedProject.tags.split(',').filter(tag => tag.trim() !== '')
      };

      return res.status(200).json(formattedProject);
    } catch (error) {
      console.error('Error updating project:', error);
      return res.status(500).json({ error: 'Failed to update project' });
    }
  }

  // Projekt löschen
  static async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Prüfe, ob das Projekt existiert
      const existingProject = await prisma.project.findUnique({
        where: { id: parseInt(id) }
      });

      if (!existingProject) {
        return res.status(404).json({ error: 'Project not found' });
      }

      await prisma.project.delete({
        where: { id: parseInt(id) }
      });

      return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      return res.status(500).json({ error: 'Failed to delete project' });
    }
  }
}