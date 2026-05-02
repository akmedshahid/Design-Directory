import React from 'react';
import { Bookmark } from 'lucide-react';
import EmptyStatePanel from '../components/EmptyState';

const GreatHallSaved = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Saved</h1>
        <p className="page-subtitle">Posts and messages you've bookmarked across the Great Hall.</p>
      </div>
      <div style={{ marginTop: '48px' }}>
        <EmptyStatePanel
          title="No saved items yet"
          description="When you bookmark messages or posts in rooms, they'll appear here for quick reference."
          icon={<Bookmark size={32} />}
        />
      </div>
    </div>
  );
};

export default GreatHallSaved;
