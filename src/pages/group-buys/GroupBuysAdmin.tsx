import React, { useState } from 'react';
import { useToast } from '../../components/Toast';
import { mockGroupBuys } from '../../data/groupBuysData';
import { statusColor } from './GroupBuyComponents';
import { Link } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, Clock, XCircle } from 'lucide-react';
import './GroupBuysAdmin.css';

const GroupBuysAdmin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('Pending Requests');

  const tabs = ['Pending Requests', 'License Review', 'Active Payments', 'Delivery'];

  const getFilteredBuys = () => {
    switch (activeTab) {
      case 'Pending Requests':
        return mockGroupBuys.filter(gb => gb.status === 'Requested' || gb.status === 'Under Review');
      case 'License Review':
        return mockGroupBuys.filter(gb => gb.legalReviewStatus === 'Pending' || gb.legalReviewStatus === 'Needs More Info');
      case 'Active Payments':
        return mockGroupBuys.filter(gb => gb.status === 'Collecting Payments' || gb.paymentStatus === 'Collecting');
      case 'Delivery':
        return mockGroupBuys.filter(gb => gb.status === 'Purchased' || gb.deliveryStatus === 'Pending');
      default:
        return [];
    }
  };

  const filteredBuys = getFilteredBuys();

  return (
    <div className="page-container gb-admin-page">
      <div className="gb-admin-header">
        <h1>Admin Review</h1>
        <p>Manage Group-Buy requests, legal compliance, payments, and delivery.</p>
      </div>

      <div className="gb-admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`gb-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="gb-admin-content">
        {filteredBuys.length === 0 ? (
          <div className="gb-empty-state">No group-buys found for this category.</div>
        ) : (
          <div className="gb-admin-list">
            {filteredBuys.map(gb => (
              <div key={gb.id} className="gb-admin-row">
                <div className="gb-admin-row-main">
                  <div className="gb-admin-title-row">
                    <Link to={`/app/group-buys/${gb.id}`} className="gb-admin-title">{gb.title}</Link>
                    <span className={`gb-status-pill small ${statusColor(gb.status)}`}>{gb.status}</span>
                  </div>
                  <div className="gb-admin-meta">
                    <span>{gb.category}</span>
                    <span>•</span>
                    <span>Requested by {gb.requestedByUserId}</span>
                    <span>•</span>
                    <span className={gb.legalReviewStatus === 'Approved' ? 'ok' : 'warn'}>
                      {gb.legalReviewStatus === 'Approved' ? <CheckCircle2 size={12} /> : <ShieldAlert size={12} />}
                      {gb.legalReviewStatus}
                    </span>
                  </div>
                </div>

                <div className="gb-admin-actions">
                  {activeTab === 'Pending Requests' && (
                    <>
                      <button className="primary-btn small" onClick={() => toast('Approved for voting', 'success')}>Approve</button>
                      <button className="secondary-btn small" onClick={() => toast('Rejected', 'info')}>Reject</button>
                    </>
                  )}
                  {activeTab === 'License Review' && (
                    <>
                      <button className="primary-btn small" onClick={() => toast('License approved', 'success')}>Approve License</button>
                      <button className="secondary-btn small" onClick={() => toast('Requesting more info', 'info')}>Request Info</button>
                    </>
                  )}
                  {activeTab === 'Active Payments' && (
                    <>
                      <button className="primary-btn small" onClick={() => toast('Payment confirmed', 'success')}>Confirm Payments</button>
                    </>
                  )}
                  {activeTab === 'Delivery' && (
                    <>
                      <button className="primary-btn small" onClick={() => toast('Marked as delivered', 'success')}>Mark Delivered</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupBuysAdmin;