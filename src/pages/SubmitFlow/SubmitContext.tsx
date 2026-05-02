import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Resource } from '../../data';

export type SubmitState = Partial<Resource> & {
  submissionType?: string;
  packageContents?: string[];
  requiresAccount?: string;
  gallery?: string[];
};

interface SubmitContextType {
  data: SubmitState;
  updateData: (updates: Partial<SubmitState>) => void;
  currentStep: number;
  setCurrentStep: (step: number | ((s: number) => number)) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  validateCurrentStep: () => boolean;
}

const SubmitContext = createContext<SubmitContextType | undefined>(undefined);

const defaultState: SubmitState = {
  submissionType: 'Full resource',
  title: '',
  description: '',
  longDescription: '',
  sourceUrl: '',
  creator: '',
  category: 'Mockups',
  subcategory: '',
  priceType: 'Free',
  price: 0,
  license: 'Personal',
  commercialUse: 'Unknown',
  attributionRequired: 'Unknown',
  difficulty: 'All Levels',
  resourceType: 'Asset',
  tools: [],
  fileTypes: [],
  tags: [],
  fileSize: '',
  version: '1.0.0',
  thumbnailStyle: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  useCases: [],
  limitations: [],
  pros: [],
  cons: [],
  usageTips: [],
  packageContents: [] as any,
  gallery: [],
};

export const SubmitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SubmitState>(() => {
    const saved = localStorage.getItem('submitDraft');
    if (saved) {
      try {
        return { ...defaultState, ...JSON.parse(saved) };
      } catch (e) {}
    }
    return defaultState;
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    localStorage.setItem('submitDraft', JSON.stringify(data));
  }, [data]);

  const updateData = (updates: Partial<SubmitState>) => {
    setData(prev => ({ ...prev, ...updates }));
    // Clear errors for fields being updated
    const newErrors = { ...errors };
    Object.keys(updates).forEach(k => delete newErrors[k]);
    setErrors(newErrors);
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};
    
    // Step validation logic mapping
    if (currentStep === 0) {
      if (!data.submissionType) newErrors.submissionType = 'Submission type is required';
    }
    if (currentStep === 1) {
      if (!data.title?.trim()) newErrors.title = 'Title is required';
      if (!data.description?.trim()) newErrors.description = 'Short description is required';
      if (data.submissionType !== 'Draft' && !data.sourceUrl?.trim()) newErrors.sourceUrl = 'Source URL is required';
    }
    if (currentStep === 2) {
      if (!data.creator?.trim()) newErrors.creator = 'Creator is required';
    }
    if (currentStep === 3) {
      if (!data.category) newErrors.category = 'Category is required';
      if (!data.subcategory) newErrors.subcategory = 'Subcategory is required';
    }
    if (currentStep === 4) {
      if (!data.priceType) newErrors.priceType = 'Price type is required';
    }
    if (currentStep === 5) {
      if (!data.license) newErrors.license = 'License is required';
    }
    if (currentStep === 8) {
      if (!data.thumbnailStyle) newErrors.thumbnailStyle = 'Thumbnail style is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <SubmitContext.Provider value={{ data, updateData, currentStep, setCurrentStep, errors, setErrors, validateCurrentStep }}>
      {children}
    </SubmitContext.Provider>
  );
};

export const useSubmit = () => {
  const context = useContext(SubmitContext);
  if (!context) throw new Error('useSubmit must be used within a SubmitProvider');
  return context;
};
