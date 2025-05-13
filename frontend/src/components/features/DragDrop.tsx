import React, { useState } from 'react';

interface DragDropItem {
  id: string;
  content: string;
}

export const DragDrop: React.FC = () => {
  const [items, setItems] = useState<DragDropItem[]>([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ]);

  // Einfache Implementierung - in einer realen App würdest du react-beautiful-dnd verwenden
  return (
    <div className="drag-drop-container">
      <h3>Drag & Drop Demo</h3>
      <div className="drag-drop-items">
        {items.map(item => (
          <div key={item.id} className="drag-item">
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};