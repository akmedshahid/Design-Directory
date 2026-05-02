import React from 'react';
import { useSubmit } from './SubmitContext';
import { PremiumInput, PremiumTextarea, PremiumSelect, SegmentedControl, TagInput, RepeaterList } from './components/SubmitComponents';
import { categories, tree } from '../../data';
import { Layers, Link, User, Box, Type, PenTool } from 'lucide-react';

export const Step1Type = () => {
  const { data, updateData, errors } = useSubmit();

  const types = [
    { id: 'Full resource', icon: <Box size={24} />, desc: 'A complete design asset or tool.' },
    { id: 'Quick link', icon: <Link size={24} />, desc: 'A link to an external resource or inspiration.' },
    { id: 'Source/creator profile', icon: <User size={24} />, desc: 'A portfolio, agency, or creator profile.' },
    { id: 'Collection candidate', icon: <Layers size={24} />, desc: 'Suggesting a group of related resources.' },
  ];

  return (
    <div className="form-step slide-in">
      <h2>Submission Type</h2>
      <p className="step-desc">What kind of resource are you submitting today?</p>
      
      <div className="type-cards">
        {types.map(t => (
          <div 
            key={t.id}
            className={`type-card ${data.submissionType === t.id ? 'active' : ''}`}
            onClick={() => updateData({ submissionType: t.id })}
          >
            <div className="type-icon">{t.icon}</div>
            <div className="type-text">
              <h4>{t.id}</h4>
              <p>{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {errors.submissionType && <div className="premium-error mt-2">{errors.submissionType}</div>}
    </div>
  );
};

export const Step2Basics = () => {
  const { data, updateData, errors } = useSubmit();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    updateData({ title, slug });
  };

  return (
    <div className="form-step slide-in">
      <h2>Basic Information</h2>
      <p className="step-desc">Core details about the resource.</p>

      <PremiumInput 
        label="Resource Title" 
        value={data.title || ''} 
        onChange={handleTitle} 
        error={errors.title} 
        required 
        maxLength={60}
        placeholder="e.g. Minimal iPhone Mockup" 
      />

      <PremiumInput 
        label="Slug (Auto-generated)" 
        value={data.slug || ''} 
        onChange={e => updateData({ slug: e.target.value })} 
        helperText={`Directory URL: /resource/${data.slug || '...'}`}
      />

      <PremiumTextarea 
        label="Short Description" 
        value={data.description || ''} 
        onChange={e => updateData({ description: e.target.value })} 
        error={errors.description} 
        required 
        rows={2}
        maxLength={160}
        placeholder="1-2 sentences summarizing the resource." 
      />

      <PremiumInput 
        label="Source URL" 
        value={data.sourceUrl || ''} 
        onChange={e => updateData({ sourceUrl: e.target.value })} 
        error={errors.sourceUrl} 
        required={data.submissionType !== 'Draft'}
        placeholder="https://" 
      />

      <PremiumTextarea 
        label="Detailed Description" 
        value={data.longDescription || ''} 
        onChange={e => updateData({ longDescription: e.target.value })} 
        rows={4}
        placeholder="Full description, features, what's included..." 
      />
    </div>
  );
};

export const Step3Source = () => {
  const { data, updateData, errors } = useSubmit();

  return (
    <div className="form-step slide-in">
      <h2>Source & Creator</h2>
      <p className="step-desc">Who made this and where is it from?</p>

      <PremiumInput 
        label="Creator Name" 
        value={data.creator || ''} 
        onChange={e => updateData({ creator: e.target.value, sourceName: data.sourceName || e.target.value })} 
        error={errors.creator} 
        required 
        placeholder="e.g. John Doe, UI8, Framer Team" 
      />

      <PremiumInput 
        label="Source Platform / Name" 
        value={data.sourceName || ''} 
        onChange={e => updateData({ sourceName: e.target.value })} 
        placeholder="e.g. Gumroad, Figma Community" 
      />

      <SegmentedControl 
        label="Source Reliability" 
        value={data.sourceReliability || 'Unknown'} 
        onChange={v => updateData({ sourceReliability: v as any })} 
        options={['High', 'Medium', 'Low', 'Unknown']} 
      />
    </div>
  );
};

export const Step4Category = () => {
  const { data, updateData, errors } = useSubmit();
  const availableSubcategories = data.category ? tree[data.category] || [] : [];

  return (
    <div className="form-step slide-in">
      <h2>Category & Classification</h2>
      <p className="step-desc">Where does this belong in the directory?</p>

      <div className="form-group-row">
        <div className="flex-1">
          <PremiumSelect 
            label="Category" 
            value={data.category || ''} 
            onChange={v => updateData({ category: v, subcategory: '' })} 
            options={categories} 
            error={errors.category} 
            required 
          />
        </div>
        <div className="flex-1">
          <PremiumSelect 
            label="Subcategory" 
            value={data.subcategory || ''} 
            onChange={v => updateData({ subcategory: v })} 
            options={availableSubcategories} 
            error={errors.subcategory} 
            required 
          />
        </div>
      </div>

      <div className="form-group-row">
        <div className="flex-1">
          <PremiumSelect 
            label="Resource Type" 
            value={data.resourceType || 'Asset'} 
            onChange={v => updateData({ resourceType: v })} 
            options={['Asset', 'Tool', 'Template', 'Course', 'Inspiration', 'Book']} 
          />
        </div>
        <div className="flex-1">
          <PremiumSelect 
            label="Difficulty" 
            value={data.difficulty || 'All Levels'} 
            onChange={v => updateData({ difficulty: v })} 
            options={['Beginner', 'Intermediate', 'Advanced', 'Pro', 'All Levels']} 
          />
        </div>
      </div>
    </div>
  );
};

export const Step5Pricing = () => {
  const { data, updateData, errors } = useSubmit();

  return (
    <div className="form-step slide-in">
      <h2>Pricing & Access</h2>
      <p className="step-desc">How much does it cost and how is it accessed?</p>

      <div className="form-group-row">
        <div className="flex-1">
          <PremiumSelect 
            label="Price Type" 
            value={data.priceType || 'Free'} 
            onChange={v => updateData({ priceType: v, price: v === 'Free' ? 0 : data.price })} 
            options={['Free', 'Paid', 'Freemium', 'Unknown']} 
            error={errors.priceType} 
            required 
          />
        </div>
        {data.priceType !== 'Free' && (
          <div className="flex-1">
            <PremiumInput 
              label="Price Amount ($)" 
              type="number" 
              value={data.price || ''} 
              onChange={e => updateData({ price: parseFloat(e.target.value) || 0 })} 
              placeholder="e.g. 49" 
            />
          </div>
        )}
      </div>

      <SegmentedControl 
        label="Requires Account" 
        value={data.requiresAccount || 'No'} 
        onChange={v => updateData({ requiresAccount: v as any })} 
        options={['Yes', 'No', 'Unknown']} 
      />
    </div>
  );
};
