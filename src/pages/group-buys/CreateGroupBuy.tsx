import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/Toast';
import { ArrowLeft, ArrowRight, ShieldAlert, AlertCircle, CheckCircle2 } from 'lucide-react';
import './CreateGroupBuy.css';

const STEPS = ['Product', 'Reason', 'Pricing', 'License', 'Voting', 'Review'];

const CreateGroupBuy = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    productUrl: '',
    sourceName: '',
    creatorName: '',
    category: 'Design Resource',
    type: 'UI Kit',
    shortDescription: '',
    longDescription: '',
    tags: '',
    originalPrice: '',
    currency: 'USD',
    expectedTotalCost: '',
    shareMethod: 'Equal Split',
    licenseUrl: '',
    termsStatus: 'Needs Review',
    complianceAck: false,
    voteGoal: '10',
    votingDuration: '7',
    visibility: 'Public'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(curr => curr + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.productUrl || !formData.expectedTotalCost) {
      toast('Please fill out all required fields', 'error');
      return;
    }
    if (!formData.complianceAck) {
      toast('You must acknowledge the compliance rules', 'error');
      return;
    }
    
    toast('Group-Buy Request Submitted successfully', 'success');
    navigate('/app/group-buys');
  };

  return (
    <div className="page-container gb-create-page">
      <div className="gb-create-header">
        <h1>Request a Group-Buy</h1>
        <p>Propose a new collective purchase for the community to vote on.</p>
      </div>

      <div className="gb-stepper">
        {STEPS.map((step, idx) => (
          <div key={step} className={`gb-step ${idx === currentStep ? 'active' : idx < currentStep ? 'completed' : ''}`}>
            <div className="gb-step-circle">{idx < currentStep ? <CheckCircle2 size={14} /> : idx + 1}</div>
            <div className="gb-step-label">{step}</div>
            {idx < STEPS.length - 1 && <div className="gb-step-line" />}
          </div>
        ))}
      </div>

      <div className="gb-create-content">
        {currentStep === 0 && (
          <div className="gb-step-form">
            <h2>Product Details</h2>
            <div className="form-group">
              <label>Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Ultimate Framer Bundle" />
            </div>
            <div className="form-group">
              <label>Product URL *</label>
              <input type="url" name="productUrl" value={formData.productUrl} onChange={handleChange} placeholder="https://..." />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Source / Store Name</label>
                <input type="text" name="sourceName" value={formData.sourceName} onChange={handleChange} placeholder="e.g., UI8" />
              </div>
              <div className="form-group">
                <label>Creator Name</label>
                <input type="text" name="creatorName" value={formData.creatorName} onChange={handleChange} placeholder="e.g., John Doe" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option>Design Resource</option>
                  <option>Course</option>
                  <option>Template</option>
                  <option>Tool</option>
                  <option>Software</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option>UI Kit</option>
                  <option>3D Asset</option>
                  <option>Font</option>
                  <option>Subscription</option>
                  <option>Team License</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="gb-step-form">
            <h2>Why are we buying this?</h2>
            <div className="form-group">
              <label>Short Description (1-2 sentences) *</label>
              <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Full Pitch / Use Cases</label>
              <textarea name="longDescription" value={formData.longDescription} onChange={handleChange} rows={4} placeholder="Explain why this is a good group-buy..." />
            </div>
            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Framer, UI, Dark Mode" />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="gb-step-form">
            <h2>Pricing Estimates</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Original Price</label>
                <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Expected Total Cost (Team License) *</label>
                <input type="number" name="expectedTotalCost" value={formData.expectedTotalCost} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select name="currency" value={formData.currency} onChange={handleChange}>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Share Method</label>
              <select name="shareMethod" value={formData.shareMethod} onChange={handleChange}>
                <option>Equal Split</option>
                <option>Tiered Split</option>
                <option>Admin Defined</option>
              </select>
              <p className="form-hint">Equal split will divide the total cost equally among all joined participants.</p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="gb-step-form">
            <h2>License & Legal Review</h2>
            <div className="gb-warning-box">
              <AlertCircle size={20} />
              <div>
                <strong>Strict Rule: No Piracy</strong>
                <p>We only coordinate purchases for items where the license explicitly permits team use, multi-seat allocation, or where we purchase the requisite number of licenses. If a product strictly prohibits sharing, the request will be rejected.</p>
              </div>
            </div>
            
            <div className="form-group" style={{ marginTop: 24 }}>
              <label>License/Terms URL</label>
              <input type="url" name="licenseUrl" value={formData.licenseUrl} onChange={handleChange} placeholder="Link to the product's license page" />
            </div>
            
            <div className="form-group">
              <label>Terms Status</label>
              <select name="termsStatus" value={formData.termsStatus} onChange={handleChange}>
                <option>Needs Review</option>
                <option>Team License Available</option>
                <option>Allows Group Buy</option>
                <option>Contact Seller Required</option>
                <option>Unknown</option>
              </select>
            </div>

            <label className="checkbox-label" style={{ marginTop: 16 }}>
              <input type="checkbox" name="complianceAck" checked={formData.complianceAck} onChange={handleChange} />
              I acknowledge that I am requesting a legitimate multi-seat or team license purchase and not attempting to bypass single-user restrictions.
            </label>
          </div>
        )}

        {currentStep === 4 && (
          <div className="gb-step-form">
            <h2>Voting Setup</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Vote Goal</label>
                <input type="number" name="voteGoal" value={formData.voteGoal} onChange={handleChange} />
                <p className="form-hint">Target votes before admin schedules the buy.</p>
              </div>
              <div className="form-group">
                <label>Voting Duration (Days)</label>
                <select name="votingDuration" value={formData.votingDuration} onChange={handleChange}>
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="30">30 Days</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Visibility</label>
              <select name="visibility" value={formData.visibility} onChange={handleChange}>
                <option>Public (All Members)</option>
                <option>Private (Invite Only)</option>
                <option>Patron Plan Only</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="gb-step-form">
            <h2>Review Request</h2>
            <div className="gb-review-summary">
              <div className="gb-review-row">
                <span>Product</span>
                <strong>{formData.title || 'Untitled'}</strong>
              </div>
              <div className="gb-review-row">
                <span>URL</span>
                <strong>{formData.productUrl || 'None'}</strong>
              </div>
              <div className="gb-review-row">
                <span>Total Cost</span>
                <strong>${formData.expectedTotalCost || '0'} {formData.currency}</strong>
              </div>
              <div className="gb-review-row">
                <span>Compliance</span>
                <strong>{formData.complianceAck ? 'Acknowledged' : 'Missing'}</strong>
              </div>
            </div>
            {!formData.complianceAck && (
              <p style={{ color: '#ef4444', marginTop: 12, fontSize: 14 }}>You must acknowledge the compliance rules on the License step.</p>
            )}
          </div>
        )}

        <div className="gb-create-actions">
          <button className="secondary-btn" onClick={handleBack} disabled={currentStep === 0}>
            <ArrowLeft size={16} /> Back
          </button>
          
          {currentStep === STEPS.length - 1 ? (
            <button className="primary-btn" onClick={handleSubmit}>
              Submit Request <CheckCircle2 size={16} />
            </button>
          ) : (
            <button className="primary-btn" onClick={handleNext}>
              Next <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateGroupBuy;