import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Layers, Activity, CalendarClock, Play, CheckCircle2,
  UserCircle, CreditCard, ShieldAlert,
} from 'lucide-react';
import { mockGroupBuys } from '../data/groupBuysData';
import './GroupBuysLayout.css';

const GroupBuysLayout = () => {
  const activeCount = mockGroupBuys.filter(
    gb => gb.status === 'Active' || gb.status === 'Collecting Payments',
  ).length;
  const requestsCount = mockGroupBuys.filter(
    gb => gb.status === 'Requested' || gb.status === 'Under Review' || gb.status === 'Voting',
  ).length;

  const GB_TABS = [
    { to: '/app/group-buys', label: 'Overview', icon: Layers, end: true },
    { to: '/app/group-buys/requests', label: 'Requests', icon: Activity, badge: requestsCount },
    { to: '/app/group-buys/scheduled', label: 'Scheduled', icon: CalendarClock },
    { to: '/app/group-buys/active', label: 'Active', icon: Play, badge: activeCount },
    { to: '/app/group-buys/completed', label: 'Completed', icon: CheckCircle2 },
    { to: '/app/group-buys/mine', label: 'My Buys', icon: UserCircle },
    { to: '/app/group-buys/payments', label: 'Payments', icon: CreditCard },
    { to: '/app/group-buys/rules', label: 'Rules', icon: ShieldAlert },
  ] as const;

  return (
    <div className="group-buys-layout">
      <nav className="section-tabs">
        {GB_TABS.map(({ to, label, icon: Icon, end, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `section-tab ${isActive ? 'active' : ''}`}
          >
            <Icon size={14} />
            <span>{label}</span>
            {badge != null && badge > 0 && <span className="tab-badge">{badge}</span>}
          </NavLink>
        ))}
      </nav>
      <section className="gb-main-content">
        <Outlet />
      </section>
    </div>
  );
};

export default GroupBuysLayout;
