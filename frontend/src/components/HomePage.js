// src/components/HomePage.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  useEffect(() => {
    const cards = document.querySelectorAll('.feature-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => {
      observer.observe(card);
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return (
    <div className="homepage">
      

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h2>Thika Technical E-learning Platform</h2>
          <h1>Training in the<span> Now</span> </h1>
          <p>Smarter, Faster, Corporate E-learning.</p>
          <Link to="/courses">
            <button className="learn-more-btn">Learn More</button>
          </Link>
        </div>

        <div className="hero-right">
          <img src="/banner.jpg" alt="Hero Banner" />
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="features">
        <h2 className="features-heading">Our Core Features</h2>
        <div className="features-container">

          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Easy Course Access</h3>
            <p>Access your enrolled courses anytime, anywhere with a single click inside the platform.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Assignments & Exams</h3>
            <p>Submit assignments, complete quizzes, and monitor your academic performance online.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Student Profile Management</h3>
            <p>Update your profile, track enrollments, and manage your learning journey easily.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛠️</div>
            <h3>Admin & Lecturer Tools</h3>
            <p>Lecturers and admins manage courses, assignments, and student progress efficiently from one dashboard.</p>
          </div>

        </div>
      </section>

      {/* 👇 Dashboard Access Button Section 👇 */}
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <Link to="/dashboard">
          <button className="learn-more-btn">Go to My Dashboard</button>
        </Link>
      </div>
      {/* 👆 End Dashboard Button 👆 */}

    </div>
  );
}

export default HomePage;
