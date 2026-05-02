import React, { useState } from 'react';
import { SubmitProvider, useSubmit } from './SubmitFlow/SubmitContext';
import { ChevronRight, ChevronLeft, UploadCloud, Save } from 'lucide-react';
import ResourceCard from '../components/ResourceCard';
import type { Resource } from '../data';
import { useToast } from '../components/Toast';

import { Step1Type, Step2Basics, Step3Source, Step4Category, Step5Pricing } from './SubmitFlow/Steps1_5';
import { Step6License, Step7Compatibility, Step8Files, Step9Preview, Step10UseCases } from './SubmitFlow/Steps6_10';
import { Step11Quality, Step12Strengths, Step13Tags, Step14Review, Step15Success } from './SubmitFlow/Steps11_15';

import './Submit.css';
import './SubmitFlow/components/SubmitComponents.css';

const STEPS_CONFIG = [
  { label: 'Type', component: Step1Type },
  { label: 'Basics', component: Step2Basics },
  { label: 'Source', component: Step3Source },
  { label: 'Category', component: Step4Category },
  { label: 'Pricing', component: Step5Pricing },
  { label: 'License', component: Step6License },
  { label: 'Compatible', component: Step7Compatibility },
  { label: 'Files', component: Step8Files },
  { label: 'Preview', component: Step9Preview },
  { label: 'Use Cases', component: Step10UseCases },
  { label: 'Quality', component: Step11Quality },
  { label: 'Strengths', component: Step12Strengths },
  { label: 'Tags', component: Step13Tags },
  { label: 'Review', component: Step14Review },
  { label: 'Success', component: Step15Success }
];

const SubmitFlowCore = () => {
  const { data, currentStep, setCurrentStep, validateCurrentStep } = useSubmit();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CurrentComponent = STEPS_CONFIG[currentStep]?.component;
  const isSuccessStep = currentStep === STEPS_CONFIG.length - 1;

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < STEPS_CONFIG.length - 2) {
        setCurrentStep(c => c + 1);
      }
    } else {
      toast('Please fix the errors before proceeding.', 'error');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setCurrentStep(STEPS_CONFIG.length - 1); // Go to Success
        localStorage.removeItem('submitDraft'); // Clear draft
        toast('Resource submitted to curation queue!', 'success');
      }, 1500);
    } else {
      toast('Please fix the errors before submitting.', 'error');
    }
  };

  // Build the live preview resource object
  const previewResource: Resource = {
    id: 'preview-id',
    title: data.title || 'Resource Title',
    description: data.description || 'A brief description of this resource goes here. Keep it informative.',
    longDescription: data.longDescription,
    category: data.category || 'Category',
    subcategory: data.subcategory || 'Subcategory',
    tags: data.tags || [],
    creator: data.creator || 'Creator Name',
    sourceName: data.sourceName || 'Source',
    sourceUrl: data.sourceUrl || '#',
    priceType: data.priceType || 'Free',
    price: data.price || 0,
    license: data.license || 'Personal',
    commercialUse: data.commercialUse || 'Unknown',
    attributionRequired: data.attributionRequired || 'Unknown',
    difficulty: data.difficulty || 'All Levels',
    resourceType: data.resourceType || 'Asset',
    fileSize: data.fileSize || 'N/A',
    version: data.version || '1.0.0',
    rating: data.rating || 0,
    qualityScore: data.qualityScore || 0,
    saves: 0,
    dateAdded: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tools: data.tools?.length ? data.tools : ['Figma'],
    fileTypes: data.fileTypes?.length ? data.fileTypes : ['.fig'],
    thumbnailStyle: data.thumbnailStyle || '#1a1a1a',
    isFeatured: false,
    isBookmarked: false,
    isFavorite: false,
    isHandpicked: !!data.isHandpicked,
    isNew: true,
    creatorId: 'mock-id',
    useCases: data.useCases || [],
    relatedResourceIds: []
  };

  if (isSuccessStep) {
    return <CurrentComponent />;
  }

  return (
    <div className="submit-page">
      <div className="submit-header">
        <h1>Submit Resource</h1>
        <p>Help grow the directory by submitting high-quality design assets.</p>
      </div>

      <div className="submit-layout-v2">
        {/* Left Nav Stepper */}
        <div className="submit-left-nav">
          <div className="stepper-vertical">
            {STEPS_CONFIG.slice(0, -1).map((step, idx) => (
              <button 
                key={step.label}
                className={`step-nav-item ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
                onClick={() => {
                  if (idx < currentStep || validateCurrentStep()) setCurrentStep(idx);
                }}
              >
                <div className="step-nav-dot"></div>
                <span>{step.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center Form */}
        <div className="submit-form-container-v2">
          {CurrentComponent && <CurrentComponent />}
          
          <div className="form-actions-v2">
            {currentStep > 0 ? (
              <button className="action-btn" onClick={handlePrev}><ChevronLeft size={16} /> Back</button>
            ) : (
              <button className="action-btn icon-text-btn" onClick={() => toast('Draft saved to local storage.', 'info')}><Save size={16} /> Save Draft</button>
            )}
            
            {currentStep < STEPS_CONFIG.length - 2 ? (
              <button className="action-btn primary-btn" onClick={handleNext}>Next <ChevronRight size={16} /></button>
            ) : (
              <button className="action-btn primary-btn submit-btn" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : <><UploadCloud size={16} /> Submit for Review</>}
              </button>
            )}
          </div>
        </div>

        {/* Right Live Preview */}
        <div className="submit-preview-container-v2">
          <div className="preview-sticky">
            <div className="preview-header-meta">
              <span className="phm-label">Live Card Preview</span>
              <span className="phm-pct">{Math.min(100, Math.round(((currentStep + 1) / 14) * 100))}% Complete</span>
            </div>
            <div className="preview-card-wrapper" style={{ pointerEvents: 'none' }}>
              <ResourceCard resource={previewResource} viewMode="grid" />
            </div>
            
            <div className="preview-summary-mini mt-3">
              <div className="psm-row"><span>Tools</span> {data.tools?.length || 0}</div>
              <div className="psm-row"><span>Files</span> {data.fileTypes?.length || 0}</div>
              <div className="psm-row"><span>Pros/Cons</span> {(data.pros?.length || 0) + (data.cons?.length || 0)}</div>
              <div className="psm-row"><span>Tags</span> {data.tags?.length || 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Submit = () => {
  return (
    <SubmitProvider>
      <SubmitFlowCore />
    </SubmitProvider>
  );
};

export default Submit;
