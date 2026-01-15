import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { clearAuth } from '../utils/auth';
import { ROUTES } from '../config/routes';

/**
 * Modern Sidebar Component
 * Collapsible sidebar with role-aware navigation
 * @param {string} role - User role ('recruiter' or 'applicant')
 */
export default function Sidebar({ role = 'applicant' }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate(ROUTES.LANDING);
  };

  // Define navigation items based on role
  const getNavigationItems = () => {
    if (role === 'recruiter') {
      return [
        {
          label: 'My Jobs',
          path: ROUTES.RECRUITER.DASHBOARD,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 7H15M9 12H15M9 17H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ),
        },
        {
          label: 'Post a Job',
          path: ROUTES.RECRUITER.FORM_START,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ),
        },
        {
          label: 'Settings',
          path: ROUTES.RECRUITER.SETTINGS,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ),
        },
        {
          label: 'My Profile',
          path: ROUTES.RECRUITER.PROFILE,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M6 21V19C6 17.3431 7.34315 16 9 16H15C16.6569 16 18 17.3431 18 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ),
        },
      ];
    } else {
      return [
        {
          label: 'Browse Jobs',
          path: ROUTES.APPLICANT.JOBS,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7" stroke="currentColor" strokeWidth="2"/>
            </svg>
          ),
        },
        {
          label: 'My Applications',
          path: ROUTES.APPLICANT.APPLICATIONS,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
          ),
        },
        {
          label: 'Profile',
          path: ROUTES.APPLICANT.PROFILE,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M6 21V19C6 17.3431 7.34315 16 9 16H15C16.6569 16 18 17.3431 18 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ),
        },
        {
          label: 'Settings',
          path: ROUTES.APPLICANT.SETTINGS,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ),
        },
      ];
    }
  };

  const navItems = getNavigationItems();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`} role="navigation" aria-label="Main navigation">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {!isCollapsed && <span className="sidebar-logo-text">{role === 'recruiter' ? 'Recruiter' : 'Applicant'}</span>}
        </div>

        <button
          type="button"
          className="sidebar-collapse-toggle"
          onClick={() => setIsCollapsed((v) => !v)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* User Info - Removed per screenshot design */}

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`sidebar-nav-item ${isActive(item.path) ? 'sidebar-nav-item-active' : ''}`}
                aria-current={isActive(item.path) ? 'page' : undefined}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="sidebar-nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="sidebar-nav-label">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button
          onClick={handleLogout}
          className="sidebar-logout"
          title={isCollapsed ? 'Logout' : undefined}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
