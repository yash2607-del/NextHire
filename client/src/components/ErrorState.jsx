import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorState.css';
import { ROUTES } from '../config/routes';

/**
 * Error State Component
 * Displays error messages with retry and navigation options
 */
export default function ErrorState({ 
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  showHomeButton = true,
  fullScreen = false
}) {
  const containerClass = fullScreen ? 'error-container-fullscreen' : 'error-container';
  
  return (
    <div className={containerClass} role="alert" aria-live="assertive">
      <div className="error-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      
      <h2 className="error-title">{title}</h2>
      <p className="error-message">{message}</p>
      
      <div className="error-actions">
        {onRetry && (
          <button onClick={onRetry} className="btn-error-retry">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.49 9C19.9828 7.56678 19.1209 6.28536 17.9845 5.27543C16.8482 4.26551 15.4745 3.55976 13.9917 3.22426C12.5089 2.88876 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56472 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7345 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Try Again
          </button>
        )}
        {showHomeButton && (
          <Link to={ROUTES.LANDING} className="btn-error-home">
            Go to Homepage
          </Link>
        )}
      </div>
    </div>
  );
}

/**
 * 404 Not Found Component
 */
export function NotFound() {
  return (
    <div className="error-container-fullscreen">
      <div className="error-404">404</div>
      <h2 className="error-title">Page Not Found</h2>
      <p className="error-message">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="error-actions">
        <Link to={ROUTES.LANDING} className="btn-error-retry">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

/**
 * Network Error Component
 */
export function NetworkError({ onRetry }) {
  return (
    <ErrorState
      title="Connection Lost"
      message="Unable to connect to the server. Please check your internet connection and try again."
      onRetry={onRetry}
      fullScreen={false}
    />
  );
}

/**
 * Permission Denied Component
 */
export function PermissionDenied() {
  return (
    <ErrorState
      title="Access Denied"
      message="You don't have permission to view this page. Please contact your administrator if you believe this is a mistake."
      showHomeButton={true}
      fullScreen={true}
    />
  );
}
