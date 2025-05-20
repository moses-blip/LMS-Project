import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaSave, FaTimes } from 'react-icons/fa';
import styles from './GradeAssignments.module.css';

const mockSubmissions = [
  {
    id: 1,
    studentName: 'Alice Johnson',
    assignmentTitle: 'Math Quiz 1',
    submittedAt: '2025-05-10',
    fileUrl: '#',
    grade: null,
    feedback: '',
  },
  {
    id: 2,
    studentName: 'Bob Smith',
    assignmentTitle: 'Math Quiz 1',
    submittedAt: '2025-05-11',
    fileUrl: '#',
    grade: 78,
    feedback: 'Good work!',
  },
];

export default function GradeAssignments() {
  const [submissions, setSubmissions] = useState([]);
  const [current, setCurrent] = useState(null);
  const [gradeInput, setGradeInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');

  useEffect(() => {
    // load from API in real life
    setSubmissions(mockSubmissions);
  }, []);

  const startGrading = (sub) => {
    setCurrent(sub);
    setGradeInput(sub.grade ?? '');
    setFeedbackInput(sub.feedback ?? '');
  };

  const saveGrade = () => {
    setSubmissions(subs =>
      subs.map(s =>
        s.id === current.id
          ? { ...s, grade: gradeInput, feedback: feedbackInput }
          : s
      )
    );
    setCurrent(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Grade Exams &amp; Assignments</h2>

      <ul className={styles.list}>
        {submissions.map(s => (
          <li key={s.id} className={styles.item}>
            <div>
              <strong>{s.studentName}</strong>
              <span className={styles.meta}>
                &nbsp;• {s.assignmentTitle}&nbsp;• {s.submittedAt}
              </span>
              {s.grade != null && (
                <span className={styles.gradeBadge}>{s.grade}%</span>
              )}
            </div>
            <button
              className={styles.openBtn}
              onClick={() => startGrading(s)}
            >
              <FaClipboardList /> Open
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div className={styles.gradingPanel}>
          <h3>
            Grading: <span className={styles.currentStudent}>{current.studentName}</span>
          </h3>
          <p>
            Assignment: <em>{current.assignmentTitle}</em>
          </p>

          <label className={styles.field}>
            Grade (%)  
            <input
              type="number"
              min="0"
              max="100"
              value={gradeInput}
              onChange={e => setGradeInput(e.target.value)}
              className={styles.input}
            />
          </label>

          <label className={styles.field}>
            Feedback (optional)  
            <textarea
              rows="4"
              value={feedbackInput}
              onChange={e => setFeedbackInput(e.target.value)}
              className={styles.textarea}
            />
          </label>

          <div className={styles.actions}>
            <button onClick={saveGrade} className={styles.saveBtn}>
              <FaSave /> Save Grade
            </button>
            <button onClick={() => setCurrent(null)} className={styles.cancelBtn}>
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
