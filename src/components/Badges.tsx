import React from 'react';
import { ShieldCheck, Zap, AlertTriangle, AlertCircle, Info, Star } from 'lucide-react';
import './Badges.css';

export interface BadgeProps {
  type: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PriceBadge: React.FC<BadgeProps> = ({ type, className = '', size = 'md' }) => {
  const normalizedType = type?.toLowerCase() || 'unknown';
  return (
    <span className={`badge price-badge price-${normalizedType} badge-${size} ${className}`}>
      {type || 'Unknown'}
    </span>
  );
};

export const LicenseBadge: React.FC<BadgeProps> = ({ type, className = '', size = 'md' }) => {
  const isPersonal = type?.toLowerCase().includes('personal');
  const isOpen = type?.toLowerCase().includes('open');
  return (
    <span className={`badge license-badge ${isPersonal ? 'license-personal' : isOpen ? 'license-open' : 'license-commercial'} badge-${size} ${className}`}>
      {type || 'Unknown'}
    </span>
  );
};

export const ToolBadge: React.FC<{ tool: string; className?: string; size?: 'sm' | 'md' }> = ({ tool, className = '', size = 'md' }) => {
  return (
    <span className={`badge tool-badge tool-${tool.toLowerCase().replace(/[^a-z0-9]/g, '-')} badge-${size} ${className}`}>
      <span className="tool-dot" />
      {tool}
    </span>
  );
};

export const FileTypeBadge: React.FC<{ ext: string; className?: string; size?: 'sm' | 'md' }> = ({ ext, className = '', size = 'md' }) => {
  return (
    <span className={`badge file-badge badge-${size} ${className}`}>
      {ext.toUpperCase().replace('.', '')}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: string; className?: string; size?: 'sm' | 'md' }> = ({ status, className = '', size = 'md' }) => {
  const norm = status?.toLowerCase();
  let colorClass = 'status-default';
  let Icon = Info;

  if (norm === 'active' || norm === 'approved' || norm === 'verified') {
    colorClass = 'status-success';
    Icon = ShieldCheck;
  } else if (norm === 'broken' || norm === 'rejected') {
    colorClass = 'status-danger';
    Icon = AlertCircle;
  } else if (norm === 'needs review' || norm === 'pending') {
    colorClass = 'status-warning';
    Icon = AlertTriangle;
  } else if (norm === 'new' || norm === 'handpicked') {
    colorClass = 'status-accent';
    Icon = Zap;
  }

  return (
    <span className={`badge status-badge ${colorClass} badge-${size} ${className}`}>
      <Icon size={size === 'sm' ? 12 : 14} />
      {status}
    </span>
  );
};

export const QualityBadge: React.FC<{ score: number; className?: string; size?: 'sm' | 'md' }> = ({ score, className = '', size = 'md' }) => {
  let colorClass = 'quality-low';
  if (score >= 90) colorClass = 'quality-high';
  else if (score >= 70) colorClass = 'quality-mid';

  return (
    <span className={`badge quality-badge ${colorClass} badge-${size} ${className}`} title="Curator Quality Score">
      <Star size={size === 'sm' ? 12 : 14} fill={score >= 90 ? 'currentColor' : 'none'} />
      {score}/100
    </span>
  );
};

export const TagChip: React.FC<{ tag: string; className?: string; onClick?: () => void; removable?: boolean; onRemove?: () => void }> = ({ tag, className = '', onClick, removable, onRemove }) => {
  return (
    <span 
      className={`chip tag-chip ${onClick ? 'clickable' : ''} ${className}`}
      onClick={onClick}
    >
      #{tag.toLowerCase()}
      {removable && (
        <span className="chip-remove" onClick={(e) => { e.stopPropagation(); onRemove?.(); }}>&times;</span>
      )}
    </span>
  );
};

export const MetadataRow: React.FC<{ label: string; value: React.ReactNode; icon?: React.ReactNode; tooltip?: string; className?: string }> = ({ label, value, icon, tooltip, className = '' }) => {
  return (
    <div className={`metadata-row ${className}`} title={tooltip}>
      <span className="meta-label">
        {icon && <span className="meta-icon">{icon}</span>}
        {label}
      </span>
      <span className="meta-value">{value || <span className="meta-fallback">Unknown</span>}</span>
    </div>
  );
};

export const Tooltip: React.FC<{ content: string; children: React.ReactNode; position?: 'top' | 'bottom' | 'left' | 'right' }> = ({ content, children, position = 'top' }) => {
  return (
    <div className={`tooltip-wrapper tooltip-${position}`}>
      {children}
      <div className="tooltip-content">{content}</div>
    </div>
  );
};
