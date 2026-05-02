import React from 'react';
import { ArrowRight, MessageSquareText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockRequests, greatHallRooms } from '../data/greatHallData';
import { formatRelativeTime } from '../layouts/GreatHallLayout';
import './GreatHallHome.css';

const statusLabel = (status: string) => (status === 'open' ? 'Open' : 'Solved');

const GreatHallHome = () => {
  const { user } = useAuth();
  const heroAvatar = user?.username?.charAt(0).toUpperCase() || 'G';
  const heroPlan = user?.membership.plan && user.membership.plan !== 'None'
    ? user.membership.plan
    : 'Invited Member';

  return (
    <div className="page-container gh-home-page" style={{ height: '100%', overflowY: 'auto' }}>
      <section className="gh-hero-card">
        <div className="gh-hero-bg" />
        <div className="gh-hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span className="gh-hero-badge">Private Community</span>
            <span className="gh-hero-online">
              <span className="online-dot" />
              {greatHallRooms.reduce((total, room) => total + room.onlineCount, 0)} members online
            </span>
          </div>

          <h1>The private layer of the directory.</h1>
          <p>
            The Great Hall is where members swap references, open premium requests, review work,
            and keep the best links circulating long after they hit the library.
          </p>

          <div className="gh-hero-meta">
            <div className="meta-user">
              <div className="meta-avatar">{heroAvatar}</div>
              <div>
                <div className="meta-name">{user?.username || 'Invited Guest'}</div>
                <div className="meta-plan">{heroPlan} access</div>
              </div>
            </div>

            <div className="meta-actions">
              <Link to="/app/great-hall/requests" className="primary-btn">
                View Requests
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="gh-home-grid">
        <div className="gh-home-col-main">
          <section>
            <div className="gh-section-header">
              <h2>Featured Rooms</h2>
              <Link to="/app/great-hall/rooms/general-chat" className="gh-breadcrumb-link">
                General Chat <ArrowRight size={14} />
              </Link>
            </div>

            <div className="gh-room-list">
              {greatHallRooms.slice(0, 4).map((room) => (
                <Link key={room.id} to={`/app/great-hall/rooms/${room.id}`} className="gh-room-row">
                  <div className="gh-room-icon" style={{ background: room.accent }}>
                    {room.iconLabel}
                  </div>
                  <div className="gh-room-info">
                    <h3>{room.name}</h3>
                    <p>{room.description}</p>
                  </div>
                  <div style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: 12 }}>
                    <div>{room.memberCount} members</div>
                    <div>{room.onlineCount} online</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="gh-section-header">
              <h2>Top Requests</h2>
              <Link to="/app/great-hall/requests" className="gh-breadcrumb-link">
                Open board <ArrowRight size={14} />
              </Link>
            </div>

            <div className="gh-req-list">
              {mockRequests.map((request) => (
                <Link key={request.id} to={`/app/great-hall/requests/${request.id}`} className="gh-req-row">
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                    <span className={`status-pill ${statusLabel(request.status)}`}>
                      {statusLabel(request.status)}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                      {formatRelativeTime(request.updatedAt)}
                    </span>
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: 18, color: 'var(--text-primary)' }}>{request.title}</h3>
                  <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {request.shortDesc}
                  </p>
                  <div style={{ display: 'flex', gap: 16, color: 'var(--text-muted)', fontSize: 13 }}>
                    <span>{request.upvotes} votes</span>
                    <span>{request.suggestions.length} suggestions</span>
                    <span>{request.replies.length} replies</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="gh-home-col-side">
          <div className="gh-announcement-card" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Sparkles size={16} />
              <strong>Curator note</strong>
            </div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Strong requests get stronger answers here when the ask is specific. If a suggestion is
              useful, link it back so the next member can actually build with it.
            </p>
          </div>

          <section>
            <div className="gh-section-header">
              <h2>Premium Rooms</h2>
            </div>

            <div className="gh-group-mini-list">
              {greatHallRooms.filter(room => room.access !== 'Open').slice(0, 4).map((room) => (
                <Link key={room.id} to={`/app/great-hall/rooms/${room.id}`} className="gh-group-mini">
                  <div className="gh-room-icon" style={{ width: 40, height: 40, borderRadius: 10, background: room.accent }}>
                    {room.iconLabel}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{room.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{room.access} access</div>
                  </div>
                  <MessageSquareText size={16} color="var(--text-muted)" />
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default GreatHallHome;
