import React from 'react';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  link?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  image, 
  link, 
  children 
}) => {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-image" />}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        {children}
        {link && (
          <a href={link} className="card-link" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        )}
      </div>
    </div>
  );
};