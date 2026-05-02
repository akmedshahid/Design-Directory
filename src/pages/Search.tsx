import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Filter, LayoutGrid, LayoutList, List, X, Globe, Library } from 'lucide-react';
import { resources } from '../data';
import { sites } from '../sitesData';
import ResourceCard from '../components/ResourceCard';
import SiteListRow from '../components/SiteListRow';
import FilterDrawer, { type FilterState } from '../components/FilterDrawer';
import EmptyStatePanel from '../components/EmptyState';
import { SegmentedTabs } from '../components/SegmentedTabs';
import './Search.css';

type SearchScope = 'all' | 'resources' | 'sites';

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortMode, setSortMode] = useState<'newest' | 'rating' | 'az'>('newest');
  const [searchScope, setSearchScope] = useState<SearchScope>('all');

  const [filters, setFilters] = useState<FilterState>({
    priceTypes: [],
    licenses: [],
    tools: [],
    fileTypes: [],
    freeOnly: false,
    paidOnly: false,
  });

  const removeFilterItem = (key: keyof FilterState, val: string | boolean) => {
    setFilters(prev => {
      if (typeof val === 'boolean') return { ...prev, [key]: false };
      return { ...prev, [key]: (prev[key] as string[]).filter(i => i !== val) };
    });
  };

  const clearAllFilters = () => setFilters({ priceTypes: [], licenses: [], tools: [], fileTypes: [], freeOnly: false, paidOnly: false });

  const { filteredResources, filteredSites } = useMemo(() => {
    if (!query.trim() && Object.values(filters).every(v => Array.isArray(v) ? v.length === 0 : !v)) {
      return { filteredResources: [], filteredSites: [] };
    }

    let resResult = resources;
    let siteResult = sites;

    if (query.trim()) {
      const q = query.toLowerCase();
      resResult = resResult.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      );
      
      siteResult = siteResult.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.domain.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    if (filters.freeOnly) {
      resResult = resResult.filter(r => r.priceType === 'Free');
      siteResult = siteResult.filter(s => s.accessType === 'Free');
    }
    if (filters.paidOnly) {
      resResult = resResult.filter(r => r.priceType !== 'Free');
      siteResult = siteResult.filter(s => s.accessType !== 'Free');
    }
    
    if (filters.priceTypes.length > 0) resResult = resResult.filter(r => filters.priceTypes.includes(r.priceType));
    if (filters.licenses.length > 0) resResult = resResult.filter(r => filters.licenses.includes(r.license));
    if (filters.tools.length > 0) resResult = resResult.filter(r => r.tools.some(t => filters.tools.includes(t)));
    if (filters.fileTypes.length > 0) resResult = resResult.filter(r => r.fileTypes.some(f => filters.fileTypes.includes(f)));

    if (sortMode === 'newest') {
      resResult.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      siteResult.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    } else if (sortMode === 'rating') {
      resResult.sort((a, b) => b.rating - a.rating);
      siteResult.sort((a, b) => b.rating - a.rating);
    } else if (sortMode === 'az') {
      resResult.sort((a, b) => a.title.localeCompare(b.title));
      siteResult.sort((a, b) => a.name.localeCompare(b.name));
    }

    return { filteredResources: resResult, filteredSites: siteResult };
  }, [query, filters, sortMode]);

  const displayResources = searchScope === 'all' || searchScope === 'resources' ? filteredResources : [];
  const displaySites = searchScope === 'all' || searchScope === 'sites' ? filteredSites : [];
  
  const totalResults = displayResources.length + displaySites.length;
  const isSearching = query.trim().length > 0 || Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : !!v);

  const activeFilters = [
    ...(filters.freeOnly ? [{ key: 'freeOnly', val: true, label: 'Free Only' }] : []),
    ...(filters.paidOnly ? [{ key: 'paidOnly', val: true, label: 'Paid Only' }] : []),
    ...filters.priceTypes.map(pt => ({ key: 'priceTypes', val: pt, label: pt })),
    ...filters.licenses.map(l => ({ key: 'licenses', val: l, label: l })),
    ...filters.tools.map(t => ({ key: 'tools', val: t, label: t })),
    ...filters.fileTypes.map(f => ({ key: 'fileTypes', val: f, label: f })),
  ] as { key: keyof FilterState; val: string | boolean; label: string }[];

  return (
    <div className="page-container search-page">
      <div className="page-header text-center">
        <h1 className="page-title justify-center">Search</h1>
        <p className="page-subtitle mx-auto">Search resources, sites, categories, tools, and saved entries.</p>
      </div>

      <div className="search-panel">
        <div className="sp-input-container">
          <SearchIcon className="sp-icon" size={20} />
          <input 
            type="text" 
            className="sp-input" 
            placeholder="Search by keyword, tag, or domain..." 
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {query ? (
            <button className="sp-clear" onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          ) : (
            <div className="sp-hint">⌘K</div>
          )}
        </div>
        
        <div className="sp-tabs-wrapper">
          <SegmentedTabs<SearchScope>
            options={[
              { id: 'all', label: 'All Results' },
              { id: 'resources', label: 'Resources', icon: <Library size={14} /> },
              { id: 'sites', label: 'Sites', icon: <Globe size={14} /> }
            ]}
            activeTab={searchScope}
            onChange={setSearchScope}
            size="lg"
          />
        </div>
      </div>

      {!isSearching ? (
        <div className="search-empty-flow">
          <div className="quick-scopes">
            <span className="qs-label">Quick Scopes:</span>
            <button className="qs-chip" onClick={() => setFilters(prev => ({...prev, priceTypes: ['Free']}))}>Free Resources</button>
            <button className="qs-chip" onClick={() => { setSearchScope('sites'); setQuery('design'); }}>Design Sites</button>
            <button className="qs-chip" onClick={() => setFilters(prev => ({...prev, tools: ['Figma']}))}>Figma Resources</button>
          </div>
          
          <div className="mt-12">
            <EmptyStatePanel 
              title="Start searching" 
              description="Type a keyword or use filters to explore resources and sites." 
              icon={<SearchIcon size={32} strokeWidth={1.5} />}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="page-toolbar">
            <div className="toolbar-left">
              <span className="text-sm text-secondary font-medium">{totalResults} results found</span>
            </div>

            <div className="toolbar-right">
              <select className="secondary-btn" style={{ padding: '6px 12px', borderRadius: '8px' }} value={sortMode} onChange={e => setSortMode(e.target.value as any)}>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
                <option value="az">A-Z</option>
              </select>

              <button className={`secondary-btn flex items-center gap-2 px-3 py-1.5 rounded-lg ${activeFilters.length > 0 ? 'border-accent text-accent' : ''}`} onClick={() => setIsFilterOpen(true)}>
                <Filter size={16} />
                <span>Filters {activeFilters.length > 0 && `(${activeFilters.length})`}</span>
              </button>
              
              <div className="flex bg-white/5 rounded-lg p-1 border border-white/5">
                <button className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/50'}`} onClick={() => setViewMode('grid')}><LayoutGrid size={16} /></button>
                <button className={`p-1.5 rounded-md ${viewMode === 'compact' ? 'bg-white/10 text-white' : 'text-white/50'}`} onClick={() => setViewMode('compact')}><LayoutList size={16} /></button>
                <button className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/50'}`} onClick={() => setViewMode('list')}><List size={16} /></button>
              </div>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 items-center">
              <span className="text-xs text-muted font-medium uppercase tracking-wider mr-2">Active Filters:</span>
              {activeFilters.map(f => (
                <div key={`${f.key}-${f.val}`} className="flex items-center gap-1 bg-white/10 border border-white/10 px-2 py-1 rounded-md text-xs">
                  {f.label}
                  <button onClick={() => removeFilterItem(f.key, f.val)} className="hover:text-white text-white/60 ml-1"><X size={12} /></button>
                </div>
              ))}
              <button className="text-xs text-accent hover:text-white ml-2 transition-colors" onClick={clearAllFilters}>Clear all</button>
            </div>
          )}

          {totalResults > 0 ? (
            <div className="search-results-mixed flex flex-col gap-10">
              {displaySites.length > 0 && (
                <div className="result-group">
                  <div className="section-header-compact">
                    <h3>Sites</h3>
                    <span className="sh-count">{displaySites.length}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {displaySites.map(site => (
                      <SiteListRow key={site.id} site={site} onClick={() => navigate(`/app/sites/${site.id}`)} />
                    ))}
                  </div>
                </div>
              )}
              
              {displayResources.length > 0 && (
                <div className="result-group">
                  <div className="section-header-compact">
                    <h3>Resources</h3>
                    <span className="sh-count">{displayResources.length}</span>
                  </div>
                  <div className={`resource-${viewMode}`}>
                    {displayResources.map(item => (
                      <ResourceCard key={item.id} resource={item} viewMode={viewMode} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyStatePanel 
              title="No matches found" 
              description="We couldn't find anything matching your search and filters." 
            />
          )}
        </>
      )}

      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default Search;
