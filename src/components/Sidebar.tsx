import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Globe, PlusCircle, Settings,
  ShieldAlert, ChevronRight, FolderClosed, Compass, ShoppingBag,
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

  const renderLibraryTree = () => (
    <div className="tree-section">
      <div className="section-header-row">
        <div className="section-title">{sectionTitle}</div>
        <div className="section-count">{totalItems}</div>
      </div>
      <div className="tree-list">
        {Object.keys(activeTree).map((cat) => {
          const active = isCatActive(cat);
          const hasActiveSubcat = active && activeTree[cat].some(sub => isSubcatActive(sub));
          const isExpanded = expandedCats[`${isSitesActive ? 'sites' : 'res'}-${cat}`] || active;
          const count = getCatCount(cat);

          if (count === 0) return null;

          return (
            <div key={cat} className={`tree-node ${isExpanded ? 'expanded' : ''}`}>
              <div
                className={`tree-parent ${active && !hasActiveSubcat ? 'active' : ''}`}
                onClick={() => goToCategory(cat)}
              >
                <button
                  className={`tree-toggle ${isExpanded ? 'open' : ''}`}
                  onClick={(e) => toggleCategory(cat, e)}
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  <ChevronRight size={14} className="chevron-icon" />
                </button>
                <FolderClosed size={14} className="tree-cat-icon" />
                <span className="tree-label">{cat}</span>
                <span className="tree-count-pill">{count}</span>
              </div>

              {isExpanded && (
                <div className="tree-children">
                  {activeTree[cat].map(subcat => {
                    const subCount = getSubcatCount(cat, subcat);
                    if (subCount === 0) return null;

                    const subActive = active && isSubcatActive(subcat);

                    return (
                      <Link
                        key={subcat}
                        to={`${basePath}/${cat.toLowerCase().replace(/\s+/g, '-')}?subcategory=${encodeURIComponent(subcat)}`}
                        className={`tree-child ${subActive ? 'active' : ''}`}
                      >
                        <span className="tree-label">{subcat}</span>
                        <span className="tree-count-pill small">{subCount}</span>
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
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-group">
          <div className="logo-icon">
            <Compass size={18} className="logo-svg" />
          </div>
          <div className="logo-text">
            <span className="logo-title">Directory</span>
            <span className="logo-version">v2.0</span>
          </div>
        </div>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-nav-section">
          <NavLink to="/app" end className={({isActive}) => `nav-item ${isActive && !isSitesActive ? 'active' : ''}`}>
            <Home size={16} />
            <span className="nav-label">Resources</span>
          </NavLink>
          <NavLink to="/app/sites" end={false} className={() => `nav-item ${isSitesActive ? 'active' : ''}`}>
            <Globe size={16} />
            <span className="nav-label">Sites</span>
          </NavLink>
          <NavLink to="/app/great-hall" className={() => `nav-item ${isGreatHallActive ? 'active' : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span className="nav-label">Great Hall</span>
          </NavLink>
          <NavLink to="/app/group-buys" className={() => `nav-item ${isGroupBuysActive ? 'active' : ''}`}>
            <ShoppingBag size={16} />
            <span className="nav-label">Group-Buys</span>
          </NavLink>
        </div>

        {showLibraryTree && renderLibraryTree()}
      </div>

      <div className="sidebar-footer">
        <NavLink to="/app/membership" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span className="nav-label">Membership</span>
        </NavLink>
        <NavLink to={isSitesActive ? "/app/sites/submit" : "/app/submit"} className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <PlusCircle size={16} />
          <span className="nav-label">Submit {isSitesActive ? 'Site' : 'Resource'}</span>
        </NavLink>
        <NavLink to="/app/admin" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <ShieldAlert size={16} />
          <span className="nav-label">Admin</span>
        </NavLink>
        <NavLink to="/app/settings" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={16} />
          <span className="nav-label">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
