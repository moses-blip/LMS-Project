// src/components/LecturerAssignmentPanel.js
import React, { useState, useRef } from 'react';
import styles from './LecturerAssignmentPanel.module.css';
import { UploadCloud } from 'lucide-react';

const LecturerAssignmentPanel = () => {
  const fileInputRef = useRef(null);

  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    unit: '',
    type: 'CAT',
    deadline: '',
    duration: '',
    instructions: '',
    questions: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  const handleFileDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAssignments((prev) => [...prev, formData]);
    alert('Assignment uploaded!');
    setFormData({
      unit: '',
      type: 'CAT',
      deadline: '',
      duration: '',
      instructions: '',
      questions: '',
      file: null,
    });
  };

  const handleView = (index) => {
    const assignment = assignments[index];
    // For now we just alert; you could navigate or open a modal instead
    alert(
      `Viewing Assignment:\nUnit: ${assignment.unit}\nType: ${assignment.type}\nDeadline: ${assignment.deadline}`
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Upload New Assignment</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label>
            Course Unit:
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Assignment Type:
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="CAT">CAT</option>
              <option value="Main Exam">Main Exam</option>
            </select>
          </label>
        </div>

        <div className={styles.row}>
          <label>
            Deadline:
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Duration (e.g. 1hr 30min):
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          Instructions:
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="3"
            required
          />
        </label>

        <label>
          Questions:
          <textarea
            name="questions"
            value={formData.questions}
            onChange={handleChange}
            rows="5"
            required
          />
        </label>

        <div
          className={styles.uploadArea}
          onDrop={handleFileDrop}
          onDragOver={handleFileDragOver}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <UploadCloud size={48} className={styles.uploadIcon} />
          <p className={styles.browseText}>Browse Files</p>
          <p className={styles.dropHint}>Drag and Drop files here</p>
          <input
            ref={fileInputRef}
            type="file"
            name="file"
            onChange={handleChange}
            className={styles.hiddenInput}
          />
        </div>

        <div className={styles.rightAlign}>
          <button className={styles.submitBtn} type="submit">
            Upload Assignment
          </button>
        </div>
      </form>

      <h3 className={styles.listHeading}>Uploaded Assignments</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Unit</th>
            <th>Type</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, index) => (
            <tr key={index}>
              <td>{a.unit}</td>
              <td>{a.type}</td>
              <td>{a.deadline}</td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => handleView(index)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LecturerAssignmentPanel;
