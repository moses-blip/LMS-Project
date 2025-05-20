// src/components/Footer.js
import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottomBar}>
        <p> LMS by PhixTechnologies. | &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
