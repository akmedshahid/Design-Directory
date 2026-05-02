import React, { useState } from 'react';
import { Bell, MessageSquare, Heart, AtSign, Users } from 'lucide-react';

interface Notification {
  id: string;
  type: 'mention' | 'reply' | 'reaction' | 'system';
  message: string;
  from: string;
  room: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: 'n1', type: 'mention', message: 'mentioned you in General Lounge', from: 'Marcus W.', room: 'General Lounge', timestamp: '2h ago', read: false },
  { id: 'n2', type: 'reply', message: 'replied to your message in Design Feedback', from: 'Sarah K.', room: 'Design Feedback', timestamp: '4h ago', read: false },
  { id: 'n3', type: 'reaction', message: 'reacted to your post in Announcements', from: 'James L.', room: 'Announcements', timestamp: '6h ago', read: true },
  { id: 'n4', type: 'system', message: 'New room created: AI Workflows', from: 'System', room: 'AI Workflows', timestamp: '1d ago', read: true },
  { id: 'n5', type: 'mention', message: 'mentioned you in Resource Requests', from: 'Lisa M.', room: 'Resource Requests', timestamp: '2d ago', read: true },
];

const iconForType = (type: Notification['type']) => {
  switch (type) {
    case 'mention': return <AtSign size={14} />;
    case 'reply': return <MessageSquare size={14} />;
    case 'reaction': return <Heart size={14} />;
    case 'system': return <Users size={14} />;
  }
};

const GreatHallNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">{unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}</p>
        </div>
        {unreadCount > 0 && (
          <button className="secondary-btn" onClick={markAllRead} style={{ fontSize: '13px', padding: '6px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            Mark all read
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '16px' }}>
        {notifications.map(n => (
          <div
            key={n.id}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: '10px',
              background: n.read ? 'transparent' : 'rgba(92, 108, 255, 0.04)',
              border: n.read ? '1px solid transparent' : '1px solid rgba(92, 108, 255, 0.08)',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onClick={() => setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item))}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = n.read ? 'transparent' : 'rgba(92, 108, 255, 0.04)')}
          >
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: n.read ? 'var(--text-muted)' : 'var(--accent-color)', flexShrink: 0 }}>
              {iconForType(n.type)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', color: n.read ? 'var(--text-secondary)' : 'var(--text-primary)', fontWeight: n.read ? 400 : 500 }}>
                <strong>{n.from}</strong> {n.message}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{n.room} · {n.timestamp}</div>
            </div>
            {!n.read && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)', flexShrink: 0 }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreatHallNotifications;
