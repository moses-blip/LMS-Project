// src/components/AboutUs.js

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutUs.module.css';

function AboutUs() {
  return (
    <div className={styles.aboutus}>

      {/* Hero Section with background image */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <h1>About Thika Technical Training Institute</h1>
        </div>
      </section>

      {/* About Details Section */}
      <section className={styles.aboutContent}>
        <div className={styles.story}>
          <p>
            <span className={styles.highlight}>Thika</span>Technical Training Institute was established to provide top-tier vocational and technical education to learners from across the region...
          </p>
          <p>
            Our purpose has always been to bridge the skills gap and nurture innovation, integrity, and professionalism in our students...
          </p>
        </div>

        <div className={styles.visionMission}>
          <h2>Our Vision</h2>
          <p>To be a center of excellence in technical vocational and entrepreneurship training.</p>

          <h2>Our Mission</h2>
          <p>To provide training, research and outreach programs...</p>

          <h2>Our Motto</h2>
          <p>Pride in Technology</p>
        </div>
      </section>

    </div>
  );
}

export default AboutUs;
