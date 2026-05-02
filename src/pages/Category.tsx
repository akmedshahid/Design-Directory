import React, { useState, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { resources, categories, tree } from '../data';
import ResourceCard from '../components/ResourceCard';
import FilterDrawer, { type FilterState } from '../components/FilterDrawer';
import EmptyState from '../components/EmptyState';
import { Filter, List, LayoutGrid, LayoutList, ChevronDown, X, Info } from 'lucide-react';
import { PriceBadge, LicenseBadge } from '../components/Badges';
import './Category.css';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const urlSubcat = params.get('subcategory') || 'All';

  const [viewMode, setViewMode] = useState<'grid' | 'compact' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortMode, setSortMode] = useState<'newest' | 'rating' | 'az'>('newest');

  const [filters, setFilters] = useState<FilterState>({
    priceTypes: [],
    licenses: [],
    tools: [],
    fileTypes: [],
    freeOnly: false,
    paidOnly: false,
  });

  const categoryName = categories.find(c => c.toLowerCase().replace(/ /g, '-') === slug) || 'Category';
  const subs = tree[categoryName] || [];

  const handleSubcatClick = (sub: string) => {
    if (sub === 'All') {
      navigate(`/app/categories/${slug}`);
    } else {
      navigate(`/app/categories/${slug}?subcategory=${encodeURIComponent(sub)}`);
    }
  };

  const removeFilterItem = (key: keyof FilterState, val: string | boolean) => {
    setFilters(prev => {
      if (typeof val === 'boolean') {
        return { ...prev, [key]: false };
      }
      return { ...prev, [key]: (prev[key] as string[]).filter(i => i !== val) };
    });
  };

  const allCategoryResources = useMemo(() => resources.filter(r => r.category === categoryName), [categoryName]);

  const filteredResources = useMemo(() => {
    let result = allCategoryResources;

    if (urlSubcat !== 'All') {
      result = result.filter(r => r.subcategory === urlSubcat);
    }

    if (filters.freeOnly) result = result.filter(r => r.priceType === 'Free');
    if (filters.paidOnly) result = result.filter(r => r.priceType !== 'Free');
    if (filters.priceTypes.length > 0) result = result.filter(r => filters.priceTypes.includes(r.priceType));
    if (filters.licenses.length > 0) result = result.filter(r => filters.licenses.includes(r.license));
    if (filters.tools.length > 0) result = result.filter(r => r.tools.some(t => filters.tools.includes(t)));
    if (filters.fileTypes.length > 0) result = result.filter(r => r.fileTypes.some(f => filters.fileTypes.includes(f)));

    if (sortMode === 'newest') result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    if (sortMode === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (sortMode === 'az') result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [allCategoryResources, urlSubcat, filters, sortMode]);

  const activeFilters = [
    ...(filters.freeOnly ? [{ key: 'freeOnly', val: true, label: 'Free Only' }] : []),
    ...(filters.paidOnly ? [{ key: 'paidOnly', val: true, label: 'Paid Only' }] : []),
    ...filters.priceTypes.map(pt => ({ key: 'priceTypes', val: pt, label: pt })),
    ...filters.licenses.map(l => ({ key: 'licenses', val: l, label: l })),
    ...filters.tools.map(t => ({ key: 'tools', val: t, label: t })),
    ...filters.fileTypes.map(f => ({ key: 'fileTypes', val: f, label: f })),
  ] as { key: keyof FilterState; val: string | boolean; label: string }[];

  // Analytics for the info panel
  const infoStats = useMemo(() => {
    const tools = new Set<string>();
    const licenses = new Set<string>();
    let freeCount = 0;
    
    allCategoryResources.forEach(r => {
      r.tools.forEach(t => tools.add(t));
      if (r.license) licenses.add(r.license);
      if (r.priceType === 'Free') freeCount++;
    });

    return {
      tools: Array.from(tools).slice(0, 3),
      licenses: Array.from(licenses).slice(0, 3),
      freeCount,
      totalCount: allCategoryResources.length
    };
  }, [allCategoryResources]);

  return (
    <div className="category-page">
      <div className="category-header-wrap">
        <div className="category-header">
          <div className="category-title-group">
            <h1 className="category-title">{categoryName}</h1>
            <p className="category-count">{filteredResources.length} resources</p>
          </div>
          
          <div className="category-info-panel">
            <Info size={16} className="info-icon" />
            <div className="info-stats">
              <span className="info-stat"><strong>{infoStats.freeCount}</strong> Free</span>
              <span className="info-divider">•</span>
              <span className="info-stat">Common tools: {infoStats.tools.join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="category-controls">
          <div className="subcat-scroll">
            <button 
              className={`subcat-chip ${urlSubcat === 'All' ? 'active' : ''}`}
              onClick={() => handleSubcatClick('All')}
            >
              All
            </button>
            {subs.map(sub => (
              <button 
                key={sub}
                className={`subcat-chip ${urlSubcat === sub ? 'active' : ''}`}
                onClick={() => handleSubcatClick(sub)}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="category-actions">
            <div className="sort-wrapper">
              <select 
                className="sort-select" 
                value={sortMode} 
                onChange={e => setSortMode(e.target.value as any)}
                aria-label="Sort resources"
              >
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
                <option value="az">A-Z</option>
              </select>
              <ChevronDown size={14} className="sort-icon" />
            </div>

            <button className={`action-btn filter-btn ${activeFilters.length > 0 ? 'active' : ''}`} onClick={() => setIsFilterOpen(true)}>
              <Filter size={16} />
              <span>Filters {activeFilters.length > 0 && `(${activeFilters.length})`}</span>
            </button>
            
            <div className="view-toggles">
              <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Grid View">
                <LayoutGrid size={16} />
              </button>
              <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="List View">
                <LayoutList size={16} />
              </button>
              <button className={`view-btn ${viewMode === 'compact' ? 'active' : ''}`} onClick={() => setViewMode('compact')} title="Compact View">
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="active-filters">
            {activeFilters.map(f => (
              <div key={`${f.key}-${f.val}`} className="filter-tag">
                {f.label}
                <button onClick={() => removeFilterItem(f.key, f.val)}><X size={12} /></button>
              </div>
            ))}
            <button className="clear-filters" onClick={() => setFilters({ priceTypes: [], licenses: [], tools: [], fileTypes: [], freeOnly: false, paidOnly: false })}>Clear all</button>
          </div>
        )}
      </div>

      {filteredResources.length > 0 ? (
        <div className={`resource-${viewMode}`}>
          {filteredResources.map(item => (
            <ResourceCard key={item.id} resource={item} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No resources found" 
          description="Try adjusting your filters or search terms to find what you're looking for." 
        />
      )}

      <FilterDrawer 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        filters={filters} 
        setFilters={setFilters} 
      />
    </div>
  );
};

export default Category;
