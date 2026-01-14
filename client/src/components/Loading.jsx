import React from 'react';
import './Loading.css';

/**
 * Loading Spinner Component
 * Displays loading state with optional message
 */
export default function Loading({ message = 'Loading...', fullScreen = false }) {
  const containerClass = fullScreen ? 'loading-container-fullscreen' : 'loading-container';
  
  return (
    <div className={containerClass} role="status" aria-live="polite" aria-busy="true">
      <div className="loading-spinner"></div>
      {message && <p className="loading-message">{message}</p>}
      <span className="sr-only">Loading content, please wait</span>
    </div>
  );
}

/**
 * Skeleton Loader Component
 * Displays placeholder content while loading
 */
export function SkeletonLoader({ count = 1, height = 60, className = '' }) {
  return (
    <div className={`skeleton-container ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="skeleton-item"
          style={{ height: `${height}px` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/**
 * Card Skeleton Component
 * Skeleton for card-based layouts
 */
export function CardSkeleton({ count = 3 }) {
  return (
    <div className="card-skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card-skeleton" aria-hidden="true">
          <div className="card-skeleton-image"></div>
          <div className="card-skeleton-content">
            <div className="card-skeleton-title"></div>
            <div className="card-skeleton-text"></div>
            <div className="card-skeleton-text short"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
