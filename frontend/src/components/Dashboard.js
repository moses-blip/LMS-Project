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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
      // If not authenticated, redirect to login
      navigate('/signin');
      return;
    }

    // Set role from user data
    setRole(user.role);
    setLoading(false);
  }, [navigate]);
  
  const renderDashboardPanel = () => {
    if (loading) {
      return <p style={{ padding: "2rem" }}>Loading...</p>;
    }

    switch (role) {
      case "admin":
        return <AdminPanel />;
      case "lecturer":
        return <LecturerPanel />;
      case "student":
        return <StudentPanel />;
      default:
        // If role is not recognized, redirect to login
        navigate('/signin');
        return null;
    }
  };

  return <DashboardLayout userRole={role}>{renderDashboardPanel()}</DashboardLayout>;
};

export default Dashboard;
