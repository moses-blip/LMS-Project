// StudentAssignmentView.js
import React, { useState } from 'react';
import styles from './StudentAssignmentView.module.css';
import { UploadCloud } from 'react-feather'; // ✅ Imported properly

const StudentAssignmentView = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('Computer Programming');
  const [assignmentType, setAssignmentType] = useState('CAT');
  const [selectedFile, setSelectedFile] = useState(null);
  const [answer, setAnswer] = useState('');

  const units = [
    'Computer Programming',
    'Data Structures',
    'Database Systems',
    'Web Development',
    'Networking Basics',
  ];

  const assignmentContent = {
    'Computer Programming': {
      CAT: {
        instructions: 'Answer all questions. Time allowed: 1hr 30min.',
        questions: [
          '1. Explain the concept of pointers in C.',
          '2. Write a program that sums even numbers between 1 and 100.',
        ],
      },
      'Main Exam': {
        instructions: 'Answer any three questions. Time allowed: 2hrs.',
        questions: [
          '1. Discuss memory management in C++.',
          '2. Differentiate between stack and heap with examples.',
          '3. Write a C function that reverses a string.',
        ],
      },
    },
    'Data Structures': {
      CAT: {
        instructions: 'Answer all questions briefly.',
        questions: [
          '1. Define a linked list and explain its types.',
          '2. What is a binary search tree? Provide an example.',
        ],
      },
      'Main Exam': {
        instructions: 'Answer any two questions.',
        questions: [
          '1. Compare and contrast stacks and queues.',
          '2. Write pseudocode for depth-first search.',
          '3. Explain how hash tables work.',
        ],
      },
    },
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
    alert(`Navigated to ${e.target.value} unit assignments.`);
  };

  const handleTypeChange = (e) => {
    setAssignmentType(e.target.value);
    alert(`Viewing ${e.target.value} assignment`);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    alert(`File selected: ${e.target.files[0].name}`);
  };

  const handleSubmit = () => {
    if (!answer.trim()) {
      alert('Please write your answer.');
      return;
    }

    if (!selectedFile) {
      alert('Please attach a file before submitting.');
      return;
    }

    setIsSubmitted(true);
    console.log('Submitted answer:', answer);
    console.log('Attached file:', selectedFile);
    alert('Assignment submitted successfully!');
  };

  const { instructions, questions } =
    assignmentContent[selectedUnit]?.[assignmentType] || {
      instructions: 'No instructions available.',
      questions: ['No questions available.'],
    };

  if (isSubmitted) {
    return (
      <div className={styles.successMessage}>
        <h2>Assignment Submitted</h2>
        <p>Thank you for your submission.</p>
      </div>
    );
  }

  return (
    <>
      {/* 🔵 Top Bar */}
      <div className={styles.topBar}>
        <span className={styles.unitLabel}>Unit:</span>
        <select
          className={styles.unitSelect}
          value={selectedUnit}
          onChange={handleUnitChange}
        >
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      {/* 🟦 Assignment Type Selector */}
      <div className={styles.assignmentTypeBar}>
        <span className={styles.assignmentTypeLabel}>Assignment Type:</span>
        <select
          className={styles.assignmentTypeSelect}
          value={assignmentType}
          onChange={handleTypeChange}
        >
          <option value="CAT">CAT</option>
          <option value="Main Exam">Main Exam</option>
        </select>
      </div>

      {/* ⏱️ Info Row */}
      <hr className={styles.faintLine} />
      <div className={styles.assignmentInfoRow}>
        <div><strong>Duration:</strong> 1hr 30min</div>
        <div><strong>Deadline:</strong> 15 May 2025</div>
        <div><strong>Total Marks:</strong> 40</div>
        <div><strong>Pass Mark:</strong> 20</div>
      </div>
      <hr className={styles.faintLine} />

      {/* 📝 Questions Section */}
      <h1 className={styles.mainTitle}>Assignment</h1>
      <h3 className={styles.subTitle}>Instructions</h3>
      <p className={styles.instructions}>{instructions}</p>

      <h3 className={styles.subTitle}>Questions</h3>
      <ul className={styles.questionList}>
        {questions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>

      {/* ✍️ Answer Card */}
      <div className={styles.card}>
        <textarea
          className={styles.textArea}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer here..."
        />
      </div>

      {/* 📁 File Upload */}
      <div className={styles.card}>
        <p className={styles.fileInstructions}>
          Attach your file below. <strong>Max size: 10MB</strong>
        </p>

        <div className={styles.uploadContainer}>
          <div className={styles.uploadIconArea}>
            <UploadCloud size={48} className={styles.uploadIcon} />
            <p className={styles.browseLabel}>Browse File</p>
            <p className={styles.dragText}>or Drag & Drop files here</p>
          </div>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className={styles.hiddenInput}
          />
        </div>

        <p className={styles.fileSupport}>
          File Support: <strong>Any standard image, document, presentation, sheet, PDF or text file is allowed.</strong>
        </p>
      </div>

      {/* ✅ Submit Button */}
      <div className={styles.submitRight}>
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default StudentAssignmentView;
