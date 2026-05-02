import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Globe, PlusCircle, Settings,
  ShieldAlert, ChevronRight, FolderClosed, Compass, ShoppingBag,
  Search, Bookmark, Library, MessageSquare, CreditCard,
  ChevronDown,
} from 'lucide-react';
import { tree, resources } from '../data';
import { sitesTree, sites } from '../sitesData';
import './Sidebar.css';

type ActiveSection = 'resources' | 'sites' | 'great-hall' | 'group-buys' | 'utility';

const Sidebar = () => {
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveSection = (): ActiveSection => {
    const path = location.pathname;
    if (path.includes('/app/great-hall')) return 'great-hall';
    if (path.includes('/app/group-buys')) return 'group-buys';
    if (path.includes('/app/sites')) return 'sites';
    if (path === '/app/search' || path === '/app/bookmarks' || path === '/app/collections') return 'utility';
    return 'resources';
  };

  const activeSection = getActiveSection();
  const isSitesActive = activeSection === 'sites';
  const isGreatHallActive = activeSection === 'great-hall';
  const isGroupBuysActive = activeSection === 'group-buys';
  const showLibraryTree = activeSection === 'resources' || activeSection === 'sites';

  const activeTree = isSitesActive ? sitesTree : tree;
  const activeItems = isSitesActive ? sites : resources;
  const basePath = isSitesActive ? '/app/sites/categories' : '/app/categories';

  const toggleCategory = (cat: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCats(prev => ({ ...prev, [`${isSitesActive ? 'sites' : 'res'}-${cat}`]: !prev[`${isSitesActive ? 'sites' : 'res'}-${cat}`] }));
  };

  const goToCategory = (cat: string) => {
    navigate(`${basePath}/${cat.toLowerCase().replace(/\s+/g, '-')}`);
    setExpandedCats(prev => ({ ...prev, [`${isSitesActive ? 'sites' : 'res'}-${cat}`]: true }));
  };

  const getSubcatCount = (cat: string, subcat: string) => {
    if (isSitesActive) {
      return sites.filter(s => s.category === cat && s.subcategory === subcat).length;
    }
    return resources.filter(r => r.category === cat && r.subcategory === subcat).length;
  };

  const getCatCount = (cat: string) => {
    if (isSitesActive) {
      return sites.filter(s => s.category === cat).length;
    }
    return resources.filter(r => r.category === cat).length;
  };

  const isCatActive = (cat: string) => {
    return location.pathname.includes(`${basePath}/${cat.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const isSubcatActive = (subcat: string) => {
    const params = new URLSearchParams(location.search);
    return params.get('subcategory') === subcat;
  };

  const totalItems = activeItems.length;
  const sectionTitle = isSitesActive ? 'Site Library' : 'Resource Library';

  return (
    <aside className="flex flex-col w-[260px] h-full bg-[#101012] border-r border-white/[0.06] shrink-0 select-none">
      {/* Logo Header */}
      <div className="flex items-center gap-3 px-5 h-[56px] shrink-0 border-b border-white/[0.06]">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#6366f1] text-white">
          <Compass size={16} />
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-semibold tracking-tight text-white">Directory</span>
          <span className="text-[10px] font-medium text-[#6366f1] uppercase tracking-widest">v2.0</span>
        </div>
        <ChevronDown size={14} className="ml-auto text-white/30" />
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-1">
        <Link
          to="/app/search"
          className="flex items-center gap-2.5 h-[34px] px-3 rounded-md bg-white/[0.04] border border-white/[0.06] text-[#666] text-[13px] no-underline hover:border-white/[0.12] hover:text-[#888] transition-colors"
        >
          <Search size={14} />
          <span>Search</span>
          <kbd className="ml-auto text-[10px] font-medium text-white/20 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06]">/</kbd>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex flex-col gap-0.5 px-3 py-2">
        <NavLink to="/app" end className={({isActive}) => `sb-nav-item ${isActive && !isSitesActive ? 'active' : ''}`}>
          <Home size={16} />
          <span>Resources</span>
        </NavLink>
        <NavLink to="/app/sites" end={false} className={() => `sb-nav-item ${isSitesActive ? 'active' : ''}`}>
          <Globe size={16} />
          <span>Sites</span>
        </NavLink>
        <NavLink to="/app/great-hall" className={() => `sb-nav-item ${isGreatHallActive ? 'active' : ''}`}>
          <MessageSquare size={16} />
          <span>Great Hall</span>
        </NavLink>
        <NavLink to="/app/group-buys" className={() => `sb-nav-item ${isGroupBuysActive ? 'active' : ''}`}>
          <ShoppingBag size={16} />
          <span>Group-Buys</span>
        </NavLink>
      </nav>

      <div className="mx-3 h-px bg-white/[0.06]" />

      {/* Quick Links */}
      <nav className="flex flex-col gap-0.5 px-3 py-2">
        <NavLink to="/app/bookmarks" className={({isActive}) => `sb-nav-item ${isActive ? 'active' : ''}`}>
          <Bookmark size={16} />
          <span>Bookmarks</span>
        </NavLink>
        <NavLink to="/app/collections" className={({isActive}) => `sb-nav-item ${isActive ? 'active' : ''}`}>
          <Library size={16} />
          <span>Collections</span>
        </NavLink>
      </nav>

      {/* Library Tree - only for Resources/Sites */}
      {showLibraryTree && (
        <>
          <div className="mx-3 h-px bg-white/[0.06]" />
          <div className="flex items-center justify-between px-4 pt-3 pb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/30">{sectionTitle}</span>
            <span className="text-[10px] font-medium text-white/20">{totalItems}</span>
          </div>
          <div className="flex-1 overflow-y-auto px-3 pb-3 sb-tree-scroll">
            <div className="flex flex-col">
              {Object.keys(activeTree).map((cat) => {
                const active = isCatActive(cat);
                const hasActiveSubcat = active && activeTree[cat].some(sub => isSubcatActive(sub));
                const isExpanded = expandedCats[`${isSitesActive ? 'sites' : 'res'}-${cat}`] || active;
                const count = getCatCount(cat);

                if (count === 0) return null;

                return (
                  <div key={cat} className="flex flex-col">
                    <div
                      className={`sb-tree-parent ${active && !hasActiveSubcat ? 'active' : ''}`}
                      onClick={() => goToCategory(cat)}
                    >
                      <button
                        className={`sb-tree-toggle ${isExpanded ? 'open' : ''}`}
                        onClick={(e) => toggleCategory(cat, e)}
                      >
                        <ChevronRight size={12} />
                      </button>
                      <FolderClosed size={14} className="text-white/25 shrink-0" />
                      <span className="flex-1 min-w-0 truncate">{cat}</span>
                      <span className="text-[10px] text-white/20 font-medium tabular-nums">{count}</span>
                    </div>

                    {isExpanded && (
                      <div className="flex flex-col ml-[22px] mt-px gap-px">
                        {activeTree[cat].map(subcat => {
                          const subCount = getSubcatCount(cat, subcat);
                          if (subCount === 0) return null;
                          const subActive = active && isSubcatActive(subcat);

                          return (
                            <Link
                              key={subcat}
                              to={`${basePath}/${cat.toLowerCase().replace(/\s+/g, '-')}?subcategory=${encodeURIComponent(subcat)}`}
                              className={`sb-tree-child ${subActive ? 'active' : ''}`}
                            >
                              <span className="flex-1 min-w-0 truncate">{subcat}</span>
                              <span className="text-[10px] text-white/20 font-medium tabular-nums">{subCount}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Fill space when tree not shown */}
      {!showLibraryTree && <div className="flex-1" />}

      {/* Footer */}
      <div className="flex flex-col gap-0.5 px-3 py-3 border-t border-white/[0.06] mt-auto">
        <NavLink to="/app/membership" className={({isActive}) => `sb-nav-item ${isActive ? 'active' : ''}`}>
          <CreditCard size={16} />
          <span>Membership</span>
        </NavLink>
        <NavLink to={isSitesActive ? "/app/sites/submit" : "/app/submit"} className={({isActive}) => `sb-nav-item ${isActive ? 'active' : ''}`}>
          <PlusCircle size={16} />
          <span>Submit {isSitesActive ? 'Site' : 'Resource'}</span>
        </NavLink>
        <NavLink to="/app/admin" className={({isActive}) => `sb-nav-item ${isActive ? 'active' : ''}`}>
          <ShieldAlert size={16} />
          <span>Admin</span>
        </NavLink>
        <NavLink to="/app/settings" className={({isActive}) => `sb-nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={16} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
