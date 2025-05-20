// LearnersProgress.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from 'chart.js';
import {
  FaBookOpen,
  FaCheckCircle,
  FaSpinner,
  FaComments,
  FaFileAlt,
  FaUserCircle
} from 'react-icons/fa';
import styles from './LearnersProgress.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ChartTitle,
  Tooltip,
  Legend
);

const LearnersProgress = () => {
  const [, setStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [grades, setGrades] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setStudent({
      name: 'John Doe',
      studentID: '12345',
      profilePicture: '/images/john.jpg'
    });
    setAttendanceData([85, 90, 92, 80, 88, 93, 91, 95, 87, 89]);
    setSubmissions([
      { assignment: 'Math Quiz 1', status: 'Submitted', grade: '85%' },
      { assignment: 'Science Lab', status: 'Pending', grade: 'N/A' },
      { assignment: 'History Essay', status: 'Submitted', grade: '92%' }
    ]);
    setGrades([
      { subject: 'Data Structures', grade: 'Distinction' },
      { subject: 'Naming Variables', grade: 'Credit' },
      { subject: 'Data Flow', grade: 'Credit' }
    ]);
    setReviews([
      { date: '2025-05-10', course: 'Web Dev', text: 'Great materials!' },
      { date: '2025-04-25', course: 'C Programming', text: 'Challenging but useful.' }
    ]);
  }, []);

  const attendanceChartData = {
    labels: ['Wk 1','Wk 2','Wk 3','Wk 4','Wk 5','Wk 6','Wk 7','Wk 8','Wk 9','Wk 10'],
    datasets: [{
      label: 'Attendance',
      data: attendanceData,
      fill: false,
      borderColor: '#1e90ff',
      tension: 0.1
    }]
  };

  // summary stats
  const summary = {
    enrolled: 5,
    completed: 2,
    inProgress: 3,
    reviews: reviews.length,
    exams: submissions.length
  };

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>Learner’s Progress</h1>
        <button className={styles.viewProfileBtn}>
          <FaUserCircle /> View Profile
        </button>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <FaBookOpen className={styles.cardIcon} />
          <div>
            <p className={styles.cardLabel}>Enrolled Courses</p>
            <p className={styles.cardValue}>{summary.enrolled}</p>
          </div>
        </div>
        <div className={styles.card}>
          <FaCheckCircle className={styles.cardIcon} />
          <div>
            <p className={styles.cardLabel}>Completed</p>
            <p className={styles.cardValue}>{summary.completed}</p>
          </div>
        </div>
        <div className={styles.card}>
          <FaSpinner className={styles.cardIcon} />
          <div>
            <p className={styles.cardLabel}>In Progress</p>
            <p className={styles.cardValue}>{summary.inProgress}</p>
          </div>
        </div>
        <div className={styles.card}>
          <FaComments className={styles.cardIcon} />
          <div>
            <p className={styles.cardLabel}>Reviews</p>
            <p className={styles.cardValue}>{summary.reviews}</p>
          </div>
        </div>
        <div className={styles.card}>
          <FaFileAlt className={styles.cardIcon} />
          <div>
            <p className={styles.cardLabel}>Exams/Assignments</p>
            <p className={styles.cardValue}>{summary.exams}</p>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className={styles.mainSections}>
        {/* Attendance Chart */}
        <section className={styles.attendanceSection}>
          <h3 className={styles.sectionTitle}>Attendance</h3>
          <Line data={attendanceChartData} height={150} />
        </section>

        {/* Submissions */}
        <section className={styles.submissionSection}>
          <h3 className={styles.sectionTitle}>Submissions</h3>
          <table className={styles.submissionTable}>
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Status</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s, i) => (
                <tr key={i}>
                  <td>{s.assignment}</td>
                  <td>{s.status}</td>
                  <td>{s.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {/* Grades Overview */}
      <section className={styles.gradesSection}>
        <h3 className={styles.sectionTitle}>Grades Overview</h3>
        <div className={styles.gradesList}>
          {grades.map((g, i) => (
            <div key={i} className={styles.gradeItem}>
              <h4>{g.subject}</h4>
              <p>{g.grade}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className={styles.reviewsSection}>
        <h3 className={styles.sectionTitle}>Reviews</h3>
        <ul className={styles.reviewsList}>
          {reviews.map((r, i) => (
            <li key={i} className={styles.reviewItem}>
              <span className={styles.reviewDate}>{r.date}</span>
              <span className={styles.reviewCourse}>{r.course}</span>
              <p className={styles.reviewText}>{r.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default LearnersProgress;
