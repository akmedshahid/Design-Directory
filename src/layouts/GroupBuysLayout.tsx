import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutGrid, Activity, CalendarClock, Play, CheckCircle2,
  UserCircle, CreditCard, ShieldAlert, PlusCircle,
} from 'lucide-react';
import { mockGroupBuys } from '../data/groupBuysData';
import './GroupBuysLayout.css';

const GroupBuysLayout = () => {
  const location = useLocation();

  const activeCount = mockGroupBuys.filter(
    gb => gb.status === 'Active' || gb.status === 'Collecting Payments',
  ).length;
  const requestsCount = mockGroupBuys.filter(
    gb => gb.status === 'Requested' || gb.status === 'Under Review' || gb.status === 'Voting',
  ).length;
  const scheduledCount = mockGroupBuys.filter(
    gb => gb.status === 'Scheduled',
  ).length;

  return (
    <div className="flex flex-1 min-h-0">
      <aside className="flex flex-col w-[220px] shrink-0 bg-[#0d0d0f] border-r border-white/[0.06]">
        <div className="flex items-center justify-between px-4 h-[44px] shrink-0 border-b border-white/[0.06]">
          <span className="text-[13px] font-semibold text-white/80">Group-Buys</span>
          <span className="text-[11px] text-[#6366f1] font-medium">{activeCount} active</span>
        </div>

        <nav className="flex flex-col gap-0.5 p-2 flex-1 overflow-y-auto">
          <NavLink to="/app/group-buys" end className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
            <LayoutGrid size={14} />
            <span>Overview</span>
          </NavLink>

          <div className="mt-3 mb-1.5 px-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/25">Browse</span>
          </div>
          <NavLink to="/app/group-buys/requests" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
            <Activity size={14} />
            <span>Requests & Voting</span>
            {requestsCount > 0 && <span className="gb-badge">{requestsCount}</span>}
          </NavLink>
          <NavLink to="/app/group-buys/scheduled" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
            <CalendarClock size={14} />
            <span>Scheduled</span>
            {scheduledCount > 0 && <span className="gb-badge secondary">{scheduledCount}</span>}
          </NavLink>
          <NavLink to="/app/group-buys/active" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
            <Play size={14} />
            <span>Active</span>
            {activeCount > 0 && <span className="gb-badge">{activeCount}</span>}
          </NavLink>
          <NavLink to="/app/group-buys/completed" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
            <CheckCircle2 size={14} />
            <span>Completed</span>
          </NavLink>

          <div className="mt-3 mb-1.5 px-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/25">Personal</span>
          </div>
          <NavLink to="/app/group-buys/mine" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
            <UserCircle size={14} />
            <span>My Buys</span>
          </NavLink>
          <NavLink to="/app/group-buys/payments" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
            <CreditCard size={14} />
            <span>Payments</span>
          </NavLink>

          <div className="mt-3" />
          <NavLink to="/app/group-buys/rules" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
            <ShieldAlert size={14} />
            <span>Rules & Legal</span>
          </NavLink>
        </nav>

        <div className="p-2 border-t border-white/[0.06]">
          <NavLink to="/app/group-buys/new" className="flex items-center justify-center gap-2 w-full h-[34px] rounded-md bg-[#6366f1] text-white text-[13px] font-medium no-underline hover:bg-[#818cf8] transition-colors">
            <PlusCircle size={14} />
            <span>New Request</span>
          </NavLink>
        </div>
      </aside>
      <section className="flex-1 overflow-y-auto min-w-0">
        <Outlet />
      </section>
    </div>
  );
};

export default GroupBuysLayout;
