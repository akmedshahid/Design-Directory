import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sitesCategories, sitesTree } from '../sitesData';
import { useToast } from '../components/Toast';
import { Globe, Link as LinkIcon, ShieldAlert, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import './SubmitSite.css';

const STEPS = ['Basics', 'Category', 'Access', 'Credentials', 'Review'];

const SubmitSite = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    shortDescription: '',
    category: '',
    subcategory: '',
    accessType: 'Free',
    hasCredentials: false,
    username: '',
    password: '',
    notes: ''
  });

  const updateForm = (key: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(curr => curr + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast('Site submitted successfully!', 'success');
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="ss-step-content">
            <h2 className="ss-step-title">Site Basics</h2>
            <div className="ss-form-group">
              <label>Site Name</label>
              <input type="text" value={formData.name} onChange={e => updateForm('name', e.target.value)} placeholder="e.g. Figma Community" required />
            </div>
            <div className="ss-form-group">
              <label>URL</label>
              <div className="ss-input-with-icon">
                <LinkIcon size={16} />
                <input type="url" value={formData.url} onChange={e => updateForm('url', e.target.value)} placeholder="https://" required />
              </div>
            </div>
            <div className="ss-form-group">
              <label>Short Description</label>
              <textarea value={formData.shortDescription} onChange={e => updateForm('shortDescription', e.target.value)} placeholder="What is this site used for?" rows={3} required />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="ss-step-content">
            <h2 className="ss-step-title">Category & Purpose</h2>
            <div className="ss-form-group">
              <label>Category</label>
              <select value={formData.category} onChange={e => {
                updateForm('category', e.target.value);
                updateForm('subcategory', '');
              }}>
                <option value="">Select Category...</option>
                {sitesCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            {formData.category && (
              <div className="ss-form-group">
                <label>Subcategory</label>
                <select value={formData.subcategory} onChange={e => updateForm('subcategory', e.target.value)}>
                  <option value="">Select Subcategory...</option>
                  {(sitesTree[formData.category] || []).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="ss-step-content">
            <h2 className="ss-step-title">Access Details</h2>
            <div className="ss-form-group">
              <label>Access Type</label>
              <select value={formData.accessType} onChange={e => updateForm('accessType', e.target.value)}>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
                <option value="Freemium">Freemium</option>
                <option value="Subscription">Subscription</option>
                <option value="Account Required">Account Required</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="ss-step-content">
            <h2 className="ss-step-title">Login Credentials</h2>
            <div className="ss-warning-box">
              <ShieldAlert size={16} />
              <span>Passwords will be masked in the UI and require explicit action to reveal. Never store critical primary passwords here.</span>
            </div>
            
            <div className="ss-toggle-group">
              <label className="ss-toggle-label">
                <input type="checkbox" checked={formData.hasCredentials} onChange={e => updateForm('hasCredentials', e.target.checked)} />
                <span className="ss-toggle-text">This site requires login</span>
              </label>
            </div>

            {formData.hasCredentials && (
              <div className="ss-credentials-form">
                <div className="ss-form-group">
                  <label>Username / Email</label>
                  <input type="text" value={formData.username} onChange={e => updateForm('username', e.target.value)} placeholder="Email or Username" />
                </div>
                <div className="ss-form-group">
                  <label>Password (Masked)</label>
                  <input type="password" value={formData.password} onChange={e => updateForm('password', e.target.value)} placeholder="••••••••••••" />
                </div>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="ss-step-content">
            <h2 className="ss-step-title">Review & Submit</h2>
            <div className="ss-review-grid">
              <div className="ss-review-item">
                <span className="ss-review-label">Name</span>
                <span className="ss-review-value">{formData.name || '-'}</span>
              </div>
              <div className="ss-review-item">
                <span className="ss-review-label">URL</span>
                <span className="ss-review-value">{formData.url || '-'}</span>
              </div>
              <div className="ss-review-item">
                <span className="ss-review-label">Category</span>
                <span className="ss-review-value">{formData.category} &rsaquo; {formData.subcategory}</span>
              </div>
              <div className="ss-review-item">
                <span className="ss-review-label">Access</span>
                <span className="ss-review-value">{formData.accessType}</span>
              </div>
              <div className="ss-review-item">
                <span className="ss-review-label">Credentials</span>
                <span className="ss-review-value">{formData.hasCredentials ? `Yes (${formData.username})` : 'No'}</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="submit-site-page centered">
        <div className="ss-success-card">
          <CheckCircle size={48} className="text-success ss-success-icon" />
          <h2>Site Added Successfully</h2>
          <p>Your site has been added to the vault and is now available in the directory.</p>
          <div className="ss-success-actions">
            <button className="btn-primary" onClick={() => navigate('/app/sites')}>View Directory</button>
            <button className="btn-secondary" onClick={() => {
              setIsSuccess(false);
              setCurrentStep(0);
              setFormData({name:'', url:'', shortDescription:'', category:'', subcategory:'', accessType:'Free', hasCredentials:false, username:'', password:'', notes:''});
            }}>Add Another Site</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="submit-site-page">
      <div className="ss-header">
        <div className="ss-header-icon"><Globe size={24} /></div>
        <div className="ss-header-text">
          <h1>Add Site to Vault</h1>
          <p>Submit a new tool, portal, or useful reference.</p>
        </div>
      </div>

      <div className="ss-layout">
        <div className="ss-sidebar">
          <ul className="ss-steps-list">
            {STEPS.map((step, idx) => (
              <li key={step} className={`ss-step-item ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}>
                <div className="ss-step-indicator">{idx < currentStep ? <CheckCircle size={14} /> : idx + 1}</div>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ss-main">
          <div className="ss-form-container">
            {renderStepContent()}
          </div>

          <div className="ss-footer-actions">
            <button className="btn-secondary" onClick={handlePrev} disabled={currentStep === 0 || isSubmitting}>
              <ChevronLeft size={16} /> Back
            </button>
            
            {currentStep < STEPS.length - 1 ? (
              <button className="btn-primary" onClick={handleNext}>
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Site'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitSite;
