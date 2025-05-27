import React, { useState, useEffect } from 'react';
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

const LecturerPanel = () => {
  const [dashboardData, setDashboardData] = useState({
    unitsInstructing: 0,
    studentsInstructing: 0,
    submissionsReceived: 0,
    courseReport: {},
    studentProgress: {
      averageCompletion: 0,
      topPerformer: { name: 'No students yet', percentage: 0 },
      atRiskCount: 0,
      recentActivities: [],
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('No courses');

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
          throw new Error('No user data found');
        }

        const response = await fetch(`http://localhost:4000/api/dashboard`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch lecturer dashboard');
        }

        const data = await response.json();
        if (data.role !== 'LECTURER') {
          throw new Error('Invalid role');
        }

        // If there's no course data, set default values
        const defaultCourseReport = {
          'No courses': {
            totalStudents: 0,
            notStarted: 0,
            inProgress: 0,
            completed: 0,
            averageTimeSpent: '0 hours',
            engagement: '0%',
            mostSkippedModule: 'N/A'
          }
        };

        setDashboardData({
          ...data,
          courseReport: Object.keys(data.courseReport || {}).length > 0 ? data.courseReport : defaultCourseReport,
          studentProgress: data.studentProgress || {
            averageCompletion: 0,
            topPerformer: { name: 'No students yet', percentage: 0 },
            atRiskCount: 0,
            recentActivities: []
          }
        });

        // Set selected course
        const courses = Object.keys(data.courseReport || {});
        setSelectedCourse(courses.length > 0 ? courses[0] : 'No courses');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading lecturer dashboard...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  const report = dashboardData.courseReport[selectedCourse] || {
    totalStudents: 0,
    notStarted: 0,
    inProgress: 0,
    completed: 0,
    averageTimeSpent: '0 hours',
    engagement: '0%',
    mostSkippedModule: 'N/A'
  };

  const progressData = dashboardData.studentProgress || {
    averageCompletion: 0,
    topPerformer: { name: 'No students yet', percentage: 0 },
    atRiskCount: 0,
    recentActivities: []
  };

  const total = Math.max(1, report.notStarted + report.inProgress + report.completed);
  const notStartedPercent = (report.notStarted / total) * 100;
  const inProgressPercent = (report.inProgress / total) * 100;
  const completedPercent = (report.completed / total) * 100;

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
            <h4 className={styles.infoValue}>{dashboardData.unitsInstructing || 0}</h4>
          </div>
        </div>
        <div className={styles.infoCard}>
          <UserCheck size={28} className={styles.icon} />
          <div>
            <p className={styles.infoLabel}>Students Instructing</p>
            <h4 className={styles.infoValue}>{dashboardData.studentsInstructing || 0}</h4>
          </div>
        </div>
        <div className={styles.infoCard}>
          <FileText size={28} className={styles.icon} />
          <div>
            <p className={styles.infoLabel}>Submissions Received</p>
            <h4 className={styles.infoValue}>{dashboardData.submissionsReceived || 0}</h4>
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
            {progressData.recentActivities.length > 0 ? (
              <ul>
                {progressData.recentActivities.map((activity, idx) => (
                  <li key={idx}>
                    🧑‍🎓 <strong>{activity.name}</strong> {activity.action} • {activity.time}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyState}>No recent activities</p>
            )}
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
              {Object.keys(dashboardData.courseReport).map((course) => (
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
