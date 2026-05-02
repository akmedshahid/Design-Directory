import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories, resources, tree } from '../data';
import ResourceCard from '../components/ResourceCard';
import { ArrowRight, Search, Zap, Clock } from 'lucide-react';
import './Directory.css';

const Directory = () => {
  const navigate = useNavigate();

  // For each category, grab the first 4 items and subcategories
  const displayCategories = categories.map(cat => ({
    name: cat,
    subcategories: tree[cat] || [],
    items: resources.filter(r => r.category === cat).slice(0, 4),
    totalCount: resources.filter(r => r.category === cat).length
  })).filter(cat => cat.items.length > 0);

  const totalResources = resources.length;
  const newResources = resources.filter(r => r.isNew).length;

  return (
    <div className="directory-page">
      <div className="directory-intro">
        <div className="intro-pill">
          <Zap size={14} className="text-accent" />
          <span>Curated Design Directory</span>
        </div>
        <h1 className="intro-heading">Design resources, organized.</h1>
        <p className="intro-desc">A premium library of mockups, fonts, UI kits, tools, templates, courses, 3D assets, and inspiration.</p>
        
        <div className="intro-meta">
          <div className="meta-item">
            <span className="meta-value">{totalResources}</span>
            <span className="meta-label">Resources</span>
          </div>
          <div className="meta-divider" />
          <div className="meta-item">
            <span className="meta-value">{categories.length}</span>
            <span className="meta-label">Categories</span>
          </div>
          <div className="meta-divider" />
          <div className="meta-item">
            <span className="meta-value">{new Set(resources.map(r => r.creator)).size}</span>
            <span className="meta-label">Creators</span>
          </div>
          <div className="meta-divider" />
          <div className="meta-item">
            <Clock size={14} className="text-muted" />
            <span className="meta-label">Updated today</span>
          </div>
        </div>

        <button className="intro-search" onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}>
          <Search size={16} />
          <span>Search the directory...</span>
          <div className="search-kbd">⌘K</div>
        </button>
      </div>

      <div className="directory-content">
        {displayCategories.map(category => (
          <section key={category.name} className="category-section">
            <div className="category-section-header">
              <div className="csh-left">
                <div className="csh-icon" />
                <div className="csh-text">
                  <h2 className="category-section-title">
                    {category.name} <span className="cat-count">{category.totalCount}</span>
                  </h2>
                  <div className="cat-subcat-chips">
                    {category.subcategories.slice(0, 4).map(sub => (
                      <Link 
                        key={sub} 
                        to={`/app/categories/${category.name.toLowerCase().replace(/ /g, '-')}?subcategory=${encodeURIComponent(sub)}`}
                        className="cat-subcat-chip"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to={`/app/categories/${category.name.toLowerCase().replace(/ /g, '-')}`} className="view-all-link">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="resource-grid">
              {category.items.map(item => (
                <ResourceCard key={item.id} resource={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Directory;
