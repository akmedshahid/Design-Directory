import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, DollarSign, MessageSquare, ShieldAlert, CheckCircle2, Box, Copy, ExternalLink, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/Toast';
import { mockGroupBuys, type GroupBuy } from '../../data/groupBuysData';
import { statusColor } from './GroupBuyComponents';
import './GroupBuyDetail.css';

type TabType = 'Overview' | 'Participants' | 'Payments' | 'Chat' | 'License' | 'Delivery' | 'Activity' | 'Admin';

const GroupBuyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  
  const gb = mockGroupBuys.find(g => g.id === id || g.slug === id);

  if (!gb) {
    return (
      <div className="page-container">
        <Link to="/app/group-buys" className="gb-breadcrumb-link">
          <ArrowLeft size={14} /> Back to Group-Buys
        </Link>
        <div style={{ marginTop: 24, color: 'var(--text-secondary)' }}>This group-buy could not be found.</div>
      </div>
    );
  }

  const isAdmin = user?.role === 'Admin';
  
  const tabs: { id: TabType, label: string, icon: React.ReactNode, adminOnly?: boolean }[] = [
    { id: 'Overview', label: 'Overview', icon: <Box size={14} /> },
    { id: 'Participants', label: 'Participants', icon: <Users size={14} /> },
    { id: 'Payments', label: 'Payments', icon: <DollarSign size={14} /> },
    { id: 'Chat', label: 'Chat', icon: <MessageSquare size={14} /> },
    { id: 'License', label: 'License', icon: <ShieldAlert size={14} /> },
    { id: 'Delivery', label: 'Delivery', icon: <CheckCircle2 size={14} /> },
    { id: 'Activity', label: 'Activity', icon: <Activity size={14} /> },
    { id: 'Admin', label: 'Admin', icon: <SettingsIcon size={14} />, adminOnly: true },
  ];

  const visibleTabs = tabs.filter(t => !t.adminOnly || isAdmin);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast('Link copied', 'success');
  };

  return (
    <div className="page-container gb-detail-page">
      <Link to="/app/group-buys" className="gb-breadcrumb-link">
        <ArrowLeft size={14} /> Back to Group-Buys
      </Link>

      <div className="gb-detail-layout">
        <div className="gb-detail-main">
          <div className="gb-detail-header">
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              <span className={`gb-status-pill ${statusColor(gb.status)}`}>{gb.status}</span>
              <span className="gb-category-badge">{gb.category}</span>
              {gb.requiredPlan !== 'Member' && <span className="gb-plan-badge">{gb.requiredPlan} Only</span>}
            </div>

            <h1 className="gb-detail-title">{gb.title}</h1>
            <p className="gb-detail-subtitle">{gb.shortDescription}</p>

            <div className="gb-detail-meta-row">
              <a href={gb.productUrl} target="_blank" rel="noreferrer" className="gb-meta-link">
                <ExternalLink size={14} /> {gb.productName} by {gb.creatorName}
              </a>
            </div>
          </div>

          <div className="gb-detail-tabs">
            {visibleTabs.map(tab => (
              <button
                key={tab.id}
                className={`gb-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="gb-tab-content">
            {activeTab === 'Overview' && (
              <div className="gb-overview-tab">
                <section>
                  <h3>About this purchase</h3>
                  <p>{gb.longDescription}</p>
                </section>
                
                <section>
                  <h3>Details</h3>
                  <div className="gb-details-grid">
                    <div className="gb-detail-item">
                      <span className="label">Category</span>
                      <span className="value">{gb.category} &gt; {gb.type}</span>
                    </div>
                    <div className="gb-detail-item">
                      <span className="label">Original Price</span>
                      <span className="value">${gb.originalPrice.toFixed(2)}</span>
                    </div>
                    <div className="gb-detail-item">
                      <span className="label">License Type</span>
                      <span className="value">{gb.licenseType || 'Not specified'}</span>
                    </div>
                    <div className="gb-detail-item">
                      <span className="label">Share Method</span>
                      <span className="value">{gb.shareMethod}</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3>Tags</h3>
                  <div className="gb-tags">
                    {gb.tags.map(tag => <span key={tag} className="gb-tag">#{tag}</span>)}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'Participants' && (
              <div className="gb-participants-tab">
                <div className="gb-table-header">
                  <div>Participant</div>
                  <div>Plan</div>
                  <div>Share</div>
                  <div>Status</div>
                </div>
                <div className="gb-table-body">
                  {gb.participants.map(p => (
                    <div key={p.userId} className="gb-table-row">
                      <div className="gb-participant-info">
                        <div className="gb-avatar">{p.avatar}</div>
                        <div className="gb-names">
                          <span className="display-name">{p.displayName}</span>
                          <span className="username">@{p.username}</span>
                        </div>
                      </div>
                      <div><span className={`gb-plan-badge ${p.plan.toLowerCase()}`}>{p.plan}</span></div>
                      <div className="gb-share-amount">${p.shareAmount.toFixed(2)}</div>
                      <div><span className="gb-p-status">{p.status}</span></div>
                    </div>
                  ))}
                  {gb.participants.length === 0 && (
                    <div className="gb-empty-state">No participants yet.</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'Payments' && (
              <div className="gb-payments-tab">
                <div className="gb-payment-summary">
                  <div className="gb-pay-stat">
                    <span className="label">Total Expected</span>
                    <span className="value">${gb.expectedTotalCost.toFixed(2)}</span>
                  </div>
                  <div className="gb-pay-stat">
                    <span className="label">Total Collected</span>
                    <span className="value">${gb.totalPaid.toFixed(2)}</span>
                  </div>
                  <div className="gb-pay-stat">
                    <span className="label">Remaining</span>
                    <span className="value">${gb.totalRemaining.toFixed(2)}</span>
                  </div>
                </div>

                <section>
                  <h3>Payment Instructions</h3>
                  <div className="gb-instructions-box">
                    <p>{gb.paymentInstructions || 'No instructions provided yet.'}</p>
                    <div style={{ marginTop: 16 }}>
                      <strong>Accepted Methods:</strong>
                      <div className="gb-tags" style={{ marginTop: 8 }}>
                        {gb.paymentMethods.map(m => <span key={m} className="gb-tag">{m}</span>)}
                      </div>
                    </div>
                  </div>
                </section>

                <div className="gb-actions-row">
                  <button className="primary-btn" onClick={() => toast('Payment modal coming soon', 'info')}>Mark Payment Sent</button>
                </div>
              </div>
            )}

            {activeTab === 'Chat' && (
              <div className="gb-chat-tab">
                {gb.chatMessages.length === 0 ? (
                  <div className="gb-empty-state">No messages yet.</div>
                ) : (
                  <div className="gb-chat-list">
                    {gb.chatMessages.map(msg => (
                      <div key={msg.id} className={`gb-chat-msg ${msg.pinned ? 'pinned' : ''}`}>
                        <div className="gb-avatar">{msg.avatar}</div>
                        <div className="gb-msg-body">
                          <div className="gb-msg-header">
                            <span className="name">{msg.authorName}</span>
                            <span className="role">{msg.authorRole}</span>
                            <span className="time">{new Date(msg.timestamp).toLocaleString()}</span>
                          </div>
                          <div className="gb-msg-content">{msg.content}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="gb-chat-composer">
                  <textarea placeholder="Send a message to the group..." rows={2} />
                  <button className="primary-btn" onClick={() => toast('Sent', 'success')}>Send</button>
                </div>
              </div>
            )}

            {activeTab === 'License' && (
              <div className="gb-license-tab">
                <div className={`gb-license-banner ${gb.legalReviewStatus === 'Approved' ? 'approved' : 'pending'}`}>
                  <ShieldAlert size={24} />
                  <div>
                    <h3>{gb.legalReviewStatus === 'Approved' ? 'License Approved' : 'License Review Pending'}</h3>
                    <p>This group-buy {gb.legalReviewStatus === 'Approved' ? 'has been verified to comply' : 'is currently being reviewed for compliance'} with our legal rules regarding team/multi-seat licenses.</p>
                  </div>
                </div>

                <div className="gb-details-grid" style={{ marginTop: 24 }}>
                  <div className="gb-detail-item">
                    <span className="label">Terms Status</span>
                    <span className="value">{gb.termsStatus}</span>
                  </div>
                  <div className="gb-detail-item">
                    <span className="label">Commercial Use</span>
                    <span className="value">{gb.commercialUse ? 'Allowed' : 'Not Allowed'}</span>
                  </div>
                  <div className="gb-detail-item">
                    <span className="label">Team Use</span>
                    <span className="value">{gb.teamUseAllowed ? 'Allowed' : 'Not Allowed'}</span>
                  </div>
                  <div className="gb-detail-item">
                    <span className="label">Allowed Seats</span>
                    <span className="value">{gb.numberOfSeats || 'Unknown'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Delivery' && (
              <div className="gb-delivery-tab">
                <div className="gb-details-grid">
                  <div className="gb-detail-item">
                    <span className="label">Delivery Method</span>
                    <span className="value">{gb.deliveryMethod}</span>
                  </div>
                  <div className="gb-detail-item">
                    <span className="label">Delivery Status</span>
                    <span className="value">{gb.deliveryStatus}</span>
                  </div>
                </div>
                {gb.deliveryStatus === 'Delivered' && (
                  <div className="gb-instructions-box" style={{ marginTop: 24 }}>
                    <h3>Access Instructions</h3>
                    <p>{gb.accessInstructions || 'You should have received an invite to your email.'}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Activity' && (
              <div className="gb-activity-tab">
                <div className="gb-empty-state">Activity timeline coming soon.</div>
              </div>
            )}

            {activeTab === 'Admin' && isAdmin && (
              <div className="gb-admin-tab">
                <h3>Admin Actions</h3>
                <div className="gb-action-grid">
                  <button className="secondary-btn" onClick={() => toast('Status changed', 'success')}>Change Status</button>
                  <button className="secondary-btn" onClick={() => toast('Cost updated', 'success')}>Update Cost</button>
                  <button className="secondary-btn" onClick={() => toast('Marked delivered', 'success')}>Mark Delivered</button>
                  <button className="ghost-btn" style={{ color: '#ef4444' }}>Cancel Group-Buy</button>
                </div>
              </div>
            )}

          </div>
        </div>

        <aside className="gb-detail-sidebar">
          <div className="gb-sidebar-card">
            <h3>Summary</h3>
            <div className="gb-summary-list">
              <div className="gb-sum-row">
                <span className="label">Status</span>
                <span className="value">{gb.status}</span>
              </div>
              <div className="gb-sum-row">
                <span className="label">Total Cost</span>
                <span className="value">${gb.expectedTotalCost.toFixed(2)}</span>
              </div>
              <div className="gb-sum-row">
                <span className="label">Est. Share</span>
                <span className="value">${gb.estimatedSharePerUser.toFixed(2)}</span>
              </div>
              <div className="gb-sum-row">
                <span className="label">Joined</span>
                <span className="value">{gb.currentParticipants} / {gb.minimumParticipants}</span>
              </div>
              <div className="gb-sum-row">
                <span className="label">Deadline</span>
                <span className="value">{gb.paymentDeadline ? new Date(gb.paymentDeadline).toLocaleDateString() : 'TBD'}</span>
              </div>
            </div>

            <div className="gb-sidebar-actions">
              {gb.status === 'Voting' ? (
                <button className="primary-btn" onClick={() => toast('Voted!', 'success')}>Vote</button>
              ) : gb.status === 'Scheduled' ? (
                <button className="primary-btn" onClick={() => toast('Joined!', 'success')}>Join Group-Buy</button>
              ) : gb.status === 'Collecting Payments' ? (
                <button className="primary-btn" onClick={() => toast('Payment sent', 'success')}>Pay Share</button>
              ) : null}
              
              <button className="secondary-btn" onClick={handleCopyLink}><Copy size={14} /> Copy Link</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

// Mock import fix for SettingsIcon
import { Settings as SettingsIcon } from 'lucide-react';

export default GroupBuyDetail;