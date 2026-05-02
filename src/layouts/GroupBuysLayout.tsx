import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Layers, Activity, CalendarClock, Play, CheckCircle2, UserCircle, CreditCard, ShieldAlert, Settings as SettingsIcon } from 'lucide-react';
import { mockGroupBuys } from '../data/groupBuysData';
import './GroupBuysLayout.css';

const GroupBuysLayout = () => {
  const { user } = useAuth();
  
  const activeCount = mockGroupBuys.filter(gb => gb.status === 'Active' || gb.status === 'Collecting Payments').length;
  const requestsCount = mockGroupBuys.filter(gb => gb.status === 'Requested' || gb.status === 'Under Review' || gb.status === 'Voting').length;
  const scheduledCount = mockGroupBuys.filter(gb => gb.status === 'Scheduled').length;
  
  const primaryItems = [
    { to: '/app/group-buys', label: 'Overview', icon: <Layers size={16} /> },
    { to: '/app/group-buys/requests', label: 'Requests & Voting', icon: <Activity size={16} />, badge: requestsCount },
    { to: '/app/group-buys/scheduled', label: 'Scheduled', icon: <CalendarClock size={16} />, badge: scheduledCount },
    { to: '/app/group-buys/active', label: 'Active Buys', icon: <Play size={16} />, badge: activeCount },
    { to: '/app/group-buys/completed', label: 'Completed', icon: <CheckCircle2 size={16} /> },
  ];

  const personalItems = [
    { to: '/app/group-buys/mine', label: 'My Participation', icon: <UserCircle size={16} /> },
    { to: '/app/group-buys/payments', label: 'My Payments', icon: <CreditCard size={16} /> },
  ];

  return (
    <div className="group-buys-layout">
      <aside className="gb-sidebar">
        <div className="gb-sidebar-header">
          <div className="gb-logo-mark">
            <ShoppingBag size={16} />
          </div>
          <div className="gb-header-text">
            <h2>Group-Buys</h2>
            <div className="gb-subtitle">Collective Purchasing</div>
          </div>
        </div>

        <div className="gb-nav-content">
          <div className="gb-nav-section">
            {primaryItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/app/group-buys'}
                className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge ? <span className="gb-badge">{item.badge}</span> : null}
              </NavLink>
            ))}
          </div>

          <div className="gb-nav-section">
            <div className="gb-section-title">Personal</div>
            {personalItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
          
          <div className="gb-nav-section">
            <div className="gb-section-title">Information</div>
            <NavLink to="/app/group-buys/rules" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
              <ShieldAlert size={16} />
              <span>Rules & Legal</span>
            </NavLink>
          </div>

          {user?.role === 'Admin' && (
            <div className="gb-nav-section">
              <div className="gb-section-title">Admin</div>
              <NavLink to="/app/group-buys/admin" className={({ isActive }) => `gb-nav-item ${isActive ? 'active' : ''}`}>
                <SettingsIcon size={16} />
                <span>Admin Review</span>
              </NavLink>
            </div>
          )}
        </div>
      </aside>

      <section className="gb-main-content">
        <Outlet />
      </section>
    </div>
  );
};

export default GroupBuysLayout;