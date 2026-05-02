import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { resources } from '../data';
import { sites } from '../sitesData';
import ResourceCard from '../components/ResourceCard';
import SiteListRow from '../components/SiteListRow';
import FilterDrawer, { type FilterState } from '../components/FilterDrawer';
import EmptyStatePanel from '../components/EmptyState';
import { SegmentedTabs } from '../components/SegmentedTabs';
import { Filter, LayoutGrid, LayoutList, List, X, Bookmark as BookmarkIcon, Library, Globe } from 'lucide-react';
// We don't need Category.css anymore, using global classes and Search.css results layout

type BookmarkScope = 'all' | 'resources' | 'sites';

const Bookmarks = () => {
  const navigate = useNavigate();
  // Mock bookmarked resources and sites
  const bookmarkedResources = resources.filter(r => r.isBookmarked);
  // Just for demo, take first 10 sites as bookmarks if none are explicitly set
  const explicitlyBookmarkedSites = sites.filter(s => s.isBookmarked);
  const bookmarkedSites = explicitlyBookmarkedSites.length > 0 ? explicitlyBookmarkedSites : sites.slice(0, 10);

  // Default to 'all' if there are mixed bookmarks, otherwise default to whatever exists
  const initialTab: BookmarkScope = bookmarkedResources.length > 0 && bookmarkedSites.length > 0 ? 'all' : 
                                    (bookmarkedSites.length > 0 ? 'sites' : 'resources');
                                    
  const [activeTab, setActiveTab] = useState<BookmarkScope>(initialTab);
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

  const removeFilterItem = (key: keyof FilterState, val: string | boolean) => {
    setFilters(prev => {
      if (typeof val === 'boolean') return { ...prev, [key]: false };
      return { ...prev, [key]: (prev[key] as string[]).filter(i => i !== val) };
    });
  };

  const clearAllFilters = () => setFilters({ priceTypes: [], licenses: [], tools: [], fileTypes: [], freeOnly: false, paidOnly: false });

  const filteredResources = useMemo(() => {
    if (activeTab === 'sites') return [];
    let result = bookmarkedResources;

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
  }, [bookmarkedResources, filters, sortMode, activeTab]);

  const filteredSites = useMemo(() => {
    if (activeTab === 'resources') return [];
    let result = bookmarkedSites;
    if (filters.freeOnly) result = result.filter(s => s.accessType === 'Free');
    if (filters.paidOnly) result = result.filter(s => s.accessType !== 'Free');
    
    if (sortMode === 'newest') result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    if (sortMode === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (sortMode === 'az') result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [bookmarkedSites, filters, sortMode, activeTab]);

  const activeFilters = [
    ...(filters.freeOnly ? [{ key: 'freeOnly', val: true, label: 'Free Only' }] : []),
    ...(filters.paidOnly ? [{ key: 'paidOnly', val: true, label: 'Paid Only' }] : []),
    ...filters.priceTypes.map(pt => ({ key: 'priceTypes', val: pt, label: pt })),
    ...filters.licenses.map(l => ({ key: 'licenses', val: l, label: l })),
    ...filters.tools.map(t => ({ key: 'tools', val: t, label: t })),
    ...filters.fileTypes.map(f => ({ key: 'fileTypes', val: f, label: f })),
  ] as { key: keyof FilterState; val: string | boolean; label: string }[];

  const currentCount = filteredResources.length + filteredSites.length;
  const isFiltering = activeFilters.length > 0;

  // Contextual empty states
  const renderEmptyState = () => {
    if (isFiltering) {
      return (
        <EmptyStatePanel 
          title="No matches found" 
          description="Your filters are too strict. Adjust them to see your bookmarks." 
        />
      );
    }
    
    if (activeTab === 'resources') {
      return (
        <EmptyStatePanel 
          title="No resource bookmarks" 
          description="Resources you save will appear here." 
          icon={<BookmarkIcon size={32} strokeWidth={1.5} />}
        />
      );
    }
    
    if (activeTab === 'sites') {
      return (
        <EmptyStatePanel 
          title="No site bookmarks" 
          description="Sites you save will appear here." 
          icon={<BookmarkIcon size={32} strokeWidth={1.5} />}
        />
      );
    }

    return (
      <EmptyStatePanel 
        title="No bookmarks yet" 
        description="Save resources and sites you want to access quickly later." 
        icon={<BookmarkIcon size={32} strokeWidth={1.5} />}
      />
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Bookmarks <span className="text-muted text-lg font-normal">({bookmarkedResources.length + bookmarkedSites.length})</span></h1>
        <p className="page-subtitle">Review saved resources and sites.</p>
      </div>

      <div className="mb-8">
        <SegmentedTabs<BookmarkScope>
          options={[
            { id: 'all', label: 'All Items' },
            { id: 'resources', label: 'Resources', icon: <Library size={14} />, count: bookmarkedResources.length },
            { id: 'sites', label: 'Sites', icon: <Globe size={14} />, count: bookmarkedSites.length }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="page-toolbar">
        <div className="toolbar-left">
          <span className="text-sm text-secondary font-medium">{currentCount} saved {activeTab === 'all' ? 'items' : activeTab}</span>
        </div>

        <div className="toolbar-right">
          <select className="secondary-btn" style={{ padding: '6px 12px', borderRadius: '8px' }} value={sortMode} onChange={e => setSortMode(e.target.value as any)}>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
            <option value="az">A-Z</option>
          </select>

          <button className={`secondary-btn flex items-center gap-2 px-3 py-1.5 rounded-lg ${isFiltering ? 'border-accent text-accent' : ''}`} onClick={() => setIsFilterOpen(true)}>
            <Filter size={16} />
            <span>Filters {isFiltering && `(${activeFilters.length})`}</span>
          </button>
          
          {(activeTab === 'all' || activeTab === 'resources') && (
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/5">
              <button className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/50'}`} onClick={() => setViewMode('grid')}><LayoutGrid size={16} /></button>
              <button className={`p-1.5 rounded-md ${viewMode === 'compact' ? 'bg-white/10 text-white' : 'text-white/50'}`} onClick={() => setViewMode('compact')}><LayoutList size={16} /></button>
              <button className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/50'}`} onClick={() => setViewMode('list')}><List size={16} /></button>
            </div>
          )}
        </div>
      </div>

      {isFiltering && (
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

      {currentCount === 0 ? (
        <div className="mt-8">
          {renderEmptyState()}
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {(activeTab === 'all' || activeTab === 'sites') && filteredSites.length > 0 && (
            <div className="result-group">
              <div className="section-header-compact">
                <h3>Sites</h3>
                <span className="sh-count">{filteredSites.length}</span>
              </div>
              <div className="flex flex-col gap-2">
                {filteredSites.map(item => (
                  <SiteListRow key={item.id} site={item} onClick={() => navigate(`/app/sites/${item.id}`)} />
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'resources') && filteredResources.length > 0 && (
            <div className="result-group">
              <div className="section-header-compact">
                <h3>Resources</h3>
                <span className="sh-count">{filteredResources.length}</span>
              </div>
              <div className={`resource-${viewMode}`}>
                {filteredResources.map(item => (
                  <ResourceCard key={item.id} resource={item} viewMode={viewMode} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default Bookmarks;
