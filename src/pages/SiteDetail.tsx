import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, ExternalLink, Bookmark, Copy, Check, Lock, 
  AlertTriangle, Key, Star, ShieldCheck, Eye, EyeOff, Info, 
  CreditCard, Briefcase, FileText, TrendingUp, TrendingDown, 
  Tag, Link2, Box, Calendar, Edit3 
} from 'lucide-react';
import { sites } from '../sitesData';
import { useToast } from '../components/Toast';
import SiteListRow from '../components/SiteListRow';
import './SiteDetail.css';

const SiteDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  const site = sites.find(s => s.id === id);
  
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(site?.isBookmarked || false);
  
  // Vault state
  const [showPassword, setShowPassword] = useState(false);
  const [copiedUser, setCopiedUser] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  if (!site) {
    return <div className="p-8 text-center text-white">Site not found.</div>;
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(site.url);
    setCopiedUrl(true);
    toast('URL Copied to clipboard', 'success');
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks', 'success');
  };

  const handleCopyUser = () => {
    if (site.username || site.email) {
      navigator.clipboard.writeText((site.username || site.email) as string);
      setCopiedUser(true);
      toast('Username copied', 'success');
      setTimeout(() => setCopiedUser(false), 2000);
    }
  };

  const handleCopyPass = () => {
    if (site.passwordMasked) {
      // In a real app we'd fetch the decrypted password here
      navigator.clipboard.writeText('decrypted_password_mock');
      setCopiedPass(true);
      toast('Password copied', 'success'); // Do not expose value in toast
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  // Mock related sites and resources
  const relatedSites = sites.filter(s => s.category === site.category && s.id !== site.id).slice(0, 3);
  const relatedResources = []; // Mock empty for now

  return (
    <div className="site-detail-page">
      <div className="sd-main-content">
        
        {/* Breadcrumbs & Header */}
        <div className="sd-header">
          <nav className="sd-breadcrumbs">
            <Link to="/app/sites" className="sd-breadcrumb-item">Sites</Link>
            <ChevronRight size={14} className="sd-breadcrumb-separator" />
            <Link to={`/app/sites/categories/${site.categorySlug}`} className="sd-breadcrumb-item">{site.category}</Link>
            <ChevronRight size={14} className="sd-breadcrumb-separator" />
            <span className="sd-breadcrumb-active">{site.name}</span>
          </nav>

          <div className="sd-title-row">
            <div className="sd-title-favicon-wrapper" style={{ background: site.screenshotStyle }}>
              {site.faviconUrl ? (
                <img src={site.faviconUrl} alt={site.name} className="sd-title-favicon" />
              ) : (
                <span className="sd-title-initial">{site.name.charAt(0)}</span>
              )}
            </div>
            <div className="sd-title-col">
              <h1>{site.name}</h1>
              <div className="sd-title-domain">
                {site.domain}
                {site.isBroken && <span className="text-red-500 flex items-center gap-1"><AlertTriangle size={12}/> Reported Broken</span>}
              </div>
            </div>
          </div>
          <p className="sd-short-desc">{site.shortDescription}</p>
        </div>

        {/* CSS Mock Browser Preview */}
        <div className="sd-preview-section">
          <div className="sd-browser-chrome">
            <div className="sd-browser-dots">
              <div className="sd-browser-dot red" />
              <div className="sd-browser-dot yellow" />
              <div className="sd-browser-dot green" />
            </div>
            <div className="sd-browser-address">
              <Lock size={10} style={{ marginRight: 6 }}/> {site.domain}
            </div>
          </div>
          <div className="sd-preview-content">
            <div className="sd-css-preview" style={{ background: site.screenshotStyle }}>
              <div className="sd-css-preview-logo">
                {site.faviconUrl ? <img src={site.faviconUrl} alt="Logo" /> : <span>{site.name.charAt(0)}</span>}
              </div>
              <div className="sd-css-preview-title">{site.name}</div>
            </div>
          </div>
        </div>

        {/* 1. Overview */}
        <section className="sd-section sd-overview">
          <div className="sd-section-header">
            <Info size={20} className="sd-section-icon" />
            <h2>Overview</h2>
          </div>
          <p>{site.longDescription || site.whatIsThisSiteFor || "No extended overview provided for this site."}</p>
        </section>

        {/* 2. Quick Facts Grid */}
        <section className="sd-section">
          <div className="sd-section-header">
            <Star size={20} className="sd-section-icon" />
            <h2>Quick Facts</h2>
          </div>
          <div className="sd-facts-grid">
            <div className="sd-fact-item">
              <div className="sd-fact-label">Access</div>
              <div className="sd-fact-value">{site.accessType}</div>
            </div>
            <div className="sd-fact-item">
              <div className="sd-fact-label">Rating</div>
              <div className="sd-fact-value"><Star size={14} className="text-accent" fill="currentColor"/> {site.rating.toFixed(1)} / 10</div>
            </div>
            <div className="sd-fact-item">
              <div className="sd-fact-label">Importance</div>
              <div className="sd-fact-value">{site.importance}</div>
            </div>
            <div className="sd-fact-item">
              <div className="sd-fact-label">Date Added</div>
              <div className="sd-fact-value">{new Date(site.dateAdded).toLocaleDateString()}</div>
            </div>
          </div>
        </section>

        {/* 3. Login & Credentials Vault */}
        <section className="sd-section">
          <div className="sd-section-header">
            <ShieldCheck size={20} className="sd-section-icon text-green-500" style={{ background: 'rgba(16, 185, 129, 0.1)' }} />
            <h2>Login & Credentials</h2>
          </div>
          
          <div className="sd-vault-card">
            <div className="sd-vault-header">
              <Key size={16} />
              <h3>Secure Vault</h3>
              {site.hasCredentials ? (
                <span className="sd-vault-badge">Credentials Saved</span>
              ) : (
                <span className="sd-vault-badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>No Credentials</span>
              )}
            </div>
            
            {site.hasCredentials ? (
              <div className="sd-vault-body">
                <div className="sd-cred-row">
                  <span className="sd-cred-label">Username / Email</span>
                  <span className="sd-cred-value">{site.username || site.email}</span>
                  <div className="sd-cred-actions">
                    <button className="sd-btn-icon" onClick={handleCopyUser} title="Copy Username">
                      {copiedUser ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="sd-cred-row">
                  <span className="sd-cred-label">Password</span>
                  <span className={`sd-cred-value ${!showPassword ? 'masked' : ''}`}>
                    {showPassword ? 'vault-demo-pwd123!' : '••••••••••••'}
                  </span>
                  <div className="sd-cred-actions">
                    <button className="sd-btn-icon" onClick={() => setShowPassword(!showPassword)} title="Reveal Password">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button className="sd-btn-icon" onClick={handleCopyPass} title="Copy Password">
                      {copiedPass ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sd-vault-body" style={{ alignItems: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                No login credentials are saved for this site.
              </div>
            )}
            
            <div className="sd-vault-footer">
              <Lock size={12} />
              <span>For production, credentials should be stored with encryption or a dedicated password manager.</span>
            </div>
          </div>
        </section>

        {/* 4. Access & Subscription */}
        <section className="sd-section">
          <div className="sd-section-header">
            <CreditCard size={20} className="sd-section-icon" />
            <h2>Access & Subscription</h2>
          </div>
          <div className="sd-facts-grid">
            <div className="sd-fact-item">
              <div className="sd-fact-label">Account Required</div>
              <div className="sd-fact-value">{site.accountRequired ? 'Yes' : 'No'}</div>
            </div>
            <div className="sd-fact-item">
              <div className="sd-fact-label">Subscription Status</div>
              <div className="sd-fact-value">{site.subscriptionStatus}</div>
            </div>
            {site.planName && (
              <div className="sd-fact-item">
                <div className="sd-fact-label">Plan Name</div>
                <div className="sd-fact-value">{site.planName}</div>
              </div>
            )}
            {site.renewalDate && (
              <div className="sd-fact-item">
                <div className="sd-fact-label">Renewal Date</div>
                <div className="sd-fact-value">{site.renewalDate}</div>
              </div>
            )}
          </div>
        </section>

        {/* 5. Use Cases */}
        <section className="sd-section">
          <div className="sd-section-header">
            <Briefcase size={20} className="sd-section-icon" />
            <h2>Use Cases</h2>
          </div>
          <div className="sd-chips-list">
            {site.primaryUseCase && <span className="sd-chip primary">{site.primaryUseCase}</span>}
            {site.useCases?.map(uc => <span key={uc} className="sd-chip">{uc}</span>)}
          </div>
        </section>

        {/* 6. Notes & Workflow */}
        <section className="sd-section">
          <div className="sd-section-header">
            <FileText size={20} className="sd-section-icon" />
            <h2>Notes & Workflow</h2>
          </div>
          <div className="sd-card">
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {site.privateNotes || "No private notes recorded."}
            </p>
          </div>
        </section>

        {/* 7. Strengths & Limitations */}
        <section className="sd-section">
          <div className="sd-section-header">
            <TrendingUp size={20} className="sd-section-icon" />
            <h2>Strengths & Limitations</h2>
          </div>
          <div className="sd-pros-cons">
            <div className="sd-card">
              <h3><TrendingUp size={16} className="text-success"/> Strengths</h3>
              <ul className="sd-list">
                {site.strengths?.length ? site.strengths.map((s,i) => <li key={i}><Check size={14} className="text-success" style={{marginTop: 3}}/> {s}</li>) : <li>No strengths listed.</li>}
              </ul>
            </div>
            <div className="sd-card">
              <h3><TrendingDown size={16} className="text-red-500"/> Limitations</h3>
              <ul className="sd-list">
                {site.limitations?.length ? site.limitations.map((s,i) => <li key={i}><AlertTriangle size={14} className="text-red-500" style={{marginTop: 3}}/> {s}</li>) : <li>No limitations listed.</li>}
              </ul>
            </div>
          </div>
        </section>

        {/* 8. Tags */}
        <section className="sd-section">
          <div className="sd-section-header">
            <Tag size={20} className="sd-section-icon" />
            <h2>Tags & Classification</h2>
          </div>
          <div className="sd-chips-list">
            {site.tags?.map(t => <span key={t} className="sd-chip">{t}</span>)}
          </div>
        </section>

        {/* 9. Related Sites */}
        <section className="sd-section">
          <div className="sd-section-header">
            <Link2 size={20} className="sd-section-icon" />
            <h2>Related Sites</h2>
          </div>
          <div className="flex flex-col gap-2">
            {relatedSites.length > 0 ? relatedSites.map(rs => (
              <SiteListRow key={rs.id} site={rs} />
            )) : <div className="sd-empty-related">No related sites found.</div>}
          </div>
        </section>

        {/* 10. Related Resources */}
        <section className="sd-section">
          <div className="sd-section-header">
            <Box size={20} className="sd-section-icon" />
            <h2>Related Resources</h2>
          </div>
          <div className="sd-empty-related">
            No related design resources attached to this site.
          </div>
        </section>
        
      </div>

      {/* Right Sticky Inspector */}
      <div className="sd-inspector">
        <div className="sd-inspector-card">
          <div className="sd-inspector-header">
            <div className="sd-inspector-favicon" style={{ background: site.screenshotStyle }}>
              {site.faviconUrl ? <img src={site.faviconUrl} alt="Fav" /> : <span className="text-white font-bold">{site.name.charAt(0)}</span>}
            </div>
            <div>
              <h3 className="sd-inspector-title">{site.name}</h3>
              <div className="sd-inspector-domain">{site.domain}</div>
            </div>
          </div>
          
          <div className="sd-inspector-actions">
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="btn-full primary">
              <ExternalLink size={16} /> Open Site
            </a>
            <div className="sd-action-grid">
              <button className="btn-full secondary" onClick={handleCopyUrl}>
                {copiedUrl ? <Check size={14} className="text-success" /> : <Copy size={14} />} Copy
              </button>
              <button className={`btn-full secondary ${isBookmarked ? 'text-accent' : ''}`} onClick={handleBookmark}>
                <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} /> Save
              </button>
            </div>
            <button className="btn-full secondary">
              <Edit3 size={14} /> Edit Site
            </button>
          </div>
          
          <div className="sd-metadata-group">
            <h4>Classification</h4>
            <div className="sd-meta-row">
              <span className="sd-meta-label">Category</span>
              <span className="sd-meta-value">{site.category}</span>
            </div>
            <div className="sd-meta-row">
              <span className="sd-meta-label">Subcategory</span>
              <span className="sd-meta-value">{site.subcategory}</span>
            </div>
          </div>
          
          <div className="sd-metadata-group">
            <h4>Maintenance</h4>
            <div className="sd-meta-row">
              <span className="sd-meta-label">Last Visited</span>
              <span className="sd-meta-value">{site.lastVisited ? new Date(site.lastVisited).toLocaleDateString() : 'Never'}</span>
            </div>
            <div className="sd-meta-row">
              <span className="sd-meta-label">Status</span>
              <span className="sd-meta-value" style={{ color: site.isBroken ? '#ef4444' : '#10b981' }}>
                {site.isBroken ? 'Broken' : 'Active'}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SiteDetail;
