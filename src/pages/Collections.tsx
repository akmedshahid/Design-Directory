import React, { useState } from 'react';
import { Library, Search, ChevronLeft, MoreHorizontal, LayoutGrid, LayoutList, List as ListIcon, Plus, Filter, FolderClosed } from 'lucide-react';
import { resources } from '../data';
import ResourceCard from '../components/ResourceCard';
import EmptyStatePanel from '../components/EmptyState';
import './Collections.css';

const mockCollections = [
  {
    id: 'c1',
    name: 'SaaS Inspiration',
    description: 'High converting landing pages and dashboards.',
    resourceIds: ['r1', 'r3', 'r5'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'c2',
    name: 'Brand Identity',
    description: 'Mockups for presenting brand guidelines.',
    resourceIds: ['r2', 'r6', 'r10'],
    updatedAt: new Date().toISOString(),
  }
];

const Collections = () => {
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'compact' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const activeCollection = mockCollections.find(c => c.id === activeCollectionId);
  const collectionResources = activeCollection 
    ? resources.filter(r => activeCollection.resourceIds.includes(r.id))
    : [];

  const filteredResources = collectionResources.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Detail View
  if (activeCollection) {
    return (
      <div className="page-container collection-detail">
        <button className="flex items-center gap-2 text-secondary hover:text-white mb-6 transition-colors" onClick={() => setActiveCollectionId(null)}>
          <ChevronLeft size={16} /> Back to Collections
        </button>

        <div className="page-header flex-row justify-between items-start">
          <div>
            <h1 className="page-title">{activeCollection.name}</h1>
            <p className="page-subtitle">{activeCollection.description}</p>
          </div>
          <button className="secondary-btn icon-only rounded-lg">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="page-toolbar">
          <div className="toolbar-left">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input 
                type="text" 
                className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:border-accent"
                placeholder="Search this collection..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <span className="text-sm text-secondary font-medium">
              {filteredResources.length} items
            </span>
          </div>
          
          <div className="toolbar-right">
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/5">
              <button className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/50'}`} onClick={() => setViewMode('grid')}><LayoutGrid size={16} /></button>
              <button className={`p-1.5 rounded-md ${viewMode === 'compact' ? 'bg-white/10 text-white' : 'text-white/50'}`} onClick={() => setViewMode('compact')}><LayoutList size={16} /></button>
              <button className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/50'}`} onClick={() => setViewMode('list')}><ListIcon size={16} /></button>
            </div>
          </div>
        </div>

        {filteredResources.length > 0 ? (
          <div className={`resource-${viewMode}`}>
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="mt-12">
            <EmptyStatePanel 
              title="No matches found" 
              description="No resources match your search in this collection." 
            />
          </div>
        )}
      </div>
    );
  }

  // Overview View
  return (
    <div className="page-container collections-overview">
      <div className="page-header flex-row justify-between items-end">
        <div>
          <h1 className="page-title">Your Collections</h1>
          <p className="page-subtitle">Curate custom folders of your favorite resources and sites.</p>
        </div>
        <button className="primary-btn rounded-lg px-4 py-2 flex items-center gap-2">
          <Plus size={16} /> Create Collection
        </button>
      </div>

      <div className="page-toolbar">
        <div className="toolbar-left">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:border-accent"
              placeholder="Search collections..." 
            />
          </div>
          <span className="text-sm text-secondary font-medium">{mockCollections.length} collections</span>
        </div>

        <div className="toolbar-right">
          <select className="secondary-btn" style={{ padding: '6px 12px', borderRadius: '8px' }}>
            <option value="newest">Recently Updated</option>
            <option value="az">A-Z</option>
          </select>
          <button className="secondary-btn flex items-center gap-2 px-3 py-1.5 rounded-lg">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      {mockCollections.length > 0 ? (
        <div className="collections-grid">
          {mockCollections.map(collection => (
            <div 
              key={collection.id} 
              className="collection-card"
              onClick={() => setActiveCollectionId(collection.id)}
            >
              <div className="collection-cover-container">
                {collection.resourceIds.length > 0 ? (
                  <div className="collection-cover-mosaic">
                    {/* Max 4 previews in a 2x2 grid */}
                    {collection.resourceIds.slice(0, 4).map((rId, i) => {
                      const r = resources.find(res => res.id === rId);
                      return (
                        <div 
                          key={i} 
                          className="mosaic-tile" 
                          style={{ background: r?.thumbnailStyle || 'var(--bg-main)' }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="collection-cover-empty">
                    <FolderClosed size={32} className="text-muted" />
                  </div>
                )}
              </div>
              <div className="collection-card-body">
                <h3>{collection.name}</h3>
                <p className="collection-card-desc">{collection.description}</p>
                <div className="collection-card-meta">
                  <span>{collection.resourceIds.length} items</span>
                  <span>Updated {new Date(collection.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <EmptyStatePanel 
            title="No collections yet" 
            description="Create a collection to start organizing resources." 
            icon={<Library size={32} strokeWidth={1.5} />} 
          />
        </div>
      )}
    </div>
  );
};

export default Collections;
