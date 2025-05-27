import React, { useState, useEffect } from 'react';
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
import { 
  FaBookOpen, 
  FaCheckCircle, 
  FaChartLine, 
  FaBook, 
  FaVideo, 
  FaClipboardList,
  FaGraduationCap,
  FaCalendarAlt,
  FaUserGraduate,
  FaClock,
  FaBell,
  FaSearch,
  FaPlusCircle,
  FaListAlt,
  FaFileAlt,
  FaGraduationCap as FaGradCap,
  FaComments,
  FaUserEdit
} from 'react-icons/fa';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function StudentPanelContent() {
  const [activeAction, setActiveAction] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    avgScore: 0,
    assignmentCompletion: 0,
    lectureAttendance: 0,
    courses: []
  });

  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
          throw new Error('No user data found');
        }

        setUserName(userData.firstName);

        const response = await fetch(`http://localhost:4000/api/dashboard`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch dashboard data');
        }

        const data = await response.json();
        if (data.role !== 'STUDENT') {
          throw new Error('Invalid role');
        }
        setDashboardData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const barData = {
    labels: dashboardData.courses.map(course => course.name),
    datasets: [
      {
        label: 'Course Progress',
        data: dashboardData.courses.map(course => course.progress),
        backgroundColor: ['#4e54c8', '#8f94fb', '#4e54c8', '#8f94fb', '#4e54c8', '#8f94fb'],
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111827',
        titleFont: { size: 14, weight: 600 },
        bodyFont: { size: 13 },
        padding: 12,
        callbacks: {
          label: function(context) {
            return `Progress: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { 
          stepSize: 20,
          font: { size: 12 },
          color: '#6b7280'
        },
        grid: {
          color: '#f3f4f6'
        }
      },
      x: {
        ticks: {
          font: { size: 12 },
          color: '#6b7280'
        },
        grid: {
          display: false
        }
      }
    },
  };

  const filteredCourses = dashboardData.courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className={styles.loading}>
      <FaClock className={styles.loadingIcon} />
      Loading dashboard data...
    </div>;
  }

  if (error) {
    return <div className={styles.error}>
      <FaBell className={styles.errorIcon} />
      Error: {error}
    </div>;
  }

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <div className={styles.container}>
      {/* Greeting */}
      <div className={styles.greetingSection}>
        <h2>Good {getTimeOfDay()}, {userName} <span role="img" aria-label="wave">👋</span></h2>
        <p>
          <FaGraduationCap className={styles.greetingIcon} />
          Welcome back to your learning dashboard
        </p>
      </div>

      {/* Top Section with Stats, Chart and Performance */}
      <div className={styles.topSection}>
        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <FaBookOpen className={styles.statIcon} />
            <div>
              <h4>Enrolled Courses</h4>
              <p>{dashboardData.enrolledCourses}</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <FaCheckCircle className={styles.statIcon} />
            <div>
              <h4>Completed</h4>
              <p>{dashboardData.completedCourses}</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <FaChartLine className={styles.statIcon} />
            <div>
              <h4>Average Progress</h4>
              <p>{dashboardData.averageProgress}%</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>Course Progress Overview</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className={styles.enrolledCoursesSection}>
        <div className={styles.coursesHeader}>
          <h3 className={styles.sectionTitle}>
            <FaBook className={styles.sectionIcon} />
            My Enrolled Courses
          </h3>
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
        
        {dashboardData.courses.length === 0 ? (
          <div className={styles.noCourses}>
            <FaGraduationCap className={styles.noCoursesIcon} />
            <h4>No courses enrolled yet</h4>
            <p>Start your learning journey by enrolling in a course</p>
            <Link to="/courses" className={styles.enrollButton}>
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className={styles.enrolledCoursesGrid}>
            {filteredCourses.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                <div className={styles.courseHeader}>
                  <FaBook className={styles.courseIcon} />
                  <h4 className={styles.courseTitle}>{course.name}</h4>
                </div>
                
                <div className={styles.courseInfo}>
                  <div className={styles.courseProgress}>
                    <div className={styles.progressLabel}>
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className={styles.courseStats}>
                    <div className={styles.statItem}>
                      <FaClipboardList className={styles.statIcon} />
                      <div>
                        <small>Assignments</small>
                        <p>{course.completedAssignments}/{course.totalAssignments}</p>
                      </div>
                    </div>
                    <div className={styles.statItem}>
                      <FaVideo className={styles.statIcon} />
                      <div>
                        <small>Lectures</small>
                        <p>{course.attendedLectures}/{course.totalLectures}</p>
                      </div>
                    </div>
                  </div>

                  {course.nextAssignment && (
                    <div className={styles.nextAssignment}>
                      <FaCalendarAlt className={styles.calendarIcon} />
                      <div>
                        <small>Next Assignment</small>
                        <p>{course.nextAssignment.title}</p>
                      </div>
                    </div>
                  )}

                  <div className={styles.courseActions}>
                    <Link to={`/course/${course.id}`} className={styles.viewCourseButton}>
                      View Course
                    </Link>
                    {course.nextAssignment && (
                      <Link 
                        to={`/assignment/${course.nextAssignment.id}`} 
                        className={styles.startAssignmentButton}
                      >
                        Start Assignment
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Student Features */}
      <div className={styles.featuresSection}>
        <h3 className={styles.sectionTitle}>
          <FaGradCap className={styles.sectionIcon} />
          Student Actions
        </h3>
        <div className={styles.featuresGrid}>
          <Link 
            to="/courses" 
            onClick={() => setActiveAction('courses')} 
            className={`${styles.featureCard} ${activeAction === 'courses' ? styles.active : ''}`}
          >
            <FaBook className={styles.featureIcon} />
            <span className={styles.featureText}>Browse Courses</span>
          </Link>
          <Link 
            to="/enroll" 
            onClick={() => setActiveAction('enroll')} 
            className={`${styles.featureCard} ${activeAction === 'enroll' ? styles.active : ''}`}
          >
            <FaPlusCircle className={styles.featureIcon} />
            <span className={styles.featureText}>Enroll in a Course</span>
          </Link>
          <Link 
            to="/assignments" 
            onClick={() => setActiveAction('assignments')} 
            className={`${styles.featureCard} ${activeAction === 'assignments' ? styles.active : ''}`}
          >
            <FaClipboardList className={styles.featureIcon} />
            <span className={styles.featureText}>View Assignments</span>
          </Link>
          <Link 
            to="/student/materials" 
            onClick={() => setActiveAction('coursecontent')} 
            className={`${styles.featureCard} ${activeAction === 'coursecontent' ? styles.active : ''}`}
          >
            <FaFileAlt className={styles.featureIcon} />
            <span className={styles.featureText}>Course Content</span>
          </Link>
          <Link 
            to="/grades" 
            onClick={() => setActiveAction('grades')} 
            className={`${styles.featureCard} ${activeAction === 'grades' ? styles.active : ''}`}
          >
            <FaListAlt className={styles.featureIcon} />
            <span className={styles.featureText}>View Grades</span>
          </Link>
          <Link 
            to="/messages" 
            onClick={() => setActiveAction('messages')} 
            className={`${styles.featureCard} ${activeAction === 'messages' ? styles.active : ''}`}
          >
            <FaComments className={styles.featureIcon} />
            <span className={styles.featureText}>Message Trainer</span>
          </Link>
          <Link 
            to="/profilepage" 
            onClick={() => setActiveAction('update profile')} 
            className={`${styles.featureCard} ${activeAction === 'update profile' ? styles.active : ''}`}
          >
            <FaUserEdit className={styles.featureIcon} />
            <span className={styles.featureText}>Update Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentPanelContent;
