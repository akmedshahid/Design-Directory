import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Home, MessageSquareText, Users, Bookmark, Hash, Bell, HelpCircle,
} from 'lucide-react';
import { useAuth, type PlanType } from '../context/AuthContext';
import { mockMembers, greatHallRooms, greatHallConversations, type GreatHallAccess } from '../data/greatHallData';
import './GreatHallLayout.css';

const PLAN_ORDER: Record<PlanType, number> = {
  None: 0,
  Member: 1,
  Collector: 2,
  Patron: 3,
};

const ACCESS_ORDER: Record<GreatHallAccess, number> = {
  Open: 0,
  Member: 1,
  Collector: 2,
  Patron: 3,
  Admin: 4,
};

export const hasGreatHallAccess = (
  plan: PlanType | undefined,
  access: GreatHallAccess,
  isAdmin = false,
) => {
  if (isAdmin || access === 'Open') return true;
  return PLAN_ORDER[plan ?? 'None'] >= ACCESS_ORDER[access];
};

export const roleClassName = (role: string) => role.toLowerCase().replace(/\s+/g, '-');

export const formatRelativeTime = (timestamp: string) => {
  const delta = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.max(1, Math.round(delta / 60000));

  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  return `${days}d ago`;
};

export const findMemberById = (memberId: string) => mockMembers[memberId] ?? null;

export const findRoomById = (roomId: string) =>
  greatHallRooms.find((room) => room.id === roomId) ?? null;

const GreatHallLayout = () => {
  const location = useLocation();
  const { user } = useAuth();

  const totalOnline = greatHallRooms.reduce((sum, r) => sum + r.onlineCount, 0);
  const unreadDMs = greatHallConversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <div className="great-hall-layout">
      <aside className="gh-sidebar">
        <div className="gh-sidebar-header">
          <h3>Great Hall</h3>
          <div className="gh-online-indicator">
            <span className="gh-online-dot" />
            <span>{totalOnline} online</span>
          </div>
        </div>

        <nav className="gh-sidebar-nav">
          <div className="gh-nav-section">
            <NavLink to="/app/great-hall" end className={({ isActive }) => `gh-nav-item ${isActive ? 'active' : ''}`}>
              <Home size={15} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/app/great-hall/requests" className={({ isActive }) => `gh-nav-item ${isActive || location.pathname.startsWith('/app/great-hall/requests/') ? 'active' : ''}`}>
              <HelpCircle size={15} />
              <span>Requests</span>
            </NavLink>
            <NavLink to="/app/great-hall/dm" className={({ isActive }) => `gh-nav-item ${isActive || location.pathname.startsWith('/app/great-hall/dm/') ? 'active' : ''}`}>
              <MessageSquareText size={15} />
              <span>Messages</span>
              {unreadDMs > 0 && <span className="gh-nav-badge">{unreadDMs}</span>}
            </NavLink>
            <NavLink to="/app/great-hall/members" className={({ isActive }) => `gh-nav-item ${isActive || location.pathname.startsWith('/app/great-hall/members/') ? 'active' : ''}`}>
              <Users size={15} />
              <span>Members</span>
            </NavLink>
            <NavLink to="/app/great-hall/saved" className={({ isActive }) => `gh-nav-item ${isActive ? 'active' : ''}`}>
              <Bookmark size={15} />
              <span>Saved</span>
            </NavLink>
            <NavLink to="/app/great-hall/notifications" className={({ isActive }) => `gh-nav-item ${isActive ? 'active' : ''}`}>
              <Bell size={15} />
              <span>Notifications</span>
            </NavLink>
          </div>

          <div className="gh-nav-section">
            <div className="gh-nav-section-label">Rooms</div>
            {greatHallRooms.map((room) => {
              const isActive = location.pathname === `/app/great-hall/rooms/${room.id}`;
              return (
                <NavLink
                  key={room.id}
                  to={`/app/great-hall/rooms/${room.id}`}
                  className={`gh-nav-item gh-room-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Hash size={14} />
                  <span className="gh-room-nav-name">{room.name}</span>
                  {room.onlineCount > 0 && (
                    <span className="gh-room-online-count">{room.onlineCount}</span>
                  )}
                  {room.unreadCount > 0 && (
                    <span className="gh-nav-badge">{room.unreadCount}</span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </aside>
      <section className="gh-main-content">
        <Outlet />
      </section>
    </div>
  );
};

export default GreatHallLayout;
