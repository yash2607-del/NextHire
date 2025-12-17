import React from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";

const navLinks = [
  { label: "My Jobs", path: "/dashboard" },
  { label: "Post a Job", path: "/RecruiterForm" },
  { label: "Settings", path: "/settings" },
  { label: "My Profile", path: "/profile" },
];

function RecruiterLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Responsive: collapse sidebar on small screens
  React.useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f7faff" }}>
      {/* Sidebar */}
      <nav
        className={`d-flex flex-column p-3 bg-white shadow-sm position-relative ${sidebarOpen ? "" : "d-none d-md-flex"}`}
        style={{ width: sidebarOpen ? 250 : 0, minHeight: "100vh", transition: "width 0.2s" }}
        aria-label="Recruiter navigation"
      >
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 style={{ fontWeight: 700, letterSpacing: 1, color: "#0d47a1" }}>Recruiter</h3>
          <button
            className="btn btn-sm btn-outline-secondary d-md-none"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={() => setSidebarOpen((open) => !open)}
            style={{ marginLeft: 8 }}
          >
            {sidebarOpen ? <span aria-hidden>×</span> : <span aria-hidden>☰</span>}
          </button>
        </div>
        <ul className="nav flex-column gap-2" style={{ listStyle: "none", paddingLeft: 0 }}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => `btn btn-link text-start w-100 ${isActive ? "fw-bold text-primary" : "text-dark"}`}
                style={({ isActive }) => ({ textDecoration: "none", background: isActive ? "#e3f0fc" : "transparent", borderRadius: 6 })}
                aria-label={link.label}
                tabIndex={0}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4 d-flex flex-column gap-2">
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              localStorage.removeItem("token");
              // clear any user-specific keys if used
              try { localStorage.removeItem("user"); } catch(e) {}
              window.location.href = "/login";
            }}
            aria-label="Logout"
          >
            Logout
          </button>
          <small className="text-secondary">&copy; {new Date().getFullYear()} NextHire</small>
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-grow-1 p-4" style={{ minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default RecruiterLayout;
