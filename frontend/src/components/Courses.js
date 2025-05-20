import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Courses.module.css';

import ictImg from '../assets/ict.jpg';
import businessImg from '../assets/business.jpg';
import electricalImg from '../assets/electrical.jpg';
import constructionImg from '../assets/construction.jpg';
import scienceImg from '../assets/science.jpg';
import webImg from '../assets/web.jpg';
import autoImg from '../assets/automotive.jpg';
import csImg from '../assets/cs.jpg';

const courses = [
  {
    title: 'Diploma in ICT',
    description: 'Learn how to manage, analyze, and maintain IT systems.',
    image: ictImg,
  },
  {
    title: 'Diploma in Business Management',
    description: 'Master business principles and effective management strategies.',
    image: businessImg,
  },
  {
    title: 'Diploma in Electrical Engineering',
    description: 'Explore circuits, power systems, and electrical machines.',
    image: electricalImg,
  },
  {
    title: 'Building and Construction',
    description: 'Gain skills in structural design and on-site construction.',
    image: constructionImg,
  },
  {
    title: 'Applied Science',
    description: 'Learn scientific methods with real-world applications.',
    image: scienceImg,
  },
  {
    title: 'Web Development',
    description: 'Design modern websites and full-stack applications.',
    image: webImg,
  },
  {
    title: 'Automotive Engineering',
    description: 'Dive into engine systems, diagnostics, and performance.',
    image: autoImg,
  },
  {
    title: 'Computer Science Level Six',
    description: 'Study data structures, algorithms, and software design.',
    image: csImg,
  },
];

function Courses() {
  const navigate = useNavigate();

  const handleEnroll = () => {
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className={styles.coursesPage}>
      

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>The Ultimate Technical Education</h1>
          <p>Learn how to Start, Run & Scale your future</p>
          <div className={styles.searchBar}>
            <input type="text" placeholder="What kind of training are you looking for?" />
            <button>Search</button>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className={styles.courses}>
        <h2>Available Courses</h2>
        <div className={styles.courseGrid}>
          {courses.map((course, index) => (
            <div
              className={styles.courseCard}
              key={index}
              style={{ "--i": index }}
            >
              <img src={course.image} alt={course.title} />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button
                className={styles.enrollBtn}
                onClick={handleEnroll}
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Courses;
