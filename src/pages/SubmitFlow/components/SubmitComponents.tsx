import React, { useState, useRef, useEffect } from 'react';
import { X, Search, ChevronDown, Check } from 'lucide-react';
import './SubmitComponents.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
}

export const PremiumInput: React.FC<InputProps> = ({ label, error, helperText, maxLength, className = '', ...props }) => {
  return (
    <div className={`premium-field ${error ? 'has-error' : ''} ${className}`}>
      <label className="premium-label">
        {label}
        {props.required && <span className="req">*</span>}
      </label>
      <div className="premium-input-wrap">
        <input className="premium-input" {...props} />
        {maxLength && <span className="char-count">{String(props.value || '').length}/{maxLength}</span>}
      </div>
      {error && <div className="premium-error">{error}</div>}
      {helperText && !error && <div className="premium-helper">{helperText}</div>}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const PremiumTextarea: React.FC<TextareaProps> = ({ label, error, helperText, className = '', ...props }) => {
  return (
    <div className={`premium-field ${error ? 'has-error' : ''} ${className}`}>
      <label className="premium-label">
        {label}
        {props.required && <span className="req">*</span>}
      </label>
      <textarea className="premium-textarea" {...props} />
      {error && <div className="premium-error">{error}</div>}
      {helperText && !error && <div className="premium-helper">{helperText}</div>}
    </div>
  );
};

interface SelectProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  error?: string;
  required?: boolean;
}

export const PremiumSelect: React.FC<SelectProps> = ({ label, value, onChange, options, error, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className={`premium-field ${error ? 'has-error' : ''}`} ref={ref}>
      <label className="premium-label">{label} {required && <span className="req">*</span>}</label>
      <div className={`premium-select ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className={value ? 'val' : 'placeholder'}>{value || 'Select an option'}</span>
        <ChevronDown size={14} />
      </div>
      {isOpen && (
        <div className="premium-dropdown slide-in">
          {options.map(opt => (
            <div 
              key={opt} 
              className={`dropdown-opt ${value === opt ? 'selected' : ''}`}
              onClick={() => { onChange(opt); setIsOpen(false); }}
            >
              {opt} {value === opt && <Check size={14} />}
            </div>
          ))}
        </div>
      )}
      {error && <div className="premium-error">{error}</div>}
    </div>
  );
};

export const SegmentedControl: React.FC<{ label?: string, options: string[], value: string, onChange: (v: string) => void }> = ({ label, options, value, onChange }) => (
  <div className="premium-field">
    {label && <label className="premium-label">{label}</label>}
    <div className="premium-segmented">
      {options.map(opt => (
        <button 
          key={opt} 
          type="button"
          className={`seg-btn ${value === opt ? 'active' : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export const TagInput: React.FC<{ label: string, tags: string[], onChange: (tags: string[]) => void, suggestions?: string[] }> = ({ label, tags, onChange, suggestions = [] }) => {
  const [val, setVal] = useState('');
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const t = val.trim().replace(/^,+|,+$/g, '');
      if (t && !tags.includes(t)) {
        onChange([...tags, t]);
        setVal('');
      }
    } else if (e.key === 'Backspace' && !val && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (t: string) => onChange(tags.filter(x => x !== t));

  return (
    <div className="premium-field">
      <label className="premium-label">{label}</label>
      <div className="premium-tag-input">
        {tags.map(t => (
          <span key={t} className="tag-chip">
            {t} <button onClick={() => removeTag(t)}><X size={12} /></button>
          </span>
        ))}
        <input 
          value={val} 
          onChange={e => setVal(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder={tags.length === 0 ? "Type and press Enter..." : ""} 
        />
      </div>
      {suggestions.length > 0 && (
        <div className="tag-suggestions">
          {suggestions.filter(s => !tags.includes(s)).slice(0, 5).map(s => (
            <button key={s} className="suggest-chip" onClick={() => onChange([...tags, s])}>+ {s}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export const RepeaterList: React.FC<{ label: string, items: string[], onChange: (items: string[]) => void, placeholder?: string }> = ({ label, items, onChange, placeholder = "Add item..." }) => {
  const [val, setVal] = useState('');

  const handleAdd = () => {
    if (val.trim()) {
      onChange([...items, val.trim()]);
      setVal('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div className="premium-field">
      <label className="premium-label">{label}</label>
      <div className="repeater-list">
        {items.map((item, idx) => (
          <div key={idx} className="repeater-item">
            <span>{item}</span>
            <button onClick={() => remove(idx)}><X size={14} /></button>
          </div>
        ))}
        <div className="repeater-input-row">
          <input 
            value={val} 
            onChange={e => setVal(e.target.value)} 
            onKeyDown={handleKeyDown} 
            placeholder={placeholder} 
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
};
