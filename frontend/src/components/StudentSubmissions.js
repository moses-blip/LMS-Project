import React, { useState } from 'react';
import styles from './StudentSubmissions.module.css';

const StudentSubmissions = () => {
  const [selectedCourse, setSelectedCourse] = useState('Web Development'); // default for testing
  const [selectedUnit, setSelectedUnit] = useState('HTML Basics'); // default for testing

  const courses = ['Web Development', 'Data Structures', 'Algorithms'];
  const units = {
    'Web Development': ['HTML Basics', 'CSS Fundamentals', 'JavaScript Essentials'],
    'Data Structures': ['Arrays', 'Linked Lists', 'Trees'],
    'Algorithms': ['Sorting', 'Searching', 'Graph Algorithms'],
  };

  const submissions = [
    {
      id: 1,
      studentName: 'Alice Johnson',
      submissionDate: '2025-05-10',
      course: 'Web Development',
      unit: 'HTML Basics',
      status: 'Graded',
    },
    {
      id: 2,
      studentName: 'Bob Smith',
      submissionDate: '2025-05-11',
      course: 'Web Development',
      unit: 'HTML Basics',
      status: 'Not Graded',
    },
    // Add more submissions as needed
  ];

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.course === selectedCourse && submission.unit === selectedUnit
  );

  const totalStudents = 50;
  const submittedCount = filteredSubmissions.length;
  const notSubmittedCount = totalStudents - submittedCount;
  const pendingCount = filteredSubmissions.filter(
    (submission) => submission.status === 'Not Graded'
  ).length;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Student Submissions</h2>

      <div className={styles.selectionContainer}>
        <select
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            setSelectedUnit(''); // reset unit on course change
          }}
          className={styles.select}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          className={styles.select}
          disabled={!selectedCourse}
        >
          <option value="">Select Unit</option>
          {selectedCourse &&
            units[selectedCourse].map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
        </select>
      </div>

      {selectedCourse && selectedUnit && (
        <>
          <div className={styles.statsContainer}>
            <div className={styles.card}>
              <h3>Submitted</h3>
              <p>{submittedCount}</p>
            </div>
            <div className={styles.card}>
              <h3>Pending</h3>
              <p>{pendingCount}</p>
            </div>
            <div className={styles.card}>
              <h3>Not Submitted</h3>
              <p>{notSubmittedCount}</p>
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Submission Date</th>
                <th>Course</th>
                <th>Unit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.studentName}</td>
                  <td>{submission.submissionDate}</td>
                  <td>{submission.course}</td>
                  <td>{submission.unit}</td>
                  <td
                    style={{
                      color: submission.status === 'Graded' ? 'lightblue' : 'orange',
                      fontWeight: 'bold',
                    }}
                  >
                    {submission.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default StudentSubmissions;
