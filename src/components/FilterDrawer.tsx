import React, { useState, useEffect, useMemo, useRef, useCallback, createContext, useContext } from 'react';
import { X } from 'lucide-react';
import './FilterDrawer.css';

export interface FilterState {
  priceTypes: string[];
  licenses: string[];
  tools: string[];
  fileTypes: string[];
  freeOnly: boolean;
  paidOnly: boolean;
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose, filters, setFilters }) => {
  if (!isOpen) return null;

  const toggleArrayItem = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const arr = prev[key] as string[];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter(i => i !== value) };
      } else {
        return { ...prev, [key]: [...arr, value] };
      }
    });
  };

  const clearAll = () => {
    setFilters({
      priceTypes: [],
      licenses: [],
      tools: [],
      fileTypes: [],
      freeOnly: false,
      paidOnly: false,
    });
  };

  const activeCount = 
    filters.priceTypes.length + 
    filters.licenses.length + 
    filters.tools.length + 
    filters.fileTypes.length + 
    (filters.freeOnly ? 1 : 0) + 
    (filters.paidOnly ? 1 : 0);

  return (
    <>
      <div className="filter-overlay" onClick={onClose}></div>
      <div className="filter-drawer">
        <div className="filter-header">
          <div>
            <h2 className="filter-title">Filters</h2>
            <span className="filter-count">{activeCount} active</span>
          </div>
          <button className="icon-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="filter-content">
          <div className="filter-section">
            <h3 className="filter-subtitle">Pricing</h3>
            <label className="filter-checkbox">
              <input type="checkbox" checked={filters.freeOnly} onChange={(e) => setFilters(p => ({...p, freeOnly: e.target.checked, paidOnly: false}))} />
              <span>Free Only</span>
            </label>
            <label className="filter-checkbox">
              <input type="checkbox" checked={filters.paidOnly} onChange={(e) => setFilters(p => ({...p, paidOnly: e.target.checked, freeOnly: false}))} />
              <span>Paid Only</span>
            </label>
            <div style={{ height: '8px' }}></div>
            {['Free', 'Paid', 'Freemium'].map(pt => (
              <label key={pt} className="filter-checkbox">
                <input type="checkbox" checked={filters.priceTypes.includes(pt)} onChange={() => toggleArrayItem('priceTypes', pt)} />
                <span>{pt}</span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h3 className="filter-subtitle">License</h3>
            {['Personal', 'Commercial', 'Extended', 'Open Source'].map(lic => (
              <label key={lic} className="filter-checkbox">
                <input type="checkbox" checked={filters.licenses.includes(lic)} onChange={() => toggleArrayItem('licenses', lic)} />
                <span>{lic}</span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h3 className="filter-subtitle">Tools</h3>
            {['Figma', 'Framer', 'Webflow', 'Photoshop', 'Illustrator', 'Blender', 'Cinema 4D', 'After Effects'].map(tool => (
              <label key={tool} className="filter-checkbox">
                <input type="checkbox" checked={filters.tools.includes(tool)} onChange={() => toggleArrayItem('tools', tool)} />
                <span>{tool}</span>
              </label>
            ))}
          </div>
          
          <div className="filter-section">
            <h3 className="filter-subtitle">File Types</h3>
            {['.fig', '.zip', '.psd', '.ai', '.blend', '.c4d', '.png', '.svg'].map(ft => (
              <label key={ft} className="filter-checkbox">
                <input type="checkbox" checked={filters.fileTypes.includes(ft)} onChange={() => toggleArrayItem('fileTypes', ft)} />
                <span>{ft}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-footer">
          <button className="action-btn" onClick={clearAll}>Clear All</button>
          <button className="action-btn primary-btn" onClick={onClose}>Apply Filters</button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
