
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Forgot from "./pages/auth/forgot/Forgot";
import Newpass from "./pages/auth/newpass/Newpass";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Landing from "./pages/landing/Landing";
import RecruiterForm from "./pages/recruiter/rec_form/RecruiterForm";
import Home from "./pages/home/Home";
import RecForm2 from "./pages/recruiter/rec_form/RecForm2";
import RecForm3 from "./pages/recruiter/rec_form/RecForm3";

import RecForm4 from "./pages/recruiter/rec_form/RecForm4";
import Review from "./pages/recruiter/rec_form/Review";
import Dashboard from "./pages/recruiter/Dashboard";
import ApplicantList from "./pages/recruiter/ApplicantList";
import JobDetails from "./pages/recruiter/JobDetails";
import RecruiterLayout from "./pages/recruiter/RecruiterLayout";
import RequireRole from "./components/RequireRole";
import ApplicantDashboard from "./pages/applicant/ApplicantDashboard";
import ApplicantLayout from "./pages/applicant/ApplicantLayout";
import MyApplications from "./pages/applicant/MyApplications";
import ApplicantProfile from "./pages/applicant/ApplicantProfile";
import Profile from "./pages/profile/Profile";
import ApplicantSettings from "./pages/applicant/ApplicantSettings";
import JobApply from "./pages/applicant/JobApply";
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";
import RecruiterSettings from "./pages/recruiter/RecruiterSettings";
import { RecruiterProvider } from "./context/RecruiterContext";
import { A11yProvider } from "./context/A11yContext";
import AccessibilityPanel from "./components/AccessibilityPanel";
import Settings from "./pages/settings/Settings";

function App() {
  return (
    <>
      <HashRouter>
        <A11yProvider>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <main id="main-content" tabIndex={-1} role="main">
          <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/newpass" element={<Newpass />} />
          <Route path="/" element={<Landing />} />
          {/* <Route path="/RecLanding" element={<RecLanding />} /> */}
          <Route path="/home" element={<Home />} />
          <Route element={<RequireRole role="recruiter"><RecruiterLayout /></RequireRole>}>
            <Route path="/recruiter/form" element={<RecruiterProvider><RecruiterForm /></RecruiterProvider>} />
            <Route path="/recruiter/form/step2" element={<RecruiterProvider><RecForm2 /></RecruiterProvider>} />
            <Route path="/recruiter/form/step3" element={<RecruiterProvider><RecForm3 /></RecruiterProvider>} />
            <Route path="/recruiter/form/step4" element={<RecruiterProvider><RecForm4 /></RecruiterProvider>} />
            <Route path="/recruiter/form/review" element={<Review />} />
            <Route path="/recruiter/dashboard" element={<Dashboard />} />
            <Route path="/recruiter/profile" element={<RecruiterProfile />} />
            <Route path="/recruiter/settings" element={<RecruiterSettings />} />
            <Route path="/recruiter/jobs/:jobId" element={<ApplicantList />} />
            {/* Legacy routes for backward compatibility */}
            <Route path="/RecruiterForm" element={<RecruiterProvider><RecruiterForm /></RecruiterProvider>} />
            <Route path="/RecForm2" element={<RecruiterProvider><RecForm2 /></RecruiterProvider>} />
            <Route path="/RecForm3" element={<RecruiterProvider><RecForm3 /></RecruiterProvider>} />
            <Route path="/RecForm4" element={<RecruiterProvider><RecForm4 /></RecruiterProvider>} />
            <Route path="/Review" element={<Review />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<RecruiterProfile />} />
            <Route path="/settings" element={<RecruiterSettings />} />
          </Route>
          <Route element={<ApplicantLayout />}>
            <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
            <Route path="/applicant/jobs" element={<ApplicantDashboard />} />
            <Route path="/applicant/applications" element={<MyApplications />} />
            <Route path="/applicant/profile" element={<ApplicantProfile />} />
            <Route path="/applicant/settings" element={<ApplicantSettings />} />
            <Route path="/applicant/jobs/:jobId/apply" element={<JobApply />} />
          </Route>
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          </Routes>
        </main>
        <AccessibilityPanel />
        </A11yProvider>
      </HashRouter>
    </>
  );
}

export default App;