import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
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
      {/* Auth & General (with Global Nav via MainLayout) */}
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/homepage" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/about" element={<MainLayout><AboutUs /></MainLayout>} />
      <Route path="/courses" element={<MainLayout><Courses /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><ContactInfo /></MainLayout>} />
      <Route path="/signin" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/signup" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/enroll" element={<MainLayout><EnrollCourse /></MainLayout>} />
      {/* Non-global-nav pages */}
  
      <Route path="/footer" element={<Footer />} />
      <Route path="/account/general-info" element={<GeneralInfoPage />} />

      {/* Dashboard & Panels */}
      <Route path="/dashboardLayout" element={<DashboardLayout />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/student" element={<StudentPanel />} />
      <Route path="/dashboard/lecturer" element={<LecturerPanel />} />
      <Route path="/dashboard/admin" element={<AdminPanel />} />

      {/* Student Views */}
      <Route path="/messages" element={
        <DashboardLayout>
          <MessagesPage />
        </DashboardLayout>
      } />
      <Route path="/assignments" element={
        <DashboardLayout userRole="student">
          <StudentAssignmentView />
        </DashboardLayout>
      } />
      <Route path="/grades" element={
        <DashboardLayout userRole="student">
          <ViewGradesPage />
        </DashboardLayout>
      } />
      <Route path="/student/materials" element={
        <DashboardLayout userRole="student">
          <StudentMaterialsView />
        </DashboardLayout>
      } />
      <Route path="/profilepage" element={
        <DashboardLayout userRole="student">
          <ProfilePage />
        </DashboardLayout>
      } />
      <Route path="/profile-tabs" element={
        <DashboardLayout userRole="student">
          <ProfilePage />
        </DashboardLayout>
      } />
      <Route path="/virtual-classroom" element={
        <DashboardLayout userRole="student">
          <VirtualClassroom userRole="student" />
        </DashboardLayout>
      } />

      {/* Lecturer Views */}
      <Route path="/lecturer/assignments" element={
        <DashboardLayout userRole="lecturer">
          <LecturerAssignmentPanel />
        </DashboardLayout>
      } />
      <Route path="/lecturer/learners-progress" element={
        <DashboardLayout userRole="lecturer">
          <LearnersProgress />
        </DashboardLayout>
      } />
      <Route path="/lecturer/upload-materials" element={
        <DashboardLayout userRole="lecturer">
          <LecturerMaterialsUpload />
        </DashboardLayout>
      } />
      <Route path="/lecturer/student-submissions" element={
        <DashboardLayout userRole="lecturer">
          <StudentSubmissions />
        </DashboardLayout>
      } />
      <Route path="/lecturer/grade-quizzes" element={
        <DashboardLayout userRole="lecturer">
          <GradeAssignments />
        </DashboardLayout>
      } />
      <Route path="/lecturer/create-class" element={
        <DashboardLayout userRole="lecturer">
          <CreateClass />
        </DashboardLayout>
      } />

      {/* Admin Views */}
      <Route path="/manage-users" element={
        <DashboardLayout userRole="admin">
          <ManageUsers />
        </DashboardLayout>
      } />
      <Route path="/add-user" element={
        <DashboardLayout userRole="admin">
          <AddUser />
        </DashboardLayout>
      } />
      <Route path="/course-enrollment" element={
        <DashboardLayout userRole="admin">
          <CourseEnrollment />
        </DashboardLayout>
      } />
      <Route path="/manage-courses" element={
        <DashboardLayout userRole="admin">
          <ManageCourses />
        </DashboardLayout>
      } />
      <Route path="/monitor" element={
        <DashboardLayout userRole="admin">
          <MonitorDashboard />
        </DashboardLayout>
      } />
      <Route path="/analytics" element={
        <DashboardLayout userRole="admin">
          <StudentAnalytics />
        </DashboardLayout>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
