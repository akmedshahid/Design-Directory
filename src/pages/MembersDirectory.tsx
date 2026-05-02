import React, { useMemo, useState } from 'react';
import { AtSign, Code2, MessageSquareText, PenTool, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockMembers, conversationIdForMember } from '../data/greatHallData';
import './MembersDirectory.css';

const getTwitterUrl = (handle: string) => `https://twitter.com/${handle.replace(/^@/, '')}`;
const getDribbbleUrl = (handle: string) => `https://dribbble.com/${handle}`;
const getGithubUrl = (handle: string) => `https://github.com/${handle}`;

const MembersDirectory = () => {
  const navigate = useNavigate();
  const { canDirectMessage, user } = useAuth();
  const [query, setQuery] = useState('');
  const members = Object.values(mockMembers);

  const filteredMembers = useMemo(
    () => members.filter((member) => {
      const haystack = `${member.displayName} ${member.username} ${member.bio} ${member.tags.join(' ')}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    }),
    [members, query],
  );

  return (
    <div className="page-container gh-members-dir">
      <div className="gh-dir-header">
        <div className="gh-dir-title-area">
          <h1>Members</h1>
          <p>Browse the people behind the links, replies, and high-signal recommendations in the Hall.</p>
        </div>

        <div className="gh-dir-actions">
          <div className="gh-dir-search">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search members..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="gh-members-grid">
        {filteredMembers.map((member) => (
          <div key={member.id} className="gh-member-card">
            <div className="gh-member-card-top">
              <div className="gh-member-avatar-lg">
                {member.avatar}
                {member.online ? <span className="online-dot" /> : null}
              </div>
              <div className={`gh-role-badge-sm ${member.role.toLowerCase()}`}>{member.role}</div>
            </div>

            <div className="gh-member-info">
              <h3 className="gh-member-name">{member.displayName}</h3>
              <div className="gh-member-username">@{member.username}</div>
            </div>

            <p className="gh-member-bio">{member.bio}</p>

            <div className="gh-member-tags">
              {member.tags.map((tag) => (
                <span key={tag} className="gh-member-tag">{tag}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <Link to={`/app/great-hall/members/${member.id}`} className="secondary-btn small">
                View profile
              </Link>
              <button
                className="primary-btn small"
                onClick={() => navigate(`/app/great-hall/dm/${conversationIdForMember(member.id)}`)}
                disabled={!canDirectMessage && user?.role !== 'Admin'}
                title={!canDirectMessage && user?.role !== 'Admin' ? 'Upgrade to Collector or Patron to message members.' : 'Message member'}
              >
                <MessageSquareText size={14} />
                Message
              </button>
            </div>

            <div className="gh-member-card-bottom">
              <div className="gh-member-level">Level {member.level}</div>
              <div className="gh-member-socials">
                {member.socials.twitter ? (
                  <button className="social-btn" title="Twitter" onClick={() => window.open(getTwitterUrl(member.socials.twitter!), '_blank', 'noopener,noreferrer')}>
                    <AtSign size={14} />
                  </button>
                ) : null}
                {member.socials.dribbble ? (
                  <button className="social-btn" title="Dribbble" onClick={() => window.open(getDribbbleUrl(member.socials.dribbble!), '_blank', 'noopener,noreferrer')}>
                    <PenTool size={14} />
                  </button>
                ) : null}
                {member.socials.github ? (
                  <button className="social-btn" title="GitHub" onClick={() => window.open(getGithubUrl(member.socials.github!), '_blank', 'noopener,noreferrer')}>
                    <Code2 size={14} />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersDirectory;
