import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Bookmark, User, LogOut, Settings, Moon, ChevronRight, Shield, Download } from 'lucide-react';
import { useToast } from './Toast';
import { useAuth, PLAN_LIMITS } from '../context/AuthContext';
import './TopBar.css';

const UsageMeter = () => {
  const { user } = useAuth();
  if (!user || user.membership.plan === 'None') return null;

  const used = user.membership.downloadsUsedToday;
  const limit = PLAN_LIMITS[user.membership.plan];
  const percent = Math.min((used / limit) * 100, 100);
  const isNearLimit = percent > 80;

  return (
    <div className="usage-meter" title="Daily downloads limit resets at midnight">
      <div className="usage-meter-capsule">
        <Download size={14} className="usage-icon" />
        <span className={`usage-text ${isNearLimit ? 'warning' : ''}`}>
          {used} / {limit}
        </span>
        <svg className="usage-ring" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" className="usage-ring-bg" />
          <circle 
            cx="12" cy="12" r="10" 
            className={`usage-ring-progress ${isNearLimit ? 'warning' : ''}`}
            strokeDasharray="62.8" 
            strokeDashoffset={62.8 - (percent / 100) * 62.8}
          />
        </svg>
      </div>
      
      {/* Popover */}
      <div className="usage-popover">
        <div className="usage-popover-header">
          <div className="usage-popover-title">Usage</div>
          <div className="usage-popover-plan">
            <div className={`plan-dot ${isNearLimit ? 'warning' : ''}`}></div>
            <span>{user.membership.plan}</span>
          </div>
        </div>
        
        <div className="usage-popover-body">
          You have used <strong>{used}</strong> of your <strong>{limit}</strong> daily downloads.
        </div>
        
        <div className="usage-popover-bar">
          <div 
            className={`usage-popover-fill ${isNearLimit ? 'warning' : ''}`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        <div className="usage-popover-footer">
          <span>Resets at midnight UTC</span>
          {isNearLimit && <span className="warning-text">Near limit</span>}
        </div>
      </div>
    </div>
  );
};

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const paths = [];
    
    if (path.includes('/categories/')) {
      const cat = path.split('/').pop()?.replace(/-/g, ' ');
      const params = new URLSearchParams(location.search);
      const subcat = params.get('subcategory');
      
      paths.push({ label: 'Directory', to: '/app' });
      paths.push({ label: cat || 'Category', to: path });
      if (subcat) {
        paths.push({ label: subcat, to: `${path}?subcategory=${encodeURIComponent(subcat)}` });
      }
    } else if (path.includes('/resource/')) {
      paths.push({ label: 'Directory', to: '/app' });
      paths.push({ label: 'Resource', to: path });
    } else if (path === '/app/search') {
      paths.push({ label: 'Search', to: path });
    } else if (path === '/app/bookmarks') {
      paths.push({ label: 'Bookmarks', to: path });
    } else if (path.includes('/app/collections')) {
      paths.push({ label: 'Collections', to: path });
    } else if (path === '/app/submit') {
      paths.push({ label: 'Submit Resource', to: path });
    } else if (path === '/app/membership') {
      paths.push({ label: 'Membership', to: path });
    } else if (path === '/app/billing') {
      paths.push({ label: 'Billing Center', to: path });
    } else if (path.includes('/app/great-hall')) {
      paths.push({ label: 'Great Hall', to: '/app/great-hall' });
    } else if (path === '/app/admin') {
      paths.push({ label: 'Admin', to: path });
    } else if (path === '/app/settings') {
      paths.push({ label: 'Settings', to: path });
    } else {
      paths.push({ label: 'Directory Overview', to: '/app' });
    }
    return paths;
  };

  const getSearchPlaceholder = () => {
    const path = location.pathname;
    if (path.includes('/categories/')) {
      const cat = path.split('/').pop()?.replace(/-/g, ' ');
      return `Search ${cat || 'Category'}...`;
    }
    if (path === '/app/bookmarks') return 'Search Bookmarks...';
    if (path === '/app/collections') return 'Search Collections...';
    if (path.includes('/app/great-hall')) return 'Search Great Hall...';
    return 'Search all resources...';
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast('Logged out successfully', 'info');
    navigate('/');
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-btn mobile-menu-btn" onClick={() => window.dispatchEvent(new CustomEvent('toggle-sidebar'))} aria-label="Toggle Menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <nav className="breadcrumbs">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.to}>
              {idx > 0 && <ChevronRight size={14} className="crumb-separator" />}
              <Link to={crumb.to} className={`crumb ${idx === breadcrumbs.length - 1 ? 'active' : ''}`}>
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </div>

      <div className="topbar-right">
        <div className="search-shortcut" onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}>
          <Search size={14} />
          <span className="search-text">{getSearchPlaceholder()}</span>
          <div className="shortcut-key">⌘K</div>
        </div>
        
        <div className="topbar-divider"></div>
        
        <UsageMeter />
        
        <Link to="/app/submit" className="action-btn primary-btn" title="Submit new resource">
          <Plus size={16} />
          <span>Submit</span>
        </Link>
        
        <Link to="/app/bookmarks" className="icon-btn" title="View Bookmarks">
          <Bookmark size={18} />
        </Link>
        
        <div className="profile-menu-container" ref={popoverRef}>
          <button className="user-avatar" onClick={() => setIsProfileOpen(!isProfileOpen)} title="Account Settings">
            <User size={16} />
          </button>
          
          {isProfileOpen && (
            <div className="profile-popover">
              <div className="profile-popover-header">
                <div className="profile-name">{user?.username || 'Invited User'}</div>
                <div className="profile-email">{user?.email || 'invite@designvault.local'}</div>
                <div className="profile-badge">
                  <Shield size={10} style={{ display: 'inline', marginRight: '4px' }} /> 
                  {user?.membership?.plan !== 'None' ? user?.membership?.plan : user?.role || 'Invited Member'}
                </div>
              </div>
              <div className="profile-popover-body">
                <button className="popover-item" onClick={() => { setIsProfileOpen(false); navigate('/app/billing'); }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> 
                  Membership & Billing
                </button>
                <button className="popover-item" onClick={() => { setIsProfileOpen(false); navigate('/app/settings'); }}>
                  <Settings size={14} style={{ marginRight: '8px' }} /> Settings
                </button>
                <button className="popover-item" onClick={() => { setIsProfileOpen(false); toast('Dark mode is already default', 'info'); }}>
                  <Moon size={14} style={{ marginRight: '8px' }} /> Theme: Dark
                </button>
              </div>
              <div className="profile-popover-footer">
                <button className="popover-item danger" onClick={handleLogout}>
                  <LogOut size={14} style={{ marginRight: '8px' }} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
