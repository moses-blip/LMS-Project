// src/components/EnrollCourse.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EnrollCourse.module.css';

function EnrollCourse() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  // Simulate fetching courses from DB
  useEffect(() => {
    // Replace with actual API call when backend is ready
    setCourses([
      { id: 'wd101', name: 'Intro to Web Development' },
      { id: 'ds201', name: 'Data Structures 2' },
      { id: 'ml301', name: 'Machine Learning Basics' },
      { id: 'db102', name: 'Database Systems' },
    ]);
  }, []);

  return (
    <div className={styles.page}>
      
      {/* Form Container */}
      <div className={styles.formContainer}>
        {/* Banner Image Inside Form */}
        <img
          src="/enroll-banner.jpg"
          alt="Enrollment Banner"
          className={styles.bannerImage}
        />

        <h2 className={styles.sectionTitle}>Course Enrollment</h2>

        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>First Name <span>*</span></label>
              <input type="text" required />
            </div>
            <div className={styles.inputGroup}>
              <label>Last Name <span>*</span></label>
              <input type="text" required />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Reg No. <span>*</span></label>
              <input type="text" required />
            </div>
            <div className={styles.inputGroup}>
              <label>Grade <span>*</span></label>
              <select required>
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Email Address <span>*</span></label>
            <input type="email" required />
          </div>

          {/* Course Select from DB */}
          <div className={styles.inputGroup}>
            <label>Select a course <span>*</span></label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              <option value="">-- Choose a course --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <h2 className={styles.sectionTitle}>Waitlist</h2>

          <div className={styles.inputGroup}>
            <label>In the event the desired class is full:</label>
            <div className={styles.radioGroup}>
              <label><input type="radio" name="waitlist" /> Try another time for the same class</label>
              <label><input type="radio" name="waitlist" /> Add me to the waitlist for my selected time</label>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EnrollCourse;
