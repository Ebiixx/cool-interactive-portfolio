import React from 'react';
import { DragDrop } from '../components/features/DragDrop';
import { AnimatedCards } from '../components/features/AnimatedCards';
import { Card } from '../components/common/Card';

const Projects = () => {
    return (
        <div className="projects-page">
            <h1>My Projects</h1>
            <DragDrop />
            <div className="animated-cards">
                <AnimatedCards />
            </div>
            <div className="project-list">
                <Card title="Project 1" description="Description of project 1" />
                <Card title="Project 2" description="Description of project 2" />
                <Card title="Project 3" description="Description of project 3" />
            </div>
        </div>
    );
};

export default Projects;