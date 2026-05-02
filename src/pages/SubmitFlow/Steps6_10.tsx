import React from 'react';
import { useSubmit } from './SubmitContext';
import { PremiumInput, PremiumTextarea, PremiumSelect, SegmentedControl, TagInput, RepeaterList } from './components/SubmitComponents';

export const Step6License = () => {
  const { data, updateData, errors } = useSubmit();

  return (
    <div className="form-step slide-in">
      <h2>License & Usage</h2>
      <p className="step-desc">How can this resource be used?</p>

      <div className="form-group-row">
        <div className="flex-1">
          <PremiumSelect 
            label="License Type" 
            value={data.license || ''} 
            onChange={v => updateData({ license: v })} 
            options={['Personal', 'Commercial', 'Extended', 'Open Source', 'Free for personal use', 'Free for commercial use', 'Unknown']} 
            error={errors.license} 
            required 
          />
        </div>
      </div>

      <SegmentedControl 
        label="Commercial Use Allowed" 
        value={data.commercialUse || 'Unknown'} 
        onChange={v => updateData({ commercialUse: v as any })} 
        options={['Yes', 'No', 'Unknown']} 
      />

      <SegmentedControl 
        label="Attribution Required" 
        value={data.attributionRequired || 'Unknown'} 
        onChange={v => updateData({ attributionRequired: v as any })} 
        options={['Yes', 'No', 'Unknown']} 
      />

      <PremiumTextarea 
        label="License Notes" 
        value={data.licenseNote || ''} 
        onChange={e => updateData({ licenseNote: e.target.value })} 
        placeholder="Any specific license limitations or warnings." 
        rows={2} 
      />
    </div>
  );
};

export const Step7Compatibility = () => {
  const { data, updateData } = useSubmit();

  const toolSuggestions = ['Figma', 'Framer', 'Webflow', 'Photoshop', 'Illustrator', 'Blender', 'Cinema 4D', 'After Effects', 'Notion', 'Spline', 'Rive'];
  const platformSuggestions = ['macOS', 'Windows', 'Web', 'iOS', 'Android', 'Browser', 'Cross-platform'];

  return (
    <div className="form-step slide-in">
      <h2>Compatibility</h2>
      <p className="step-desc">What software or platforms are required?</p>

      <TagInput 
        label="Compatible Tools" 
        tags={data.tools || []} 
        onChange={t => updateData({ tools: t })} 
        suggestions={toolSuggestions} 
      />

      <TagInput 
        label="Platform Compatibility" 
        tags={data.platformCompatibility || []} 
        onChange={t => updateData({ platformCompatibility: t })} 
        suggestions={platformSuggestions} 
      />
    </div>
  );
};

export const Step8Files = () => {
  const { data, updateData } = useSubmit();

  const fileSuggestions = ['.fig', '.psd', '.ai', '.svg', '.png', '.jpg', '.c4d', '.blend', '.zip', '.pdf'];

  return (
    <div className="form-step slide-in">
      <h2>Files & Package Contents</h2>
      <p className="step-desc">What exactly is included in the download?</p>

      <TagInput 
        label="File Types Included" 
        tags={data.fileTypes || []} 
        onChange={t => updateData({ fileTypes: t })} 
        suggestions={fileSuggestions} 
      />

      <div className="form-group-row">
        <div className="flex-1">
          <PremiumInput 
            label="Total File Size" 
            value={data.fileSize || ''} 
            onChange={e => updateData({ fileSize: e.target.value })} 
            placeholder="e.g. 240 MB" 
          />
        </div>
        <div className="flex-1">
          <PremiumInput 
            label="Number of Files" 
            type="number" 
            value={data.numberOfFiles || ''} 
            onChange={e => updateData({ numberOfFiles: parseInt(e.target.value) || undefined })} 
            placeholder="e.g. 12" 
          />
        </div>
      </div>

      <SegmentedControl 
        label="Editable Layers Included" 
        value={data.includedFormats?.includes('Editable') ? 'Yes' : 'No'} 
        onChange={v => {
          const current = data.includedFormats || [];
          if (v === 'Yes' && !current.includes('Editable')) updateData({ includedFormats: [...current, 'Editable'] });
          if (v === 'No') updateData({ includedFormats: current.filter(x => x !== 'Editable') });
        }} 
        options={['Yes', 'No', 'Unknown']} 
      />

      {/* Since data.packageContents might not exist in Resource type, we use a custom field or reuse limitations/usageTips. Wait, let's just assume we added it or we map it. */}
      <RepeaterList 
        label="Package Contents List" 
        items={data.packageContents || []} 
        onChange={items => updateData({ packageContents: items })} 
        placeholder="e.g. 12 Mockup Scenes" 
      />
    </div>
  );
};

export const Step9Preview = () => {
  const { data, updateData, errors } = useSubmit();

  const styles = [
    { bg: '#2563eb', label: 'Blue Default' },
    { bg: '#059669', label: 'Green Emerald' },
    { bg: '#d97706', label: 'Amber Warm' },
    { bg: '#7c3aed', label: 'Purple Royal' },
    { bg: '#db2777', label: 'Pink Vibrant' },
    { bg: '#1a1a1a', label: 'Dark Sleek' },
    { bg: 'hsl(336, 30%, 20%)', label: 'Apparel Dark' },
    { bg: 'hsl(122, 30%, 20%)', label: 'Scene Dark' },
  ];

  return (
    <div className="form-step slide-in">
      <h2>Preview Gallery</h2>
      <p className="step-desc">Define how this resource will look in the directory.</p>

      <div className="premium-field">
        <label className="premium-label">Card Thumbnail Style (Procedural)</label>
        <div className="thumb-picker" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {styles.map(s => (
            <div 
              key={s.bg} 
              className={`thumb-option ${data.thumbnailStyle === s.bg ? 'active' : ''}`}
              style={{ background: s.bg, width: '100%', height: '60px' }}
              title={s.label}
              onClick={() => updateData({ thumbnailStyle: s.bg })}
            />
          ))}
        </div>
        {errors.thumbnailStyle && <div className="premium-error mt-2">{errors.thumbnailStyle}</div>}
      </div>

      <PremiumSelect 
        label="Visual Style Descriptor" 
        value={data.visualStyle || ''} 
        onChange={v => updateData({ visualStyle: v })} 
        options={['Minimal', 'Dark', 'Light', 'Editorial', 'SaaS', 'Luxury', 'Technical', '3D', 'Brutalist', 'Clean']} 
      />
    </div>
  );
};

export const Step10UseCases = () => {
  const { data, updateData } = useSubmit();

  const useCaseSuggestions = ['Client presentations', 'Portfolio visuals', 'Landing pages', 'App mockups', 'Product showcases', 'Brand identity', 'Social content', 'UI exploration', 'Design systems'];

  return (
    <div className="form-step slide-in">
      <h2>Use Cases</h2>
      <p className="step-desc">Where is this resource most useful?</p>

      <TagInput 
        label="Use Cases" 
        tags={data.useCases || []} 
        onChange={t => updateData({ useCases: t })} 
        suggestions={useCaseSuggestions} 
      />

      <RepeaterList 
        label="Best For..." 
        items={data.bestFor || []} 
        onChange={items => updateData({ bestFor: items })} 
        placeholder="e.g. Presenting dark-mode apps" 
      />

      <RepeaterList 
        label="Not Best For..." 
        items={data.notBestFor || []} 
        onChange={items => updateData({ notBestFor: items })} 
        placeholder="e.g. Printing physical posters" 
      />
    </div>
  );
};
