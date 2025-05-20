// src/pages/dashboard.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout"; // ✅ Correct case
import AdminPanel from "../components/AdminPanel";           // ✅ Correct case
import LecturerPanel from "../components/LecturerPanel";     // ✅ Correct case
import StudentPanel from "../components/StudentPanel";       // ✅ Correct case

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    // TEMPORARY: Set default role for development preview
    setRole("lecturer");
  }, []);
  
  const renderDashboardPanel = () => {
    if (role === "admin") return <AdminPanel />;
    if (role === "lecturer") return <LecturerPanel />;
    if (role === "student") return <StudentPanel />;
    return <p style={{ padding: "2rem" }}>Loading...</p>;
  };

  return <DashboardLayout>{renderDashboardPanel()}</DashboardLayout>;
};

export default Dashboard;
