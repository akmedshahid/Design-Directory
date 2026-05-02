import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, LayoutGrid, List, LayoutList, ChevronRight } from 'lucide-react';
import { sites, sitesTree } from '../sitesData';
import SiteListRow from '../components/SiteListRow';
import EmptyStatePanel from '../components/EmptyState';
import './SitesCategory.css';

const SitesCategory = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const categoryName = slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : '';
  const subcategoryParam = searchParams.get('subcategory');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'compact' | 'grouped'>('list');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const subcategories = sitesTree[categoryName] || [];

  const handleSubcategoryClick = (sub: string) => {
    if (subcategoryParam === sub) {
      searchParams.delete('subcategory');
    } else {
      searchParams.set('subcategory', sub);
    }
    setSearchParams(searchParams);
  };

  const filteredSites = useMemo(() => {
    return sites.filter(site => {
      const matchCat = site.category === categoryName;
      const matchSubcat = subcategoryParam ? site.subcategory === subcategoryParam : true;
      const matchSearch = searchQuery 
        ? site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          site.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
          site.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
      
      return matchCat && matchSubcat && matchSearch;
    });
  }, [categoryName, subcategoryParam, searchQuery]);

  return (
    <div className="page-container">
      {/* Refined Breadcrumb & Header */}
      <div className="flex flex-col gap-6 mb-8">
        <nav className="flex items-center gap-2 text-xs font-medium text-muted uppercase tracking-wider">
          <button onClick={() => navigate('/app/sites')} className="hover:text-primary transition-colors">Sites Vault</button>
          <ChevronRight size={14} />
          <span className="text-primary">{categoryName}</span>
        </nav>
        
        <div className="page-header m-0 p-0">
          <h1 className="page-title">{categoryName} <span className="text-muted text-lg font-normal">({filteredSites.length})</span></h1>
          <p className="page-subtitle">Explore curated {categoryName.toLowerCase()} resources, portals, and references.</p>
        </div>

        {/* Proper Subcategory Chips */}
        {subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button 
              className={`qs-chip ${!subcategoryParam ? 'active' : ''}`}
              onClick={() => {
                searchParams.delete('subcategory');
                setSearchParams(searchParams);
              }}
            >
              All {categoryName}
            </button>
            {subcategories.map(sub => (
              <button 
                key={sub} 
                className={`qs-chip ${subcategoryParam === sub ? 'active' : ''}`}
                onClick={() => handleSubcategoryClick(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="page-toolbar">
        <div className="toolbar-left">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:border-accent"
              placeholder="Search in category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="toolbar-right">
          <select className="secondary-btn" style={{ padding: '6px 12px', borderRadius: '8px' }}>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
            <option value="az">A-Z</option>
          </select>
          <button className="secondary-btn flex items-center gap-2 px-3 py-1.5 rounded-lg" onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}>
            <Filter size={14} /> Filters
          </button>
          
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/5">
            <button className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/50'}`} onClick={() => setViewMode('list')}><List size={16} /></button>
            <button className={`p-1.5 rounded-md ${viewMode === 'compact' ? 'bg-white/10 text-white' : 'text-white/50'}`} onClick={() => setViewMode('compact')}><LayoutList size={16} /></button>
            <button className={`p-1.5 rounded-md ${viewMode === 'grouped' ? 'bg-white/10 text-white' : 'text-white/50'}`} onClick={() => setViewMode('grouped')}><LayoutGrid size={16} /></button>
          </div>
        </div>
      </div>
      
      {/* Drawer Placeholder */}
      {filterDrawerOpen && (
        <div className="sc-filter-drawer">
          <div className="filter-drawer-header">
            <h3>Filters</h3>
            <span className="filter-count">0 active</span>
          </div>
          <div className="filter-drawer-body">
            <div className="filter-group">
              <label>Access Type</label>
              <div className="filter-options">
                <label className="custom-checkbox-label"><input type="checkbox" /> Free</label>
                <label className="custom-checkbox-label"><input type="checkbox" /> Paid</label>
                <label className="custom-checkbox-label"><input type="checkbox" /> Subscription</label>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`sc-results ${viewMode}`}>
        {filteredSites.length > 0 ? (
          filteredSites.map(site => (
            <SiteListRow 
              key={site.id} 
              site={site} 
              onClick={() => navigate(`/app/sites/${site.id}`)}
            />
          ))
        ) : (
          <div className="mt-8">
            <EmptyStatePanel 
              title="No sites found" 
              description="Try adjusting your search or filters to find what you're looking for." 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SitesCategory;
