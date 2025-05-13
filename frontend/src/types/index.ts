export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AIResponse = {
  id: string;
  message: string;
  createdAt: Date;
};

export type DragDropItem = {
  id: string;
  content: string;
};