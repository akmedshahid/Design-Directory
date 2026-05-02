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
    <div className="flex flex-1 min-h-0">
      <aside className="flex flex-col w-[220px] shrink-0 bg-[#0d0d0f] border-r border-white/[0.06]">
        <div className="flex items-center justify-between px-4 h-[44px] shrink-0 border-b border-white/[0.06]">
          <span className="text-[13px] font-semibold text-white/80">Great Hall</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-emerald-400/70 font-medium">{totalOnline}</span>
          </div>
        </div>

        <nav className="flex flex-col gap-0.5 p-2 flex-1 overflow-y-auto">
          <NavLink to="/app/great-hall" end className={({ isActive }) => `gh-nav-item ${isActive ? 'active' : ''}`}>
            <Home size={14} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/app/great-hall/requests" className={({ isActive }) => `gh-nav-item ${isActive || location.pathname.startsWith('/app/great-hall/requests/') ? 'active' : ''}`}>
            <HelpCircle size={14} />
            <span>Requests</span>
          </NavLink>
          <NavLink to="/app/great-hall/dm" className={({ isActive }) => `gh-nav-item ${isActive || location.pathname.startsWith('/app/great-hall/dm/') ? 'active' : ''}`}>
            <MessageSquareText size={14} />
            <span>Messages</span>
            {unreadDMs > 0 && <span className="gh-badge">{unreadDMs}</span>}
          </NavLink>
          <NavLink to="/app/great-hall/members" className={({ isActive }) => `gh-nav-item ${isActive || location.pathname.startsWith('/app/great-hall/members/') ? 'active' : ''}`}>
            <Users size={14} />
            <span>Members</span>
          </NavLink>
          <NavLink to="/app/great-hall/saved" className={({ isActive }) => `gh-nav-item ${isActive ? 'active' : ''}`}>
            <Bookmark size={14} />
            <span>Saved</span>
          </NavLink>
          <NavLink to="/app/great-hall/notifications" className={({ isActive }) => `gh-nav-item ${isActive ? 'active' : ''}`}>
            <Bell size={14} />
            <span>Notifications</span>
          </NavLink>

          <div className="mt-4 mb-1.5 px-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/25">Rooms</span>
          </div>
          {greatHallRooms.map((room) => {
            const isActive = location.pathname === `/app/great-hall/rooms/${room.id}`;
            return (
              <NavLink
                key={room.id}
                to={`/app/great-hall/rooms/${room.id}`}
                className={`gh-nav-item ${isActive ? 'active' : ''}`}
              >
                <Hash size={13} className="text-white/20" />
                <span className="flex-1 truncate">{room.name}</span>
                {room.onlineCount > 0 && (
                  <span className="text-[10px] text-white/20 font-medium tabular-nums">{room.onlineCount}</span>
                )}
                {room.unreadCount > 0 && (
                  <span className="gh-badge">{room.unreadCount}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <section className="flex-1 overflow-y-auto min-w-0">
        <Outlet />
      </section>
    </div>
  );
};

export default GreatHallLayout;
