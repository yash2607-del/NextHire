import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forgot from "./pages/auth/forgot/Forgot";
import Newpass from "./pages/auth/newpass/Newpass";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Landing from "./pages/landing/Landing";
import RecruiterForm from "./pages/rec_form/RecruiterForm";

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
          <Route path="/rec_form" element={<RecruiterForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;