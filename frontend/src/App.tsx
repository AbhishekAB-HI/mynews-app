import { useState } from 'react'
import './App.css'
import Navbar from './Components/UserSide/Navbar';
import Loginpage from './Components/UserSide/Loginpage';
import Registerpage from './Components/UserSide/RegisterPage';
import Otppage from './Components/UserSide/otp';
import HomePage from './Components/UserSide/HomePage';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeLoginPage from './Components/UserSide/HomeLoginpage';
import Forgetpassword from './Components/UserSide/forgetpassword';
import ForgetOtppage from './Components/UserSide/forgotOtp';
import ForgetPassPage from './Components/UserSide/Forgetpasspage';
import AdminLoginpage from './Components/AdminSide/AdminLogin';
import AdminHomePage from './Components/AdminSide/Adminhome';
import { Toaster } from 'react-hot-toast';

// import './index.css'



function App() {


  return (
    <>
      <Router>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/register" element={<Registerpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/verify-otp" element={<Otppage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomeLoginPage />} />
          <Route path="/forgetpass" element={<Forgetpassword />} />
          <Route path="/forgetotp" element={<ForgetOtppage />} />
          <Route path="/ForgetPassPage" element={<ForgetPassPage />} />
          <Route path="/Adminlogin" element={<AdminLoginpage />} />
          <Route path="/Adminhome" element={<AdminHomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
