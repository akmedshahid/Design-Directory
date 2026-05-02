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
    <div className="group-buys-layout">
      <aside className="gb-sidebar">
        <div className="gb-sidebar-header">
          <h3>Group-Buys</h3>
          <span className="gb-active-count">{activeCount} active</span>
        </div>

        <nav className="gb-sidebar-nav">
          <div className="gb-nav-section">
            <NavLink to="/app/group-buys" end className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
              <LayoutGrid size={15} />
              <span>Overview</span>
            </NavLink>
          </div>

          <div className="gb-nav-section">
            <div className="gb-nav-section-label">Browse</div>
            <NavLink to="/app/group-buys/requests" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
              <Activity size={15} />
              <span>Requests & Voting</span>
              {requestsCount > 0 && <span className="gb-nav-badge">{requestsCount}</span>}
            </NavLink>
            <NavLink to="/app/group-buys/scheduled" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
              <CalendarClock size={15} />
              <span>Scheduled</span>
              {scheduledCount > 0 && <span className="gb-nav-badge secondary">{scheduledCount}</span>}
            </NavLink>
            <NavLink to="/app/group-buys/active" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
              <Play size={15} />
              <span>Active</span>
              {activeCount > 0 && <span className="gb-nav-badge">{activeCount}</span>}
            </NavLink>
            <NavLink to="/app/group-buys/completed" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
              <CheckCircle2 size={15} />
              <span>Completed</span>
            </NavLink>
          </div>

          <div className="gb-nav-section">
            <div className="gb-nav-section-label">Personal</div>
            <NavLink to="/app/group-buys/mine" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
              <UserCircle size={15} />
              <span>My Buys</span>
            </NavLink>
            <NavLink to="/app/group-buys/payments" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
              <CreditCard size={15} />
              <span>Payments</span>
            </NavLink>
          </div>

          <div className="gb-nav-section">
            <NavLink to="/app/group-buys/rules" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
              <ShieldAlert size={15} />
              <span>Rules & Legal</span>
            </NavLink>
          </div>
        </nav>

        <div className="gb-sidebar-footer">
          <NavLink to="/app/group-buys/new" className="gb-new-request-btn">
            <PlusCircle size={15} />
            <span>New Request</span>
          </NavLink>
        </div>
      </aside>
      <section className="gb-main-content">
        <Outlet />
      </section>
    </div>
  );
};

export default GroupBuysLayout;
