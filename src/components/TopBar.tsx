import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Plus, User, LogOut, Settings, Moon, ChevronRight, Shield, Download } from 'lucide-react';
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
    <div className="group relative" title="Daily downloads limit resets at midnight">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] cursor-default">
        <Download size={12} className="text-white/30" />
        <span className={`text-[12px] font-medium tabular-nums ${isNearLimit ? 'text-amber-400' : 'text-white/50'}`}>
          {used}/{limit}
        </span>
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
    <header className="flex items-center justify-between h-[48px] px-5 bg-[#0c0c0e]/80 backdrop-blur-xl border-b border-white/[0.06] sticky top-0 z-50 shrink-0">
      <div className="flex items-center gap-4">
        <button className="topbar-mobile-menu" onClick={() => window.dispatchEvent(new CustomEvent('toggle-sidebar'))} aria-label="Toggle Menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <nav className="flex items-center gap-1.5">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.to}>
              {idx > 0 && <ChevronRight size={11} className="text-white/15" />}
              <Link
                to={crumb.to}
                className={`text-[13px] font-medium capitalize no-underline transition-colors ${
                  idx === breadcrumbs.length - 1
                    ? 'text-white/90 pointer-events-none'
                    : 'text-white/35 hover:text-white/60'
                }`}
              >
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <UsageMeter />

        <Link
          to={getSubmitPath()}
          className="flex items-center gap-1.5 h-[30px] px-3 rounded-md bg-white text-[#0a0a0b] text-[12px] font-semibold no-underline hover:bg-white/90 transition-colors"
        >
          <Plus size={13} />
          <span>{getSubmitLabel()}</span>
        </Link>

        <div className="relative" ref={popoverRef}>
          <button
            className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/[0.06] border border-white/[0.08] text-white/50 hover:bg-white/[0.1] hover:text-white/70 transition-colors"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            title="Account"
          >
            <User size={13} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-[calc(100%+6px)] w-[240px] bg-[#141416] border border-white/[0.08] rounded-lg overflow-hidden z-50 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              <div className="px-4 py-3 border-b border-white/[0.06]">
                <div className="text-[13px] font-semibold text-white">{user?.username || 'Invited User'}</div>
                <div className="text-[11px] text-white/35 mt-0.5">{user?.email || 'invite@designvault.local'}</div>
                <div className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-medium text-[#5c6cff] bg-[#5c6cff]/10 px-2 py-0.5 rounded">
                  <Shield size={9} />
                  {user?.membership?.plan !== 'None' ? user?.membership?.plan : user?.role || 'Invited Member'}
                </div>
              </div>
              <div className="py-1">
                <button className="topbar-popover-item" onClick={() => { setIsProfileOpen(false); navigate('/app/billing'); }}>
                  <Download size={13} /> Membership & Billing
                </button>
                <button className="topbar-popover-item" onClick={() => { setIsProfileOpen(false); navigate('/app/settings'); }}>
                  <Settings size={13} /> Settings
                </button>
                <button className="topbar-popover-item" onClick={() => { setIsProfileOpen(false); toast('Dark mode is the default theme', 'info'); }}>
                  <Moon size={13} /> Theme: Dark
                </button>
              </div>
              <div className="border-t border-white/[0.06] py-1">
                <button className="topbar-popover-item text-red-400 hover:!bg-red-500/10" onClick={handleLogout}>
                  <LogOut size={13} /> Sign out
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
