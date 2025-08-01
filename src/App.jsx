import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import TahfeezCourse from "./pages/TahfeezCourse";
import HalaqahDetails from "./pages/HalaqahDetails";
import Lessons from "./pages/Lessons";
import Students from "./pages/Students";
import InstructorStudents from "./pages/InstructorStudents";
import StudentProfile from "./pages/StudentProfile";
import Instructors from "./pages/Instructors";
import InstructorDetails from "./pages/InstructorDetails";
import StudentFile from "./pages/StudentFile";
import ContactTeacher from "./pages/ContactTeacher";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPasswordEmail from "./pages/ForgotPasswordEmail";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPasswordNew from "./pages/ResetPasswordNew";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-islamic-gray-light">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/tahfeez-course" element={<TahfeezCourse />} />
              <Route path="/halaqah-details" element={<HalaqahDetails />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/students" element={<Students />} />
              <Route path="/instructor-students" element={<InstructorStudents />} />
              <Route path="/student-profile/:id" element={<StudentProfile />} /> {/* ✅ تعديل */}
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/instructor-details/:id" element={<InstructorDetails />} /> {/* ✅ تعديل */}
              <Route path="/student-file" element={<StudentFile />} />
              <Route path="/contact-teacher" element={<ContactTeacher />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password-email" element={<ForgotPasswordEmail />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/reset-password-new" element={<ResetPasswordNew />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
