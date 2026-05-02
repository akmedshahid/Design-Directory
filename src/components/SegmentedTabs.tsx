import React, { type ReactNode } from 'react';
import './SegmentedTabs.css';

export interface TabOption<T extends string> {
  id: T;
  label: string;
  icon?: ReactNode;
  count?: number;
}

interface SegmentedTabsProps<T extends string> {
  options: TabOption<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function SegmentedTabs<T extends string>({ 
  options, 
  activeTab, 
  onChange,
  size = 'md' 
}: SegmentedTabsProps<T>) {
  return (
    <div className={`segmented-control size-${size}`}>
      {options.map((option) => {
        const isActive = activeTab === option.id;
        return (
          <button
            key={option.id}
            className={`segment-btn ${isActive ? 'active' : ''}`}
            onClick={() => onChange(option.id)}
            role="tab"
            aria-selected={isActive}
          >
            {option.icon && <span className="segment-icon">{option.icon}</span>}
            <span className="segment-label">{option.label}</span>
            {option.count !== undefined && (
              <span className={`segment-count ${isActive ? 'active' : ''}`}>
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
