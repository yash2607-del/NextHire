import React, { useState, useEffect } from "react";
import "./ApplicantProfile.css";
import { initScrollReveal, initStaggerReveal, pageTransition } from "../../utils/animations";
import { getUserProfile, getUserApplications } from "../../api";

export default function ApplicantProfile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ applications: 0, interviews: 0, offers: 0, profileViews: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        // Fetch applications for stats
        try {
          const appsRes = await getUserApplications();
          const applications = Array.isArray(appsRes.data) 
            ? appsRes.data 
            : Array.isArray(appsRes.data?.applications) 
            ? appsRes.data.applications 
            : [];
          
          // Calculate stats from applications
          const totalApps = applications.length;
          const interviews = applications.filter(app => 
            app.status?.toLowerCase().includes('interview')
          ).length;
          const offers = applications.filter(app => 
            app.status?.toLowerCase().includes('accept') || 
            app.status?.toLowerCase().includes('offer')
          ).length;
          
          setStats({
            applications: totalApps,
            interviews,
            offers,
            profileViews: Math.floor(Math.random() * 50) + 20 // Mock data for now
          });
        } catch (appErr) {
          console.error("Error fetching applications:", appErr);
        }

      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.error || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="applicant-profile-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="applicant-profile-page">
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  // Use actual user data
  const profileData = {
    name: user?.name || "User",
    title: user?.jobTitle || user?.experience || "Job Seeker",
    email: user?.email || "",
    phone: user?.phone || "Not provided",
    location: user?.location || "Not specified",
    avatar: user?.name?.[0]?.toUpperCase() || "U",
    status: "Available",
    about: `Motivated professional looking for opportunities in ${user?.jobType || 'various roles'}. ${user?.experience ? `Experience level: ${user.experience}.` : ''}`,
    skills: user?.skills || [
      "Communication", "Problem Solving", "Team Collaboration", 
      "Time Management", "Adaptability", "Critical Thinking"
    ],
    experience: user?.workExperience || [],
    education: user?.education || [],
    stats: stats,
    preferences: {
      jobType: user?.jobType || "Not specified",
      salaryRange: user?.salaryRange || "Negotiable",
      remote: user?.remote || user?.jobType || "Any",
      willingToRelocate: user?.willingToRelocate || "Open to discuss"
    }
  };


  return (
    <div className="applicant-profile-page page-enter">
      {/* Header with Avatar and Basic Info */}
      <div className="profile-header fade-in-up" style={{'--delay': '0.1s'}}>
        <div className="profile-header-content">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {profileData.avatar}
            </div>
            <div className="profile-status-badge">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="4" fill="currentColor"/>
              </svg>
              {profileData.status}
            </div>
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">{profileData.name}</h1>
            <p className="profile-title">{profileData.title}</p>
            <div className="profile-meta">
              <div className="profile-meta-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {profileData.location}
              </div>
              <div className="profile-meta-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {profileData.email}
              </div>
              <div className="profile-meta-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {profileData.phone}
              </div>
            </div>
            <div className="profile-actions">
              <button className="profile-btn profile-btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Edit Profile
              </button>
              <button className="profile-btn profile-btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="profile-stats stagger-container">
        <div className="stat-card stagger-item hover-card" data-scroll-reveal>
          <div className="stat-icon blue">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="stat-info">
            <div className="stat-value">{profileData.stats.applications}</div>
            <div className="stat-label">Applications</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="stat-info">
            <div className="stat-value">{profileData.stats.interviews}</div>
            <div className="stat-label">Interviews</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-info">
            <div className="stat-value">{profileData.stats.offers}</div>
            <div className="stat-label">Job Offers</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="stat-info">
            <div className="stat-value">{profileData.stats.profileViews}</div>
            <div className="stat-label">Profile Views</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content-grid">
        <div>
          {/* About Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2 className="section-title">
                <svg className="section-title-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
                About
              </h2>
              <button className="section-action">Edit</button>
            </div>
            <p className="about-text">{profileData.about}</p>
          </div>

          {/* Skills Section */}
          <div className="profile-section" style={{ marginTop: "32px" }}>
            <div className="section-header">
              <h2 className="section-title">
                <svg className="section-title-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Skills & Expertise
              </h2>
              <button className="section-action">Manage</button>
            </div>
            <div className="skills-grid">
              {profileData.skills.map((skill, index) => (
                <div key={index} className="skill-tag">{skill}</div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="profile-section" style={{ marginTop: "32px" }}>
            <div className="section-header">
              <h2 className="section-title">
                <svg className="section-title-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Work Experience
              </h2>
              <button className="section-action">Add</button>
            </div>
            <div className="experience-timeline">
              {profileData.experience.length > 0 ? (
                profileData.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <h3 className="experience-role">{exp.role}</h3>
                      <p className="experience-company">{exp.company}</p>
                    </div>
                    <div className="experience-date">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      {exp.date}
                    </div>
                    <p className="experience-description">{exp.description}</p>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No work experience added yet. Click "Add" to include your professional background.</p>
                </div>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="profile-section" style={{ marginTop: "32px" }}>
            <div className="section-header">
              <h2 className="section-title">
                <svg className="section-title-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 10L12 5L2 10L12 15L22 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 12V17C6 17 8 19 12 19C16 19 18 17 18 17V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Education
              </h2>
              <button className="section-action">Add</button>
            </div>
            {profileData.education.length > 0 ? (
              profileData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h3 className="education-degree">{edu.degree}</h3>
                  <p className="education-school">{edu.school}</p>
                  <p className="education-date">{edu.date}</p>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No education history added yet. Click "Add" to include your academic background.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Contact Info */}
          <div className="profile-section">
            <div className="section-header">
              <h2 className="section-title">
                <svg className="section-title-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Contact Info
              </h2>
            </div>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="contact-info-text">
                  <p className="contact-info-label">Email</p>
                  <p className="contact-info-value">{profileData.email}</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-info-text">
                  <p className="contact-info-label">Phone</p>
                  <p className="contact-info-value">{profileData.phone}</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="contact-info-text">
                  <p className="contact-info-label">Location</p>
                  <p className="contact-info-value">{profileData.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Preferences */}
          <div className="profile-section" style={{ marginTop: "24px" }}>
            <div className="section-header">
              <h2 className="section-title">
                <svg className="section-title-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Job Preferences
              </h2>
              <button className="section-action">Edit</button>
            </div>
            <div className="preferences-list">
              <div className="preference-item">
                <span className="preference-label">Job Type</span>
                <span className="preference-value">{profileData.preferences.jobType}</span>
              </div>
              <div className="preference-item">
                <span className="preference-label">Salary Range</span>
                <span className="preference-value">{profileData.preferences.salaryRange}</span>
              </div>
              <div className="preference-item">
                <span className="preference-label">Work Mode</span>
                <span className="preference-value">{profileData.preferences.remote}</span>
              </div>
              <div className="preference-item">
                <span className="preference-label">Relocate</span>
                <span className="preference-value">{profileData.preferences.willingToRelocate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
