import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import styles from './GeneralInfoPage.module.css';

const GeneralInfoPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.body.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h2 className={styles.title}>General Information</h2>

        <div className={styles.section}>
          <h3>Terms and Privacy</h3>
          <p>
            By using our platform, you agree to our terms and privacy policy.
            Please ensure you read and understand them.
          </p>
          <button className={styles.linkButton}>View Terms & Privacy</button>
        </div>

        <div className={styles.section}>
          <h3>Notification Preferences</h3>
          <label className={styles.toggleRow}>
            <input type="checkbox" defaultChecked />
            <span>Email Notifications</span>
          </label>
          <label className={styles.toggleRow}>
            <input type="checkbox" />
            <span>SMS Notifications</span>
          </label>
        </div>

        <div className={styles.section}>
          <h3>App Settings</h3>
          <label className={styles.toggleRow}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleTheme}
            />
            <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </label>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GeneralInfoPage;
