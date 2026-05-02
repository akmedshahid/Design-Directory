import React, { useState } from 'react';
import { Shield, Clock, CheckCircle2, XCircle, AlertTriangle, X, Edit, ExternalLink, MoreHorizontal, Library, Globe } from 'lucide-react';
import { resources } from '../data';
import { sites } from '../sitesData';
import type { Resource } from '../data';
import type { Site } from '../sitesData';
import { useToast } from '../components/Toast';
import EmptyState from '../components/EmptyState';
import './Admin.css';

type TabType = 'pending' | 'approved' | 'rejected' | 'broken';
type ItemType = 'resource' | 'site';

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [activeType, setActiveType] = useState<ItemType>('resource');
  const [reviewingItem, setReviewingItem] = useState<Resource | Site | null>(null);

  // Mock subsets
  const pendingResources = resources.slice(10, 15).map(r => ({ ...r, status: 'pending' }));
  const approvedResources = resources.slice(0, 10).map(r => ({ ...r, status: 'approved' }));
  const brokenResources = resources.slice(20, 22).map(r => ({ ...r, status: 'broken' }));

  const pendingSites = sites.slice(10, 13).map(s => ({ ...s, curationStatus: 'Pending' }));
  const approvedSites = sites.slice(0, 10).map(s => ({ ...s, curationStatus: 'Approved' }));
  const brokenSites = sites.slice(15, 16).map(s => ({ ...s, curationStatus: 'Broken' }));

  const getActiveData = () => {
    if (activeType === 'resource') {
      switch (activeTab) {
        case 'pending': return pendingResources;
        case 'approved': return approvedResources;
        case 'rejected': return []; 
        case 'broken': return brokenResources;
        default: return [];
      }
    } else {
      switch (activeTab) {
        case 'pending': return pendingSites;
        case 'approved': return approvedSites;
        case 'rejected': return [];
        case 'broken': return brokenSites;
        default: return [];
      }
    }
  };

  const handleAction = (action: string) => {
    toast(`Item ${action} successfully.`, 'success');
    setReviewingItem(null);
  };

  const isResource = (item: any): item is Resource => 'title' in item;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Curation Panel</h1>
          <p>Review submissions and manage directory health.</p>
        </div>
        <div className="admin-stats">
          <div className="stat-pill"><Clock size={14} /> {activeType === 'resource' ? pendingResources.length : pendingSites.length} Pending</div>
          <div className="stat-pill warning"><AlertTriangle size={14} /> {activeType === 'resource' ? brokenResources.length : brokenSites.length} Broken</div>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${activeType === 'resource' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
          onClick={() => { setActiveType('resource'); setReviewingItem(null); }}
        >
          <Library size={16} /> Resources
        </button>
        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${activeType === 'site' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
          onClick={() => { setActiveType('site'); setReviewingItem(null); }}
        >
          <Globe size={16} /> Sites
        </button>
      </div>

      <div className="admin-tabs">
        <button className={`admin-tab ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>Pending</button>
        <button className={`admin-tab ${activeTab === 'approved' ? 'active' : ''}`} onClick={() => setActiveTab('approved')}>Approved</button>
        <button className={`admin-tab ${activeTab === 'rejected' ? 'active' : ''}`} onClick={() => setActiveTab('rejected')}>Rejected</button>
        <button className={`admin-tab ${activeTab === 'broken' ? 'active' : ''}`} onClick={() => setActiveTab('broken')}>Broken</button>
      </div>

      <div className="admin-content">
        {getActiveData().length > 0 ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{activeType === 'resource' ? 'Resource' : 'Site'}</th>
                  <th>Category</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getActiveData().map(item => {
                  const title = isResource(item) ? item.title : (item as any).name;
                  const subtitle = isResource(item) ? (item.sourceName || item.creator) : (item as any).domain;
                  const thumb = isResource(item) ? item.thumbnailStyle : (item as any).screenshotStyle;
                  const status = isResource(item) ? item.status : (item as any).curationStatus?.toLowerCase();

                  return (
                    <tr key={item.id} onClick={() => setReviewingItem(item as Resource | Site)}>
                      <td>
                        <div className="admin-td-resource">
                          <div className="admin-tiny-thumb" style={{ background: thumb }}></div>
                          <div className="admin-td-text">
                            <div className="td-title">{title}</div>
                            <div className="td-sub">{subtitle}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="td-tags">
                          <span className="td-tag">{item.category}</span>
                          <span className="td-tag muted">{item.subcategory}</span>
                        </div>
                      </td>
                      <td>
                        <div className="td-date">{new Date(item.dateAdded).toLocaleDateString()}</div>
                      </td>
                      <td>
                        <span className={`status-badge ${status}`}>{status}</span>
                      </td>
                      <td>
                        <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setReviewingItem(item as Resource | Site); }}>
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState 
            title={`No ${activeType}s found`} 
            description={`There are no items in the ${activeTab} queue.`}
            icon={<Shield size={32} style={{ opacity: 0.5 }} />}
          />
        )}
      </div>

      {/* Review Drawer */}
      <div className={`review-drawer-overlay ${reviewingItem ? 'open' : ''}`} onClick={() => setReviewingItem(null)}>
        <div className={`review-drawer ${reviewingItem ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
          {reviewingItem && isResource(reviewingItem) && (
            <>
              <div className="drawer-header">
                <h2>Review Resource</h2>
                <button className="icon-btn" onClick={() => setReviewingItem(null)}><X size={18} /></button>
              </div>
              <div className="drawer-content">
                <div className="review-preview-wrap">
                  <div className="review-thumb" style={{ background: reviewingItem.thumbnailStyle }}>
                    <div className="review-price-badge">{reviewingItem.priceType}</div>
                  </div>
                </div>
                <div className="review-field">
                  <label>Title</label>
                  <input type="text" defaultValue={reviewingItem.title} />
                </div>
                <div className="review-field">
                  <label>Description</label>
                  <textarea defaultValue={reviewingItem.description} rows={3}></textarea>
                </div>
                <div className="review-field-row">
                  <div className="review-field flex-1">
                    <label>Category</label>
                    <input type="text" defaultValue={reviewingItem.category} />
                  </div>
                  <div className="review-field flex-1">
                    <label>Subcategory</label>
                    <input type="text" defaultValue={reviewingItem.subcategory} />
                  </div>
                </div>
                <div className="review-field">
                  <label>Source URL</label>
                  <div className="url-input-wrap">
                    <input type="text" defaultValue={reviewingItem.sourceUrl} />
                    <button className="icon-btn" onClick={() => window.open(reviewingItem.sourceUrl, '_blank')} title="Test Link">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
                <div className="review-field">
                  <label>Curator Note (Internal)</label>
                  <textarea placeholder="Leave a note..." rows={2}></textarea>
                </div>
              </div>
            </>
          )}

          {reviewingItem && !isResource(reviewingItem) && (
            <>
              <div className="drawer-header">
                <h2>Review Site</h2>
                <button className="icon-btn" onClick={() => setReviewingItem(null)}><X size={18} /></button>
              </div>
              <div className="drawer-content">
                <div className="review-preview-wrap">
                  <div className="review-thumb" style={{ background: reviewingItem.screenshotStyle }}>
                    <div className="review-price-badge">{reviewingItem.accessType}</div>
                  </div>
                </div>
                <div className="review-field">
                  <label>Site Name</label>
                  <input type="text" defaultValue={reviewingItem.name} />
                </div>
                <div className="review-field">
                  <label>Description</label>
                  <textarea defaultValue={reviewingItem.shortDescription} rows={3}></textarea>
                </div>
                <div className="review-field-row">
                  <div className="review-field flex-1">
                    <label>Category</label>
                    <input type="text" defaultValue={reviewingItem.category} />
                  </div>
                  <div className="review-field flex-1">
                    <label>Subcategory</label>
                    <input type="text" defaultValue={reviewingItem.subcategory} />
                  </div>
                </div>
                <div className="review-field">
                  <label>Site URL</label>
                  <div className="url-input-wrap">
                    <input type="text" defaultValue={reviewingItem.url} />
                    <button className="icon-btn" onClick={() => window.open(reviewingItem.url, '_blank')} title="Test Link">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
                <div className="review-field p-4 bg-white/5 border border-white/10 rounded-md mb-4 mt-2">
                  <label className="text-white/50 text-xs uppercase mb-2 block">Security & Credentials</label>
                  <div className="text-sm">
                    Has Credentials: <strong>{reviewingItem.hasCredentials ? 'Yes' : 'No'}</strong>
                  </div>
                  {reviewingItem.hasCredentials && (
                    <div className="text-xs text-amber-500 mt-1">Credentials present. Do not log to console.</div>
                  )}
                </div>
                <div className="review-field">
                  <label>Curator Note</label>
                  <textarea placeholder="Leave a note..." rows={2}></textarea>
                </div>
              </div>
            </>
          )}

          {reviewingItem && (
            <div className="drawer-footer">
              <button className="action-btn danger-outline" onClick={() => handleAction('rejected')}>
                <XCircle size={16} /> Reject
              </button>
              <div className="flex-1"></div>
              <button className="action-btn" onClick={() => handleAction('saved')}>
                <Edit size={16} /> Save Draft
              </button>
              <button className="action-btn primary-btn success" onClick={() => handleAction('approved')}>
                <CheckCircle2 size={16} /> Approve
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
