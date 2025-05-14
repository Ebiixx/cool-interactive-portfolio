export interface ProjectDTO {
  id?: number;
  title: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  featured?: boolean;
  order?: number;
}

export interface ProjectResponse extends ProjectDTO {
  id: number;
  createdAt: string;
  updatedAt: string;
}