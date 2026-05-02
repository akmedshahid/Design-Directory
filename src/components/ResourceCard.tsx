import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, ExternalLink, Plus, FolderPlus, Star, Heart, MessageSquare } from 'lucide-react';
import type { Resource } from '../data';
import { PriceBadge, ToolBadge, StatusBadge, QualityBadge, FileTypeBadge, Tooltip } from './Badges';
import './ResourceCard.css';

interface ResourceCardProps {
  resource: Resource;
  viewMode?: 'grid' | 'compact' | 'list';
}

const ThumbnailGenerator: React.FC<{ resource: Resource }> = ({ resource }) => {
  const { category, thumbnailStyle, title } = resource;
  
  // High-end CSS generated thumbnails per category
  if (category === 'Mockups') {
    return (
      <div className="preview-mockup" style={{ background: thumbnailStyle }}>
        <div className="mockup-frame">
          <div className="mockup-screen">
            <div className="mockup-ui-header"></div>
            <div className="mockup-ui-body"></div>
          </div>
        </div>
        <div className="preview-label-tiny">Scene</div>
      </div>
    );
  }
  if (category === 'Fonts') {
    return (
      <div className="preview-font" style={{ background: thumbnailStyle }}>
        <div className="font-specimen">Aa</div>
        <div className="font-name-wrap">
          <span className="font-name">{title.split(' ')[0] || 'Type'}</span>
          <span className="font-style-ind">Regular</span>
        </div>
      </div>
    );
  }
  if (category === 'UI Kits') {
    return (
      <div className="preview-ui" style={{ background: thumbnailStyle }}>
        <div className="ui-panel">
          <div className="ui-element header"></div>
          <div className="ui-element card-grid">
            <div className="ui-card"></div>
            <div className="ui-card"></div>
            <div className="ui-card"></div>
          </div>
        </div>
      </div>
    );
  }
  if (category === 'Icons') {
    return (
      <div className="preview-icons" style={{ background: thumbnailStyle }}>
        <div className="icon-grid-bg">
          <div className="icon-cell active"></div>
          <div className="icon-cell"></div>
          <div className="icon-cell"></div>
          <div className="icon-cell"></div>
        </div>
      </div>
    );
  }
  if (category === '3D Assets' || category === 'Cinema 4D' || category === 'Blender') {
    return (
      <div className="preview-3d" style={{ background: thumbnailStyle }}>
        <div className="threed-object"></div>
        <div className="threed-shadow"></div>
        <div className="threed-grid"></div>
      </div>
    );
  }
  if (category === 'Templates' || category === 'Landing Pages') {
    return (
      <div className="preview-template" style={{ background: thumbnailStyle }}>
        <div className="browser-frame">
          <div className="browser-header"><span></span><span></span><span></span></div>
          <div className="browser-body">
            <div className="tpl-hero"></div>
            <div className="tpl-blocks"><div></div><div></div></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Premium Default
  return (
    <div className="preview-default" style={{ background: thumbnailStyle }}>
      <div className="def-pattern"></div>
      <div className="def-brand">{category}</div>
    </div>
  );
};

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, viewMode = 'grid' }) => {
  const [isBookmarked, setIsBookmarked] = useState(resource.isBookmarked);
  const [isFavorite, setIsFavorite] = useState(resource.isFavorite);
  const [hasNote, setHasNote] = useState(false);

  useEffect(() => {
    const savedNote = localStorage.getItem(`note_${resource.id}`);
    setHasNote(!!savedNote);
  }, [resource.id]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const preventDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Safe arrays
  const tools = resource.tools || [];
  const fileTypes = resource.fileTypes || [];

  if (viewMode === 'compact') {
    return (
      <Link to={`/app/resource/${resource.id}`} className="resource-card compact-mode">
        <div className="rc-mini-thumb" style={{ background: resource.thumbnailStyle }}></div>
        <div className="rc-compact-info">
          <h3 className="rc-title" title={resource.title}>{resource.title}</h3>
          <span className="rc-creator">{resource.creator}</span>
        </div>
        <div className="rc-compact-meta">
          <PriceBadge type={resource.priceType} size="sm" />
          <div className="rc-compact-tools">
            {tools.slice(0, 1).map(t => <ToolBadge key={t} tool={t} size="sm" />)}
          </div>
          <QualityBadge score={resource.qualityScore} size="sm" />
          <div className="rc-action-group" onClick={preventDefault}>
            <button className={`rc-action-btn ${isBookmarked ? 'active' : ''}`} onClick={toggleBookmark} title="Bookmark">
              {isBookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            </button>
          </div>
        </div>
      </Link>
    );
  }

  if (viewMode === 'list') {
    return (
      <Link to={`/app/resource/${resource.id}`} className="resource-card list-mode">
        <div className="rc-thumbnail">
          <ThumbnailGenerator resource={resource} />
          <div className="rc-top-badges">
            <PriceBadge type={resource.priceType} size="sm" />
            {resource.isHandpicked && <StatusBadge status="Handpicked" size="sm" />}
          </div>
        </div>
        <div className="rc-content">
          <div className="rc-meta-top">
            <span className="rc-category">{resource.subcategory}</span>
            <span className="rc-dot">•</span>
            <span className="rc-creator">{resource.creator}</span>
            {hasNote && <span className="rc-note-ind" title="Personal note saved"><MessageSquare size={12} /></span>}
          </div>
          <h3 className="rc-title line-clamp-1">{resource.title}</h3>
          <p className="rc-desc line-clamp-2">{resource.description}</p>
          <div className="rc-tools">
            {tools.slice(0, 3).map(tool => <ToolBadge key={tool} tool={tool} size="sm" />)}
            {fileTypes.slice(0, 2).map(ft => <FileTypeBadge key={ft} ext={ft} size="sm" />)}
          </div>
        </div>
        <div className="rc-list-actions">
           <QualityBadge score={resource.qualityScore} />
           <div className="rc-action-group" onClick={preventDefault}>
             <Tooltip content={isFavorite ? 'Remove Favorite' : 'Favorite'} position="top">
               <button className={`rc-action-btn ${isFavorite ? 'active-heart' : ''}`} onClick={toggleFavorite}>
                 <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
               </button>
             </Tooltip>
             <Tooltip content={isBookmarked ? 'Remove Bookmark' : 'Bookmark'} position="top">
               <button className={`rc-action-btn ${isBookmarked ? 'active-bm' : ''}`} onClick={toggleBookmark}>
                 {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
               </button>
             </Tooltip>
             <Tooltip content="Add to Collection" position="top">
               <button className="rc-action-btn"><FolderPlus size={16} /></button>
             </Tooltip>
             <Tooltip content="Open Source" position="top">
               <a href={resource.sourceUrl} target="_blank" rel="noreferrer" className="rc-action-btn">
                 <ExternalLink size={16} />
               </a>
             </Tooltip>
           </div>
        </div>
      </Link>
    );
  }

  // GRID MODE (Default)
  return (
    <Link to={`/app/resource/${resource.id}`} className="resource-card grid-mode">
      <div className="rc-thumbnail-wrapper">
        <ThumbnailGenerator resource={resource} />
        
        <div className="rc-badges-overlay top-left">
          <PriceBadge type={resource.priceType} size="sm" />
          {resource.status && resource.status !== 'Active' && (
            <StatusBadge status={resource.status} size="sm" />
          )}
          {resource.isNew && !resource.status && <StatusBadge status="New" size="sm" />}
        </div>
        
        <div className="rc-hover-actions top-right" onClick={preventDefault}>
          <Tooltip content={isFavorite ? 'Remove Favorite' : 'Favorite'} position="left">
            <button className={`rc-action-btn float ${isFavorite ? 'active-heart' : ''}`} onClick={toggleFavorite}>
              <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </Tooltip>
          <Tooltip content={isBookmarked ? 'Remove Bookmark' : 'Bookmark'} position="left">
            <button className={`rc-action-btn float ${isBookmarked ? 'active-bm' : ''}`} onClick={toggleBookmark}>
              {isBookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            </button>
          </Tooltip>
        </div>
        
        <div className="rc-hover-overlay" onClick={preventDefault}>
          <a href={resource.sourceUrl} target="_blank" rel="noreferrer" className="rc-quick-btn primary">
            <ExternalLink size={14} /> Open
          </a>
          <button className="rc-quick-btn secondary">
            <FolderPlus size={14} /> Collect
          </button>
        </div>
      </div>
      
      <div className="rc-content">
        <div className="rc-meta-row">
          <div className="rc-creator-wrap">
            <span className="rc-creator">{resource.creator}</span>
            {hasNote && <span title="Has personal note"><MessageSquare size={10} className="rc-note-ind" /></span>}
          </div>
          <div className="rc-meta-right">
            {resource.saves > 0 && <span className="rc-saves-val" title="Saves">{resource.saves > 1000 ? '1k+' : resource.saves}</span>}
            <Star size={10} className="rc-star" />
            <span className="rc-rating-val">{resource.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <h3 className="rc-title line-clamp-1" title={resource.title}>{resource.title}</h3>
        
        <div className="rc-tools-row">
          <span className="rc-subcat line-clamp-1" title={resource.subcategory}>{resource.subcategory}</span>
          <span className="rc-dot separator">•</span>
          <div className="rc-tools">
            {tools.slice(0, 2).map(tool => (
              <ToolBadge key={tool} tool={tool} size="sm" />
            ))}
            {tools.length > 2 && <span className="rc-tool-plus" title={tools.slice(2).join(', ')}>+{tools.length - 2}</span>}
            {tools.length === 0 && fileTypes.slice(0, 1).map(ft => (
              <FileTypeBadge key={ft} ext={ft} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;
