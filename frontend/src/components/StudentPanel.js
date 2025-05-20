import React, { useState } from 'react';
import styles from './StudentPanel.module.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaCheckCircle, FaChartLine } from 'react-icons/fa';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function StudentPanelContent() {
  const [activeAction, setActiveAction] = useState(null);

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Hours Spent',
        data: [40, 60, 50, 70, 65, 80],
        backgroundColor: ['#ffc233', '#0091f8', '#ffc233', '#0091f8', '#ffc233', '#0091f8'],
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 20 },
      },
    },
  };

  return (
    <div className={styles.container}>
      {/* Greeting */}
      <div className={styles.greetingSection}>
        <h2>Hello Kaino <span role="img" aria-label="wave">👋</span></h2>
        <p><span role="img" aria-label="alien"></span> Let's learn something new today</p>
      </div>

      {/* Top Section with Stats, Chart and Performance */}
      <div className={styles.topSection}>
        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <FaBookOpen className={styles.statIcon} />
            <h4>Total Enrolled</h4>
            <p>5</p>
          </div>
          <div className={styles.statCard}>
            <FaCheckCircle className={styles.statIcon} />
            <h4>Completed</h4>
            <p>3</p>
          </div>
          <div className={styles.statCard}>
            <FaChartLine className={styles.statIcon} />
            <h4>Exam Score</h4>
            <p>88%</p>
          </div>
        </div>

        {/* Performance */}
        <div className={styles.performanceSection}>
          <h3 className={styles.sectionTitle}>Performance</h3>
          <div className={styles.progressGrid}>
            <div className={styles.circleProgress}>
              <svg viewBox="0 0 36 36" className={styles.circularChart}>
                <path
                  className={styles.circleBg}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={styles.circle}
                  strokeDasharray="75, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className={styles.percentage}>75%</text>
              </svg>
              <p>Assignment Completion</p>
            </div>

            <div className={styles.circleProgress}>
              <svg viewBox="0 0 36 36" className={styles.circularChart}>
                <path
                  className={styles.circleBg}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={styles.circle}
                  strokeDasharray="90, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className={styles.percentage}>90%</text>
              </svg>
              <p>Lecture Attendance</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>Hours spent</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* Student Features */}
      <div className={styles.featuresSection}>
        <h3 className={styles.sectionTitle}>Student Actions</h3>
        <div className={styles.featuresGrid}>
          <Link
            to="/courses"
            onClick={() => setActiveAction('courses')}
            className={`${styles.featureCard} ${activeAction === 'courses' ? styles.active : ''}`}
          >
            Browse Courses
          </Link>
          <Link
            to="/enroll"
            onClick={() => setActiveAction('enroll')}
            className={`${styles.featureCard} ${activeAction === 'enroll' ? styles.active : ''}`}
          >
            Enroll in a Course
          </Link>
          <Link
            to="/assignments"
            onClick={() => setActiveAction('assignments')}
            className={`${styles.featureCard} ${activeAction === 'assignments' ? styles.active : ''}`}
          >
            View Assignments
          </Link>
          <Link
            to="/student/materials"
            onClick={() => setActiveAction('coursecontent')}
            className={`${styles.featureCard} ${activeAction === 'coursecontent' ? styles.active : ''}`}
          >
            Course Content
          </Link>
          <Link
            to="/grades"
            onClick={() => setActiveAction('grades')}
            className={`${styles.featureCard} ${activeAction === 'grades' ? styles.active : ''}`}
          >
            View Grades
          </Link>
          <Link
            to="/messages"
            onClick={() => setActiveAction('messages')}
            className={`${styles.featureCard} ${activeAction === 'messages' ? styles.active : ''}`}
          >
            Message Trainer
          </Link>
          <Link
            to="/profilepage"
            onClick={() => setActiveAction('update profile')}
            className={`${styles.featureCard} ${activeAction === 'update profile' ? styles.active : ''}`}
          >
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentPanelContent;
