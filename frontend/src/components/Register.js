import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const [position, setPosition] = useState('student');  // track selected position
  const [selectedUnits, setSelectedUnits] = useState([]);

  // Sample courses and units for dropdown (replace with real data if available)
  const courses = ['Computer Science', 'Business', 'Engineering'];
  const units = [
    'Mathematics',
    'Programming 101',
    'Data Structures',
    'Operating Systems',
    'Networking',
  ];

  // Handle multi-select units
  const toggleUnit = (unit) => {
    setSelectedUnits(prev =>
      prev.includes(unit) ? prev.filter(u => u !== unit) : [...prev, unit]
    );
  };

  return (
    <div className={styles.registerPage}>
      
      {/* Main Register Section */}
      <div className={styles.registerContainer}>
        {/* Left Side */}
        <div className={styles.registerLeft}>
          <h1>Hello,</h1>
          <p>Welcome to the registration page of our E-LMS. Please fill out the form to access full features.</p>
          <p>If you already have an account, click below to login.</p>
          <Link to="/login"><button className={styles.loginBtn}>LOGIN</button></Link>
        </div>

        {/* Right Side - Form */}
        <div className={styles.registerRight}>
          <h2>SIGN UP</h2>
          <form>
            <div className={styles.inputRow}>
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>
            <input type="email" placeholder="Email Address" />

            {/* Registration Number below Email */}
            <input type="text" placeholder="Registration Number" />

            <div className={styles.positionGroup}>
              <label>Position:</label>
              <label>
                <input
                  type="radio"
                  name="position"
                  value="student"
                  checked={position === 'student'}
                  onChange={() => setPosition('student')}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="position"
                  value="trainer"
                  checked={position === 'trainer'}
                  onChange={() => setPosition('trainer')}
                />
                Trainer
              </label>
            </div>

            {/* Conditionally show these fields if position is trainer */}
            {position === 'trainer' && (
              <>
                <label>Choose Course:</label>
                <select>
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>

                <label>Units (select multiple):</label>
                <div className={styles.unitsMultiSelect}>
                  {units.map(unit => (
                    <label key={unit} style={{ display: 'block' }}>
                      <input
                        type="checkbox"
                        value={unit}
                        checked={selectedUnits.includes(unit)}
                        onChange={() => toggleUnit(unit)}
                      />
                      {unit}
                    </label>
                  ))}
                </div>
              </>
            )}

            <input type="password" placeholder="Enter Password" />
            <input type="password" placeholder="Retype Password" />
            <button type="submit" className={styles.registerBtn}>REGISTER</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
