
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ApplicantSettings from "./pages/applicant/ApplicantSettings";
import JobApply from "./pages/applicant/JobApply";
import { RecruiterProvider } from "./context/RecruiterContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/newpass" element={<Newpass />} />
          <Route path="/" element={<Landing />} />
          {/* <Route path="/RecLanding" element={<RecLanding />} /> */}
          <Route path="/home" element={<Home />} />
          <Route element={<RequireRole role="recruiter"><RecruiterLayout /></RequireRole>}>
            <Route path="/RecruiterForm" element={<RecruiterProvider><RecruiterForm /></RecruiterProvider>} />
            <Route path="/RecForm2" element={<RecruiterProvider><RecForm2 /></RecruiterProvider>} />
            <Route path="/RecForm3" element={<RecruiterProvider><RecForm3 /></RecruiterProvider>} />
            <Route path="/RecForm4" element={<RecruiterProvider><RecForm4 /></RecruiterProvider>} />
            <Route path="/Review" element={<Review />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recruiter/jobs/:jobId" element={<ApplicantList />} />
          </Route>
          <Route element={<ApplicantLayout />}>
            <Route path="/applicant/jobs" element={<ApplicantDashboard />} />
            <Route path="/applicant/applications" element={<MyApplications />} />
            <Route path="/applicant/profile" element={<ApplicantProfile />} />
            <Route path="/applicant/settings" element={<ApplicantSettings />} />
            <Route path="/applicant/jobs/:jobId/apply" element={<JobApply />} />
          </Route>
          <Route path="/jobs/:jobId" element={<JobDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;