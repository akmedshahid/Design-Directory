import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Crown, X, Lock } from 'lucide-react';
import { useAuth, PLAN_LIMITS } from '../context/AuthContext';
import './PaywallModal.css';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaywallModal = ({ isOpen, onClose }: PaywallModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!isOpen || !user) return null;

  const currentPlan = user.membership.plan;
  const limit = PLAN_LIMITS[currentPlan];

  return (
    <div className="paywall-overlay" onClick={onClose}>
      <div className="paywall-modal" onClick={e => e.stopPropagation()}>
        <button className="paywall-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="paywall-icon-container">
          <div className="paywall-icon-bg">
            <Lock size={32} className="text-accent" />
          </div>
        </div>

        <h2 className="paywall-title">Daily download limit reached</h2>
        
        <p className="paywall-desc">
          You have used all <strong className="text-primary">{limit}</strong> downloads included in your <strong className="text-primary">{currentPlan} Plan</strong> for today.
        </p>

        <div className="paywall-details">
          <div className="flex items-center gap-2 mb-2 text-sm text-secondary">
            <Download size={14} /> Limit resets at midnight UTC.
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Crown size={14} className="text-yellow-500" /> Upgrade to increase your daily allowance.
          </div>
        </div>

        <div className="paywall-actions">
          <button 
            className="primary-btn full-width justify-center"
            onClick={() => {
              onClose();
              navigate('/app/membership');
            }}
          >
            View Upgrade Options
          </button>
          <button className="secondary-btn full-width justify-center mt-3" onClick={onClose}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;
