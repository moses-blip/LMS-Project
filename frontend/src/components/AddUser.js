import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddUser.module.css';

function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    email: '',
    role: '',
    status: 'Active',
    photo: null,
    course: '',
    units: [],
  });

  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);

  const navigate = useNavigate();

  // Mock data - you'll replace this with API data
  useEffect(() => {
    setCourses([
      { id: 'c1', name: 'Computer Science' },
      { id: 'c2', name: 'Business Management' },
      { id: 'c3', name: 'Engineering' },
    ]);

    setUnits([
      { id: 'u1', name: 'Data Structures', courseId: 'c1' },
      { id: 'u2', name: 'Algorithms', courseId: 'c1' },
      { id: 'u3', name: 'Marketing 101', courseId: 'c2' },
      { id: 'u4', name: 'Microeconomics', courseId: 'c2' },
      { id: 'u5', name: 'Thermodynamics', courseId: 'c3' },
      { id: 'u6', name: 'Fluid Mechanics', courseId: 'c3' },
    ]);
  }, []);

  // Filter units by selected course
  useEffect(() => {
    if (formData.course) {
      const matchedUnits = units.filter(unit => unit.courseId === formData.course);
      setFilteredUnits(matchedUnits);
    } else {
      setFilteredUnits([]);
    }
  }, [formData.course, units]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else if (name === 'units') {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, units: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User registered:', formData);
    // send data to backend here
    navigate('/manage-users');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>➕ Register New User</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Reg. No</label>
            <input
              type="text"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">-- Select Role --</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>

          {/* 👇 Instructor-only fields */}
          {formData.role === 'Instructor' && (
            <>
              <div className={styles.formGroup}>
                <label>Select Course</label>
                <select name="course" value={formData.course} onChange={handleChange} required>
                  <option value="">-- Choose Course --</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Units Taught (hold Ctrl/Cmd to select multiple)</label>
                <select
                  name="units"
                  multiple
                  value={formData.units}
                  onChange={handleChange}
                  required
                >
                  {filteredUnits.map(unit => (
                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Deactivated">Deactivated</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Profile Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.submitBtn}>Register User</button>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/manage-users')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
