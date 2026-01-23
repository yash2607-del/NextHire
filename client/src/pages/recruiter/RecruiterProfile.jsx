import React, { useState, useEffect, useRef } from "react";
import "./RecruiterProfile.css";
import { initScrollReveal, initStaggerReveal, pageTransition } from "../../utils/animations";
import { getUserProfile, getRecruiterJobs } from "../../api";
import { extractError } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function RecruiterProfile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ jobsPosted: 0, activeJobs: 0, totalApplicants: 0, hiredCandidates: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState(0);
  const navigate = useNavigate();
  
  // Refs for scroll tracking
  const sectionsRef = useRef([]);
  const containerRef = useRef(null);

  // Section data for the left panel images
  const sectionData = [
    {
      id: 'overview',
      title: 'Overview',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      color: '#5B9BD5'
    },
    {
      id: 'company',
      title: 'Company',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21H21M9 8H10M9 12H10M9 16H10M14 8H15M14 12H15M14 16H15M5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#10B981'
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      color: '#8B5CF6'
    },
    {
      id: 'actions',
      title: 'Quick Actions',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#F59E0B'
    }
  ];

  useEffect(() => {
    // Initialize animations
    pageTransition();
    initScrollReveal();
    initStaggerReveal();

    // Fetch user profile and stats
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Fetch profile
        const profileRes = await getUserProfile();
        setUser(profileRes.data);

        // Fetch jobs for stats
        try {
          const jobsRes = await getRecruiterJobs();
          const jobs = Array.isArray(jobsRes.data) 
            ? jobsRes.data 
            : Array.isArray(jobsRes.data?.jobs) 
            ? jobsRes.data.jobs 
            : [];
          
          // Calculate stats from jobs
          const totalJobs = jobs.length;
          const activeJobs = jobs.filter(job => 
            job.status?.toLowerCase() === 'active' || job.status?.toLowerCase() === 'open'
          ).length || totalJobs;
          const totalApplicants = jobs.reduce((sum, job) => 
            sum + (job.applicants?.length || job.applicationCount || 0), 0
          );
          const hiredCandidates = jobs.reduce((sum, job) => {
            const hired = job.applicants?.filter(app => 
              app.status?.toLowerCase().includes('hired') || 
              app.status?.toLowerCase().includes('accepted')
            ).length || 0;
            return sum + hired;
          }, 0);
          
          setStats({
            jobsPosted: totalJobs,
            activeJobs: activeJobs,
            totalApplicants,
            hiredCandidates
          });
        } catch (jobErr) {
          console.error("Error fetching jobs:", jobErr);
        }

      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(extractError(err) || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Scroll tracking effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = containerRef.current;
      if (!scrollContainer) return;

      const scrollTop = scrollContainer.scrollTop;
      const containerHeight = scrollContainer.clientHeight;

      // Find which section is most visible
      let currentSection = 0;
      let maxVisibility = 0;

      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        
        // Calculate how much of the section is visible
        const sectionTop = rect.top - containerRect.top;
        const sectionBottom = rect.bottom - containerRect.top;
        
        const visibleTop = Math.max(0, sectionTop);
        const visibleBottom = Math.min(containerHeight, sectionBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        if (visibleHeight > maxVisibility) {
          maxVisibility = visibleHeight;
          currentSection = index;
        }
      });

      setActiveSection(currentSection);
    };

    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loading]);

  const scrollToSection = (index) => {
    const section = sectionsRef.current[index];
    if (section && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const scrollTop = containerRef.current.scrollTop + (sectionRect.top - containerRect.top) - 20;
      
      containerRef.current.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="recruiter-profile-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recruiter-profile-page">
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  // Use actual user data
  const profileData = {
    name: user?.name || "Recruiter",
    title: user?.jobTitle || "Hiring Manager",
    email: user?.email || "",
    phone: user?.phone || "Not provided",
    location: user?.location || "Not specified",
    company: user?.company || "Company",
    industry: user?.industry || "Technology",
    avatar: user?.name?.[0]?.toUpperCase() || "R",
    status: "Hiring",
    about: `Talent acquisition professional at ${user?.company || 'a growing company'}. ${user?.industry ? `Specializing in ${user.industry} industry recruitment.` : 'Looking for exceptional talent to join our team.'}`,
    stats: stats,
    companyInfo: {
      name: user?.company || "Not specified",
      industry: user?.industry || "Not specified",
      location: user?.location || "Not specified",
      website: user?.website || "Not provided"
    }
  };

  return (
    <div className="recruiter-profile-page page-enter">
      <div className="profile-scroll-layout">
        {/* Left Sticky Panel */}
        <div className="profile-left-panel">
          <div className="profile-left-sticky">
            {/* Avatar with changing icon */}
            <div className="profile-avatar-container">
              <div className="profile-avatar-main">
                {profileData.avatar}
              </div>
              <div 
                className="profile-section-icon"
                style={{ backgroundColor: sectionData[activeSection]?.color }}
              >
                {sectionData[activeSection]?.icon}
              </div>
            </div>

            {/* Name and Title */}
            <h1 className="profile-name-left">{profileData.name}</h1>
            <p className="profile-title-left">{profileData.title}</p>
            <p className="profile-company-left">{profileData.company}</p>

            {/* Section Navigation with Progress Line */}
            <div className="profile-nav-timeline">
              <div className="timeline-progress-line">
                <div 
                  className="timeline-progress-fill"
                  style={{ height: `${(activeSection / (sectionData.length - 1)) * 100}%` }}
                />
              </div>
              {sectionData.map((section, index) => (
                <button
                  key={section.id}
                  className={`timeline-item ${activeSection === index ? 'active' : ''} ${index < activeSection ? 'completed' : ''}`}
                  onClick={() => scrollToSection(index)}
                >
                  <div 
                    className="timeline-dot"
                    style={{ 
                      backgroundColor: index <= activeSection ? section.color : '#E5E7EB',
                      borderColor: index <= activeSection ? section.color : '#E5E7EB'
                    }}
                  />
                  <span className="timeline-label">{section.title}</span>
                </button>
              ))}
            </div>

            {/* Quick Stats Mini */}
            <div className="profile-quick-stats">
              <div className="quick-stat-item">
                <span className="quick-stat-value">{profileData.stats.jobsPosted}</span>
                <span className="quick-stat-label">Jobs</span>
              </div>
              <div className="quick-stat-item">
                <span className="quick-stat-value">{profileData.stats.totalApplicants}</span>
                <span className="quick-stat-label">Applicants</span>
              </div>
              <div className="quick-stat-item">
                <span className="quick-stat-value">{profileData.stats.hiredCandidates}</span>
                <span className="quick-stat-label">Hired</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="profile-left-actions">
              <button className="profile-btn-edit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Edit Profile
              </button>
              <button 
                className="profile-btn-post"
                onClick={() => navigate('/recruiter/form')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Post Job
              </button>
            </div>
          </div>
        </div>

        {/* Right Scrollable Content */}
        <div className="profile-right-content" ref={containerRef}>
          {/* Overview Section */}
          <section 
            ref={el => sectionsRef.current[0] = el}
            className="profile-section-card"
            id="overview"
          >
            <div className="section-card-header">
              <div className="section-card-icon" style={{ backgroundColor: '#5B9BD5' }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h2 className="section-card-title">Overview</h2>
              <button className="section-edit-btn">Edit</button>
            </div>
            
            <div className="overview-content">
              <p className="about-text">{profileData.about}</p>
              
              <div className="overview-stats-grid">
                <div className="overview-stat-card">
                  <div className="overview-stat-icon blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="overview-stat-info">
                    <span className="overview-stat-value">{profileData.stats.jobsPosted}</span>
                    <span className="overview-stat-label">Jobs Posted</span>
                  </div>
                </div>

                <div className="overview-stat-card">
                  <div className="overview-stat-icon green">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="overview-stat-info">
                    <span className="overview-stat-value">{profileData.stats.activeJobs}</span>
                    <span className="overview-stat-label">Active Jobs</span>
                  </div>
                </div>

                <div className="overview-stat-card">
                  <div className="overview-stat-icon purple">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="overview-stat-info">
                    <span className="overview-stat-value">{profileData.stats.totalApplicants}</span>
                    <span className="overview-stat-label">Total Applicants</span>
                  </div>
                </div>

                <div className="overview-stat-card">
                  <div className="overview-stat-icon orange">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="overview-stat-info">
                    <span className="overview-stat-value">{profileData.stats.hiredCandidates}</span>
                    <span className="overview-stat-label">Hired</span>
                  </div>
                </div>
              </div>

              <div className="overview-meta">
                <div className="overview-meta-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>{profileData.location}</span>
                </div>
                <div className="overview-meta-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>{profileData.industry}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Company Section */}
          <section 
            ref={el => sectionsRef.current[1] = el}
            className="profile-section-card"
            id="company"
          >
            <div className="section-card-header">
              <div className="section-card-icon" style={{ backgroundColor: '#10B981' }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21H21M9 8H10M9 12H10M9 16H10M14 8H15M14 12H15M14 16H15M5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="section-card-title">Company Information</h2>
              <button className="section-edit-btn">Edit</button>
            </div>
            
            <div className="company-info-grid">
              <div className="company-info-item">
                <div className="company-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21H21M9 8H10M9 12H10M9 16H10M14 8H15M14 12H15M14 16H15M5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="company-info-text">
                  <span className="company-info-label">Company Name</span>
                  <span className="company-info-value">{profileData.companyInfo.name}</span>
                </div>
              </div>

              <div className="company-info-item">
                <div className="company-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="company-info-text">
                  <span className="company-info-label">Industry</span>
                  <span className="company-info-value">{profileData.companyInfo.industry}</span>
                </div>
              </div>

              <div className="company-info-item">
                <div className="company-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="company-info-text">
                  <span className="company-info-label">Location</span>
                  <span className="company-info-value">{profileData.companyInfo.location}</span>
                </div>
              </div>

              <div className="company-info-item">
                <div className="company-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="company-info-text">
                  <span className="company-info-label">Website</span>
                  <span className="company-info-value">{profileData.companyInfo.website}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section 
            ref={el => sectionsRef.current[2] = el}
            className="profile-section-card"
            id="contact"
          >
            <div className="section-card-header">
              <div className="section-card-icon" style={{ backgroundColor: '#8B5CF6' }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h2 className="section-card-title">Contact Information</h2>
              <button className="section-edit-btn">Edit</button>
            </div>
            
            <div className="contact-cards-grid">
              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">Email Address</span>
                  <span className="contact-card-value">{profileData.email}</span>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">Phone Number</span>
                  <span className="contact-card-value">{profileData.phone}</span>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="contact-card-info">
                  <span className="contact-card-label">Location</span>
                  <span className="contact-card-value">{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="account-details-section">
              <h3 className="account-details-title">Account Details</h3>
              <div className="account-details-grid">
                <div className="account-detail-item">
                  <span className="account-detail-label">Role</span>
                  <span className="account-detail-value role-badge">Recruiter</span>
                </div>
                <div className="account-detail-item">
                  <span className="account-detail-label">Status</span>
                  <span className="account-detail-value status-active">Active</span>
                </div>
                <div className="account-detail-item">
                  <span className="account-detail-label">Member Since</span>
                  <span className="account-detail-value">2024</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions Section */}
          <section 
            ref={el => sectionsRef.current[3] = el}
            className="profile-section-card"
            id="actions"
          >
            <div className="section-card-header">
              <div className="section-card-icon" style={{ backgroundColor: '#F59E0B' }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="section-card-title">Quick Actions</h2>
            </div>
            
            <div className="actions-grid">
              <button className="action-card" onClick={() => navigate('/recruiter/form')}>
                <div className="action-card-icon blue">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="action-card-title">Post New Job</span>
                <span className="action-card-desc">Create a new job listing</span>
              </button>

              <button className="action-card" onClick={() => navigate('/recruiter/dashboard')}>
                <div className="action-card-icon green">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="action-card-title">View Dashboard</span>
                <span className="action-card-desc">Monitor your hiring activity</span>
              </button>

              <button className="action-card" onClick={() => navigate('/recruiter/settings')}>
                <div className="action-card-icon purple">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="action-card-title">Settings</span>
                <span className="action-card-desc">Manage your preferences</span>
              </button>

              <button className="action-card" onClick={() => navigate('/recruiter/dashboard')}>
                <div className="action-card-icon orange">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="action-card-title">View Applicants</span>
                <span className="action-card-desc">Review candidate applications</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
