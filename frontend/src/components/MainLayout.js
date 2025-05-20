// src/layouts/MainLayout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
  const location = useLocation();

  // Define routes where footer should be hidden
  const hideFooterOnRoutes = ['/login', '/register'];

  const showFooter = !hideFooterOnRoutes.includes(location.pathname);

  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
