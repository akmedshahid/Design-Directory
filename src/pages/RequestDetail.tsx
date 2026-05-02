import React, { useMemo, useState } from 'react';
import { ArrowLeft, Bookmark, CheckCircle2, Copy, Eye, ExternalLink, MessageSquare, Share2, ThumbsUp } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { type GHReply, type GHSuggestion, type GHTimelineEvent, mockMembers, mockRequests } from '../data/greatHallData';
import { formatRelativeTime, roleClassName } from '../layouts/GreatHallLayout';
import './RequestDetail.css';

const statusText = (status: string) => {
  if (status === 'in-progress') return 'In Progress';
  if (status === 'found') return 'Solved';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const roleFromViewer = (
  role: string | undefined,
  plan: string | undefined,
): GHReply['authorRole'] => {
  if (role === 'Admin') return 'Admin';
  if (plan === 'Patron') return 'Patron';
  if (plan === 'Collector') return 'Collector';
  return 'Member';
};

const RequestDetail = () => {
  const { requestId, id } = useParams();
  const { user, canPostRequests } = useAuth();
  const { toast } = useToast();
  const request = mockRequests.find((entry) => entry.id === (requestId ?? id));

  const [votes, setVotes] = useState(request?.upvotes ?? 0);
  const [watching, setWatching] = useState(false);
  const [saved, setSaved] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<GHReply[]>(request?.replies ?? []);
  const [suggestions, setSuggestions] = useState<GHSuggestion[]>(request?.suggestions ?? []);
  const [timeline, setTimeline] = useState<GHTimelineEvent[]>(request?.timeline ?? []);

  const acceptedSuggestionId = useMemo(
    () => suggestions.find((suggestion) => suggestion.isAccepted)?.id ?? '',
    [suggestions],
  );

  if (!request) {
    return (
      <div className="page-container">
        <Link to="/app/great-hall/requests" className="gh-breadcrumb-link">
          <ArrowLeft size={14} />
          Back to requests
        </Link>
        <div style={{ marginTop: 24, color: 'var(--text-secondary)' }}>This request no longer exists.</div>
      </div>
    );
  }

  const canAcceptSuggestion = user?.role === 'Admin' || user?.username === mockMembers[request.authorId]?.username;

  const handleReplySubmit = () => {
    const nextBody = replyText.trim();
    if (!nextBody) return;

    const nextReply: GHReply = {
      id: `reply-${Date.now()}`,
      authorId: 'viewer',
      authorName: user?.username || 'Member',
      authorRole: roleFromViewer(user?.role, user?.membership.plan),
      avatar: user?.username?.charAt(0).toUpperCase() || 'M',
      content: nextBody,
      timestamp: new Date().toISOString(),
      upvotes: 0,
    };

    setReplies((current) => [nextReply, ...current]);
    setTimeline((current) => [
      {
        id: `timeline-${Date.now()}`,
        type: 'status_change',
        actorId: 'viewer',
        actorName: user?.username || 'Member',
        timestamp: nextReply.timestamp,
        details: 'Added a reply to the request',
      },
      ...current,
    ]);
    setReplyText('');
    toast('Reply posted', 'success');
  };

  const handleAcceptSuggestion = (suggestionId: string) => {
    setSuggestions((current) => current.map((suggestion) => ({
      ...suggestion,
      isAccepted: suggestion.id === suggestionId,
    })));
    setTimeline((current) => [
      {
        id: `timeline-${Date.now()}`,
        type: 'solution_marked',
        actorId: 'viewer',
        actorName: user?.username || 'Member',
        timestamp: new Date().toISOString(),
        details: 'Marked a suggestion as the accepted solution',
      },
      ...current,
    ]);
    toast('Accepted solution saved', 'success');
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast('Request link copied', 'info');
  };

  return (
    <div className="page-container gh-req-detail-page">
      <Link to="/app/great-hall/requests" className="gh-breadcrumb-link">
        <ArrowLeft size={14} />
        Back to requests
      </Link>

      <div className="gh-req-detail-layout" style={{ marginTop: 28 }}>
        <div className="gh-req-main-content">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
            <span className={`gh-status-badge ${request.status === 'closed' ? 'found' : request.status}`}>
              {statusText(request.status)}
            </span>
            <span className={`gh-priority-badge ${request.priority}`}>{request.priority}</span>
            <span className="gh-category-badge">{request.category}</span>
          </div>

          <h1 className="gh-req-title-xl">{request.title}</h1>

          <div className="gh-req-author-row" style={{ marginTop: 20 }}>
            <div className="gh-author-avatar-sm" style={{ width: 40, height: 40, borderRadius: 10, fontSize: 14 }}>
              {request.avatar}
            </div>
            <div className="gh-author-info">
              <span className="name">{request.authorName}</span>
              <span className={`role ${roleClassName(request.authorRole)}`}>{request.authorRole}</span>
            </div>
            <div className="gh-meta-divider" />
            <div className="gh-req-time">{formatRelativeTime(request.createdAt)}</div>
          </div>

          <p className="gh-req-text-lg">{request.longDesc}</p>

          <div className="gh-req-tags-row" style={{ marginTop: 24 }}>
            {request.tags.map((tag) => (
              <span key={tag} className="gh-tag">#{tag}</span>
            ))}
          </div>

          <hr className="gh-divider" style={{ margin: '36px 0' }} />

          <section>
            <h2 className="gh-section-title">Suggestions</h2>
            <div className="gh-suggestions-list">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className={`gh-suggestion-card ${suggestion.isAccepted ? 'accepted' : ''}`}>
                  {suggestion.isAccepted ? (
                    <div className="gh-accepted-badge">
                      <CheckCircle2 size={14} />
                      Accepted solution
                    </div>
                  ) : null}

                  <h3 className="gh-sug-title">{suggestion.title}</h3>
                  <p className="gh-sug-desc">{suggestion.description}</p>

                  {suggestion.externalUrl ? (
                    <a href={suggestion.externalUrl} target="_blank" rel="noreferrer" className="gh-sug-link">
                      <ExternalLink size={14} />
                      Open suggestion
                    </a>
                  ) : null}

                  <div className="gh-sug-meta">
                    <span className="gh-sug-author">Suggested by {suggestion.suggestedBy}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="gh-vote-btn small"
                        onClick={() => toast('Marked helpful', 'success')}
                        title="Mark helpful"
                      >
                        <ThumbsUp size={14} />
                      </button>
                      {canAcceptSuggestion && !suggestion.isAccepted ? (
                        <button className="secondary-btn small" onClick={() => handleAcceptSuggestion(suggestion.id)}>
                          Mark solved
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="gh-divider" style={{ margin: '36px 0' }} />

          <section>
            <h2 className="gh-section-title">Discussion</h2>
            <div className="gh-replies-list">
              {replies.map((reply) => (
                <div key={reply.id} className="gh-reply-row">
                  <div className="gh-author-avatar-sm" style={{ width: 36, height: 36, borderRadius: 10 }}>
                    {reply.avatar}
                  </div>
                  <div className="gh-reply-content-area">
                    <div className="gh-reply-header">
                      <span className="name">{reply.authorName}</span>
                      <span className={`role ${roleClassName(reply.authorRole)}`}>{reply.authorRole}</span>
                      <span className="time">{formatRelativeTime(reply.timestamp)}</span>
                    </div>
                    <div className="gh-reply-body">{reply.content}</div>
                    <div className="gh-reply-actions">
                      <button className="ghost-btn" onClick={() => toast('Reply link copied', 'info')}>
                        Copy link
                      </button>
                      <button className="ghost-btn" onClick={() => toast('Marked helpful', 'success')}>
                        Helpful
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="gh-divider" style={{ margin: '36px 0' }} />

          <section>
            <h2 className="gh-section-title">Add Reply</h2>
            {canPostRequests || user?.role === 'Admin' ? (
              <div className="gh-reply-composer">
                <div className="gh-author-avatar-sm" style={{ width: 36, height: 36, borderRadius: 10 }}>
                  {user?.username?.charAt(0).toUpperCase() || 'M'}
                </div>
                <div className="gh-composer-input-area">
                  <textarea
                    placeholder="Share a useful suggestion or add context..."
                    value={replyText}
                    onChange={(event) => setReplyText(event.target.value)}
                  />
                  <div className="gh-composer-actions">
                    <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>Replies are visible to Great Hall members.</span>
                    <button className="primary-btn" onClick={handleReplySubmit}>
                      Post Reply
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="gh-reply-locked">
                <h4>Posting is locked on your current plan</h4>
                <p>Collector and Patron members can reply to requests and help fulfill the thread.</p>
              </div>
            )}
          </section>

          <hr className="gh-divider" style={{ margin: '36px 0' }} />

          <section>
            <h2 className="gh-section-title">Activity Timeline</h2>
            <div className="gh-timeline-list">
              {timeline.map((event) => (
                <div key={event.id} className="gh-timeline-item">
                  <div className="gh-timeline-dot" />
                  <div className="gh-timeline-content">
                    <span className="event">{event.type.replace('_', ' ')}</span>
                    <span className="actor">{event.actorName}</span>
                    {event.details ? <span className="details">{event.details}</span> : null}
                    <span className="time">{formatRelativeTime(event.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="gh-req-inspector">
          <div className="gh-inspector-card">
            <div className="gh-action-grid">
              <button className="gh-action-btn active" onClick={() => setVotes((current) => current + 1)}>
                <ThumbsUp size={14} />
                Vote
              </button>
              <button className={`gh-action-btn ${watching ? 'active' : ''}`} onClick={() => setWatching((current) => !current)}>
                <Eye size={14} />
                Watch
              </button>
              <button className={`gh-action-btn ${saved ? 'active' : ''}`} onClick={() => setSaved((current) => !current)}>
                <Bookmark size={14} />
                Save
              </button>
              <button className="gh-action-btn" onClick={handleCopyLink}>
                <Share2 size={14} />
                Share
              </button>
            </div>

            <hr className="gh-divider" style={{ margin: '24px 0' }} />

            <h3 className="gh-sidebar-title">Request metadata</h3>
            <div className="gh-metadata-list">
              <div className="gh-meta-row">
                <span className="label">Votes</span>
                <span className="value">{votes}</span>
              </div>
              <div className="gh-meta-row">
                <span className="label">Watchers</span>
                <span className="value">{watching ? request.watchers + 1 : request.watchers}</span>
              </div>
              <div className="gh-meta-row">
                <span className="label">Replies</span>
                <span className="value">{replies.length}</span>
              </div>
              <div className="gh-meta-row">
                <span className="label">Suggestions</span>
                <span className="value">{suggestions.length}</span>
              </div>
              <div className="gh-meta-row">
                <span className="label">Status</span>
                <span className={`value gh-status-text ${request.status === 'closed' ? 'found' : request.status}`}>
                  {statusText(request.status)}
                </span>
              </div>
              <div className="gh-meta-row">
                <span className="label">Priority</span>
                <span className={`value gh-priority-text ${request.priority}`}>{request.priority}</span>
              </div>
              <div className="gh-meta-row">
                <span className="label">Visibility</span>
                <span className="value">{request.visibility}</span>
              </div>
              <div className="gh-meta-row">
                <span className="label">Accepted</span>
                <span className="value">{acceptedSuggestionId ? 'Yes' : 'Not yet'}</span>
              </div>
              <div className="gh-meta-row">
                <span className="label">Created</span>
                <span className="value">{formatRelativeTime(request.createdAt)}</span>
              </div>
              <div className="gh-meta-row">
                <span className="label">Updated</span>
                <span className="value">{formatRelativeTime(request.updatedAt)}</span>
              </div>
            </div>

            {user?.role === 'Admin' && (
              <>
                <hr className="gh-divider" style={{ margin: '24px 0' }} />
                <h3 className="gh-sidebar-title">Admin Actions</h3>
                <div className="gh-metadata-list">
                  <button className="ghost-btn" style={{ justifyContent: 'flex-start', padding: '8px 12px' }} onClick={() => toast('Marked fulfilled', 'success')}>Mark Fulfilled</button>
                  <button className="ghost-btn" style={{ justifyContent: 'flex-start', padding: '8px 12px' }} onClick={() => toast('Marked solved', 'success')}>Mark Solved</button>
                  <button className="ghost-btn" style={{ justifyContent: 'flex-start', padding: '8px 12px' }} onClick={() => toast('Extended by 30 days', 'success')}>Extend 30 days</button>
                  <button className="ghost-btn" style={{ justifyContent: 'flex-start', padding: '8px 12px' }} onClick={() => toast('Pushed to Resources', 'success')}>Push to Resources</button>
                  <button className="ghost-btn" style={{ justifyContent: 'flex-start', padding: '8px 12px' }} onClick={() => toast('Pushed to Sites', 'success')}>Push to Sites</button>
                  <button className="ghost-btn" style={{ justifyContent: 'flex-start', padding: '8px 12px', color: '#ef4444' }} onClick={() => toast('Request closed', 'success')}>Close</button>
                  <button className="ghost-btn" style={{ justifyContent: 'flex-start', padding: '8px 12px', color: '#ef4444' }} onClick={() => toast('Request archived', 'success')}>Archive</button>
                  <button className="ghost-btn" style={{ justifyContent: 'flex-start', padding: '8px 12px', color: '#ef4444' }} onClick={() => toast('Request deleted', 'success')}>Delete</button>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RequestDetail;
