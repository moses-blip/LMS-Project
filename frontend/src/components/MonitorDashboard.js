import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MonitorDashboard.module.css';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const MonitorDashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setRole('admin');
  }, []);

  useEffect(() => {
    if (role && role !== 'admin') {
      navigate('/dashboard');
    }
  }, [role, navigate]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const usageData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Logins',
      data: [120, 190, 170, 220, 200],
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
    }],
  };

  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Avg Score',
      data: [75, 80, 78, 85],
      borderColor: '#00c897',
      backgroundColor: '#00c89740',
      tension: 0.4,
      fill: true,
    }],
  };

  const userTypeData = {
    labels: ['Students', 'Lecturers', 'Admins'],
    datasets: [{
      label: 'User Types',
      data: [220, 35, 5],
      backgroundColor: ['#007bff', '#ffc107', '#dc3545'],
    }],
  };

  const courseEngagementData = {
    labels: ['Quizzes', 'Assignments', 'Forum Posts', 'Messages'],
    datasets: [{
      data: [50, 30, 15, 5],
      backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56', '#4bc0c0'],
    }],
  };

  if (!role) return <p className={styles.loading}>Checking permissions...</p>;

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <h1 className={styles.title}>📊 Monitoring & System Reports</h1>

      <button className={styles.toggleTheme} onClick={toggleTheme}>
        🌓 Toggle Theme
      </button>

      <div className={styles.kpiContainer}>
        <div className={styles.kpiCard}>
          <h3>👥 Users</h3>
          <p>260</p>
          <span>+8% this week</span>
        </div>
        <div className={styles.kpiCard}>
          <h3>📚 Courses</h3>
          <p>42</p>
          <span>+2 new</span>
        </div>
        <div className={styles.kpiCard}>
          <h3>📝 Submissions</h3>
          <p>879</p>
          <span>+12%</span>
        </div>
        <div className={styles.kpiCard}>
          <h3>📨 Messages</h3>
          <p>154</p>
          <span>Stable</span>
        </div>
      </div>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2>🟢 System Status</h2>
          <p className={styles.statusOnline}>All systems operational</p>
          <small>Last checked: 2 seconds ago</small>
        </section>

        <section className={styles.card}>
          <h2>Top Active Users</h2>
          <ul className={styles.list}>
            <li>👨‍🎓 John Doe (45 logins)</li>
            <li>👩‍🏫 Prof. Smith (38 logins)</li>
            <li>👨‍🎓 Jane Smith (34 logins)</li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>Platform Usage</h2>
          <Bar data={usageData} />
          <button className={styles.downloadBtn}>📥 Download CSV</button>
        </section>

        <section className={styles.card}>
          <h2>Performance Trends</h2>
          <Line data={performanceData} />
          <button className={styles.downloadBtn}>📥 Download CSV</button>
        </section>

        <section className={styles.card}>
          <h2>User Distribution</h2>
          <Doughnut data={userTypeData} />
        </section>

        <section className={styles.card}>
          <h2>Course Engagement</h2>
          <Pie data={courseEngagementData} />
        </section>

        <section className={styles.cardWide}>
          <h2>📢 Announcements</h2>
          <p>🚀 New grading system launching June 1st!</p>
        </section>

        <section className={styles.cardWide}>
          <h2>Recent System Alerts</h2>
          <ul className={styles.list}>
            <li>⚠️ Server downtime at 12:01AM</li>
            <li>✅ Backup completed successfully</li>
            <li>🚨 Unusual login location detected</li>
          </ul>
        </section>

        <section className={styles.cardWide}>
          <h2>Downloaded Reports</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Report</th>
                <th>Date</th>
                <th>Downloaded By</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Enrollments_May.pdf</td><td>May 12</td><td>Admin A</td></tr>
              <tr><td>Grades_April.xlsx</td><td>May 10</td><td>Admin B</td></tr>
              <tr><td>Usage_Metrics.csv</td><td>May 8</td><td>Admin A</td></tr>
            </tbody>
          </table>
        </section>

        <section className={styles.cardWide}>
          <h2>Audit Log</h2>
          <ul className={styles.list}>
            <li>[09:20] Admin A updated "Intro to AI"</li>
            <li>[08:55] Admin B reset password for user X</li>
            <li>[08:23] Admin A logged in</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default MonitorDashboard;
