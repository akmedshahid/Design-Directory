import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sitesCategories, sites, sitesTree } from '../sitesData';
import SiteListRow from '../components/SiteListRow';
import { ArrowRight, Globe, Clock, ShieldCheck, CreditCard, Folder, Plus, Settings } from 'lucide-react';
import { useToast } from '../components/Toast';
import './SitesDirectory.css';

const SitesDirectory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // For each category, grab the first 4 items for dense display
  const displayCategories = sitesCategories.map(cat => ({
    name: cat,
    subcategories: sitesTree[cat] || [],
    items: sites.filter(s => s.category === cat).slice(0, 4),
    totalCount: sites.filter(s => s.category === cat).length
  })).filter(cat => cat.items.length > 0);

  const totalSites = sites.length;
  const sitesWithLogin = sites.filter(s => s.hasCredentials).length;
  const sitesWithSub = sites.filter(s => s.hasSubscription).length;

  return (
    <div className="sites-directory-page">
      <div className="sd-compact-header">
        <div className="sd-header-content">
          <div className="sd-intro-pill">
            <Globe size={12} className="text-accent" />
            <span>Site Vault</span>
          </div>
          <h1 className="sd-intro-heading">Useful sites, organized.</h1>
          <p className="sd-intro-desc">A private directory of tools, portals, accounts, subscriptions, references, and saved websites.</p>
          
          <div className="sd-meta-row">
            <div className="sd-meta-item">
              <Folder size={14} className="text-muted" />
              <span>{totalSites} Sites</span>
            </div>
            <div className="sd-meta-divider" />
            <div className="sd-meta-item">
              <span>{sitesCategories.length} Categories</span>
            </div>
            <div className="sd-meta-divider" />
            <div className="sd-meta-item">
              <ShieldCheck size={14} className="text-accent" />
              <span>{sitesWithLogin} Logins</span>
            </div>
            <div className="sd-meta-divider" />
            <div className="sd-meta-item">
              <CreditCard size={14} className="text-success" />
              <span>{sitesWithSub} Subscriptions</span>
            </div>
            <div className="sd-meta-divider" />
            <div className="sd-meta-item">
              <Clock size={14} className="text-muted" />
              <span>Checked today</span>
            </div>
          </div>
        </div>
        
        <div className="sd-header-actions">
          <button className="btn-secondary" onClick={() => toast('Category management is available to curators and admins.', 'info')}>
            <Settings size={16} /> Manage Categories
          </button>
          <button className="btn-primary" onClick={() => navigate('/app/sites/submit')}>
            <Plus size={16} /> Add Site
          </button>
        </div>
      </div>

      <div className="sd-grouped-content">
        {displayCategories.map(category => (
          <section key={category.name} className="sd-category-group">
            <div className="sd-group-header">
              <div className="sd-group-title-col">
                <h2 className="sd-group-title">
                  {category.name} <span className="sd-group-count">{category.totalCount}</span>
                </h2>
                <div className="sd-group-subcats">
                  {category.subcategories.length} subcategories
                </div>
              </div>
              <Link to={`/app/sites/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="sd-view-all">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="sd-list-container">
              {category.items.map(item => (
                <SiteListRow 
                  key={item.id} 
                  site={item} 
                  onClick={() => navigate(`/app/sites/${item.id}`)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default SitesDirectory;
