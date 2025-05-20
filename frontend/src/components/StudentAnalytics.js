import React, { useState } from 'react';
import styles from './StudentAnalytics.module.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const StudentAnalytics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [students] = useState([
    { name: 'Alice Johnson', email: 'alice@example.com', course: 'Mathematics', progress: 85, lastActive: '2025-05-10', status: 'Active' },
    { name: 'Brian Lee', email: 'brian@example.com', course: 'Science', progress: 40, lastActive: '2025-05-11', status: 'Inactive' },
    { name: 'Carla Smith', email: 'carla@example.com', course: 'Mathematics', progress: 72, lastActive: '2025-05-09', status: 'Active' },
    { name: 'Daniel Kim', email: 'daniel@example.com', course: 'English', progress: 95, lastActive: '2025-05-12', status: 'Active' },
    { name: 'Eleanor Watts', email: 'eleanor@example.com', course: 'Science', progress: 66, lastActive: '2025-05-08', status: 'Inactive' },
  ]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleExportPDF = () => {};
  const handleExportCSV = () => {};

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCourse ? student.course === filterCourse : true)
  );

  // ==== Analytics Data ====
  const progressGroups = [
    { range: '0-50%', count: students.filter(s => s.progress <= 50).length },
    { range: '51-75%', count: students.filter(s => s.progress > 50 && s.progress <= 75).length },
    { range: '76-100%', count: students.filter(s => s.progress > 75).length }
  ];

  const courseDistribution = Array.from(
    students.reduce((acc, s) => {
      acc.set(s.course, (acc.get(s.course) || 0) + 1);
      return acc;
    }, new Map()),
    ([name, value]) => ({ name, value })
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2>📊 Student Analytics Dashboard</h2>
        <div>
          <button onClick={handleExportPDF}>Export PDF</button>
          <button onClick={handleExportCSV}>Export CSV</button>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select onChange={(e) => setFilterCourse(e.target.value)}>
          <option value="">All Courses</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
        </select>
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Progress (%)</th>
            <th>Last Active</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.progress}%</td>
              <td>{student.lastActive}</td>
              <td>{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Visual Analytics */}
      <div className={styles.chartsContainer}>
        <div className={styles.chartCard}>
          <h3>Progress Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={progressGroups}>
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3>Course Enrollment</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={courseDistribution}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {courseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;
