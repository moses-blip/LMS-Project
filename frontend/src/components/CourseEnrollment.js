import React, { useState } from 'react';
import styles from './CourseEnrollment.module.css';

const mockCourses = [
  { id: 'c1', name: 'Computer Science' },
  { id: 'c2', name: 'Business Management' },
];

const mockStudents = [
  { id: 1, name: 'Alice M.', regNo: 'ADM001', email: 'alice@mail.com', course: 'c1', status: 'Enrolled' },
  { id: 2, name: 'Brian C.', regNo: 'STD102', email: 'brian@mail.com', course: null, status: 'Pending' },
];

function CourseEnrollment() {
  const [tab, setTab] = useState('requests');
  const [students, setStudents] = useState(mockStudents);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const approveRequest = (id) => {
    setStudents(prev => prev.map(student => (
      student.id === id ? { ...student, status: 'Enrolled', course: selectedCourse } : student
    )));
  };

  const assignManually = (id) => {
    setStudents(prev => prev.map(student => (
      student.id === id ? { ...student, status: 'Enrolled', course: selectedCourse } : student
    )));
  };

  const removeEnrollment = (id) => {
    setStudents(prev => prev.map(student => (
      student.id === id ? { ...student, status: 'Pending', course: null } : student
    )));
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📘 Course Enrollment Management</h2>

      <div className={styles.tabs}>
        <button onClick={() => setTab('requests')} className={tab === 'requests' ? styles.activeTab : ''}>Enrollment Requests</button>
        <button onClick={() => setTab('manual')} className={tab === 'manual' ? styles.activeTab : ''}>Manual Assignment</button>
        <button onClick={() => setTab('overview')} className={tab === 'overview' ? styles.activeTab : ''}>Overview</button>
      </div>

      <div className={styles.searchFilter}>
        <input
          type="text"
          placeholder="Search students by name, email, or reg. no"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {(tab !== 'overview') && (
          <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
            <option value="">Select a course</option>
            {mockCourses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        )}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Reg No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents
            .filter(student => {
              if (tab === 'requests') return student.status === 'Pending';
              if (tab === 'manual') return student.status !== 'Enrolled';
              return true;
            })
            .map(student => (
              <tr key={student.id}>
                <td>{student.regNo}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course ? mockCourses.find(c => c.id === student.course)?.name : '—'}</td>
                <td className={student.status === 'Enrolled' ? styles.enrolled : styles.pending}>
                  {student.status}
                </td>
                <td>
                  {tab === 'requests' && (
                    <button onClick={() => approveRequest(student.id)} disabled={!selectedCourse}>
                      ✅ Approve
                    </button>
                  )}
                  {tab === 'manual' && (
                    <button onClick={() => assignManually(student.id)} disabled={!selectedCourse}>
                      ➕ Assign
                    </button>
                  )}
                  {tab === 'overview' && student.status === 'Enrolled' && (
                    <button onClick={() => removeEnrollment(student.id)} className={styles.removeBtn}>
                      ❌ Remove
                    </button>
                  )}
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseEnrollment;
