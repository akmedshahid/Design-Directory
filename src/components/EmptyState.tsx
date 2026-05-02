import React from 'react';
import { Search } from 'lucide-react';
import './EmptyState.css';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  compact?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon, action, compact }) => {
  return (
    <div className={`empty-state-panel ${compact ? 'compact' : ''}`}>
      <div className="esp-content">
        <div className="esp-icon-wrapper">
          {icon || <Search size={24} />}
        </div>
        <div className="esp-text">
          <h3 className="esp-title">{title}</h3>
          <p className="esp-desc">{description}</p>
        </div>
        {action && <div className="esp-action">{action}</div>}
      </div>
    </div>
  );
};

export default EmptyState;
