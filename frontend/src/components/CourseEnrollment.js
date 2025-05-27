import React, { useState, useEffect } from 'react';
import styles from './CourseEnrollment.module.css';
import { FaGraduationCap, FaSearch, FaCheck, FaPlus, FaTimes, FaBook, FaChartLine } from 'react-icons/fa';

function CourseEnrollment() {
  const [tab, setTab] = useState('requests');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/enrollment/courses');
      const data = await res.json();
      setCourses(data);
    } catch {
      setError('Failed to load courses');
    }
  };

  // Fetch students from backend with optional search term
  const fetchStudents = async (search = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/enrollment/students?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setStudents(data);
      setError('');
    } catch {
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, []);

  // Update students list on searchTerm change (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Approve enrollment request
  const approveRequest = async (id) => {
    if (!selectedCourse) {
      setError('Please select a course first');
      return;
    }
    try {
      const res = await fetch('/api/enrollment/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: id, courseId: selectedCourse }),
      });
      const result = await res.json();
      if (result.success) {
        fetchStudents(searchTerm); // refresh list
        setError('');
      } else {
        setError(result.message || 'Failed to approve enrollment');
      }
    } catch {
      setError('Failed to approve enrollment');
    }
  };

  // Manual assignment
  const assignManually = async (id) => {
    if (!selectedCourse) {
      setError('Please select a course first');
      return;
    }
    try {
      const res = await fetch('/api/enrollment/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: id, courseId: selectedCourse }),
      });
      const result = await res.json();
      if (result.success) {
        fetchStudents(searchTerm);
        setError('');
      } else {
        setError(result.message || 'Failed to assign course');
      }
    } catch {
      setError('Failed to assign course');
    }
  };

  // Remove enrollment
  const removeEnrollment = async (id, courseId) => {
    try {
      const res = await fetch('/api/enrollment/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: id, courseId }),
      });
      const result = await res.json();
      if (result.success) {
        fetchStudents(searchTerm);
        setError('');
      } else {
        setError(result.message || 'Failed to remove enrollment');
      }
    } catch {
      setError('Failed to remove enrollment');
    }
  };

  // Filter students by search term (backend does most of this but keep frontend filter too)
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get course details by ID
  const getCourseDetails = (courseId) => {
    return courses.find(c => c.id === courseId) || null;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <FaGraduationCap />
        Course Enrollment Management
      </h2>

      <div className={styles.tabs}>
        <button 
          onClick={() => setTab('requests')} 
          className={tab === 'requests' ? styles.activeTab : ''}
        >
          Enrollment Requests
        </button>
        <button 
          onClick={() => setTab('manual')} 
          className={tab === 'manual' ? styles.activeTab : ''}
        >
          Manual Assignment
        </button>
        <button 
          onClick={() => setTab('overview')} 
          className={tab === 'overview' ? styles.activeTab : ''}
        >
          Overview
        </button>
      </div>

      <div className={styles.searchFilter}>
        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search students by name, email, or reg. no"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {(tab !== 'overview') && (
          <select 
            value={selectedCourse} 
            onChange={e => setSelectedCourse(e.target.value)}
            className={styles.courseSelect}
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.name} ({course.enrolledStudents} enrolled)
              </option>
            ))}
          </select>
        )}
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      
      {loading ? (
        <div className={styles.loadingState}>Loading...</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Reg No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents
                .filter(student => {
                  if (tab === 'requests') return student.status === 'Pending';
                  if (tab === 'manual') return student.status !== 'ACTIVE';
                  return true;
                })
                .map(student => {
                  const courseDetails = getCourseDetails(student.courseId);
                  return (
                    <tr key={student.id}>
                      <td>{student.regNo}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>
                        {student.courseName || '—'}
                        {courseDetails && (
                          <div className={styles.courseStats}>
                            <small>
                              {courseDetails.totalAssignments} assignments
                              {courseDetails.totalLectures > 0 && ` • ${courseDetails.totalLectures} lectures`}
                            </small>
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={
                          student.status === 'ACTIVE' ? styles.enrolled :
                          student.status === 'Pending' ? styles.pending :
                          styles.notEnrolled
                        }>
                          {student.status === 'ACTIVE' ? 'Enrolled' :
                           student.status === 'Pending' ? 'Pending' :
                           'Not Enrolled'}
                        </span>
                      </td>
                      <td>
                        {student.progress !== undefined && (
                          <div className={styles.progressBar}>
                            <div 
                              className={styles.progressFill} 
                              style={{ width: `${student.progress}%` }}
                            />
                            <span>{student.progress}%</span>
                          </div>
                        )}
                      </td>
                      <td>
                        {student.status === 'Pending' && (
                          <button
                            onClick={() => approveRequest(student.id)}
                            className={`${styles.actionButton} ${styles.approveButton}`}
                            disabled={!selectedCourse}
                          >
                            <FaCheck /> Approve
                          </button>
                        )}
                        {student.status === 'ACTIVE' ? (
                          <button
                            onClick={() => removeEnrollment(student.id, student.courseId)}
                            className={`${styles.actionButton} ${styles.removeButton}`}
                          >
                            <FaTimes /> Remove
                          </button>
                        ) : student.status !== 'Pending' && (
                          <button
                            onClick={() => assignManually(student.id)}
                            className={`${styles.actionButton} ${styles.assignButton}`}
                            disabled={!selectedCourse}
                          >
                            <FaPlus /> Assign
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div className={styles.noResults}>
              No students found matching your criteria
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseEnrollment;
