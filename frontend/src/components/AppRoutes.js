import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import DashboardLayout from './DashboardLayout';
import Dashboard from './Dashboard';
import StudentPanel from './StudentPanel';
import LecturerPanel from './LecturerPanel';
import AdminPanel from './AdminPanel';
import Courses from './Courses';

import HomePage from './HomePage';
import AboutUs from './AboutUs';
import EnrollCourse from './EnrollCourse';
import MessagesPage from './MessagesPage';
import StudentAssignmentView from './StudentAssignmentView';
import LecturerAssignmentPanel from './LecturerAssignmentPanel';
import LearnersProgress from './LearnersProgress';
import LecturerMaterialsUpload from './LecturerMaterialsUpload';
import ProfilePage from './ProfilePage';
import GeneralInfoPage from './GeneralInfoPage';
import Footer from './Footer';
import StudentSubmissions from './StudentSubmissions';
import GradeAssignments from './GradeAssignments';
import ViewGradesPage from './ViewGradesPage';
import StudentMaterialsView from './StudentMaterialsView';

import ManageUsers from './ManageUsers';
import AddUser from './AddUser';
import CourseEnrollment from './CourseEnrollment';
import ManageCourses from './ManageCourses';
import MonitorDashboard from './MonitorDashboard';
import StudentAnalytics from './StudentAnalytics';

import VirtualClassroom from './VirtualClassroom';
import CreateClass from './CreateClass';
import ContactInfo from './ContactInfo';

// ✅ NEW: MainLayout for global navbar on public pages
import MainLayout from './MainLayout';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/homepage" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/about" element={<MainLayout><AboutUs /></MainLayout>} />
      <Route path="/courses" element={<MainLayout><Courses /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><ContactInfo /></MainLayout>} />
      <Route path="/signin" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/enroll" element={<MainLayout><EnrollCourse /></MainLayout>} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/student" element={
        <ProtectedRoute>
          <StudentPanel />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/lecturer" element={
        <ProtectedRoute>
          <LecturerPanel />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/admin" element={
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      } />

      {/* Protected Student Routes */}
      <Route path="/messages" element={
        <ProtectedRoute>
          <DashboardLayout>
            <MessagesPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/assignments" element={
        <ProtectedRoute>
          <DashboardLayout userRole="student">
            <StudentAssignmentView />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/grades" element={
        <ProtectedRoute>
          <DashboardLayout userRole="student">
            <ViewGradesPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/materials" element={
        <ProtectedRoute>
          <DashboardLayout userRole="student">
            <StudentMaterialsView />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/profilepage" element={
        <ProtectedRoute>
          <DashboardLayout userRole="student">
            <ProfilePage />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/profile-tabs" element={
        <ProtectedRoute>
          <DashboardLayout userRole="student">
            <ProfilePage />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/account/general-info" element={
        <ProtectedRoute>
          <GeneralInfoPage />
        </ProtectedRoute>
      } />
      <Route path="/virtual-classroom" element={
        <ProtectedRoute>
          <DashboardLayout userRole="student">
            <VirtualClassroom userRole="student" />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Protected Lecturer Routes */}
      <Route path="/lecturer/assignments" element={
        <ProtectedRoute>
          <DashboardLayout userRole="lecturer">
            <LecturerAssignmentPanel />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/lecturer/learners-progress" element={
        <ProtectedRoute>
          <DashboardLayout userRole="lecturer">
            <LearnersProgress />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/lecturer/upload-materials" element={
        <ProtectedRoute>
          <DashboardLayout userRole="lecturer">
            <LecturerMaterialsUpload />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/lecturer/student-submissions" element={
        <ProtectedRoute>
          <DashboardLayout userRole="lecturer">
            <StudentSubmissions />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/lecturer/grade-quizzes" element={
        <ProtectedRoute>
          <DashboardLayout userRole="lecturer">
            <GradeAssignments />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/lecturer/create-class" element={
        <ProtectedRoute>
          <DashboardLayout userRole="lecturer">
            <CreateClass />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Protected Admin Routes */}
      <Route path="/manage-users" element={
        <ProtectedRoute>
          <DashboardLayout userRole="admin">
            <ManageUsers />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/add-user" element={
        <ProtectedRoute>
          <DashboardLayout userRole="admin">
            <AddUser />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/course-enrollment" element={
        <ProtectedRoute>
          <DashboardLayout userRole="admin">
            <CourseEnrollment />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/manage-courses" element={
        <ProtectedRoute>
          <DashboardLayout userRole="admin">
            <ManageCourses />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/monitor" element={
        <ProtectedRoute>
          <DashboardLayout userRole="admin">
            <MonitorDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/analytics" element={
        <ProtectedRoute>
          <DashboardLayout userRole="admin">
            <StudentAnalytics />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default AppRoutes;
