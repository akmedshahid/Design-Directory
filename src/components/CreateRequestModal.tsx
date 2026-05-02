import React, { useState } from 'react';
import { X, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './CreateRequestModal.css';

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const CreateRequestModal: React.FC<CreateRequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { canPostRequests } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    longDesc: '',
    category: 'Mockups',
    priority: 'normal',
    visibility: 'public'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    onSubmit();
  };

  if (!canPostRequests) {
    return (
      <div className="gh-modal-overlay">
        <div className="gh-modal-content locked-state">
          <button className="gh-modal-close" onClick={onClose}><X size={20} /></button>
          <Lock size={48} className="text-muted mb-4" />
          <h2 className="text-xl font-bold mb-2">Posting Locked</h2>
          <p className="text-secondary text-center mb-6">
            You must be a Collector or Patron to post requests in the Great Hall.
          </p>
          <button className="primary-btn w-full justify-center" onClick={() => window.location.href='/app/membership'}>
            Upgrade Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gh-modal-overlay">
      <div className="gh-modal-content">
        <div className="gh-modal-header">
          <h2>Create New Request</h2>
          <button className="gh-modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="gh-modal-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Basics</div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Details</div>
        </div>

        <form onSubmit={handleSubmit} className="gh-modal-body">
          {step === 1 ? (
            <div className="gh-form-step">
              <div className="form-group">
                <label>Request Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Looking for premium dark mode dashboard mockups"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Mockups</option>
                  <option>Typography</option>
                  <option>Design Systems</option>
                  <option>UI Kits</option>
                  <option>Platform Request</option>
                </select>
              </div>
              <div className="form-group">
                <label>Short Description (1-2 sentences)</label>
                <textarea 
                  rows={2}
                  placeholder="Briefly summarize what you are looking for..."
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({...formData, shortDesc: e.target.value})}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="gh-form-step">
              <div className="form-group">
                <label>Detailed Requirements</label>
                <textarea 
                  rows={6}
                  placeholder="Provide context, constraints, examples of what you like, etc."
                  value={formData.longDesc}
                  onChange={(e) => setFormData({...formData, longDesc: e.target.value})}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="form-group flex-1">
                  <label>Priority</label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="form-group flex-1">
                  <label>Visibility</label>
                  <select 
                    value={formData.visibility}
                    onChange={(e) => setFormData({...formData, visibility: e.target.value})}
                  >
                    <option value="public">Public (All Members)</option>
                    <option value="group">Group Only</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </form>

        <div className="gh-modal-footer">
          {step === 1 ? (
            <button 
              className="primary-btn ml-auto" 
              onClick={() => setStep(2)}
              disabled={!formData.title || !formData.shortDesc}
            >
              Next Step
            </button>
          ) : (
            <>
              <button className="secondary-btn" onClick={() => setStep(1)}>Back</button>
              <button 
                className="primary-btn" 
                onClick={handleSubmit}
                disabled={!formData.longDesc}
              >
                <CheckCircle2 size={16} className="mr-1" /> Submit Request
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
