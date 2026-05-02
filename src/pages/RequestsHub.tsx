import React, { useMemo, useState } from 'react';
import { CheckCircle2, ChevronUp, Eye, MessageSquare, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CreateRequestModal } from '../components/CreateRequestModal';
import { useToast } from '../components/Toast';
import { mockRequests } from '../data/greatHallData';
import { formatRelativeTime, roleClassName } from '../layouts/GreatHallLayout';
import './RequestsHub.css';

const labelForStatus = (status: string) => {
  if (status === 'in-progress') return 'In Progress';
  if (status === 'found') return 'Solved';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const RequestsHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(mockRequests.map((request) => [request.id, request.upvotes])),
  );

  const filteredRequests = useMemo(() => {
    let requests = mockRequests;
    if (activeTab === 'Open') requests = requests.filter(r => r.status === 'open');
    if (activeTab === 'In Progress') requests = requests.filter(r => r.status === 'in-progress');
    if (activeTab === 'Solved') requests = requests.filter(r => r.status === 'found' || r.status === 'closed');
    if (activeTab === 'Mine') requests = requests.filter(r => r.authorName === 'You' || r.authorId === 'viewer');

    return requests.filter((request) => {
      const haystack = `${request.title} ${request.shortDesc} ${request.category} ${request.tags.join(' ')}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [query, activeTab]);

  const handleVote = (requestId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setVotes((current) => ({ ...current, [requestId]: (current[requestId] ?? 0) + 1 }));
    toast('Vote added', 'success');
  };

  return (
    <>
      <div className="page-container gh-requests-hub">
        <div className="gh-dir-header">
          <div className="gh-dir-title-area">
            <h1>Request Board</h1>
            <p>Ask the community to surface better references, tools, files, and niche design knowledge.</p>
          </div>
          <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
            New Request
          </button>
        </div>

        <div className="gh-requests-toolbar">
          <div className="gh-requests-tabs">
            {['All', 'Open', 'In Progress', 'Solved', 'Mine'].map(tab => (
              <button 
                key={tab} 
                className={`gh-req-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="gh-dir-search">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search requests..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="gh-requests-list">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="gh-request-card clickable"
              onClick={() => navigate(`/app/great-hall/requests/${request.id}`)}
            >
              <div className="gh-req-vote-col">
                <button className="gh-vote-btn" onClick={(event) => handleVote(request.id, event)}>
                  <ChevronUp size={18} />
                </button>
                <div className="gh-vote-count">{votes[request.id] ?? request.upvotes}</div>
              </div>

              <div className="gh-req-main-col">
                <div className="gh-req-meta-top">
                  <span className={`gh-req-status-badge ${request.status}`}>
                    {labelForStatus(request.status)}
                  </span>
                  <span className={`gh-req-priority-badge ${request.priority}`}>{request.priority}</span>
                  <span className="gh-req-category">{request.category}</span>
                  <span className="gh-req-time">{formatRelativeTime(request.updatedAt)}</span>
                </div>

                <h2 className="gh-req-title-large">{request.title}</h2>
                <p className="gh-req-desc-large">{request.shortDesc}</p>

                <div className="gh-req-meta-bottom">
                  <div className="gh-req-author-info">
                    <div className="gh-author-avatar-sm">{request.avatar}</div>
                    <span>{request.authorName}</span>
                    <span className={`gh-role-dot ${roleClassName(request.authorRole)}`} />
                  </div>

                  <div className="gh-req-stats">
                    <div className="gh-req-stat">
                      <MessageSquare size={14} />
                      {request.replies.length}
                    </div>
                    <div className="gh-req-stat">
                      <Eye size={14} />
                      {request.watchers}
                    </div>
                    <div className={`gh-req-stat ${request.suggestions.some((suggestion) => suggestion.isAccepted) ? 'success' : ''}`}>
                      <CheckCircle2 size={14} />
                      {request.suggestions.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 ? (
            <div className="gh-empty-state">
              <h3>No requests match that search</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
                Try a broader phrase or open a new request for the community.
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <CreateRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {
          setIsModalOpen(false);
          toast('Request submitted to the Great Hall', 'success');
        }}
      />
    </>
  );
};

export default RequestsHub;
