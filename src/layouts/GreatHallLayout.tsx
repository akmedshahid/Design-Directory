import React from 'react';
import { Outlet } from 'react-router-dom';
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
  return (
    <div className="great-hall-layout">
      <section className="gh-main-content">
        <Outlet />
      </section>
    </div>
  );
};

export default GreatHallLayout;
