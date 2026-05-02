import React from 'react';
import { Bell, Hash, MessageSquareText, Sparkles, Users, Bookmark, Settings as SettingsIcon } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth, type PlanType } from '../context/AuthContext';
import { mockMembers, greatHallRooms, type GreatHallAccess } from '../data/greatHallData';
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
  const { user } = useAuth();
  const onlineCount = greatHallRooms.reduce((total, room) => total + room.onlineCount, 0);
  const planLabel = user?.membership.plan && user.membership.plan !== 'None'
    ? user.membership.plan
    : 'Guest';

  const primaryItems = [
    { to: '/app/great-hall', label: 'Hall Home', icon: <Sparkles size={16} /> },
    { to: '/app/great-hall/requests', label: 'Requests', icon: <Bell size={16} /> },
    { to: '/app/great-hall/dm', label: 'Messages', icon: <MessageSquareText size={16} /> },
    { to: '/app/great-hall/members', label: 'Members', icon: <Users size={16} /> },
    { to: '/app/great-hall/saved', label: 'Saved', icon: <Bookmark size={16} /> },
    { to: '/app/great-hall/notifications', label: 'Notifications', icon: <Bell size={16} /> },
  ];

  return (
    <div className="great-hall-layout">
      <aside className="gh-sidebar">
        <div className="gh-sidebar-header">
          <div className="gh-logo-mark">
            <Sparkles size={16} />
          </div>
          <div className="gh-header-text">
            <h2>Great Hall</h2>
            <div className="gh-online">{onlineCount} online • {planLabel} access</div>
          </div>
        </div>

        <div className="gh-nav-content">
          <div className="gh-nav-section">
            {primaryItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/app/great-hall'}
                className={({ isActive }) => `gh-nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="gh-nav-section">
            <div className="gh-section-title">Rooms</div>
            {greatHallRooms.map((room) => (
              <NavLink
                key={room.id}
                to={`/app/great-hall/rooms/${room.id}`}
                className={({ isActive }) => `gh-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="gh-group-icon" style={{ background: room.accent }}>
                  {room.iconLabel}
                </div>
                <span>{room.name}</span>
                {room.unreadCount > 0 ? <span className="gh-badge unread">{room.unreadCount}</span> : null}
                {room.access !== 'Open' ? <span className="gh-badge access-badge">{room.access}</span> : null}
              </NavLink>
            ))}
          </div>

          {user?.role === 'Admin' && (
            <div className="gh-nav-section">
              <div className="gh-section-title">Admin</div>
              <NavLink to="/app/great-hall/admin/create-room" className={({ isActive }) => `gh-nav-item ${isActive ? 'active' : ''}`}>
                <SettingsIcon size={16} />
                <span>Create Room</span>
              </NavLink>
              <NavLink to="/app/great-hall/admin/manage-rooms" className={({ isActive }) => `gh-nav-item ${isActive ? 'active' : ''}`}>
                <SettingsIcon size={16} />
                <span>Manage Rooms</span>
              </NavLink>
            </div>
          )}
        </div>
      </aside>

      <section className="gh-main-content">
        <Outlet />
      </section>
    </div>
  );
};

export default GreatHallLayout;
