// src/components/ViewGradesPage.js
import React from 'react';
import styles from './ViewGradesPage.module.css'; // 👈 Import the CSS module

function ViewGradesPage() {
  const studentInfo = {
    name: "Jane Muthoni",
    regNo: "TVET/1234/2023",
    department: "Information Technology",
    course: "Diploma in Software Engineering",
    year: "2024/2025",
  };

  const grades = [
    { unitCode: "ITC101", unitName: "Introduction to Programming", marks: 78, grade: "Competent" },
    { unitCode: "ITC102", unitName: "Database Systems", marks: 65, grade: "Competent" },
    { unitCode: "ITC103", unitName: "Networking Basics", marks: 58, grade: "Not Yet Competent" },
    { unitCode: "ITC104", unitName: "Web Development", marks: 80, grade: "Competent" },
    { unitCode: "ITC105", unitName: "Operating Systems", marks: 60, grade: "Re-assess" },
  ];

  const meanGrade = "Competent";
  const overallResult = "Needs Reassessment";
  const recommendation = "Retake ITC103 and ITC105";

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Student Transcript</h2>

      {/* Student Info */}
      <div className={styles.studentInfo}>
        <p><strong>Name:</strong> {studentInfo.name}</p>
        <p><strong>Registration Number:</strong> {studentInfo.regNo}</p>
        <p><strong>Department:</strong> {studentInfo.department}</p>
        <p><strong>Course:</strong> {studentInfo.course}</p>
        <p><strong>Academic Year:</strong> {studentInfo.year}</p>
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Unit Code</th>
            <th>Unit Name</th>
            <th>Marks</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((unit, index) => (
            <tr key={index}>
              <td>{unit.unitCode}</td>
              <td>{unit.unitName}</td>
              <td>{unit.marks}</td>
              <td>
                <span
                  className={`${styles.grade} ${
                    unit.grade === 'Competent'
                      ? styles.competent
                      : unit.grade === 'Not Yet Competent'
                      ? styles.notYetCompetent
                      : styles.reassess
                  }`}
                >
                  {unit.grade}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className={styles.summary}>
        <p><strong>Mean Grade:</strong> {meanGrade}</p>
        <p><strong>Overall Result:</strong> {overallResult}</p>
        <p><strong>Recommendation:</strong> {recommendation}</p>
      </div>
    </div>
  );
}

export default ViewGradesPage;
