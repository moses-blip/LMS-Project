// src/components/CreateClass.js
import React, { useState } from 'react';
import styles from './CreateClass.module.css';
import { CalendarDays, Video, UploadCloud, CheckCircle, Loader } from 'lucide-react';

const CreateClass = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    meetLink: '',
    enableAttendance: false,
    recording: null,
  });

  const [generatingLink, setGeneratingLink] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const generateMeetLink = () => {
    setGeneratingLink(true);
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        meetLink: `https://meet.google.com/${Math.random().toString(36).substring(7)}`,
      }));
      setGeneratingLink(false);
    }, 1000); // Simulate async meet link generation
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted class:', formData);
    // You’d send this data to backend later
  };

  return (
    <div className={styles.createClassContainer}>
      <h2>Create New Class</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Class Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Intro to AI"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Short class overview"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className={styles.flexRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="meetLink">Google Meet Link</label>
          <div className={styles.meetRow}>
            <input
              type="url"
              id="meetLink"
              name="meetLink"
              placeholder="https://meet.google.com/..."
              value={formData.meetLink}
              onChange={handleChange}
              disabled
            />
            <button
              type="button"
              onClick={generateMeetLink}
              className={styles.generateBtn}
              disabled={generatingLink}
            >
              {generatingLink ? <Loader className={styles.spin} size={18} /> : <Video size={18} />}
              Generate
            </button>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="recording">Attach Class Recording</label>
          <input
            type="file"
            name="recording"
            id="recording"
            accept="video/*"
            onChange={handleChange}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="enableAttendance"
            name="enableAttendance"
            checked={formData.enableAttendance}
            onChange={handleChange}
          />
          <label htmlFor="enableAttendance">
            <CheckCircle size={16} />
            Enable Real-Time Attendance Tracking
          </label>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Create Class
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
