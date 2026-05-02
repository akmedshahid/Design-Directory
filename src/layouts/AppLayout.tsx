import React, { useState, useEffect, useMemo, useRef, useCallback, createContext, useContext } from 'react';

import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import CommandPalette from '../components/CommandPalette';
import './AppLayout.css';

const AppLayout = () => {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(true);
      }
      if (e.key === 'Escape') {
        setCmdOpen(false);
      }
    };
    
    const handleCmdEvent = () => setCmdOpen(true);
    const handleSidebarEvent = () => setSidebarOpen(prev => !prev);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-command-palette', handleCmdEvent);
    window.addEventListener('toggle-sidebar', handleSidebarEvent);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-command-palette', handleCmdEvent as EventListener);
      window.removeEventListener('toggle-sidebar', handleSidebarEvent as EventListener);
    };
  }, []);

  return (
    <div className="app-layout">
      <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}></div>
      <div className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar />
      </div>
      <div className="main-content">
        <TopBar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
};

export default AppLayout;
