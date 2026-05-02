import React, { useState, useEffect, useMemo, useRef, useCallback, createContext, useContext } from 'react';
import { X, Plus, Check } from 'lucide-react';
import './CollectionModal.css';

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceId: string;
}

const CollectionModal: React.FC<CollectionModalProps> = ({ isOpen, onClose, resourceId }) => {
  // Mock collections from local state
  const [collections, setCollections] = useState<{ id: string; name: string; items: string[] }[]>([
    { id: 'c1', name: 'UI Inspiration', items: [] },
    { id: 'c2', name: 'SaaS Project', items: ['res-1', 'res-2'] }
  ]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen) return null;

  const handleToggleResource = (collectionId: string) => {
    setCollections(prev => prev.map(c => {
      if (c.id === collectionId) {
        if (c.items.includes(resourceId)) {
          return { ...c, items: c.items.filter(id => id !== resourceId) };
        } else {
          return { ...c, items: [...c.items, resourceId] };
        }
      }
      return c;
    }));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    
    const newCol = {
      id: `c${Date.now()}`,
      name: newCollectionName.trim(),
      items: [resourceId]
    };
    
    setCollections([...collections, newCol]);
    setNewCollectionName('');
    setIsCreating(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="collection-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Save to Collection</h2>
          <button className="icon-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-content">
          {collections.length === 0 ? (
            <p className="modal-empty">You don't have any collections yet.</p>
          ) : (
            <div className="collections-list">
              {collections.map(col => {
                const isAdded = col.items.includes(resourceId);
                return (
                  <button 
                    key={col.id} 
                    className={`collection-item-btn ${isAdded ? 'active' : ''}`}
                    onClick={() => handleToggleResource(col.id)}
                  >
                    <span className="col-name">{col.name}</span>
                    {isAdded ? (
                      <Check size={16} className="col-check" />
                    ) : (
                      <span className="col-action">Save</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {isCreating ? (
            <form className="create-col-form" onSubmit={handleCreate}>
              <input 
                type="text" 
                placeholder="Collection name" 
                value={newCollectionName}
                onChange={e => setNewCollectionName(e.target.value)}
                autoFocus
              />
              <div className="create-col-actions">
                <button type="button" className="action-btn" onClick={() => setIsCreating(false)}>Cancel</button>
                <button type="submit" className="action-btn primary-btn">Create & Save</button>
              </div>
            </form>
          ) : (
            <button className="create-col-btn" onClick={() => setIsCreating(true)}>
              <Plus size={16} /> Create New Collection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionModal;
