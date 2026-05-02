import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockAdminQueue } from '../data/greatHallData';
import { useToast } from '../components/Toast';

const GreatHallAdminQueue = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('Pending');

  const pendingItems = mockAdminQueue.filter(q => q.status === 'pending');
  const reviewedItems = mockAdminQueue.filter(q => q.status === 'reviewed');

  const items = activeTab === 'Pending' ? pendingItems : reviewedItems;

  return (
    <div className="page-container" style={{ padding: '40px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, margin: '0 0 12px', color: 'var(--text-primary)' }}>Moderation Queue</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Review flagged content, pending requests, and suggested resources.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid var(--border-subtle)' }}>
        {['Pending', 'Reviewed'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'transparent', border: 'none', color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: 14, fontWeight: 500, padding: '12px 16px', cursor: 'pointer',
              borderBottom: `2px solid ${activeTab === tab ? 'var(--accent-color)' : 'transparent'}`
            }}
          >
            {tab} ({tab === 'Pending' ? pendingItems.length : reviewedItems.length})
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map(item => (
          <div key={item.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {item.status === 'pending' ? <AlertCircle size={16} color="#fbbf24" /> : <CheckCircle2 size={16} color="#34d399" />}
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', textTransform: 'capitalize' }}>{item.type.replace('_', ' ')}</span>
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(item.date).toLocaleString()}</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 8px' }}><strong>Reason:</strong> {item.reason}</p>
              {item.linkedItemId && (
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 8px' }}><strong>Target ID:</strong> {item.linkedItemId}</p>
              )}
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}><strong>Submitted by:</strong> {item.submittedBy}</p>
            </div>
            
            {activeTab === 'Pending' ? (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="primary-btn small" onClick={() => toast('Approved', 'success')}>Approve</button>
                <button className="secondary-btn small" onClick={() => toast('Rejected', 'info')}>Reject</button>
              </div>
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                <strong>Review Notes:</strong> {item.reviewNotes || 'No notes provided.'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreatHallAdminQueue;