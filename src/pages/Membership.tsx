import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, Crown, Download, Search, MessageSquare, Archive, ExternalLink, ArrowRight, Minus } from 'lucide-react';
import { useAuth, type PlanType } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { Button } from '../components/Button';
import './Membership.css';

const Membership = () => {
  const { user, updateMembership } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const currentPlan = user?.membership?.plan || 'None';

  const handleUpgrade = (plan: PlanType) => {
    updateMembership({
      plan,
      billingCycle,
      status: 'active',
      downloadsUsedToday: 0 // Reset on upgrade
    });
    toast(`Successfully activated ${plan} tier!`, 'success');
    navigate('/app/billing');
  };

  const plans = [
    {
      name: 'Member',
      icon: <div className="plan-icon-symbol member">M</div>,
      price: { monthly: 15, yearly: 12 },
      descriptor: 'Entry membership for focused creatives.',
      downloadLimit: 5,
      features: [
        '5 high-res downloads per day',
        'Core access to Resources & Sites',
        'Basic search & filters',
        'Create basic collections',
        'Read-only Great Hall access'
      ],
      unavailable: [
        'Direct messaging',
        'Post Great Hall requests',
        'Premium profile badge'
      ]
    },
    {
      name: 'Collector',
      icon: <div className="plan-icon-symbol collector"><Zap size={16} /></div>,
      price: { monthly: 29, yearly: 24 },
      descriptor: 'Best value. For designers who need constant inspiration.',
      downloadLimit: 25,
      recommended: true,
      features: [
        '25 high-res downloads per day',
        'Full Resources & Sites access',
        'Unlimited large collections',
        'Full Great Hall participation',
        'Direct messaging enabled',
        'Post & answer requests',
        'Collector profile badge'
      ],
      unavailable: [
        'Premium VIP rooms',
        'Concierge support'
      ]
    },
    {
      name: 'Patron',
      icon: <div className="plan-icon-symbol patron"><Crown size={16} /></div>,
      price: { monthly: 79, yearly: 65 },
      descriptor: 'Elite access, highest status, and priority support.',
      downloadLimit: 100,
      features: [
        '100 daily downloads (fair use)',
        'Priority access to new drops',
        'VIP Great Hall spaces',
        'Exclusive premium groups',
        'Patron profile flair',
        'Concierge request priority',
        'Highest support tier'
      ],
      unavailable: []
    }
  ];

  return (
    <div className="page-container membership-page">
      <div className="membership-hero">
        <div className="gh-invite-pill">Invite-Only Membership</div>
        <h1 className="membership-title">Choose your membership.</h1>
        <p className="membership-subtitle">
          Your invited account grants you the ability to unlock our curated vault and private community. Select a tier to begin.
        </p>

        <div className="billing-toggle-wrapper flex justify-center mb-10">
          <div className="segmented-control">
            <button 
              className={`segment ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`segment ${billingCycle === 'yearly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly <span className="text-green-400 ml-1">Save 20%</span>
            </button>
          </div>
        </div>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.name;
          return (
            <div key={plan.name} className={`plan-card ${plan.recommended ? 'recommended' : ''} ${isCurrentPlan ? 'current' : ''}`}>
              {plan.recommended && <div className="recommended-bar">Recommended</div>}
              {isCurrentPlan && <div className="current-plan-bar">Current Plan</div>}
              
              <div className="plan-card-header">
                {plan.icon}
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-descriptor">{plan.descriptor}</div>
              </div>

              <div className="plan-price-area">
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">{billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}</span>
                  <span className="period">/mo</span>
                </div>
                <div className="yearly-billing-note">
                  {billingCycle === 'yearly' ? `Billed $${plan.price.yearly * 12} annually` : 'Billed monthly'}
                </div>
              </div>

              <div className="plan-limit-badge">
                <Download size={14} className="mr-1.5" /> 
                <span><strong>{plan.downloadLimit}</strong> downloads / day</span>
              </div>

              <div className="plan-features-container">
                <ul className="plan-features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <Check size={16} className="feature-check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.unavailable.length > 0 && (
                  <ul className="plan-features unavailable">
                    {plan.unavailable.map((feature, i) => (
                      <li key={i}>
                        <Minus size={16} className="feature-minus" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="plan-action mt-auto pt-6 border-t border-white/5">
                {isCurrentPlan ? (
                  <Button variant="secondary" fullWidth onClick={() => navigate('/app/billing')}>
                    Manage Billing
                  </Button>
                ) : (
                  <Button 
                    variant={plan.recommended ? 'primary' : 'secondary'}
                    fullWidth
                    onClick={() => handleUpgrade(plan.name as PlanType)}
                  >
                    {currentPlan === 'None' ? 'Activate Plan' : 'Select Plan'}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix */}
      <div className="feature-matrix-section">
        <h2 className="matrix-title">Compare all features</h2>
        
        <div className="matrix-table-wrapper">
          <table className="feature-matrix">
            <thead>
              <tr>
                <th>Features</th>
                <th>Member</th>
                <th className="highlight-col">Collector</th>
                <th>Patron</th>
              </tr>
            </thead>
            <tbody>
              <tr className="section-row">
                <td colSpan={4}>Access & Limits</td>
              </tr>
              <tr>
                <td className="feature-name">Daily Downloads</td>
                <td>5 per day</td>
                <td className="highlight-col">25 per day</td>
                <td>100 per day</td>
              </tr>
              <tr>
                <td className="feature-name">Search & Filters</td>
                <td>Basic</td>
                <td className="highlight-col">Advanced</td>
                <td>Advanced + Priority</td>
              </tr>
              <tr>
                <td className="feature-name">Collections</td>
                <td>Basic</td>
                <td className="highlight-col">Unlimited</td>
                <td>Unlimited + Shared</td>
              </tr>

              <tr className="section-row">
                <td colSpan={4}>Great Hall Community</td>
              </tr>
              <tr>
                <td className="feature-name">Room Access</td>
                <td>Read-only Public</td>
                <td className="highlight-col">Public + Topic Rooms</td>
                <td>VIP + All Rooms</td>
              </tr>
              <tr>
                <td className="feature-name">Direct Messaging</td>
                <td className="text-muted"><Minus size={16} className="mx-auto" /></td>
                <td className="highlight-col"><Check size={16} className="mx-auto text-accent" /></td>
                <td><Check size={16} className="mx-auto text-accent" /></td>
              </tr>
              <tr>
                <td className="feature-name">Post Requests</td>
                <td className="text-muted"><Minus size={16} className="mx-auto" /></td>
                <td className="highlight-col"><Check size={16} className="mx-auto text-accent" /></td>
                <td><Check size={16} className="mx-auto text-accent" /></td>
              </tr>
              <tr>
                <td className="feature-name">Profile Badge</td>
                <td className="text-muted">Standard</td>
                <td className="highlight-col text-accent font-medium">Collector</td>
                <td className="text-yellow-500 font-bold">Patron</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="membership-faq">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>How do daily limits work?</h4>
            <p>Your download limit resets every night at midnight UTC. Browsing, bookmarking, and viewing resources does not count against your limit.</p>
          </div>
          <div className="faq-item">
            <h4>Can I change my plan later?</h4>
            <p>Yes, you can upgrade or downgrade at any time. Prorated charges will be applied automatically to your next billing cycle.</p>
          </div>
          <div className="faq-item">
            <h4>What is the Great Hall?</h4>
            <p>The Great Hall is our private community space for discussion, requests, and networking. Higher tiers unlock posting access and direct messaging.</p>
          </div>
          <div className="faq-item">
            <h4>Is this public?</h4>
            <p>No. You can only view this page and activate a plan because you have an invited account. Public signups are permanently closed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
