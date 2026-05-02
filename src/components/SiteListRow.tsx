import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Bookmark, Copy, Check, Lock, AlertTriangle, Key, Star, MoreHorizontal, Calendar, Eye, FileEdit, Trash } from 'lucide-react';
import type { Site } from '../sitesData';
import './SiteListRow.css';
import { useToast } from './Toast';

interface SiteListRowProps {
  site: Site;
  onClick?: () => void;
}

const SiteListRow: React.FC<SiteListRowProps> = ({ site, onClick }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(site.isBookmarked);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(site.url);
    setCopied(true);
    toast('URL Copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks', 'success');
  };

  const getAccessBadgeClass = () => {
    switch(site.accessType) {
      case 'Free': return 'badge-free';
      case 'Paid': return 'badge-paid';
      case 'Subscription': return 'badge-subscription';
      case 'Freemium': return 'badge-freemium';
      case 'Account Required': return 'badge-account';
      case 'Invite Only': return 'badge-invite';
      default: return 'badge-neutral';
    }
  };

  // Safe tag extraction
  const displayTags = site.tags?.slice(0, 2) || [];
  const extraTagsCount = Math.max(0, (site.tags?.length || 0) - 2);

  return (
    <div className="site-list-row" onClick={onClick}>
      <Link to={`/app/sites/${site.id}`} className="site-row-link-overlay" />
      
      <div className="site-row-left">
        <div className="site-favicon-wrapper" style={{ background: site.screenshotStyle }}>
          {site.faviconUrl ? (
            <img src={site.faviconUrl} alt={site.name} className="site-favicon" />
          ) : (
            <span className="site-initial">{site.name.charAt(0)}</span>
          )}
        </div>
        
        <div className="site-row-info">
          <div className="site-row-title-group">
            <h3 className="site-row-title">{site.name}</h3>
            {site.isBroken && (
              <div className="site-broken-indicator" title="Reported Broken">
                <AlertTriangle size={12} />
              </div>
            )}
          </div>
          <div className="site-row-domain">{site.domain}</div>
        </div>
      </div>
      
      <div className="site-row-center">
        <div className="site-row-desc">{site.shortDescription}</div>
        <div className="site-row-meta">
          <span className="site-category-chip">{site.category}</span>
          <span className="site-subcategory-chip">{site.subcategory}</span>
          
          <div className="site-tags-group">
            {displayTags.map(t => (
              <span key={t} className="site-mini-tag">{t}</span>
            ))}
            {extraTagsCount > 0 && <span className="site-mini-tag">+{extraTagsCount}</span>}
          </div>
        </div>
      </div>
      
      <div className="site-row-badges">
        <div className="site-badges-col">
          <div className="badges-row-1">
            <span className={`site-access-badge ${getAccessBadgeClass()}`}>
              {site.accessType}
            </span>
            {site.hasCredentials && (
              <span className="site-login-badge">
                <Lock size={10} /> Login saved
              </span>
            )}
            {site.hasSubscription && site.subscriptionStatus === 'Active' && (
              <span className="site-active-sub-badge">Active Sub</span>
            )}
          </div>
          <div className="badges-row-2">
            <span className="site-rating-meta">
              <Star size={10} className="text-accent" fill="currentColor" />
              {site.rating.toFixed(1)}
            </span>
            <span className="site-time-meta" title="Last Checked">
              <Calendar size={10} />
              {new Date(site.lastChecked || site.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="site-row-right">
        <div className="site-row-actions">
          <button className="row-action-btn" onClick={handleCopyUrl} title="Copy URL">
            {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
          </button>
          <button className={`row-action-btn ${isBookmarked ? 'active' : ''}`} onClick={handleBookmark} title="Bookmark">
            <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
          <a href={site.url} target="_blank" rel="noopener noreferrer" className="row-action-btn primary" title="Open Site" onClick={e => e.stopPropagation()}>
            <ExternalLink size={16} />
          </a>
          
          <div className="row-more-menu-wrapper" ref={menuRef}>
            <button 
              className="row-action-btn" 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMenuOpen(!menuOpen); }}
              title="More Options"
            >
              <MoreHorizontal size={16} />
            </button>
            {menuOpen && (
              <div className="row-more-dropdown" onClick={e => e.stopPropagation()}>
                <Link to={`/app/sites/${site.id}`} className="dropdown-item">
                  <Eye size={14} /> Quick View
                </Link>
                <button className="dropdown-item">
                  <FileEdit size={14} /> Edit Site
                </button>
                <button className="dropdown-item danger">
                  <AlertTriangle size={14} /> Report Broken
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteListRow;
