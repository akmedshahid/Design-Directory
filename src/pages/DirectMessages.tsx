import React, { useMemo, useState } from 'react';
import { Paperclip, Phone, Search, Send, Smile, Video, X } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import {
  greatHallConversations,
  mockMembers,
  type GreatHallChatMessage,
  type GreatHallConversation,
} from '../data/greatHallData';
import {
  formatRelativeTime,
  roleClassName,
} from '../layouts/GreatHallLayout';
import './DirectMessages.css';
import './RoomView.css';

const DirectMessages = () => {
  const navigate = useNavigate();
  const { conversationId, id } = useParams();
  const { user, canDirectMessage } = useAuth();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const [isNewDMModalOpen, setIsNewDMModalOpen] = useState(false);
  const [memberQuery, setMemberQuery] = useState('');
  
  const [conversations, setConversations] = useState<GreatHallConversation[]>(greatHallConversations);
  
  const [threadState, setThreadState] = useState<Record<string, GreatHallChatMessage[]>>(
    Object.fromEntries(greatHallConversations.map((conversation) => [conversation.id, conversation.messages])),
  );

  const selectedId = conversationId ?? id ?? '';

  const filteredConversations = useMemo(
    () => conversations.filter((conversation) => {
      const haystack = `${conversation.memberName} ${conversation.memberRole}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    }),
    [query, conversations],
  );

  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId) ?? null;
  const selectedMessages = selectedConversation ? threadState[selectedConversation.id] ?? [] : [];

  const handleSend = () => {
    if (!selectedConversation || !draft.trim()) return;

    const nextMessage: GreatHallChatMessage = {
      id: `dm-${Date.now()}`,
      authorId: 'viewer',
      authorName: user?.username || 'Member',
      authorRole: user?.role === 'Admin'
        ? 'Admin'
        : user?.membership.plan === 'Patron'
          ? 'Patron'
          : user?.membership.plan === 'Collector'
            ? 'Collector'
            : 'Member',
      avatar: user?.username?.charAt(0).toUpperCase() || 'M',
      content: draft.trim(),
      timestamp: new Date().toISOString(),
    };

    setThreadState((current) => ({
      ...current,
      [selectedConversation.id]: [...(current[selectedConversation.id] ?? []), nextMessage],
    }));
    setDraft('');
  };

  const startNewDM = (memberId: string) => {
    const member = mockMembers[memberId];
    if (!member) return;
    
    const existingConv = conversations.find(c => c.memberId === memberId);
    if (existingConv) {
      setIsNewDMModalOpen(false);
      navigate(`/app/great-hall/dm/${existingConv.id}`);
      return;
    }
    
    const newConv: GreatHallConversation = {
      id: `thread-${memberId}`,
      memberId,
      memberName: member.displayName,
      memberRole: member.role,
      avatar: member.avatar,
      online: member.online,
      unreadCount: 0,
      updatedAt: new Date().toISOString(),
      messages: []
    };
    
    setConversations(curr => [newConv, ...curr]);
    setThreadState(curr => ({ ...curr, [newConv.id]: [] }));
    setIsNewDMModalOpen(false);
    navigate(`/app/great-hall/dm/${newConv.id}`);
  };

  return (
    <div className="gh-dm-layout">
      <aside className="gh-dm-sidebar">
        <div className="gh-dm-header">
          <h2>Messages</h2>
          <button className="secondary-btn small" onClick={() => setIsNewDMModalOpen(true)}>
            New DM
          </button>
        </div>

        <div className="gh-dm-search">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="gh-dm-list">
          {filteredConversations.map((conversation) => {
            const preview = (threadState[conversation.id] ?? conversation.messages).slice(-1)[0]?.content ?? '';

            return (
              <button
                key={conversation.id}
                className={`gh-dm-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
                onClick={() => navigate(`/app/great-hall/dm/${conversation.id}`)}
              >
                <div className="gh-dm-avatar">
                  {conversation.avatar}
                  {conversation.online ? <span className="online-dot" /> : null}
                </div>
                <div className="gh-dm-info">
                  <div className="gh-dm-name-row">
                    <span className="gh-dm-name">{conversation.memberName}</span>
                    <span className="gh-dm-time">{formatRelativeTime(conversation.updatedAt)}</span>
                  </div>
                  <div className="gh-dm-msg-row">
                    <span className={`gh-dm-preview ${conversation.unreadCount > 0 ? 'unread' : ''}`}>{preview}</span>
                    {conversation.unreadCount > 0 ? <span className="gh-badge unread">{conversation.unreadCount}</span> : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="gh-dm-main">
        {!selectedConversation ? (
          <div className="gh-dm-empty">
            <h3>Select a conversation</h3>
            <p>Choose a member from the list to continue the thread.</p>
          </div>
        ) : (
          <>
            <div className="gh-dm-chat-header">
              <div className="gh-dm-chat-user">
                <div className="gh-dm-avatar large">
                  {selectedConversation.avatar}
                  {selectedConversation.online ? <span className="online-dot" /> : null}
                </div>
                <div>
                  <h3>{selectedConversation.memberName}</h3>
                  <div className="gh-dm-user-role">{selectedConversation.memberRole}</div>
                </div>
              </div>

              <div className="gh-dm-chat-actions">
                <Link to={`/app/great-hall/members/${selectedConversation.memberId}`} className="secondary-btn small">
                  Profile
                </Link>
                <div className="divider" />
                <button className="ghost-btn" title="Coming later." disabled>
                  <Phone size={16} />
                </button>
                <button className="ghost-btn" title="Coming later." disabled>
                  <Video size={16} />
                </button>
              </div>
            </div>

            <div className="gh-dm-chat-history">
              <div className="gh-dm-chat-intro">
                <div className="gh-dm-avatar xl">
                  {selectedConversation.avatar}
                  {selectedConversation.online ? <span className="online-dot" /> : null}
                </div>
                <h2>{selectedConversation.memberName}</h2>
                <p>
                  Private conversation with a {selectedConversation.memberRole.toLowerCase()} member of the Great Hall.
                </p>
              </div>

              {selectedMessages.map((message) => (
                <div key={message.id} className="gh-message">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="gh-dm-composer">
              {canDirectMessage || user?.role === 'Admin' ? (
                <div className="gh-composer-form">
                  <div className="gh-composer-input-wrapper">
                    <button className="gh-composer-emoji" type="button" onClick={() => setDraft((current) => `${current} :)`)}>
                      <Smile size={18} />
                    </button>
                    <textarea
                      className="gh-composer-input"
                      placeholder={`Message ${selectedConversation.memberName}`}
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      rows={1}
                    />
                    <div className="gh-composer-actions">
                      <button className="gh-composer-attach" type="button" onClick={() => toast('Attachments are coming later', 'info')}>
                        <Paperclip size={18} />
                      </button>
                      <button className="gh-composer-submit" type="button" disabled={!draft.trim()} onClick={handleSend}>
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="gh-reply-locked">
                  <h4>Direct messaging is locked on your plan</h4>
                  <p>Upgrade to Collector or Patron to message members privately.</p>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {isNewDMModalOpen && (
        <div className="gh-modal-overlay">
          <div className="gh-modal-content" style={{ width: 400 }}>
            <div className="gh-modal-header">
              <h2>New Message</h2>
              <button className="ghost-btn" onClick={() => setIsNewDMModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="gh-modal-body" style={{ padding: '16px' }}>
              <div className="gh-dir-search" style={{ marginBottom: 16 }}>
                <Search size={14} />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={memberQuery}
                  onChange={(e) => setMemberQuery(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
                {Object.values(mockMembers)
                  .filter(m => m.id !== 'viewer' && m.displayName.toLowerCase().includes(memberQuery.toLowerCase()))
                  .map(member => (
                  <button 
                    key={member.id} 
                    className="gh-dm-item" 
                    onClick={() => startNewDM(member.id)}
                    style={{ width: '100%' }}
                  >
                    <div className="gh-dm-avatar">
                      {member.avatar}
                      {member.online ? <span className="online-dot" /> : null}
                    </div>
                    <div className="gh-dm-info">
                      <div className="gh-dm-name-row">
                        <span className="gh-dm-name">{member.displayName}</span>
                      </div>
                      <div className="gh-dm-msg-row">
                        <span className="gh-dm-preview">{member.role}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectMessages;
