import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import HomePage from "./Components/HomePage";
import ServicePage from "./Components/ServicePage";
import RaiseTicketPage from "./Components/RaiseTicketPage";
import MyTicketPage from "./Components/MyTicketPage";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import AdminLoginPage from "./Components/AdminLoginPage";
import AdminDashboard from "./Components/AdminDashboard";

const Layout = () => {
  const location = useLocation();

  const hideLayoutPages = ["/login", "/register", "/admin", "/admindash"];

  const hideLayout = hideLayoutPages.includes(location.pathname);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: hideLayout ? "transparent" : "#020617",
      }}
    >
      {!hideLayout && <Navbar />}

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/services" element={<ServicePage />} />

          <Route path="/raise-ticket" element={<RaiseTicketPage />} />

          <Route path="/my-tickets" element={<MyTicketPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<SignupPage />} />

          <Route path="/admin" element={<AdminLoginPage />} />

          <Route path="/admindash" element={<AdminDashboard />} />
        </Routes>
      </div>

      {!hideLayout && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
