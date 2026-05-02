import React, { useState } from 'react';
import { Hash, MoreHorizontal, Paperclip, Pin, Reply, Send, Smile, Users, FileText, Link, Info, BellOff, Bookmark } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { greatHallRoomMessages, type GreatHallChatMessage } from '../data/greatHallData';
import { findRoomById, formatRelativeTime, hasGreatHallAccess, roleClassName } from '../layouts/GreatHallLayout';
import './RoomView.css';

type TabType = 'Discussion' | 'Files' | 'Requests' | 'Resources' | 'Members' | 'About';

const RoomView = () => {
  const { roomId, id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const room = findRoomById(roomId ?? id ?? '');
  const [draft, setDraft] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('Discussion');
  const [messages, setMessages] = useState<GreatHallChatMessage[]>(room ? greatHallRoomMessages[room.id] ?? [] : []);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  if (!room) {
    return <div className="page-container">This room could not be found.</div>;
  }

  const isAdmin = user?.role === 'Admin';
  const canAccess = hasGreatHallAccess(user?.membership.plan, room.access, isAdmin);

  const handleSend = () => {
    const nextMessage = draft.trim();
    if (!nextMessage) return;

    const newEntry: GreatHallChatMessage = {
      id: `message-${Date.now()}`,
      authorId: 'viewer',
      authorName: user?.username || 'Member',
      authorRole: isAdmin
        ? 'Admin'
        : user?.membership.plan === 'Patron'
          ? 'Patron'
          : user?.membership.plan === 'Collector'
            ? 'Collector'
            : 'Member',
      avatar: user?.username?.charAt(0).toUpperCase() || 'M',
      content: nextMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((current) => [...current, newEntry]);
    setDraft('');
  };

  return (
    <div className="gh-room-view">
      <div className="gh-room-header">
        <div className="gh-room-title-area">
          <Hash size={16} />
          <h2>{room.name}</h2>
          <div className="gh-room-badges">
            <span className="gh-badge access-badge">{room.access}</span>
            <span className="gh-badge member-badge"><Users size={12} /> {room.memberCount}</span>
          </div>
        </div>
        <div className="gh-room-actions">
          <button className="secondary-btn small" onClick={() => toast('Muted room', 'success')}>
            <BellOff size={14} /> Mute
          </button>
          <button className="secondary-btn small" onClick={() => toast('Saved room', 'success')}>
            <Bookmark size={14} /> Save
          </button>
          <button className={`secondary-btn small ${isInspectorOpen ? 'active' : ''}`} onClick={() => setIsInspectorOpen(!isInspectorOpen)}>
            <Info size={14} />
          </button>
        </div>
      </div>

      <div className="gh-room-tabs">
        {(['Discussion', 'Files', 'Requests', 'Resources', 'Members', 'About'] as TabType[]).map((tab) => (
          <button
            key={tab}
            className={`gh-room-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="gh-room-content-wrapper">
        <div className="gh-chat-feed">
          {activeTab === 'Discussion' ? (
            <>
              <div className="gh-messages">
                <div className="gh-room-intro">
                  <div className="gh-intro-icon" style={{ background: room.accent }}>{room.iconLabel}</div>
                  <h1>{room.name}</h1>
                  <p>{room.description}</p>
                </div>

                {messages.map((message) => (
                  <div key={message.id} className={`gh-message ${message.pinned ? 'pinned' : ''}`}>
                    {message.pinned ? (
                      <div className="gh-msg-pin-indicator">
                        <Pin size={12} />
                        Pinned message
                      </div>
                    ) : null}

                    <div className="gh-msg-container">
                      <div className={`gh-msg-avatar role-${roleClassName(message.authorRole)}`}>{message.avatar}</div>
                      <div className="gh-msg-body">
                        <div className="gh-msg-header">
                          <span className="gh-msg-author">{message.authorName}</span>
                          <span className={`gh-msg-role-badge role-${roleClassName(message.authorRole)}`}>
                            {message.authorRole}
                          </span>
                          <span className="gh-msg-time">{formatRelativeTime(message.timestamp)}</span>
                        </div>

                        <div className="gh-msg-content">{message.content}</div>

                        <div className="gh-msg-hover-actions">
                          <button className="gh-hover-btn" title="Reply" onClick={() => toast('Reply threads are coming next', 'info')}>
                            <Reply size={14} />
                          </button>
                          <button className="gh-hover-btn" title="More" onClick={() => toast('More actions coming soon', 'info')}>
                            <MoreHorizontal size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="gh-composer-container">
                {canAccess ? (
                  <div className="gh-composer-form">
                    <div className="gh-composer-input-wrapper">
                      <button
                        className="gh-composer-emoji"
                        type="button"
                        onClick={() => setDraft((current) => `${current} :)`)}
                        title="Add emoji"
                      >
                        <Smile size={18} />
                      </button>
                      <textarea
                        className="gh-composer-input"
                        placeholder={`Message #${room.name.toLowerCase().replace(/\s+/g, '-')}`}
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        rows={1}
                      />
                      <div className="gh-composer-actions">
                        <button
                          className="gh-composer-attach"
                          type="button"
                          onClick={() => toast('File uploads are not available in this view yet', 'info')}
                          title="Attach file"
                        >
                          <Paperclip size={18} />
                        </button>
                        <button
                          className="gh-composer-attach"
                          type="button"
                          onClick={() => toast('Attach Resource or Site coming soon', 'info')}
                          title="Attach Link"
                        >
                          <Link size={18} />
                        </button>
                        <button className="gh-composer-submit" type="button" disabled={!draft.trim()} onClick={handleSend}>
                          <Send size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="gh-composer-hint" style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                      {room.onlineCount} members are currently online in this room.
                    </div>
                  </div>
                ) : (
                  <div className="gh-reply-locked" style={{ margin: '0 24px 24px' }}>
                    <h4>{room.access} access required</h4>
                    <p>This room opens once your membership includes {room.access} access.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="gh-tab-empty-state">
              <h3>{activeTab}</h3>
              <p>This section is under construction.</p>
            </div>
          )}
        </div>

        {isInspectorOpen && (
          <div className="gh-room-inspector">
            <div className="gh-inspector-section">
              <h3>About</h3>
              <p>{room.description}</p>
            </div>
            <div className="gh-inspector-section">
              <h3>Stats</h3>
              <div className="gh-stat-row">
                <span>Members</span>
                <span>{room.memberCount}</span>
              </div>
              <div className="gh-stat-row">
                <span>Online</span>
                <span className="online-text">{room.onlineCount}</span>
              </div>
            </div>
            <div className="gh-inspector-section">
              <h3>Shared Files</h3>
              <div className="gh-empty-list">No files shared yet</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomView;
