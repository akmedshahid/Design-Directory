import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resources } from '../data';
import ResourceCard from '../components/ResourceCard';
import { 
  Bookmark, BookmarkCheck, Heart, ExternalLink, Share2, AlertTriangle, 
  ChevronRight, Check, Library, FileText, CheckCircle2, ShieldAlert,
  Info, LayoutGrid, MonitorSmartphone, Settings, Download, Package,
  Zap, AlertCircle, FileDigit, Target, PenTool, LayoutTemplate, 
  MessageSquare, Layers
} from 'lucide-react';
import CollectionModal from '../components/CollectionModal';
import PaywallModal from '../components/PaywallModal';
import { PriceBadge, LicenseBadge, ToolBadge, FileTypeBadge, StatusBadge, QualityBadge, TagChip } from '../components/Badges';
import { useAuth } from '../context/AuthContext';
import './ResourceDetail.css';

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const resource = resources.find(r => r.id === id);
  const [activePreview, setActivePreview] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [personalNote, setPersonalNote] = useState('');
  const { incrementDownloadUsage } = useAuth();

  useEffect(() => {
    if (resource) {
      setIsBookmarked(resource.isBookmarked);
      setIsFavorite(resource.isFavorite);
      const savedNote = localStorage.getItem(`note_${resource.id}`);
      if (savedNote) setPersonalNote(savedNote);
    }
  }, [resource]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPersonalNote(e.target.value);
    localStorage.setItem(`note_${resource?.id}`, e.target.value);
  };

  if (!resource) {
    return (
      <div className="not-found">
        <ShieldAlert size={48} color="var(--semantic-danger)" style={{ marginBottom: 16 }} />
        <h2>Resource Not Found</h2>
        <p>The resource you are looking for has been removed or does not exist.</p>
        <Link to="/app" className="action-btn primary-btn mt-4">Back to Directory</Link>
      </div>
    );
  }

  // Mock data for preview gallery
  const gallery = [
    resource.thumbnailStyle,
    '#1c1c1f',
    '#2a2a30',
    '#111',
  ];
  const galleryLabels = ['Overview', 'Detail View', 'Components', 'Usage'];

  const similarResources = resources
    .filter(r => r.id !== resource.id && (r.category === resource.category || r.subcategory === resource.subcategory))
    .slice(0, 4);

  const moreFromSource = resources
    .filter(r => r.id !== resource.id && r.creator === resource.creator)
    .slice(0, 3);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleDownload = () => {
    if (incrementDownloadUsage()) {
      window.open(resource.sourceUrl, '_blank', 'noreferrer');
    } else {
      setIsPaywallOpen(true);
    }
  };

  // Safe checks for arrays
  const tools = resource.tools || [];
  const useCases = resource.useCases || [];
  const pros = resource.pros || [];
  const limitations = resource.limitations || [];
  const fileTypes = resource.fileTypes || [];
  const tags = resource.tags || [];

  return (
    <div className="detail-page">
      {/* Breadcrumbs */}
      <nav className="detail-breadcrumb">
        <Link to="/app">Directory</Link>
        <ChevronRight size={14} />
        <Link to={`/app/categories/${resource.category.toLowerCase().replace(/ /g, '-')}`}>{resource.category}</Link>
        <ChevronRight size={14} />
        <Link to={`/app/categories/${resource.category.toLowerCase().replace(/ /g, '-')}?subcategory=${encodeURIComponent(resource.subcategory)}`}>{resource.subcategory}</Link>
        <ChevronRight size={14} />
        <span className="current">{resource.title}</span>
      </nav>

      {/* Main Container */}
      <div className="detail-container">
        
        {/* Left Column */}
        <div className="detail-content-col">
          
          {/* Header & Gallery */}
          <div className="detail-header-area">
            <h1 className="detail-title">{resource.title}</h1>
            <p className="detail-short-desc">{resource.description}</p>
            
            <div className="gallery-container">
              <div className="main-preview" style={{ background: gallery[activePreview] }}>
                <div className="preview-badge">{galleryLabels[activePreview]}</div>
              </div>
              <div className="gallery-thumbs">
                {gallery.map((style, idx) => (
                  <button 
                    key={idx} 
                    className={`thumb-btn ${activePreview === idx ? 'active' : ''}`}
                    onClick={() => setActivePreview(idx)}
                  >
                    <div className="thumb-inner" style={{ background: style }} />
                    <span className="thumb-label">{galleryLabels[idx]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Structured Sections */}
          <div className="detail-sections">
            
            {/* Section 1: Overview */}
            <section className="rd-section card-style">
              <div className="rd-section-header">
                <Info size={16} className="rd-icon" />
                <h2>Overview</h2>
              </div>
              <div className="rd-section-body">
                <p className="rd-text-primary">{resource.longDescription || resource.description}</p>
                {resource.curationNote && (
                  <div className="rd-curation-note">
                    <div className="note-title"><CheckCircle2 size={14} /> Curator Note</div>
                    <p>{resource.curationNote}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Section 2: Quick Facts Grid */}
            <section className="rd-section">
              <div className="rd-section-header">
                <LayoutGrid size={16} className="rd-icon" />
                <h2>Quick Facts</h2>
              </div>
              <div className="rd-facts-grid">
                <div className="rd-fact">
                  <span className="fact-label">Price</span>
                  <PriceBadge type={resource.priceType} size="sm" />
                </div>
                <div className="rd-fact">
                  <span className="fact-label">License</span>
                  <LicenseBadge type={resource.license} size="sm" />
                </div>
                <div className="rd-fact">
                  <span className="fact-label">Quality Score</span>
                  <QualityBadge score={resource.qualityScore} size="sm" />
                </div>
                <div className="rd-fact">
                  <span className="fact-label">Difficulty</span>
                  <span className="fact-value">{resource.difficulty || 'Intermediate'}</span>
                </div>
                <div className="rd-fact">
                  <span className="fact-label">Category</span>
                  <span className="fact-value">{resource.category}</span>
                </div>
                <div className="rd-fact">
                  <span className="fact-label">Added</span>
                  <span className="fact-value">{new Date(resource.dateAdded).toLocaleDateString()}</span>
                </div>
              </div>
            </section>

            {/* Section 3: Compatibility Panel */}
            <section className="rd-section card-style">
              <div className="rd-section-header">
                <MonitorSmartphone size={16} className="rd-icon" />
                <h2>Compatibility</h2>
              </div>
              <div className="rd-section-body">
                {tools.length > 0 && (
                  <div className="compat-group">
                    <h3 className="compat-label">Tools</h3>
                    <div className="compat-list">
                      {tools.map(t => <ToolBadge key={t} tool={t} />)}
                    </div>
                  </div>
                )}
                {fileTypes.length > 0 && (
                  <div className="compat-group mt-4">
                    <h3 className="compat-label">Included Formats</h3>
                    <div className="compat-list">
                      {fileTypes.map(f => <FileTypeBadge key={f} ext={f} />)}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Section 4: Use Cases */}
            {useCases.length > 0 && (
              <section className="rd-section">
                <div className="rd-section-header">
                  <Target size={16} className="rd-icon" />
                  <h2>Best Used For</h2>
                </div>
                <div className="rd-use-cases">
                  {useCases.map(uc => (
                    <div key={uc} className="uc-chip">
                      <Check size={14} className="uc-icon" />
                      <span>{uc}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 6: What's Included */}
            <section className="rd-section">
              <div className="rd-section-header">
                <Package size={16} className="rd-icon" />
                <h2>What's Included</h2>
              </div>
              <div className="rd-included-grid">
                <div className="inc-item">
                  <FileDigit size={16} className="inc-icon" />
                  <div className="inc-info">
                    <span className="inc-val">{resource.numberOfFiles || 1}</span>
                    <span className="inc-lbl">Total Files</span>
                  </div>
                </div>
                <div className="inc-item">
                  <Download size={16} className="inc-icon" />
                  <div className="inc-info">
                    <span className="inc-val">{resource.fileSize || 'Unknown size'}</span>
                    <span className="inc-lbl">Package Size</span>
                  </div>
                </div>
                <div className="inc-item">
                  <Layers size={16} className="inc-icon" />
                  <div className="inc-info">
                    <span className="inc-val">Structured</span>
                    <span className="inc-lbl">Layers/Groups</span>
                  </div>
                </div>
                <div className="inc-item">
                  <Settings size={16} className="inc-icon" />
                  <div className="inc-info">
                    <span className="inc-val">Editable</span>
                    <span className="inc-lbl">Source Files</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Strengths and Limitations */}
            {(pros.length > 0 || limitations.length > 0) && (
              <section className="rd-section">
                <div className="rd-side-by-side">
                  {pros.length > 0 && (
                    <div className="sbs-card strengths">
                      <div className="sbs-header">
                        <Zap size={16} className="text-success" />
                        <h3>Strengths</h3>
                      </div>
                      <ul className="sbs-list success">
                        {pros.map((pro, i) => <li key={i}>{pro}</li>)}
                      </ul>
                    </div>
                  )}
                  {limitations.length > 0 && (
                    <div className="sbs-card limitations">
                      <div className="sbs-header">
                        <AlertCircle size={16} className="text-warning" />
                        <h3>Check before using</h3>
                      </div>
                      <ul className="sbs-list warning">
                        {limitations.map((lim, i) => <li key={i}>{lim}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Section 5: License and Usage Notes */}
            <section className="rd-section license-panel">
              <div className="rd-section-header">
                <FileText size={16} className="rd-icon" />
                <h2>License & Usage</h2>
              </div>
              <div className="rd-license-content">
                <div className="lic-row">
                  <span className="lic-label">Commercial Use</span>
                  <span className="lic-val">{resource.commercialUse || 'Yes'}</span>
                </div>
                <div className="lic-row">
                  <span className="lic-label">Attribution Required</span>
                  <span className="lic-val">{resource.attributionRequired || 'No'}</span>
                </div>
                <p className="lic-warning">
                  Always verify final license terms on the original source before client or commercial use.
                </p>
              </div>
            </section>

            {/* Section 8: Tags */}
            {tags.length > 0 && (
              <section className="rd-section">
                <div className="rd-section-header">
                  <TagChip tag="Classification" />
                  <h2 style={{marginLeft: -8}}>Tags</h2>
                </div>
                <div className="rd-tags">
                  {tags.map(tag => <TagChip key={tag} tag={tag} />)}
                </div>
              </section>
            )}

            {/* Section 9: Personal Notes */}
            <section className="rd-section card-style">
              <div className="rd-section-header">
                <MessageSquare size={16} className="rd-icon" />
                <h2>Personal Notes</h2>
              </div>
              <div className="rd-section-body">
                <textarea 
                  className="rd-note-input"
                  placeholder="Add private notes about how you might use this resource..."
                  value={personalNote}
                  onChange={handleNoteChange}
                ></textarea>
                <div className="rd-note-footer">
                  {personalNote && <span className="note-status"><Check size={12} /> Saved locally</span>}
                </div>
              </div>
            </section>

            {/* Section 10: Similar Resources */}
            {similarResources.length > 0 && (
              <section className="rd-section no-border">
                <div className="rd-section-header">
                  <h2>Similar Resources</h2>
                </div>
                <div className="rd-resource-grid">
                  {similarResources.map(sim => (
                    <ResourceCard key={sim.id} resource={sim} />
                  ))}
                </div>
              </section>
            )}

            {/* Section 11: More From Source */}
            {moreFromSource.length > 0 && (
              <section className="rd-section no-border">
                <div className="rd-section-header">
                  <h2>More from {resource.creator}</h2>
                </div>
                <div className="rd-resource-grid">
                  {moreFromSource.map(sim => (
                    <ResourceCard key={sim.id} resource={sim} />
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>

        {/* Right Column: Sticky Panel */}
        <div className="detail-sidebar-col">
          <div className="rd-sticky-panel">
            
            <div className="rsp-summary">
              <div className="rsp-thumb" style={{ background: resource.thumbnailStyle }}></div>
              <div className="rsp-title-area">
                <h2 className="rsp-title">{resource.title}</h2>
                <div className="rsp-creator">by <span>{resource.creator}</span></div>
              </div>
              <div className="rsp-price">
                <PriceBadge type={resource.priceType} />
              </div>
            </div>

            <div className="rsp-primary-action">
              <button className="btn-primary full-width" onClick={handleDownload}>
                <span>Download Resource</span>
                <Download size={16} />
              </button>
            </div>

            <div className="rsp-secondary-actions">
              <button className={`rsp-action-btn ${isBookmarked ? 'active' : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}>
                {isBookmarked ? <BookmarkCheck size={18} className="icon-active" /> : <Bookmark size={18} />}
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>
              <button className={`rsp-action-btn ${isFavorite ? 'active' : ''}`} onClick={() => setIsFavorite(!isFavorite)}>
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} className={isFavorite ? 'icon-active-heart' : ''} />
                <span>Favorite</span>
              </button>
              <button className="rsp-action-btn" onClick={() => setIsCollectionModalOpen(true)}>
                <Library size={18} />
                <span>Collect</span>
              </button>
              <button className="rsp-action-btn" onClick={copyLink}>
                {linkCopied ? <Check size={18} className="icon-success" /> : <Share2 size={18} />}
                <span>Copy</span>
              </button>
            </div>

            <div className="rsp-meta-section">
              <div className="rsp-meta-group">
                <h4>Classification</h4>
                <div className="rsp-row"><span>Category</span><span className="value">{resource.category}</span></div>
                <div className="rsp-row"><span>Subcategory</span><span className="value">{resource.subcategory}</span></div>
                <div className="rsp-row"><span>Type</span><span className="value">{resource.resourceType || 'Asset'}</span></div>
              </div>

              <div className="rsp-meta-group">
                <h4>Access</h4>
                <div className="rsp-row"><span>Price</span><span className="value capitalize">{resource.priceType}</span></div>
                <div className="rsp-row"><span>License</span><span className="value capitalize">{resource.license}</span></div>
                <div className="rsp-row"><span>Commercial Use</span><span className="value">{resource.commercialUse || 'Yes'}</span></div>
              </div>

              <div className="rsp-meta-group">
                <h4>Quality</h4>
                <div className="rsp-row"><span>Score</span><span className="value">{resource.qualityScore}/10</span></div>
                <div className="rsp-row"><span>Difficulty</span><span className="value">{resource.difficulty || 'Intermediate'}</span></div>
                {resource.status && <div className="rsp-row"><span>Status</span><StatusBadge status={resource.status} /></div>}
              </div>

              <div className="rsp-meta-group">
                <h4>Maintenance</h4>
                <div className="rsp-row"><span>Added</span><span className="value">{new Date(resource.dateAdded).toLocaleDateString()}</span></div>
                <div className="rsp-row"><span>Updated</span><span className="value">{new Date(resource.updatedAt).toLocaleDateString()}</span></div>
              </div>
            </div>

            <div className="rsp-footer">
              <button className="report-btn">
                <AlertTriangle size={14} /> Report broken link
              </button>
            </div>

          </div>
        </div>

      </div>

      <CollectionModal 
        isOpen={isCollectionModalOpen} 
        onClose={() => setIsCollectionModalOpen(false)} 
        resourceId={resource.id} 
      />

      <PaywallModal 
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
      />
    </div>
  );
};

export default ResourceDetail;
