import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './DashboardLayout.module.css';
import {
  FaGraduationCap,
  FaHome,
  FaVideo,
  FaBook,
  FaFolder,
  FaFileAlt,
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaCog,
  FaBell,
  FaUserShield,
  FaChartBar,
} from 'react-icons/fa';
import MiniCalendar from './MiniCalendar';
import Footer from '../components/Footer';

const DashboardLayout = ({ children, userRole = 'student' }) => {
  const navigate = useNavigate();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({});

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Navigate to login page
    navigate('/signin');
  };

  const handleCheckboxChange = (task) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [task]: !prev[task],
    }));
  };

  // Sidebar menu items by role
  const menuItems = [
    { to: '/', icon: <FaHome />, label: 'Home', roles: ['student', 'lecturer', 'admin'] },
    { to: '/virtual-classroom', icon: <FaVideo />, label: 'Virtual Classroom', roles: ['student', 'lecturer'] },
    { to: '/courses', icon: <FaBook />, label: 'Courses', roles: ['student', 'lecturer', 'admin'] },
    { to: '/file-library', icon: <FaFolder />, label: 'File Library', roles: ['student', 'lecturer'] },
    {
      to: userRole === 'lecturer' ? '/lecturer/assignments' : '/assignments',
      icon: <FaFileAlt />,
      label: 'Exams/Assignments',
      roles: ['student', 'lecturer'],
    },
    { to: '/attendance', icon: <FaCalendarAlt />, label: 'Attendance', roles: ['student', 'lecturer'] },
    { to: '/groups', icon: <FaUsers />, label: 'My Groups', roles: ['student', 'lecturer'] },
    { to: '/messages', icon: <FaEnvelope />, label: 'Messages', roles: ['student', 'lecturer', 'admin'] },
    // Admin-only links
    { to: '/manage-users', icon: <FaUserShield />, label: 'Manage Users', roles: ['admin'] },
    { to: '/manage-courses', icon: <FaBook />, label: 'Manage Courses', roles: ['admin'] },
    { to: '/analytics', icon: <FaChartBar />, label: 'Analytics', roles: ['admin'] },
    { to: '/monitor', icon: <FaChartBar />, label: 'Monitor', roles: ['admin'] },
  ];

  // Right sidebar widgets by role
  const renderRightSidebar = () => {
    if (userRole === 'admin') {
      return (
        <div className={styles.rightSidebarSmall}>
          <div className={styles.profileSectionSmall}>
            <div className={styles.profilePicWrapperSmall}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#888" viewBox="0 0 24 24" width="50" height="50">
                <path d="M12 12c2.7 0 4.5-2.2 4.5-4.5S14.7 3 12 3 7.5 5.2 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z" />
              </svg>
            </div>
            <h3 className={styles.profileNameSmall}>Admin</h3>
            <p className={styles.profileRoleSmall}>Administrator</p>
          </div>
          <div className={styles.calendarSectionSmall}>
            <MiniCalendar highlightToday={true} />
          </div>
          <div className={styles.separatorLineSmall}></div>
          <div className={styles.todoListSmall}>
            <h4>Admin Quick Links</h4>
            <ul>
              <li>
                <Link to="/manage-users">
                  <FaUsers className={styles.quickLinkIcon} />
                  Manage Users
                </Link>
              </li>
              <li>
                <Link to="/manage-courses">
                  <FaBook className={styles.quickLinkIcon} />
                  Manage Courses
                </Link>
              </li>
              <li>
                <Link to="/analytics">
                  <FaChartBar className={styles.quickLinkIcon} />
                  Analytics
                </Link>
              </li>
              <li>
                <Link to="/monitor">
                  <FaUserShield className={styles.quickLinkIcon} />
                  Monitor
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }
    // Lecturer rightbar
    if (userRole === 'lecturer') {
      return (
        <div className={styles.rightSidebarSmall}>
          <div className={styles.profileSectionSmall}>
            <div className={styles.profilePicWrapperSmall}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#888" viewBox="0 0 24 24" width="50" height="50">
                <path d="M12 12c2.7 0 4.5-2.2 4.5-4.5S14.7 3 12 3 7.5 5.2 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z" />
              </svg>
            </div>
            <h3 className={styles.profileNameSmall}>Lecturer</h3>
            <p className={styles.profileRoleSmall}>Lecturer</p>
          </div>
          <div className={styles.calendarSectionSmall}>
            <MiniCalendar highlightToday={true} />
          </div>
          <div className={styles.separatorLineSmall}></div>
          <div className={styles.todoListSmall}>
            <h4>To Do List</h4>
            <ul>
              <li>Grade Assignments</li>
              <li>Upload Lecture Notes</li>
              <li>Review Student Questions</li>
            </ul>
          </div>
        </div>
      );
    }
    // Student rightbar
    return (
      <div className={styles.rightSidebarSmall}>
        <div className={styles.profileSectionSmall}>
          <div className={styles.profilePicWrapperSmall}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#888" viewBox="0 0 24 24" width="50" height="50">
              <path d="M12 12c2.7 0 4.5-2.2 4.5-4.5S14.7 3 12 3 7.5 5.2 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z" />
            </svg>
          </div>
          <h3 className={styles.profileNameSmall}>Student</h3>
          <p className={styles.profileRoleSmall}>Student</p>
        </div>
        <div className={styles.calendarSectionSmall}>
          <MiniCalendar highlightToday={true} />
        </div>
        <div className={styles.separatorLineSmall}></div>
        <div className={styles.todoListSmall}>
          <h4>To Do List</h4>
          <ul>
            {[
              { task: 'Complete Quiz 1', dueDate: 'Today' },
              { task: 'Read Chapter 4', dueDate: 'Tomorrow' },
              { task: 'Join Virtual Class', dueDate: '2:00 PM' },
              { task: 'Submit Assignment', dueDate: 'Friday' },
              { task: 'Group Discussion Prep', dueDate: 'Next Week' }
            ].map((item, index) => (
              <li key={index} className={styles.todoItemSmall}>
                <div className={styles.todoCheckWrapper}>
                  <input
                    type="checkbox"
                    checked={checkedTasks[item.task] || false}
                    onChange={() => handleCheckboxChange(item.task)}
                    className={styles.todoCheckboxSmall}
                  />
                  <span className={`${styles.todoTaskSmall} ${checkedTasks[item.task] ? styles.checked : ''}`}>
                    {item.task}
                  </span>
                </div>
                <span className={styles.timeTagSmall}>{item.dueDate}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <FaGraduationCap className={styles.logoIconSmall} />
          <span className={styles.logoTextSmall}>Dashboard</span>
        </div>
        <nav className={styles.nav}>
          <ul>
            {menuItems
              .filter((item) => item.roles.includes(userRole))
              .map(({ to, icon, label }) => (
                <li key={label}>
                  <Link to={to} className={styles.sidebarLinkSmall}>
                    {React.cloneElement(icon, { size: 18, className: styles.iconSmall })}
                    <span className={styles.menuLabelSmall}>{label}</span>
                  </Link>
                </li>
              ))}

            <li onClick={toggleSubmenu} className={styles.submenuSmall}>
              <FaCog size={18} />
              <span className={styles.menuLabelSmall}>Account & Settings</span>
              <span>{submenuOpen ? '▲' : '▼'}</span>
            </li>

            {submenuOpen && (
              <ul className={styles.submenuListSmall}>
                <li>
                  <Link to="/profile-tabs" className={styles.submenuItemSmall}>Profile Page</Link>
                </li>
                <li>
                  <Link to="/account/general-info" className={styles.submenuItemSmall}>General Information</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className={styles.submenuItemSmall}>Log Out</button>
                </li>
              </ul>
            )}
          </ul>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <input
            type="text"
            placeholder="Search courses..."
            className={styles.searchInputSmall}
          />
          <button className={styles.notificationButtonSmall}>
            <FaBell size={18} />
          </button>
        </header>

        <div className={styles.dashboardContent}>
          <div className={styles.outletContent}>{children}</div>
          {renderRightSidebar()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
