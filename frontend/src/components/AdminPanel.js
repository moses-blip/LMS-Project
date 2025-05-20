import React, { useState } from 'react';
import styles from './AdminPanel.module.css';
import { Link } from 'react-router-dom';
import adminVector from './../assets/adminvector.jpg';
import jsPDF from 'jspdf';

const studentProgress = [
  { name: 'Alice', progress: 85, color: 'navy' },
  { name: 'Brian', progress: 72, color: 'yellow' },
  { name: 'Clara', progress: 60, color: 'lightblue' },
  { name: 'Daniel', progress: 90, color: 'orange' },
  { name: 'Emily', progress: 78, color: 'blue' },
];

function CircularProgress({ percentage, label }) {
  const radius = 80;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className={styles.circularProgress}>
      <circle
        stroke="#ffc233"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#007bff"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#333">
        {percentage}%
      </text>
    </svg>
  );
}

function ReportFilterModal({ visible, onClose, onApply, reportType }) {
  const [filterValue, setFilterValue] = useState('');

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, minWidth: 300 }}>
        <h3>Filter "{reportType}" Report</h3>
        <label>
          Example Filter:
          <input
            type="text"
            value={filterValue}
            onChange={e => setFilterValue(e.target.value)}
            placeholder="Enter filter value"
            style={{ width: '100%', marginTop: 8, marginBottom: 16 }}
          />
        </label>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => {
              onApply(filterValue);
              onClose();
            }}
          >
            Apply & Download
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminPanelContent() {
  const adminName = "Mr. Kalama";
  const adminWorkingHoursPercent = 75;
  const targetHours = 8;
  const completedHours = Math.round((adminWorkingHoursPercent / 100) * targetHours);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentReportType, setCurrentReportType] = useState(null);

  const openFilterModal = (reportType) => {
    setCurrentReportType(reportType);
    setModalVisible(true);
  };

  const handleDownloadWithFilters = (filterValue) => {
    if (currentReportType === 'Student Performance') {
      const doc = new jsPDF();
      doc.text(`Report: ${currentReportType}`, 10, 10);
      doc.text(`Filter applied: ${filterValue}`, 10, 20);
      doc.text('This is a dynamically generated PDF report.', 10, 30);
      doc.save(`${currentReportType}.pdf`);
    } else if (currentReportType === 'Course Enrollments') {
      alert(`Generating CSV for ${currentReportType} with filter: ${filterValue}`);
    } else if (currentReportType === 'Audit Logs') {
      alert(`Generating JSON for ${currentReportType} with filter: ${filterValue}`);
    } else {
      alert(`Downloading ${currentReportType} report with filter: ${filterValue}`);
    }
  };

  const handleDownload = (type) => {
    alert(`Downloading ${type} report...`);
  };

  return (
    <div className={styles.container}>
      {/* Admin Header */}
      <div className={styles.adminHeaderSection}>
        <div>
          <h2 className={styles.title}>Dashboard</h2>
          <p className={styles.welcome}>Welcome back, <strong>{adminName}</strong></p>
        </div>
        <div className={styles.vectorBox}>
          <img src={adminVector} alt="Admin illustration" className={styles.vectorImage} />
        </div>
      </div>

      {/* Overview Section */}
      <div className={styles.rowGrid}>
        {/* Student Progress */}
        <div className={styles.progressSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.subtitle}>Student Progress</h3>
            <Link to="/analytics" className={styles.viewButton}>Full Report</Link>
          </div>
          <hr className={styles.divider} />
          {studentProgress.map((student, index) => (
            <div key={index} className={styles.studentCard}>
              <div className={styles.studentHeader}>
                <span className={styles.studentName}>{student.name}</span>
                <span className={`${styles.percentageBadge} ${styles[student.color]}`}>
                  {student.progress}%
                </span>
              </div>
              <div className={styles.progressBarContainer}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${student.progress}%`,
                    backgroundColor: `var(--${student.color})`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Working Hours Chart (✅ Updated) */}
        <div className={styles.workingHoursCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.subtitle}>Working Hours</h3>
            <span className={styles.viewButton}>Today</span>
          </div>
          <hr className={styles.divider} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress percentage={adminWorkingHoursPercent} />
            <div style={{ marginTop: 10, fontSize: '16px', color: '#333' }}>
              <strong>{completedHours}</strong> of <strong>{targetHours}</strong> hours logged
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: 4 }}>
              by <strong>{adminName}</strong>
            </div>
          </div>
          <div className={styles.legend}>
            <div className={styles.dotLegend}>
              <span className={`${styles.dot} ${styles.blue}`}></span>
              <span>Completed</span>
            </div>
            <div className={styles.dotLegend}>
              <span className={`${styles.dot} ${styles.yellow}`}></span>
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tools Section */}
      <div className={styles.toolsSection}>
        <h3 className={styles.subtitle}>Admin Tools</h3>
        <div className={styles.featureGrid}>
          <Link to="/manage-users" className={styles.featureCard}>
            👥 Manage Users
          </Link>
          <Link to="/course-enrollment" className={styles.featureCard}>
            📝 Course Enrollment
          </Link>
          <Link to="/manage-courses" className={styles.featureCard}>
            🛠 Manage Course
          </Link>
          <Link to="/monitor" className={styles.featureCard}>
            📊 Monitor System Activities & Reports
          </Link>
        </div>
      </div>

      {/* Downloadable Reports Section */}
      <div className={styles.reportsSection}>
        <h3 className={styles.subtitle}>📂 Downloadable Reports</h3>
        <div className={styles.reportGrid}>
          <div className={styles.reportCard}>
            <h4>📘 Student Performance</h4>
            <p>Detailed performance metrics by course.</p>
            <button onClick={() => openFilterModal('Student Performance')}>Download PDF</button>
          </div>
          <div className={styles.reportCard}>
            <h4>📚 Course Enrollments</h4>
            <p>Enrollment stats by semester.</p>
            <button onClick={() => openFilterModal('Course Enrollments')}>Download CSV</button>
          </div>
          <div className={styles.reportCard}>
            <h4>🛡️ Audit Logs</h4>
            <p>System activities and admin logs.</p>
            <button onClick={() => openFilterModal('Audit Logs')}>Download JSON</button>
          </div>
        </div>
      </div>

      {/* Report Filter Modal */}
      <ReportFilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={handleDownloadWithFilters}
        reportType={currentReportType}
      />
    </div>
  );
}

export default AdminPanelContent;
