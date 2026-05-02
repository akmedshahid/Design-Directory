import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, ChevronRight, ChevronLeft, Compass, Monitor, PenTool, LayoutTemplate, 
  Grid, List, AlignJustify, Briefcase, Zap, Search, Settings, 
  Box, Smartphone, Layers, Edit3, Image, Video, Cpu, Code
} from 'lucide-react';
import './Onboarding.css';

// Types
interface Option {
  id: string;
  title: string;
  desc?: string;
  icon?: React.ReactNode;
}

interface StepData {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  type: 'welcome' | 'single' | 'multiple' | 'review' | 'loading';
  options?: Option[];
  minRequired?: number;
  maxRequired?: number;
}

// Data Definition
const ONBOARDING_STEPS: StepData[] = [
  {
    id: 'welcome',
    eyebrow: 'Private resource setup',
    title: 'Set up your design directory.',
    subtitle: 'Choose what you browse, how you work, and how dense your resource library should feel.',
    type: 'welcome'
  },
  {
    id: 'role',
    eyebrow: 'Profile',
    title: 'What kind of creator are you?',
    subtitle: 'This helps tailor the default directory filters to your expertise.',
    type: 'single',
    options: [
      { id: 'UI/UX Designer', title: 'UI/UX Designer', desc: 'Interfaces, systems, prototypes', icon: <Monitor size={18} /> },
      { id: 'Brand Designer', title: 'Brand Designer', desc: 'Identity, visuals, guidelines', icon: <PenTool size={18} /> },
      { id: 'Web Designer', title: 'Web Designer', desc: 'Websites, landing pages, digital', icon: <LayoutTemplate size={18} /> },
      { id: '3D Designer', title: '3D Designer', desc: 'Assets, scenes, materials', icon: <Box size={18} /> },
      { id: 'Motion Designer', title: 'Motion Designer', desc: 'Animation, interaction, video', icon: <Video size={18} /> },
      { id: 'Developer', title: 'Developer', desc: 'Frontend, fullstack, creative coding', icon: <Code size={18} /> },
      { id: 'Founder', title: 'Founder', desc: 'Startups, product strategy', icon: <Briefcase size={18} /> },
      { id: 'Student', title: 'Student', desc: 'Learning, exploring, building', icon: <Layers size={18} /> },
    ]
  },
  {
    id: 'interests',
    eyebrow: 'Resource Focus',
    title: 'What should your directory prioritize?',
    subtitle: 'Select the primary resource types you use every day.',
    type: 'multiple',
    minRequired: 3,
    options: [
      { id: 'Mockups', title: 'Mockups' }, { id: 'Fonts', title: 'Fonts' }, { id: 'UI Kits', title: 'UI Kits' },
      { id: 'Tools', title: 'Tools' }, { id: 'Templates', title: 'Templates' }, { id: 'Courses', title: 'Courses' },
      { id: 'Books', title: 'Books' }, { id: 'Icons', title: 'Icons' }, { id: '3D Assets', title: '3D Assets' },
      { id: 'Framer', title: 'Framer' }, { id: 'Figma', title: 'Figma' }, { id: 'Webflow', title: 'Webflow' },
      { id: 'Cinema 4D', title: 'Cinema 4D' }, { id: 'Blender', title: 'Blender' }, { id: 'Motion', title: 'Motion' },
      { id: 'Branding', title: 'Branding' }, { id: 'Landing Pages', title: 'Landing Pages' }, { id: 'Design Systems', title: 'Design Systems' }
    ]
  },
  {
    id: 'tools',
    eyebrow: 'Workflow',
    title: 'Which tools should feel closest?',
    subtitle: 'Select the software you actively design and build with.',
    type: 'multiple',
    minRequired: 1,
    options: [
      { id: 'Figma', title: 'Figma' }, { id: 'Framer', title: 'Framer' }, { id: 'Webflow', title: 'Webflow' },
      { id: 'Photoshop', title: 'Photoshop' }, { id: 'Illustrator', title: 'Illustrator' }, { id: 'Blender', title: 'Blender' },
      { id: 'Cinema 4D', title: 'Cinema 4D' }, { id: 'After Effects', title: 'After Effects' }, { id: 'Notion', title: 'Notion' },
      { id: 'Spline', title: 'Spline' }, { id: 'Rive', title: 'Rive' }, { id: 'Sketch', title: 'Sketch' },
      { id: 'Principle', title: 'Principle' }, { id: 'Lottie', title: 'Lottie' }
    ]
  },
  {
    id: 'currentWork',
    eyebrow: 'Current Work',
    title: 'What are you building right now?',
    subtitle: 'Your directory can emphasize resources relevant to your active project.',
    type: 'single',
    options: [
      { id: 'Portfolio', title: 'Portfolio', desc: 'Showcasing your best work' },
      { id: 'SaaS', title: 'SaaS', desc: 'Web application interface' },
      { id: 'Landing Page', title: 'Landing Page', desc: 'Marketing and conversion' },
      { id: 'Client Project', title: 'Client Project', desc: 'Agency or freelance work' },
      { id: 'Brand Identity', title: 'Brand Identity', desc: 'Logos, systems, print' },
      { id: 'Mobile App', title: 'Mobile App', desc: 'iOS, Android, cross-platform' },
      { id: '3D Product', title: '3D Product', desc: 'Renders, materials, models' },
      { id: 'Social Content', title: 'Social Content', desc: 'Templates, posts, carousels' },
      { id: 'Design System', title: 'Design System', desc: 'Tokens, components, docs' },
      { id: 'Presentation', title: 'Presentation', desc: 'Pitch decks, slides' },
      { id: 'Course / Education', title: 'Course / Education', desc: 'Learning a new skill' },
    ]
  },
  {
    id: 'style',
    eyebrow: 'Style Preference',
    title: 'What visual language do you prefer?',
    subtitle: 'We will highlight resources that match your aesthetic taste.',
    type: 'multiple',
    minRequired: 1,
    options: [
      { id: 'Minimal', title: 'Minimal', icon: <div className="style-cue minimal"></div> },
      { id: 'Apple-like', title: 'Apple-like', icon: <div className="style-cue apple"></div> },
      { id: 'Luxury', title: 'Luxury', icon: <div className="style-cue luxury"></div> },
      { id: 'Editorial', title: 'Editorial', icon: <div className="style-cue editorial">T</div> },
      { id: 'SaaS', title: 'SaaS', icon: <div className="style-cue saas"></div> },
      { id: 'Dark', title: 'Dark', icon: <div className="style-cue dark"></div> },
      { id: 'Clean', title: 'Clean', icon: <div className="style-cue clean"></div> },
      { id: 'Brutalist', title: 'Brutalist', icon: <div className="style-cue brutalist"></div> },
      { id: '3D', title: '3D', icon: <div className="style-cue threed"></div> },
      { id: 'Playful', title: 'Playful', icon: <div className="style-cue playful"></div> },
      { id: 'Technical', title: 'Technical', icon: <div className="style-cue technical"></div> },
      { id: 'Futuristic', title: 'Futuristic', icon: <div className="style-cue futuristic"></div> },
    ]
  },
  {
    id: 'pricing',
    eyebrow: 'Pricing Preference',
    title: 'What kind of resources should be prioritized?',
    subtitle: 'We respect your budget constraints.',
    type: 'single',
    options: [
      { id: 'Free', title: 'Free resources', desc: '100% free, no cost', icon: <div className="badge-preview free">Free</div> },
      { id: 'Paid', title: 'Paid resources', desc: 'Premium, high-quality only', icon: <div className="badge-preview paid">Paid</div> },
      { id: 'Freemium', title: 'Freemium resources', desc: 'Free with paid upgrades', icon: <div className="badge-preview freemium">Freemium</div> },
      { id: 'Everything', title: 'Everything', desc: 'Show all resources equally', icon: <div className="badge-preview all">All</div> },
    ]
  },
  {
    id: 'browsing',
    eyebrow: 'Browsing Preference',
    title: 'How do you prefer to browse?',
    subtitle: 'This will be set as your default layout across the directory.',
    type: 'single',
    options: [
      { id: 'Category Index', title: 'Category Index', desc: 'Sidebar tree with category shelves', icon: <div className="layout-preview index"><div className="lp-side"></div><div className="lp-main"><div className="lp-shelf"></div><div className="lp-shelf"></div></div></div> },
      { id: 'Grid', title: 'Grid', desc: '4 card blocks per row', icon: <div className="layout-preview grid"><div className="lp-card"></div><div className="lp-card"></div><div className="lp-card"></div><div className="lp-card"></div></div> },
      { id: 'List', title: 'List', desc: 'Rows with rich metadata', icon: <div className="layout-preview list"><div className="lp-row"></div><div className="lp-row"></div><div className="lp-row"></div></div> },
      { id: 'Compact', title: 'Compact', desc: 'Dense scanning rows', icon: <div className="layout-preview compact"><div className="lp-crow"></div><div className="lp-crow"></div><div className="lp-crow"></div><div className="lp-crow"></div></div> },
    ]
  },
  {
    id: 'density',
    eyebrow: 'Interface Density',
    title: 'How dense should the interface feel?',
    subtitle: 'Adjust the spacing and padding throughout the application.',
    type: 'single',
    options: [
      { id: 'Comfortable', title: 'Comfortable', desc: 'More breathing room. Ideal for relaxed browsing.' },
      { id: 'Compact', title: 'Compact', desc: 'Balanced scanning. A good middle ground.' },
      { id: 'Ultra Compact', title: 'Ultra Compact', desc: 'Maximum resources on screen. Built for speed.' },
    ]
  },
  {
    id: 'review',
    eyebrow: 'Review',
    title: 'Review your setup.',
    subtitle: 'Confirm your preferences before generating your personalized directory environment.',
    type: 'review'
  },
  {
    id: 'loading',
    type: 'loading',
    title: 'Preparing your directory',
    subtitle: 'Saving preferences, organizing categories, and setting up your browsing experience.'
  }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [loadingPhase, setLoadingPhase] = useState(0);

  const step = ONBOARDING_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === ONBOARDING_STEPS.length - 1;
  const isReview = step.type === 'review';
  const isLoading = step.type === 'loading';

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLoading) return;
      if (e.key === 'Enter' && canContinue) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, answers, isLoading]);

  // Loading animation simulation
  useEffect(() => {
    if (isLoading) {
      let phase = 0;
      const interval = setInterval(() => {
        phase += 1;
        setLoadingPhase(phase);
        if (phase >= 6) {
          clearInterval(interval);
        }
      }, 700);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const toggleOption = (id: string) => {
    const current = answers[step.id] || [];
    if (step.type === 'single') {
      setAnswers({ ...answers, [step.id]: [id] });
    } else if (step.type === 'multiple') {
      if (current.includes(id)) {
        setAnswers({ ...answers, [step.id]: current.filter(x => x !== id) });
      } else {
        setAnswers({ ...answers, [step.id]: [...current, id] });
      }
    }
  };

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const jumpToStep = (id: string) => {
    const index = ONBOARDING_STEPS.findIndex(s => s.id === id);
    if (index !== -1) {
      setDirection(index > currentStep ? 1 : -1);
      setCurrentStep(index);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('onboardingPrefs', JSON.stringify(answers));
    navigate('/app');
  };

  const currentAnswers = answers[step.id] || [];
  let canContinue = true;
  let validationMsg = '';

  if (step.type === 'single') {
    canContinue = currentAnswers.length === 1;
    if (!canContinue) validationMsg = 'Please select an option to continue.';
  } else if (step.type === 'multiple') {
    if (step.minRequired) {
      canContinue = currentAnswers.length >= step.minRequired;
      if (!canContinue) validationMsg = `Select at least ${step.minRequired} to continue.`;
    }
  }

  const progressPercent = (currentStep / (ONBOARDING_STEPS.length - 1)) * 100;

  const renderOptions = () => {
    if (!step.options) return null;
    
    // Determine grid layout based on step id
    let gridClass = "options-grid";
    if (step.id === 'interests' || step.id === 'tools' || step.id === 'style') gridClass = "options-grid chips";
    if (step.id === 'browsing' || step.id === 'density') gridClass = "options-grid cards";

    return (
      <div className={gridClass}>
        {step.options.map(opt => {
          const isSelected = currentAnswers.includes(opt.id);
          return (
            <button
              key={opt.id}
              className={`option-item ${isSelected ? 'selected' : ''} ${step.type === 'single' ? 'single' : 'multiple'}`}
              onClick={() => toggleOption(opt.id)}
              type="button"
            >
              <div className="option-inner">
                {opt.icon && <div className="option-icon">{opt.icon}</div>}
                <div className="option-text">
                  <span className="option-title">{opt.title}</span>
                  {opt.desc && <span className="option-desc">{opt.desc}</span>}
                </div>
                {isSelected && (
                  <div className="option-check">
                    <Check size={14} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderReview = () => {
    return (
      <div className="review-layout">
        <div className="review-groups">
          <div className="review-group">
            <div className="rg-header">
              <h3>Profile</h3>
              <button onClick={() => jumpToStep('role')} className="edit-btn"><Edit3 size={12} /> Edit</button>
            </div>
            <div className="rg-content">
              <span className="review-label">Role</span>
              <div className="review-value">{answers['role']?.[0] || '-'}</div>
              <span className="review-label mt-2">Current Work</span>
              <div className="review-value">{answers['currentWork']?.[0] || '-'}</div>
            </div>
          </div>

          <div className="review-group">
            <div className="rg-header">
              <h3>Resource Focus</h3>
              <button onClick={() => jumpToStep('interests')} className="edit-btn"><Edit3 size={12} /> Edit</button>
            </div>
            <div className="rg-content">
              <span className="review-label">Interests</span>
              <div className="review-chip-list">
                {answers['interests']?.map(i => <span key={i} className="r-chip">{i}</span>) || '-'}
              </div>
              <span className="review-label mt-2">Tools</span>
              <div className="review-chip-list">
                {answers['tools']?.map(t => <span key={t} className="r-chip">{t}</span>) || '-'}
              </div>
            </div>
          </div>

          <div className="review-group">
            <div className="rg-header">
              <h3>Browse Style</h3>
              <button onClick={() => jumpToStep('style')} className="edit-btn"><Edit3 size={12} /> Edit</button>
            </div>
            <div className="rg-content">
              <span className="review-label">Style Pref</span>
              <div className="review-chip-list">
                {answers['style']?.map(s => <span key={s} className="r-chip">{s}</span>) || '-'}
              </div>
              <div className="rg-row mt-2">
                <div>
                  <span className="review-label">Pricing</span>
                  <div className="review-value">{answers['pricing']?.[0] || '-'}</div>
                </div>
                <div>
                  <span className="review-label">Layout</span>
                  <div className="review-value">{answers['browsing']?.[0] || '-'}</div>
                </div>
                <div>
                  <span className="review-label">Density</span>
                  <div className="review-value">{answers['density']?.[0] || '-'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="review-preview">
          <div className="rp-window">
            <div className="rp-header">
              <div className="dots"><span></span><span></span><span></span></div>
            </div>
            <div className="rp-body">
              <div className="rp-sidebar"></div>
              <div className="rp-main">
                <div className="rp-topbar"></div>
                <div className="rp-content">
                  <div className="rp-hero"></div>
                  <div className="rp-grid">
                    <div></div><div></div><div></div><div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="rp-caption">Your personalized directory environment</p>
        </div>
      </div>
    );
  };

  const renderLoading = () => {
    const tasks = [
      'Saving preferences',
      'Prioritizing categories',
      'Preparing resource shelves',
      'Applying density',
      'Setting default browse mode',
      'Opening directory'
    ];

    return (
      <div className="loading-state">
        <div className="loading-spinner-wrap">
          <svg className="circular-loader" viewBox="25 25 50 50">
            <circle className="loader-path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
          <div className="loading-percent">{Math.min(100, Math.round((loadingPhase / 6) * 100))}%</div>
        </div>
        
        <div className="loading-checklist">
          {tasks.map((task, idx) => {
            const isDone = loadingPhase > idx;
            const isActive = loadingPhase === idx;
            return (
              <div key={idx} className={`task-row ${isDone ? 'done' : isActive ? 'active' : 'waiting'}`}>
                <div className="task-icon">
                  {isDone ? <Check size={14} /> : isActive ? <div className="dot-pulse"></div> : <div className="dot-empty"></div>}
                </div>
                <div className="task-label">{task}</div>
                <div className="task-status">{isDone ? 'Complete' : isActive ? 'Running' : 'Queued'}</div>
              </div>
            );
          })}
        </div>

        <motion.div 
          className="loading-complete-action"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: loadingPhase >= 6 ? 1 : 0, y: loadingPhase >= 6 ? 0 : 10, pointerEvents: loadingPhase >= 6 ? 'auto' : 'none' }}
        >
          <button className="btn-primary large full-width" onClick={completeOnboarding}>
            Enter Directory
          </button>
        </motion.div>
      </div>
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      filter: 'blur(4px)'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      filter: 'blur(4px)'
    })
  };

  return (
    <div className="onboarding-viewport">
      <div className="ob-bg-glow"></div>
      <div className="ob-bg-noise"></div>

      <div className={`onboarding-shell ${isReview ? 'wide' : ''} ${isLoading ? 'loading-mode' : ''}`}>
        
        {/* Header & Progress (Hidden in Welcome and Loading) */}
        {!isFirst && !isLoading && (
          <div className="ob-shell-header">
            <div className="ob-brand">
              <Compass size={18} className="brand-icon" />
              <span>Design Vault</span>
              <div className="brand-tag">Setup</div>
            </div>
            <div className="ob-progress-container">
              <div className="ob-step-count">Step {currentStep < 10 ? `0${currentStep}` : currentStep} / 09</div>
              <div className="ob-progress-track">
                <div className="ob-progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="ob-content-area">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="ob-step-content"
            >
              {step.type === 'welcome' && (
                <div className="welcome-layout">
                  <div className="welcome-text">
                    <div className="ob-eyebrow">{step.eyebrow}</div>
                    <h1 className="ob-title">{step.title}</h1>
                    <p className="ob-subtitle">{step.subtitle}</p>
                    <button className="btn-primary large mt-6" onClick={handleNext}>
                      Start setup <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="welcome-visual">
                    <div className="wv-window">
                      <div className="wv-sidebar"></div>
                      <div className="wv-main">
                        <div className="wv-card"></div>
                        <div className="wv-card"></div>
                        <div className="wv-card"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(step.type === 'single' || step.type === 'multiple') && (
                <div className="question-layout">
                  <div className="ob-eyebrow">{step.eyebrow}</div>
                  <h1 className="ob-title">{step.title}</h1>
                  <p className="ob-subtitle">{step.subtitle}</p>
                  
                  <div className="ob-scroll-area">
                    {renderOptions()}
                  </div>
                </div>
              )}

              {isReview && (
                <div className="review-step">
                  <div className="ob-eyebrow">{step.eyebrow}</div>
                  <h1 className="ob-title">{step.title}</h1>
                  <p className="ob-subtitle">{step.subtitle}</p>
                  {renderReview()}
                </div>
              )}

              {isLoading && renderLoading()}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer (Hidden in Welcome and Loading) */}
        {!isFirst && !isLoading && (
          <div className="ob-shell-footer">
            <button className="btn-ghost" onClick={handleBack}>
              <ChevronLeft size={16} /> Back
            </button>
            
            <div className="footer-right">
              {validationMsg && <span className="validation-msg">{validationMsg}</span>}
              <button 
                className={`btn-primary ${!canContinue ? 'disabled' : ''}`}
                onClick={isReview ? handleNext : handleNext}
                disabled={!canContinue}
              >
                {isReview ? 'Prepare Directory' : 'Continue'} {!isReview && <ChevronRight size={16} />}
              </button>
              <div className="keyboard-hint">Press <strong>Enter</strong> ↵</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
