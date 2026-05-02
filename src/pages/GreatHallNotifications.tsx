import React from 'react';
import { mockNotifications } from '../data/greatHallData';
import { Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GreatHallNotifications = () => {
  return (
    <div className="page-container" style={{ padding: '40px' }}>
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 32, margin: '0 0 12px', color: 'var(--text-primary)' }}>Notifications</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Updates and activity from your Great Hall network.</p>
        </div>
        <button className="secondary-btn small">Mark all read</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {mockNotifications.map(notif => (
          <Link key={notif.id} to={notif.targetRoute} style={{ display: 'flex', alignItems: 'center', gap: 16, background: notif.read ? 'transparent' : 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '16px 20px', textDecoration: 'none', color: 'var(--text-primary)' }}>
            <div style={{ position: 'relative' }}>
              <Bell size={20} color={notif.read ? 'var(--text-muted)' : 'var(--accent-color)'} />
              {!notif.read && <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-color)' }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: notif.read ? 500 : 600, fontSize: 15, marginBottom: 4 }}>{notif.title}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{notif.description}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(notif.timestamp).toLocaleString()}</span>
              <ArrowRight size={16} color="var(--text-muted)" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GreatHallNotifications;