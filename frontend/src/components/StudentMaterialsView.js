import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import styles from './StudentMaterialsView.module.css';

const ITEMS_PER_PAGE = 3;

const StudentMaterialsView = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const courses = [
    {
      id: 1,
      name: 'Math 101',
      units: [
        { id: 1, name: 'Unit 1: Algebra' },
        { id: 2, name: 'Unit 2: Calculus' }
      ]
    },
    {
      id: 2,
      name: 'History 202',
      units: [
        { id: 3, name: 'Unit 1: Ancient' },
        { id: 4, name: 'Unit 2: Modern' }
      ]
    }
  ];

  const materials = [
    {
      id: 1,
      type: 'pdf',
      courseId: 1,
      unitId: 1,
      title: 'Lecture 1 Slides',
      description: 'Introduction to Algebra',
      uploadDate: '2025-05-01',
      url: 'https://example.com/alg1.pdf'
    },
    {
      id: 2,
      type: 'pdf',
      courseId: 1,
      unitId: 2,
      title: 'Lecture 2 Notes',
      description: 'Basics of Calculus',
      uploadDate: '2025-05-02',
      url: 'https://example.com/calculus2.pdf'
    },
    {
      id: 3,
      type: 'link',
      courseId: 2,
      unitId: 3,
      title: 'Reading Site',
      description: 'Ancient Civilizations',
      uploadDate: '2025-04-20',
      url: 'https://historysite.com/ancient'
    },
    {
      id: 4,
      type: 'video',
      courseId: 2,
      unitId: 4,
      title: 'Modern History Video',
      description: 'Lecture recording on Modern History',
      uploadDate: '2025-04-22',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];

  const units =
    selectedCourse !== ''
      ? courses.find((c) => c.id === parseInt(selectedCourse))?.units || []
      : [];

  const filteredMaterials = materials
    .filter((m) =>
      selectedCourse
        ? m.courseId === parseInt(selectedCourse) &&
          (!selectedUnit || m.unitId === parseInt(selectedUnit))
        : true
    )
    .filter((m) =>
      searchTerm.trim() === ''
        ? true
        : m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);
  const paginatedMaterials = filteredMaterials.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderMaterialViewer = (material) => {
    if (material.type === 'pdf') {
      return (
        <iframe
          src={material.url}
          width="100%"
          height="500px"
          className={styles.inlineViewer}
          title={material.title}
        ></iframe>
      );
    }

    if (material.type === 'video') {
      return (
        <div className={styles.videoWrapper}>
          <ReactPlayer
            url={material.url}
            controls
            width="100%"
            height="240px"
          />
        </div>
      );
    }

    if (material.type === 'link') {
      return (
        <iframe
          src={material.url}
          width="100%"
          height="400px"
          className={styles.inlineViewer}
          title={material.title}
        ></iframe>
      );
    }

    return null;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📚 Learning Materials</h2>

      <div className={styles.filters}>
        <select
          className={styles.select}
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            setSelectedUnit('');
            setCurrentPage(1);
          }}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={selectedUnit}
          onChange={(e) => {
            setSelectedUnit(e.target.value);
            setCurrentPage(1);
          }}
          disabled={!selectedCourse}
        >
          <option value="">All Units</option>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>

        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <ul className={styles.materialsList}>
        {paginatedMaterials.length === 0 ? (
          <p className={styles.noMaterials}>No materials found.</p>
        ) : (
          paginatedMaterials.map((material) => (
            <li key={material.id} className={styles.materialItem}>
              <div className={styles.materialHeader}>
                <span className={styles.typeTag}>[{material.type.toUpperCase()}]</span>
                <h3 className={styles.materialTitle}>{material.title}</h3>
              </div>
              <p className={styles.materialDesc}>{material.description}</p>
              <p className={styles.materialDate}>📅 {material.uploadDate}</p>
              {renderMaterialViewer(material)}
            </li>
          ))
        )}
      </ul>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`${styles.pageButton} ${
                currentPage === i + 1 ? styles.activePage : ''
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentMaterialsView;
