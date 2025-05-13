export interface Project {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    isActive: boolean;
}