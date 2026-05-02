import React from 'react';
import { mockSavedItems } from '../data/greatHallData';
import { Bookmark, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const GreatHallSaved = () => {
  return (
    <div className="page-container" style={{ padding: '40px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, margin: '0 0 12px', color: 'var(--text-primary)' }}>Saved Items</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Your personal collection of saved requests, posts, and files from the Great Hall.</p>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {mockSavedItems.map(item => (
          <Link key={item.id} to={item.targetRoute} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '20px', textDecoration: 'none', color: 'var(--text-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bookmark size={20} color="var(--accent-color)" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{item.description}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(item.savedAt).toLocaleDateString()}</span>
              <ExternalLink size={16} color="var(--text-muted)" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GreatHallSaved;