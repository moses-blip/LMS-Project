import React, { useState } from 'react';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'basic' ? styles.active : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          Basic Information
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'personal' ? styles.active : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Information
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'password' ? styles.active : ''}`}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'basic' && (
          <div className={styles.section}>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
            <label>Role</label>
            <input type="text" placeholder="e.g., Student or Trainer" />
            <button className={styles.saveButton}>Save Changes</button>
          </div>
        )}

        {activeTab === 'personal' && (
          <div className={styles.section}>
            <label>Address</label>
            <input type="text" placeholder="Enter your address" />
            <label>Phone Number</label>
            <input type="text" placeholder="Enter your phone number" />
            <label>Date of Birth</label>
            <input type="date" />
            <button className={styles.saveButton}>Save Changes</button>
          </div>
        )}

        {activeTab === 'password' && (
          <div className={styles.section}>
            <label>Old Password</label>
            <input type="password" placeholder="Enter old password" />
            <label>New Password</label>
            <input type="password" placeholder="Enter new password" />
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm new password" />
            <button className={styles.saveButton}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
