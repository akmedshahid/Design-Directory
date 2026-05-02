import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Download, ExternalLink, Zap, AlertCircle, FileText, Settings, ShieldCheck, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { Button } from '../components/Button';
import './Billing.css';

const Billing = () => {
  const { user, getDownloadLimit, updateMembership } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCancelling, setIsCancelling] = useState(false);

  const limit = getDownloadLimit();
  const used = user?.membership?.downloadsUsedToday || 0;
  const percentage = limit > 0 ? Math.min(Math.round((used / limit) * 100), 100) : 0;
  const plan = user?.membership?.plan || 'None';
  const status = user?.membership?.status || 'active';

  // Circular progress math
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleCancelPlan = () => {
    updateMembership({ status: 'cancelled' });
    setIsCancelling(false);
    toast('Your membership has been cancelled.', 'info');
  };

  if (plan === 'None' || status === 'cancelled') {
    return (
      <div className="page-container flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
          <Zap size={32} className="text-white/40" />
        </div>
        <h1 className="text-3xl font-bold mb-4">No Active Membership</h1>
        <p className="text-secondary text-lg mb-8">
          You currently do not have an active membership plan. Upgrade to unlock full access to the Great Hall, higher daily limits, and premium resources.
        </p>
        <Link to="/app/membership"><Button variant="primary" size="lg">View Membership Plans</Button></Link>
      </div>
    );
  }

  return (
    <div className="page-container billing-dashboard-page">
      <div className="billing-header">
        <h1>Membership & Billing</h1>
        <p>Manage your plan, limits, and payment methods.</p>
      </div>

      <div className="billing-layout">
        
        {/* Left Col: Usage & Plan Details */}
        <div className="billing-main-col">
          
          <div className="billing-card highlight">
            <div className="plan-overview-area">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Current Plan</div>
                <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  {plan} 
                  <span className="status-badge active"><ShieldCheck size={14} /> Active</span>
                </h2>
                <p className="text-secondary mb-6">
                  {user?.membership?.billingCycle === 'yearly' ? 'Billed annually' : 'Billed monthly'}. Next charge on Oct 14, 2026.
                </p>
                
                <div className="flex gap-3">
                  <Link to="/app/membership"><Button variant="primary" size="sm">Change Plan</Button></Link>
                  <Button variant="secondary" size="sm" onClick={() => setIsCancelling(true)}>Cancel</Button>
                </div>
              </div>

              <div className="usage-ring-container">
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <circle
                    className="usage-ring-bg"
                    cx="80" cy="80" r={radius}
                  />
                  <circle
                    className="usage-ring-progress"
                    cx="80" cy="80" r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <div className="usage-ring-content">
                  <span className="usage-num">{limit - used}</span>
                  <span className="usage-label">left today</span>
                </div>
              </div>
            </div>
            
            <hr className="gh-divider my-6 opacity-20" />
            
            <div className="usage-details-footer">
              <div className="flex items-center gap-2 text-sm text-secondary">
                <AlertCircle size={16} /> Limit resets automatically at midnight UTC.
              </div>
              <Link to="/app/membership" className="text-sm text-accent hover:underline font-medium">
                Need more? Upgrade plan
              </Link>
            </div>
          </div>

          <div className="billing-card">
            <h3 className="card-title">Payment Method</h3>
            <div className="payment-method-row">
              <div className="cc-icon-box">
                <CreditCard size={24} />
              </div>
              <div className="cc-details">
                <div className="cc-num">•••• •••• •••• 4242</div>
                <div className="cc-expiry">Expires 12/28</div>
              </div>
              <div className="ml-auto"><Button variant="secondary" size="sm">Update</Button></div>
            </div>
          </div>

        </div>

        {/* Right Col: Invoices & Quick Links */}
        <div className="billing-sidebar-col">
          
          <div className="billing-card">
            <h3 className="card-title mb-4">Billing History</h3>
            <div className="invoice-list">
              {[
                { date: 'Sep 14, 2026', amount: plan === 'Patron' ? '$79.00' : '$29.00', status: 'Paid', id: 'INV-2049' },
                { date: 'Aug 14, 2026', amount: plan === 'Patron' ? '$79.00' : '$29.00', status: 'Paid', id: 'INV-1928' },
                { date: 'Jul 14, 2026', amount: plan === 'Patron' ? '$79.00' : '$29.00', status: 'Paid', id: 'INV-1804' },
              ].map(inv => (
                <div key={inv.id} className="invoice-item">
                  <div className="inv-left">
                    <FileText size={16} className="text-muted" />
                    <div>
                      <div className="inv-date">{inv.date}</div>
                      <div className="inv-id">{inv.id}</div>
                    </div>
                  </div>
                  <div className="inv-right">
                    <span className="inv-amount">{inv.amount}</span>
                    <button className="icon-btn text-muted hover:text-white" title="Download PDF"><Download size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-links-list mt-6">
            <a href="#" className="quick-link-item">
              <Settings size={18} />
              <span>Billing Settings</span>
            </a>
            <a href="#" className="quick-link-item">
              <HelpCircle size={18} />
              <span>Contact Billing Support</span>
              <ExternalLink size={14} className="ml-auto" />
            </a>
          </div>

        </div>
      </div>

      {isCancelling && (
        <div className="gh-modal-overlay">
          <div className="gh-modal-content locked-state">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Cancel Membership?</h2>
            <p className="text-secondary text-center mb-6">
              If you cancel now, you will lose access to all Great Hall privileges and premium limits immediately. Are you sure?
            </p>
            <div className="flex gap-4 w-full">
              <Button variant="secondary" fullWidth onClick={() => setIsCancelling(false)}>Nevermind</Button>
              <Button variant="danger" fullWidth onClick={handleCancelPlan}>
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
