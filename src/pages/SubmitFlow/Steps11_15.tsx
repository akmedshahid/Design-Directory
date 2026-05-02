import React from 'react';
import { useSubmit } from './SubmitContext';
import { PremiumInput, PremiumTextarea, PremiumSelect, SegmentedControl, TagInput, RepeaterList } from './components/SubmitComponents';
import { CheckCircle2, AlertTriangle, ListChecks, ExternalLink } from 'lucide-react';

export const Step11Quality = () => {
  const { data, updateData } = useSubmit();

  return (
    <div className="form-step slide-in">
      <h2>Quality & Curation</h2>
      <p className="step-desc">Internal metadata for directory ranking.</p>

      <div className="form-group-row">
        <div className="flex-1">
          <PremiumInput 
            label="Quality Score (0-100)" 
            type="number" 
            value={data.qualityScore || 0} 
            onChange={e => updateData({ qualityScore: parseInt(e.target.value) || 0 })} 
          />
        </div>
        <div className="flex-1">
          <PremiumInput 
            label="Rating (1-5)" 
            type="number" 
            step="0.1" 
            value={data.rating || 0} 
            onChange={e => updateData({ rating: parseFloat(e.target.value) || 0 })} 
          />
        </div>
      </div>

      <SegmentedControl 
        label="Is Handpicked?" 
        value={data.isHandpicked ? 'Yes' : 'No'} 
        onChange={v => updateData({ isHandpicked: v === 'Yes' })} 
        options={['Yes', 'No']} 
      />

      <SegmentedControl 
        label="Is Verified Source?" 
        value={data.status === 'Verified' ? 'Yes' : 'No'} 
        onChange={v => updateData({ status: v === 'Yes' ? 'Verified' : 'Needs Review' })} 
        options={['Yes', 'No']} 
      />

      <PremiumTextarea 
        label="Editor Note (Internal)" 
        value={data.editorNote || ''} 
        onChange={e => updateData({ editorNote: e.target.value })} 
        rows={2} 
      />
    </div>
  );
};

export const Step12Strengths = () => {
  const { data, updateData } = useSubmit();

  return (
    <div className="form-step slide-in">
      <h2>Strengths & Limitations</h2>
      <p className="step-desc">Pros, cons, and things to watch out for.</p>

      <RepeaterList 
        label="Strengths / Pros" 
        items={data.pros || []} 
        onChange={items => updateData({ pros: items })} 
        placeholder="e.g. Highly organized layers" 
      />

      <RepeaterList 
        label="Limitations / Cons" 
        items={data.cons || []} 
        onChange={items => updateData({ cons: items })} 
        placeholder="e.g. Huge file size" 
      />

      <RepeaterList 
        label="Usage Tips / Setup Steps" 
        items={data.usageTips || []} 
        onChange={items => updateData({ usageTips: items })} 
        placeholder="e.g. Install required fonts first" 
      />
    </div>
  );
};

export const Step13Tags = () => {
  const { data, updateData } = useSubmit();
  const suggestions = ['Minimal', 'Dark Mode', 'App', 'Web', 'Illustration', 'SaaS', 'High-Res', 'Vector', 'Components', 'System'];

  return (
    <div className="form-step slide-in">
      <h2>Tags & Metadata</h2>
      <p className="step-desc">Help users find this resource through search.</p>

      <TagInput 
        label="Search Tags" 
        tags={data.tags || []} 
        onChange={t => updateData({ tags: t })} 
        suggestions={suggestions} 
      />
    </div>
  );
};

export const Step14Review = () => {
  const { data, errors } = useSubmit();

  const errCount = Object.keys(errors).length;

  return (
    <div className="form-step slide-in review-step">
      <h2>Final Review</h2>
      <p className="step-desc">Verify the generated resource object before submitting.</p>

      {errCount > 0 && (
        <div className="review-warning">
          <AlertTriangle size={16} />
          <span>There are {errCount} required fields missing. Check the steps with errors.</span>
        </div>
      )}

      <div className="review-meta">
        <div className="rm-row"><span>Type:</span> {data.submissionType}</div>
        <div className="rm-row"><span>Name:</span> {data.title || <span className="req">Missing</span>}</div>
        <div className="rm-row"><span>URL:</span> {data.sourceUrl ? <a href={data.sourceUrl} target="_blank" rel="noreferrer">Open <ExternalLink size={10} /></a> : <span className="req">Missing</span>}</div>
        <div className="rm-row"><span>Category:</span> {data.category || <span className="req">Missing</span>} &gt; {data.subcategory || <span className="req">Missing</span>}</div>
        <div className="rm-row"><span>Creator:</span> {data.creator || <span className="req">Missing</span>}</div>
        <div className="rm-row"><span>Pricing:</span> {data.priceType} {data.price ? `($${data.price})` : ''}</div>
        <div className="rm-row"><span>License:</span> {data.license}</div>
      </div>
      
      <div className="review-meta mt-2">
        <div className="rm-row"><span>Tools:</span> {data.tools?.join(', ') || 'None'}</div>
        <div className="rm-row"><span>Files:</span> {data.fileTypes?.join(', ') || 'None'}</div>
        <div className="rm-row"><span>Tags:</span> {data.tags?.join(', ') || 'None'}</div>
        <div className="rm-row"><span>Style:</span> {data.thumbnailStyle ? 'Procedural CSS' : 'Missing'}</div>
      </div>
    </div>
  );
};

export const Step15Success = () => {
  const { data, setCurrentStep, updateData } = useSubmit();

  const reset = () => {
    updateData({ title: '', sourceUrl: '', description: '', longDescription: '', slug: '', tags: [] });
    setCurrentStep(0);
  };

  return (
    <div className="submit-success slide-in">
      <CheckCircle2 size={64} color="var(--accent-color)" />
      <h2>Submission Received!</h2>
      <p>Thank you for submitting <strong>{data.title}</strong>.</p>
      <p className="success-sub">The curation team will review the resource. It has been added to the pending admin queue.</p>
      
      <div className="success-actions">
        <button className="action-btn primary-btn" onClick={reset}>Submit Another Resource</button>
        <button className="action-btn" onClick={() => window.location.href = '/app'}>Back to Directory</button>
      </div>
    </div>
  );
};
