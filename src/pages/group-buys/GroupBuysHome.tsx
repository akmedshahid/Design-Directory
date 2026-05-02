import React from 'react';
import { Link } from 'react-router-dom';
import { mockGroupBuys } from '../../data/groupBuysData';
import { GroupBuyCard, GroupBuyListRow } from './GroupBuyComponents';
import './GroupBuysHome.css';

const GroupBuysHome = () => {
  const activeBuys = mockGroupBuys.filter(gb => gb.status === 'Active' || gb.status === 'Collecting Payments');
  const scheduledBuys = mockGroupBuys.filter(gb => gb.status === 'Scheduled');
  const votingBuys = mockGroupBuys.filter(gb => gb.status === 'Voting').sort((a, b) => b.voteCount - a.voteCount);
  const myBuys = mockGroupBuys.filter(gb => gb.participants.some(p => p.userId === 'viewer'));
  
  return (
    <div className="page-container gb-home-page">
      <div className="gb-overview-header">
        <div className="gb-header-pill">Group-Buys</div>
        <h1>Shared purchases, organized.</h1>
        <p>Coordinate legal collective purchases, vote on requests, track contributions, and manage delivery with your private member group.</p>
        
        <div className="gb-header-actions">
          <Link to="/app/group-buys/new" className="primary-btn">Request Group-Buy</Link>
        </div>
      </div>

      <div className="gb-summary-strip">
        <div className="gb-summary-item">
          <span className="gb-summary-val">{activeBuys.length}</span>
          <span className="gb-summary-label">Active</span>
        </div>
        <div className="gb-summary-item">
          <span className="gb-summary-val">{scheduledBuys.length}</span>
          <span className="gb-summary-label">Scheduled</span>
        </div>
        <div className="gb-summary-item">
          <span className="gb-summary-val">{votingBuys.length}</span>
          <span className="gb-summary-label">Voting</span>
        </div>
        <div className="gb-summary-item">
          <span className="gb-summary-val">{myBuys.length}</span>
          <span className="gb-summary-label">Joined</span>
        </div>
      </div>

      <div className="gb-home-sections">
        {activeBuys.length > 0 && (
          <section className="gb-section">
            <div className="gb-section-header">
              <h2>Active Group-Buys</h2>
              <Link to="/app/group-buys/active" className="gb-view-all">View all</Link>
            </div>
            <div className="gb-card-grid">
              {activeBuys.slice(0, 3).map(gb => (
                <GroupBuyCard key={gb.id} gb={gb} />
              ))}
            </div>
          </section>
        )}

        {scheduledBuys.length > 0 && (
          <section className="gb-section">
            <div className="gb-section-header">
              <h2>Scheduled Soon</h2>
              <Link to="/app/group-buys/scheduled" className="gb-view-all">View all</Link>
            </div>
            <div className="gb-list-container">
              {scheduledBuys.slice(0, 3).map(gb => (
                <GroupBuyListRow key={gb.id} gb={gb} />
              ))}
            </div>
          </section>
        )}

        {votingBuys.length > 0 && (
          <section className="gb-section">
            <div className="gb-section-header">
              <h2>Top Voted Requests</h2>
              <Link to="/app/group-buys/requests" className="gb-view-all">View all</Link>
            </div>
            <div className="gb-list-container">
              {votingBuys.slice(0, 3).map(gb => (
                <GroupBuyListRow key={gb.id} gb={gb} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default GroupBuysHome;