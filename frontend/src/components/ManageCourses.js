import React, { useState, useEffect } from 'react';
import styles from './ManageCourses.module.css';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [units, setUnits] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    credits: '',
    lecturer: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (editingId) {
      const courseToEdit = courses.find(c => c.id === editingId);
      if (courseToEdit && courseToEdit.units) {
        setUnits(courseToEdit.units);
      } else {
        setUnits([]);
      }
      setNewCourse({
        title: courseToEdit.title,
        description: courseToEdit.description,
        credits: courseToEdit.credits,
        lecturer: courseToEdit.lecturer
      });
    }
  }, [editingId, courses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleUnitChange = (index, field, value) => {
    const updatedUnits = [...units];
    updatedUnits[index] = { ...updatedUnits[index], [field]: value };
    setUnits(updatedUnits);
  };

  const addUnit = () => {
    setUnits([...units, { unitName: '', lecturer: '' }]);
  };

  const removeUnit = (index) => {
    setUnits(units.filter((_, i) => i !== index));
  };

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.description || !newCourse.credits || !newCourse.lecturer) {
      alert('Please fill all fields in Course Details');
      setActiveTab('details');
      return;
    }

    for (const unit of units) {
      if (!unit.unitName || !unit.lecturer) {
        alert('Please fill all fields in Units & Lecturers');
        setActiveTab('units');
        return;
      }
    }

    const courseData = {
      ...newCourse,
      units
    };

    if (editingId) {
      setCourses(courses.map(course =>
        course.id === editingId ? { ...course, ...courseData } : course
      ));
      setEditingId(null);
    } else {
      setCourses([...courses, { ...courseData, id: Date.now(), archived: false }]);
    }

    setNewCourse({ title: '', description: '', credits: '', lecturer: '' });
    setUnits([]);
    setFormVisible(false);
    setActiveTab('details');
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const handleEditCourse = (course) => {
    setNewCourse({
      title: course.title,
      description: course.description,
      credits: course.credits,
      lecturer: course.lecturer
    });
    setEditingId(course.id);
    setFormVisible(true);
    setActiveTab('details');
    if (course.units) {
      setUnits(course.units);
    } else {
      setUnits([]);
    }
  };

  const handleArchiveToggle = (id) => {
    setCourses(
      courses.map(course =>
        course.id === id ? { ...course, archived: !course.archived } : course
      )
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>📚 Manage Courses</h1>
        <button className={styles.addButton} onClick={() => setFormVisible(true)}>
          + Add New Course
        </button>
      </header>

      {formVisible && (
        <div className={styles.formOverlay}>
          <form
            className={styles.formContainer}
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCourse();
            }}
          >
            <h2>{editingId ? 'Edit Course' : 'Add New Course'}</h2>

            <div className={styles.tabs}>
              <button
                type="button"
                className={activeTab === 'details' ? styles.activeTab : ''}
                onClick={() => setActiveTab('details')}
              >
                Course Details
              </button>
              <button
                type="button"
                className={activeTab === 'units' ? styles.activeTab : ''}
                onClick={() => setActiveTab('units')}
              >
                Units & Lecturers
              </button>
            </div>

            {activeTab === 'details' && (
              <>
                <label>Course Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Introduction to AI"
                  value={newCourse.title}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />

                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Brief course overview"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  required
                  rows={3}
                />

                <label>Credits</label>
                <input
                  type="number"
                  name="credits"
                  placeholder="e.g. 3"
                  value={newCourse.credits}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  min="1"
                />
              </>
            )}

            {activeTab === 'units' && (
              <div className={styles.unitsContainer}>
                {units.length === 0 && <p>No units added yet.</p>}

                {units.map((unit, idx) => (
                  <div key={idx} className={styles.unitRow}>
                    <input
                      type="text"
                      placeholder="Unit Name"
                      value={unit.unitName}
                      onChange={(e) => handleUnitChange(idx, 'unitName', e.target.value)}
                      required
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Lecturer"
                      value={unit.lecturer}
                      onChange={(e) => handleUnitChange(idx, 'lecturer', e.target.value)}
                      required
                      className={styles.input}
                    />
                    <button
                      type="button"
                      className={styles.removeUnitBtn}
                      onClick={() => removeUnit(idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className={styles.addUnitBtn}
                  onClick={addUnit}
                >
                  + Add Unit
                </button>
              </div>
            )}

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                {editingId ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setFormVisible(false);
                  setEditingId(null);
                  setNewCourse({ title: '', description: '', credits: '', lecturer: '' });
                  setUnits([]);
                  setActiveTab('details');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <section className={styles.courseList}>
        {courses.length === 0 ? (
          <div className={styles.emptyState}>
            <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No courses" />
            <p>No courses added yet.</p>
          </div>
        ) : (
          courses.map(course => (
            <div
              key={course.id}
              className={`${styles.courseCard} ${course.archived ? styles.archived : ''}`}
            >
              <div className={styles.cardHeader}>
                <div
                  style={{
                    width: '100%',
                    height: 150,
                    backgroundColor: '#ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888',
                    marginBottom: 10,
                    fontStyle: 'italic'
                  }}
                >
                  No Image
                </div>
                <h3>{course.title}</h3>
                <span className={styles.creditsBadge}>{course.credits} credits</span>
              </div>
              <p className={styles.description}>{course.description}</p>
              <p><strong>Lecturer:</strong> {course.lecturer}</p>

              <div style={{ marginTop: 16 }}>
                <h4>Units & Assigned Lecturers</h4>
                {course.units && course.units.length > 0 ? (
                  <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                    {course.units.map((unit, i) => (
                      <li key={i} style={{ marginBottom: 6 }}>
                        <strong>{unit.unitName}</strong> - {unit.lecturer}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No units assigned.</p>
                )}
              </div>

              <div className={styles.cardActions}>
                <button onClick={() => handleEditCourse(course)} className={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => handleArchiveToggle(course.id)} className={styles.archiveButton}>
                  {course.archived ? 'Unarchive' : 'Archive'}
                </button>
                <button onClick={() => handleDeleteCourse(course.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default ManageCourses;
