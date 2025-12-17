import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const navLinks = [
  { label: "Jobs", path: "/applicant/jobs" },
  { label: "My Applications", path: "/applicant/applications" },
  { label: "Settings", path: "/applicant/settings" },
  { label: "My Profile", path: "/applicant/profile" },
];

export default function ApplicantLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f7faff" }}>
      <nav className="d-flex flex-column p-3 bg-white shadow-sm" style={{ width: 240, minHeight: "100vh" }} aria-label="Applicant navigation">
        <div className="mb-4">
          <h3 style={{ fontWeight: 700, color: "#0d47a1" }}>Applicant</h3>
        </div>
        <ul className="nav flex-column gap-2" style={{ listStyle: "none", paddingLeft: 0 }}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => `btn btn-link text-start w-100 ${isActive ? "fw-bold text-primary" : "text-dark"}`}
                style={({ isActive }) => ({ textDecoration: "none", background: isActive ? "#e3f0fc" : "transparent", borderRadius: 6, padding: "10px 12px" })}
                aria-label={link.label}
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
              try { localStorage.removeItem("user"); } catch (e) {}
              window.location.href = "/login";
            }}
            aria-label="Logout"
          >
            Logout
          </button>
          <small className="text-secondary">&copy; {new Date().getFullYear()} NextHire</small>
        </div>
      </nav>
      <main className="flex-grow-1 p-4" style={{ minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
}
