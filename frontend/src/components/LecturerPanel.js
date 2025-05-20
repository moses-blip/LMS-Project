// src/components/LecturerPanel.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LecturerPanel.module.css';
import {
  BarChart,
  BookOpen,
  FileText,
  UploadCloud,
  UserCheck,
  ListChecks,
  PlusCircle,
} from 'lucide-react';

const dashboardData = {
  courseReport: {
    Webdevelopment: {
      notStarted: 10,
      inProgress: 60,
      completed: 30,
      totalStudents: 100,
      averageTimeSpent: '12h 30m',
      engagement: 'Medium',
      mostSkippedModule: 'Module 3: Forms',
    },
    Python: {
      notStarted: 5,
      inProgress: 25,
      completed: 70,
      totalStudents: 120,
      averageTimeSpent: '18h 45m',
      engagement: 'High',
      mostSkippedModule: 'Module 4: Functions',
    },
    DataScience: {
      notStarted: 8,
      inProgress: 42,
      completed: 50,
      totalStudents: 90,
      averageTimeSpent: '15h 10m',
      engagement: 'Medium-High',
      mostSkippedModule: 'Module 2: Statistics Basics',
    },
  },
  studentProgress: {
    averageCompletion: 64,
    topPerformer: { name: 'Jane Doe', percentage: 98 },
    atRiskCount: 5,
    recentActivities: [
      { name: 'John Kimani', action: 'submitted Assignment 2', time: '3 hrs ago' },
      { name: 'Aisha Mbogo', action: 'viewed Module 5', time: '2 hrs ago' },
    ],
  },
};

const LecturerPanel = () => {
  const courses = Object.keys(dashboardData.courseReport);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

  const report = dashboardData.courseReport[selectedCourse];
  const progressData = dashboardData.studentProgress;

  const total = report.notStarted + report.inProgress + report.completed;

  const notStartedPercent = (report.notStarted / total) * 100;
  const inProgressPercent = (report.inProgress / total) * 100;
  const completedPercent = (report.completed / total) * 100;

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div className={styles.panelContainer}>
      <h2 className={styles.heading}>Lecturer Overview</h2>

      {/* Info Cards */}
      <div className={styles.infoCards}>
        <div className={styles.infoCard}>
          <BookOpen size={28} className={styles.icon} />
          <div>
            <p className={styles.infoLabel}>Units Instructing</p>
            <h4 className={styles.infoValue}>4</h4>
          </div>
        </div>
        <div className={styles.infoCard}>
          <UserCheck size={28} className={styles.icon} />
          <div>
            <p className={styles.infoLabel}>Students Instructing</p>
            <h4 className={styles.infoValue}>85</h4>
          </div>
        </div>
        <div className={styles.infoCard}>
          <FileText size={28} className={styles.icon} />
          <div>
            <p className={styles.infoLabel}>Submissions Received</p>
            <h4 className={styles.infoValue}>122</h4>
          </div>
        </div>
      </div>

      {/* Top Cards */}
      <div className={styles.topCards}>
        {/* Student Progress */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Student Progress</h3>
            <button className={styles.viewListBtn}>View List</button>
          </div>

          <div className={styles.progressGroup}>
            <div className={styles.progressStats}>
              <p>📊 <strong>Avg Completion:</strong> {progressData.averageCompletion}%</p>
              <p>🏅 <strong>Top Performer:</strong> {progressData.topPerformer.name} ({progressData.topPerformer.percentage}%)</p>
              <p>⚠️ <strong>At-Risk Students:</strong> {progressData.atRiskCount}</p>
            </div>

            <label>Completed</label>
            <div className={styles.progressBarWrapper}>
              <div
                className={styles.progressBar}
                style={{ width: `${completedPercent}%`, backgroundColor: '#ffc233' }}
              />
              <span className={styles.progressBadge}>
                {completedPercent.toFixed(0)}%
              </span>
            </div>

            <label>In Progress</label>
            <div className={styles.progressBarWrapper}>
              <div
                className={styles.progressBar}
                style={{ width: `${inProgressPercent}%`, backgroundColor: '#0091f8' }}
              />
              <span className={styles.progressBadge}>
                {inProgressPercent.toFixed(0)}%
              </span>
            </div>

            <label>Not Started</label>
            <div className={styles.progressBarWrapper}>
              <div
                className={styles.progressBar}
                style={{ width: `${notStartedPercent}%`, backgroundColor: '#ddd' }}
              />
              <span className={styles.progressBadge}>
                {notStartedPercent.toFixed(0)}%
              </span>
            </div>
          </div>

          <div className={styles.recentActivity}>
            <h4>Recent Activity</h4>
            <ul>
              {progressData.recentActivities.map((activity, idx) => (
                <li key={idx}>
                  🧑‍🎓 <strong>{activity.name}</strong> {activity.action} • {activity.time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Course Report */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Course Report</h3>
            <select
              className={styles.selectCourseBtn}
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.pieChartContainer}>
            <svg viewBox="0 0 36 36" className={styles.pieChart}>
              <circle
                r="16" cx="18" cy="18" fill="none" stroke="#ddd"
                strokeWidth="32" strokeDasharray={`${notStartedPercent} ${100 - notStartedPercent}`}
              />
              <circle
                r="16" cx="18" cy="18" fill="none" stroke="#0091f8"
                strokeWidth="32" strokeDasharray={`${inProgressPercent} ${100 - inProgressPercent}`}
                strokeDashoffset={`${-notStartedPercent}`}
              />
              <circle
                r="16" cx="18" cy="18" fill="none" stroke="#ffc233"
                strokeWidth="32" strokeDasharray={`${completedPercent} ${100 - completedPercent}`}
                strokeDashoffset={`${-(notStartedPercent + inProgressPercent)}`}
              />
            </svg>

            <div className={styles.legend}>
              <span style={{ color: '#ddd' }}>⬤ Not Started</span>
              <span style={{ color: '#0091f8' }}>⬤ In Progress</span>
              <span style={{ color: '#ffc233' }}>⬤ Completed</span>
            </div>
          </div>

          <div className={styles.reportDetails}>
            <p>👥 <strong>Enrolled:</strong> {report.totalStudents}</p>
            <p>⏱️ <strong>Avg Time Spent:</strong> {report.averageTimeSpent}</p>
            <p>📈 <strong>Engagement:</strong> {report.engagement}</p>
            <p>📚 <strong>Most Skipped Module:</strong> {report.mostSkippedModule}</p>
          </div>
        </div>
      </div>

      {/* Lecturer Actions */}
      <div className={styles.cardFull}>
        <h3>Lecturer Actions</h3>
        <ul className={styles.actionList}>
          <li onClick={() => handleNavigation('/lecturer/learners-progress')}>
            <BarChart size={18} /> View Learner Progress
          </li>
          <li onClick={() => handleNavigation('/lecturer/assignments')}>
            <BookOpen size={18} /> Add/Edit Exams/Assignments
          </li>
          <li onClick={() => handleNavigation('/lecturer/upload-materials')}>
            <UploadCloud size={18} /> Upload Learning Materials
          </li>
          <li onClick={() => handleNavigation('/lecturer/student-submissions')}>
            <FileText size={18} /> View Student Submissions
          </li>
          <li onClick={() => handleNavigation('/lecturer/grade-quizzes')}>
            <ListChecks size={18} /> Grade Exams/Assignments
          </li>
          <li onClick={() => handleNavigation('/lecturer/create-class')}>
            <PlusCircle size={18} /> Create Class
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LecturerPanel;
