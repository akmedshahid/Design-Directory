import React, { useMemo } from 'react';
import { AtSign, Code2, Globe, MessageSquareText, MessageSquareReply, PenTool, Shield, Star } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockMembers, mockRequests, greatHallRoomMessages, greatHallRooms, conversationIdForMember } from '../data/greatHallData';
import { formatRelativeTime } from '../layouts/GreatHallLayout';
import './MemberProfile.css';

const socialHref = (kind: 'twitter' | 'dribbble' | 'github' | 'website', value: string) => {
  if (kind === 'twitter') return `https://twitter.com/${value.replace(/^@/, '')}`;
  if (kind === 'dribbble') return `https://dribbble.com/${value}`;
  if (kind === 'github') return `https://github.com/${value}`;
  return value;
};

const MemberProfile = () => {
  const navigate = useNavigate();
  const { memberId, id } = useParams();
  const { canDirectMessage, user } = useAuth();
  const member = mockMembers[memberId ?? id ?? ''];

  const joinedRooms = useMemo(
    () => greatHallRooms.filter((room) => room.memberIds.includes(member?.id ?? '')),
    [member],
  );

  const createdRequests = useMemo(
    () => mockRequests.filter((request) => request.authorId === member?.id),
    [member],
  );

  const repliedRequests = useMemo(
    () => mockRequests.flatMap((request) =>
      request.replies
        .filter((reply) => reply.authorId === member?.id)
        .map((reply) => ({
          id: reply.id,
          title: request.title,
          route: `/app/great-hall/requests/${request.id}`,
          label: 'Replied to request',
          time: formatRelativeTime(reply.timestamp),
          icon: <MessageSquareReply size={16} />,
        })),
    ),
    [member],
  );

  const roomPosts = useMemo(
    () => Object.entries(greatHallRoomMessages).flatMap(([roomId, messages]) =>
      messages
        .filter((message) => message.authorId === member?.id)
        .map((message) => ({
          id: message.id,
          title: greatHallRooms.find((room) => room.id === roomId)?.name ?? roomId,
          route: `/app/great-hall/rooms/${roomId}`,
          label: 'Posted in room',
          time: formatRelativeTime(message.timestamp),
          icon: <Star size={16} />,
        })),
    ),
    [member],
  );

  if (!member) {
    return <div className="page-container">This member could not be found.</div>;
  }

  const activityRows = [
    ...member.recentActivity.map((activity, index) => ({
      id: `${activity.type}-${index}`,
      title: activity.title,
      route: activity.type === 'request' ? `/app/great-hall/requests/${activity.targetId}` : `/app/great-hall/members/${member.id}`,
      label: activity.type === 'request' ? 'Opened request' : 'Recent contribution',
      time: activity.date,
      icon: <Shield size={16} />,
    })),
    ...repliedRequests,
    ...roomPosts,
  ];

  return (
    <div className="page-container gh-member-profile-page">
      <div className="gh-profile-layout">
        <aside className="gh-profile-identity">
          <div className="gh-profile-avatar-xl">
            {member.avatar}
            {member.online ? <span className="online-dot" /> : null}
          </div>

          <h1 className="gh-profile-name">{member.displayName}</h1>
          <div className="gh-profile-username">@{member.username}</div>
          <div className={`gh-profile-badge-large ${member.role.toLowerCase()}`}>{member.role}</div>

          <p className="gh-profile-bio">{member.bio}</p>

          <div className="gh-profile-tags">
            {member.tags.map((tag) => (
              <span key={tag} className="gh-member-tag">{tag}</span>
            ))}
          </div>

          <div className="gh-profile-actions">
            <button
              className="primary-btn"
              style={{ width: '100%' }}
              onClick={() => navigate(`/app/great-hall/dm/${conversationIdForMember(member.id)}`)}
              disabled={!canDirectMessage && user?.role !== 'Admin'}
            >
              <MessageSquareText size={16} />
              Direct Message
            </button>
          </div>

          <div className="gh-profile-meta" style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: 13 }}>
              <span>Joined</span>
              <strong style={{ color: 'var(--text-primary)' }}>{member.joinedAt}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: 13 }}>
              <span>Level</span>
              <strong style={{ color: 'var(--text-primary)' }}>{member.level}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: 13 }}>
              <span>Rooms</span>
              <strong style={{ color: 'var(--text-primary)' }}>{joinedRooms.length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: 13 }}>
              <span>Requests</span>
              <strong style={{ color: 'var(--text-primary)' }}>{createdRequests.length}</strong>
            </div>
          </div>

          <div className="gh-profile-socials" style={{ marginTop: 28 }}>
            {member.socials.twitter ? (
              <a className="social-link" href={socialHref('twitter', member.socials.twitter)} target="_blank" rel="noreferrer">
                <AtSign size={16} />
              </a>
            ) : null}
            {member.socials.dribbble ? (
              <a className="social-link" href={socialHref('dribbble', member.socials.dribbble)} target="_blank" rel="noreferrer">
                <PenTool size={16} />
              </a>
            ) : null}
            {member.socials.github ? (
              <a className="social-link" href={socialHref('github', member.socials.github)} target="_blank" rel="noreferrer">
                <Code2 size={16} />
              </a>
            ) : null}
            {member.socials.website ? (
              <a className="social-link" href={socialHref('website', member.socials.website)} target="_blank" rel="noreferrer">
                <Globe size={16} />
              </a>
            ) : null}
          </div>
        </aside>

        <section className="gh-profile-activity">
          <h2 style={{ margin: '0 0 24px', fontSize: 22 }}>Recent activity</h2>

          <div className="gh-activity-list">
            {activityRows.map((activity) => (
              <div key={activity.id} className="gh-activity-item">
                <div className="gh-activity-icon">{activity.icon}</div>
                <div className="gh-activity-content">
                  <p className="gh-activity-text">
                    <span className="action">{activity.label}: </span>
                    <Link to={activity.route} className="target">{activity.title}</Link>
                  </p>
                  <span className="time">{activity.time}</span>
                </div>
              </div>
            ))}

            {activityRows.length === 0 ? (
              <div style={{ color: 'var(--text-secondary)' }}>No visible activity yet.</div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MemberProfile;
