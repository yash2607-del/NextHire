import "./App.css";
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
import RecLanding from "./pages/recruiter/recruiter_landing/RecLanding";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/newpass" element={<Newpass />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rec_form" element={<RecruiterForm />} />
          <Route path="/recruiter_landing" element={<RecLanding />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;