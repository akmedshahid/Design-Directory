import React, { useState, useEffect, useMemo, useRef, useCallback, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Folder, Bookmark, Settings, Library, Plus, Shield } from 'lucide-react';
import { resources, categories } from '../data';
import './CommandPalette.css';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // This is handled in AppLayout.tsx typically, but we ensure it works if imported globally
        const event = new CustomEvent('toggle-command-palette');
        window.dispatchEvent(event);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Compute Results
  const navigationActions = [
    { id: 'nav-home', label: 'Go to Directory', icon: <Folder size={16} />, path: '/app' },
    { id: 'nav-bookmarks', label: 'View Bookmarks', icon: <Bookmark size={16} />, path: '/app/bookmarks' },
    { id: 'nav-collections', label: 'View Collections', icon: <Library size={16} />, path: '/app/collections' },
    { id: 'nav-submit', label: 'Submit Resource', icon: <Plus size={16} />, path: '/app/submit' },
    { id: 'nav-settings', label: 'Settings', icon: <Settings size={16} />, path: '/app/settings' },
    { id: 'nav-admin', label: 'Admin panel', icon: <Shield size={16} />, path: '/app/admin' },
  ];

  const categoryActions = categories.map(cat => ({
    id: `cat-${cat}`,
    label: `Browse ${cat}`,
    icon: <ArrowRight size={16} />,
    path: `/app/categories/${cat.toLowerCase().replace(/ /g, '-')}`
  }));

  const allItems = [...navigationActions, ...categoryActions];

  let filteredItems = allItems;
  if (query.trim()) {
    const q = query.toLowerCase();
    filteredItems = allItems.filter(item => item.label.toLowerCase().includes(q));
    
    // Also include top 3 resources if typing
    const resourceHits = resources
      .filter(r => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q))
      .slice(0, 3)
      .map(r => ({
        id: `res-${r.id}`,
        label: `${r.title} (${r.category})`,
        icon: <Search size={16} />,
        path: `/app/resource/${r.id}`
      }));
    
    filteredItems = [...filteredItems, ...resourceHits];
  } else {
    // Default empty state, just show nav
    filteredItems = navigationActions;
  }

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleKeyDownLocal = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex].path);
      }
    }
  };

  return (
    <div className="cmd-overlay" onClick={onClose}>
      <div className="cmd-palette" onClick={e => e.stopPropagation()}>
        <div className="cmd-search-wrap">
          <Search className="cmd-icon" size={20} />
          <input 
            ref={inputRef}
            type="text" 
            className="cmd-input" 
            placeholder="Search commands, resources, categories..." 
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownLocal}
          />
          <div className="cmd-hint">ESC</div>
        </div>

        <div className="cmd-results">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <button 
                key={item.id} 
                className={`cmd-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSelect(item.path)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <span className="cmd-item-icon">{item.icon}</span>
                <span className="cmd-item-label">{item.label}</span>
                {idx === selectedIndex && <span className="cmd-item-action">Enter ↵</span>}
              </button>
            ))
          ) : (
            <div className="cmd-empty">No results found for "{query}"</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
