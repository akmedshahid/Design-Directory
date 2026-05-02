import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Bookmark, Library, User, LogOut, Settings, Moon, ChevronRight, Shield, Download } from 'lucide-react';
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
        <Download size={13} className="usage-icon" />
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
    const paths: { label: string; to: string }[] = [];
    
    if (path.includes('/app/sites/categories/')) {
      const cat = path.split('/').pop()?.replace(/-/g, ' ');
      const params = new URLSearchParams(location.search);
      const subcat = params.get('subcategory');
      paths.push({ label: 'Sites', to: '/app/sites' });
      paths.push({ label: cat || 'Category', to: path });
      if (subcat) {
        paths.push({ label: subcat, to: `${path}?subcategory=${encodeURIComponent(subcat)}` });
      }
    } else if (path.includes('/app/categories/')) {
      const cat = path.split('/').pop()?.replace(/-/g, ' ');
      const params = new URLSearchParams(location.search);
      const subcat = params.get('subcategory');
      paths.push({ label: 'Resources', to: '/app' });
      paths.push({ label: cat || 'Category', to: path });
      if (subcat) {
        paths.push({ label: subcat, to: `${path}?subcategory=${encodeURIComponent(subcat)}` });
      }
    } else if (path.includes('/app/sites/submit')) {
      paths.push({ label: 'Sites', to: '/app/sites' });
      paths.push({ label: 'Submit Site', to: path });
    } else if (path.includes('/app/sites/')) {
      paths.push({ label: 'Sites', to: '/app/sites' });
      paths.push({ label: 'Site Detail', to: path });
    } else if (path === '/app/sites') {
      paths.push({ label: 'Sites', to: path });
    } else if (path.includes('/resource/')) {
      paths.push({ label: 'Resources', to: '/app' });
      paths.push({ label: 'Resource Detail', to: path });
    } else if (path.includes('/app/great-hall/rooms/')) {
      paths.push({ label: 'Great Hall', to: '/app/great-hall' });
      paths.push({ label: 'Rooms', to: '/app/great-hall/rooms' });
      const roomId = path.split('/').pop();
      const roomName = roomId?.replace(/-/g, ' ') || 'Room';
      paths.push({ label: roomName, to: path });
    } else if (path === '/app/great-hall/rooms') {
      paths.push({ label: 'Great Hall', to: '/app/great-hall' });
      paths.push({ label: 'Rooms', to: path });
    } else if (path.includes('/app/great-hall/requests/')) {
      paths.push({ label: 'Great Hall', to: '/app/great-hall' });
      paths.push({ label: 'Requests', to: '/app/great-hall/requests' });
      paths.push({ label: 'Detail', to: path });
    } else if (path === '/app/great-hall/requests') {
      paths.push({ label: 'Great Hall', to: '/app/great-hall' });
      paths.push({ label: 'Requests', to: path });
    } else if (path.includes('/app/great-hall/dm')) {
      paths.push({ label: 'Great Hall', to: '/app/great-hall' });
      paths.push({ label: 'Messages', to: path });
    } else if (path.includes('/app/great-hall/members/')) {
      paths.push({ label: 'Great Hall', to: '/app/great-hall' });
      paths.push({ label: 'Members', to: '/app/great-hall/members' });
      paths.push({ label: 'Profile', to: path });
    } else if (path === '/app/great-hall/members') {
      paths.push({ label: 'Great Hall', to: '/app/great-hall' });
      paths.push({ label: 'Members', to: path });
    } else if (path.includes('/app/great-hall/saved')) {
      paths.push({ label: 'Great Hall', to: '/app/great-hall' });
      paths.push({ label: 'Saved', to: path });
    } else if (path.includes('/app/great-hall/notifications')) {
      paths.push({ label: 'Great Hall', to: '/app/great-hall' });
      paths.push({ label: 'Notifications', to: path });
    } else if (path === '/app/great-hall') {
      paths.push({ label: 'Great Hall', to: path });
    } else if (path.includes('/app/group-buys/')) {
      paths.push({ label: 'Group-Buys', to: '/app/group-buys' });
      const sub = path.replace('/app/group-buys/', '');
      const labelMap: Record<string, string> = {
        'requests': 'Requests & Voting',
        'scheduled': 'Scheduled',
        'active': 'Active Buys',
        'completed': 'Completed',
        'mine': 'My Participation',
        'payments': 'My Payments',
        'rules': 'Rules & Legal',
        'new': 'New Request',
        'admin': 'Admin Review',
      };
      paths.push({ label: labelMap[sub] || sub.replace(/-/g, ' '), to: path });
    } else if (path === '/app/group-buys') {
      paths.push({ label: 'Group-Buys', to: path });
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
      paths.push({ label: 'Billing', to: path });
    } else if (path === '/app/admin') {
      paths.push({ label: 'Admin', to: path });
    } else if (path === '/app/settings') {
      paths.push({ label: 'Settings', to: path });
    } else {
      paths.push({ label: 'Resources', to: '/app' });
    }
    return paths;
  };

  const getSearchPlaceholder = () => {
    const path = location.pathname;
    if (path.includes('/app/sites')) return 'Search sites...';
    if (path.includes('/categories/')) {
      const cat = path.split('/').pop()?.replace(/-/g, ' ');
      return `Search ${cat || 'category'}...`;
    }
    if (path === '/app/bookmarks') return 'Search bookmarks...';
    if (path === '/app/collections') return 'Search collections...';
    if (path.includes('/app/great-hall')) return 'Search Great Hall...';
    if (path.includes('/app/group-buys')) return 'Search group-buys...';
    return 'Search resources...';
  };

  const getSubmitLabel = () => {
    const path = location.pathname;
    if (path.includes('/app/sites')) return 'Add Site';
    if (path.includes('/app/group-buys')) return 'New Request';
    return 'Submit';
  };

  const getSubmitPath = () => {
    const path = location.pathname;
    if (path.includes('/app/sites')) return '/app/sites/submit';
    if (path.includes('/app/group-buys')) return '/app/group-buys/new';
    return '/app/submit';
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
              {idx > 0 && <ChevronRight size={12} className="crumb-separator" />}
              <Link to={crumb.to} className={`crumb ${idx === breadcrumbs.length - 1 ? 'active' : ''}`}>
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </div>

      <div className="topbar-right">
        <div className="search-shortcut" onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}>
          <Search size={13} />
          <span className="search-text">{getSearchPlaceholder()}</span>
          <div className="shortcut-key">&#8984;K</div>
        </div>
        
        <div className="topbar-divider"></div>
        
        <UsageMeter />
        
        <Link to={getSubmitPath()} className="action-btn primary-btn" title={getSubmitLabel()}>
          <Plus size={14} />
          <span>{getSubmitLabel()}</span>
        </Link>
        
        <Link to="/app/bookmarks" className="icon-btn" title="Bookmarks">
          <Bookmark size={16} />
        </Link>
        
        <Link to="/app/collections" className="icon-btn" title="Collections">
          <Library size={16} />
        </Link>
        
        <div className="profile-menu-container" ref={popoverRef}>
          <button className="user-avatar" onClick={() => setIsProfileOpen(!isProfileOpen)} title="Account">
            <User size={14} />
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
                <button className="popover-item" onClick={() => { setIsProfileOpen(false); toast('Dark mode is the default theme', 'info'); }}>
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
