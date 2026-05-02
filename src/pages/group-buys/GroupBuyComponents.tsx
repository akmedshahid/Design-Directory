import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, ShieldAlert } from 'lucide-react';
import { type GroupBuy } from '../../data/groupBuysData';
import './GroupBuyComponents.css';

export const statusColor = (status: string) => {
  if (status === 'Active' || status === 'Collecting Payments') return 'active';
  if (status === 'Scheduled') return 'scheduled';
  if (status === 'Completed' || status === 'Delivered') return 'completed';
  if (status === 'Voting' || status === 'Requested') return 'voting';
  return 'default';
};

export const GroupBuyCard = ({ gb }: { gb: GroupBuy }) => {
  const percentComplete = gb.maximumParticipants 
    ? Math.min(100, Math.round((gb.currentParticipants / gb.maximumParticipants) * 100))
    : Math.min(100, Math.round((gb.currentParticipants / gb.minimumParticipants) * 100));

  return (
    <Link to={`/app/group-buys/${gb.id}`} className="gb-card">
      <div className="gb-card-header">
        <span className={`gb-status-pill ${statusColor(gb.status)}`}>{gb.status}</span>
        <span className="gb-category">{gb.category}</span>
      </div>
      
      <h3 className="gb-card-title">{gb.title}</h3>
      <p className="gb-card-desc">{gb.shortDescription}</p>

      <div className="gb-card-meta">
        <div className="gb-meta-item">
          <span className="gb-meta-label">Est. Share</span>
          <span className="gb-meta-val">${gb.estimatedSharePerUser.toFixed(2)}</span>
        </div>
        <div className="gb-meta-item">
          <span className="gb-meta-label">Total Cost</span>
          <span className="gb-meta-val">${gb.expectedTotalCost.toFixed(2)}</span>
        </div>
      </div>

      <div className="gb-card-progress">
        <div className="gb-progress-header">
          <span className="gb-progress-text"><Users size={12}/> {gb.currentParticipants} / {gb.minimumParticipants} joined</span>
          <span className="gb-progress-percent">{percentComplete}%</span>
        </div>
        <div className="gb-progress-track">
          <div className="gb-progress-fill" style={{ width: `${percentComplete}%` }} />
        </div>
      </div>

      <div className="gb-card-footer">
        {gb.legalReviewStatus === 'Approved' ? (
          <span className="gb-license-ok">License Reviewed</span>
        ) : (
          <span className="gb-license-warn"><ShieldAlert size={12}/> Needs Review</span>
        )}
        <div className="gb-card-arrow">
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
};

export const GroupBuyListRow = ({ gb }: { gb: GroupBuy }) => {
  return (
    <Link to={`/app/group-buys/${gb.id}`} className="gb-list-row">
      <div className="gb-row-main">
        <h3 className="gb-row-title">{gb.title}</h3>
        <div className="gb-row-sub">
          <span className={`gb-status-pill small ${statusColor(gb.status)}`}>{gb.status}</span>
          <span className="gb-row-domain">{gb.sourceName}</span>
        </div>
      </div>

      <div className="gb-row-stats">
        <div className="gb-row-stat">
          <span className="label">Est. Share</span>
          <span className="value">${gb.estimatedSharePerUser.toFixed(2)}</span>
        </div>
        <div className="gb-row-stat">
          <span className="label">Joined</span>
          <span className="value">{gb.currentParticipants} / {gb.minimumParticipants}</span>
        </div>
        {gb.paymentDeadline && (
          <div className="gb-row-stat">
            <span className="label"><Clock size={12}/> Deadline</span>
            <span className="value">{new Date(gb.paymentDeadline).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="gb-row-arrow">
        <ArrowRight size={16} />
      </div>
    </Link>
  );
};