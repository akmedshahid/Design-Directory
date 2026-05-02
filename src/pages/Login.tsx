import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Shield, ShieldAlert, Key, X, Check, Search, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/app';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setShake(false);

    if (!identifier) {
      triggerError('Enter your username or email.');
      return;
    }
    if (!password) {
      triggerError('Enter your password.');
      return;
    }

    setIsLoading(true);

    // Mock authentication
    setTimeout(() => {
      const isInvited = (identifier.toLowerCase() === 'invited' || identifier.toLowerCase() === 'invite@designvault.local') && password === 'vault-demo';
      const isCurator = identifier.toLowerCase() === 'curator' && password === 'curator-demo';

      if (isInvited || isCurator) {
        login({
          id: isCurator ? 'u-curator' : 'u-invited',
          username: isCurator ? 'curator' : 'invited',
          email: isCurator ? 'curator@designvault.local' : 'invite@designvault.local',
          role: isCurator ? 'Curator' : 'Invited Member',
          membership: {
            plan: 'None',
            billingCycle: 'monthly',
            status: 'active',
            downloadsUsedToday: 0,
            lastResetDate: new Date().toISOString().split('T')[0]
          }
        });
        
        // After successful login, redirect based on onboarding
        const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted') === 'true';
        if (!hasCompletedOnboarding) {
          navigate('/onboarding', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        triggerError('These credentials do not match an invited account.');
      }
      setIsLoading(false);
    }, 800);
  };

  const triggerError = (msg: string) => {
    setErrorMsg(msg);
    setShake(true);
    setTimeout(() => setShake(false), 400); // Remove class after animation
  };

  // Close modal on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showGuide) {
        setShowGuide(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showGuide]);

  return (
    <div className="login-page">
      <div className={`login-card ${shake ? 'shake' : ''}`}>
        <div className="login-header">
          <div className="login-logo">
            <Shield size={24} strokeWidth={2.5} />
          </div>
          <span className="invite-pill">Invite-only access</span>
          <h1 className="login-title">Access your private directory</h1>
          <p className="login-subtitle">Sign in with the credentials shared through your invite.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {errorMsg && <div className="login-error-msg">{errorMsg}</div>}

          <div className="login-field">
            <label className="login-label">Username or Email</label>
            <div className="login-input-wrapper">
              <Mail size={16} className="login-icon" />
              <input 
                type="text" 
                className="login-input" 
                placeholder="designer@example.com"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                autoComplete="username"
                autoFocus
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label">Password</label>
            <div className="login-input-wrapper">
              <Lock size={16} className="login-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                className="login-input" 
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button 
                type="button" 
                className="login-action-btn" 
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                title={showPassword ? "Hide password" : "Reveal password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={e => setRememberMe(e.target.checked)} 
              />
              <div className="custom-checkbox">
                {rememberMe && <Check size={12} strokeWidth={3} />}
              </div>
              <span className="remember-label">Remember me</span>
            </label>
            
            <button type="button" className="invite-link-btn" style={{ fontSize: '13px' }}>
              Forgot access?
            </button>
          </div>

          <button type="submit" className="login-submit" disabled={isLoading}>
            {isLoading ? <div className="spinner" /> : 'Enter Directory'}
          </button>
        </form>

        <div className="login-footer">
          <button type="button" className="invite-link-btn" onClick={() => setShowGuide(true)}>
            Don't have access?
          </button>
          
          <div className="security-note">
            Private invite-only workspace. Access is limited to approved members.
          </div>
          
          {/* Development mock hint */}
          <div className="security-note" style={{ opacity: 0.3, marginTop: -8 }}>
            (Demo: invited / vault-demo)
          </div>
        </div>
      </div>

      {/* Invite Guide Modal */}
      <div className={`invite-modal-overlay ${showGuide ? 'open' : ''}`} onClick={() => setShowGuide(false)}>
        <div className="invite-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={() => setShowGuide(false)}>
            <X size={20} />
          </button>
          
          <h2>Getting access</h2>
          <p>This directory is invite-only. New members can only join through an existing approved member.</p>
          
          <div className="invite-sections">
            <div className="invite-section">
              <Key size={18} className="invite-section-icon" />
              <div>
                <h3>How access works</h3>
                <p>Existing members can invite trusted designers, teammates, or collaborators. Public sign-up is disabled.</p>
              </div>
            </div>
            <div className="invite-section">
              <Search size={18} className="invite-section-icon" />
              <div>
                <h3>How to request an invite</h3>
                <p>Ask an existing member for access, or contact the curator if you were told to join.</p>
              </div>
            </div>
            <div className="invite-section">
              <ShieldAlert size={18} className="invite-section-icon" />
              <div>
                <h3>Why invite-only?</h3>
                <p>Keeps the library curated, protects private saved sites, and ensures a high-quality community.</p>
              </div>
            </div>
          </div>
          
          <div className="invite-modal-footer">
            <button className="btn-understand" onClick={() => setShowGuide(false)}>
              I understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
