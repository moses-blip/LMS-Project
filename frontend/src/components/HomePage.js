// src/components/HomePage.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Make sure this includes your theme styles

function HomePage() {
  const isLoggedIn = localStorage.getItem('token'); // replace with context if you use it

  useEffect(() => {
    const cards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="homepage">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h2>Thika Technical E-learning Platform</h2>
          <h1>Training in the <span className="highlight">Now</span></h1>
          <p>Smarter, Faster, Accessible Education for Everyone.</p>
          <Link to="/courses">
            <button className="learn-more-btn">Explore Courses</button>
          </Link>
        </div>

        <div className="hero-right">
          <img src="/banner.jpg" alt="Institution Banner" className="hero-image" />
        </div>
      </section>

      {/* Public Features */}
      <section className="features">
        <h2 className="features-heading">Why Choose Us</h2>
        <div className="features-container">

          <div className="feature-card">
            <div className="feature-icon">📶</div>
            <h3>Access Anywhere</h3>
            <p>Our cloud-based platform ensures seamless learning from any location or device.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Modern Learning</h3>
            <p>Interactive content, progress tracking, and engaging course design for every learner.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Built for Students</h3>
            <p>Tailored tools for students to learn, grow, and succeed in their educational journey.</p>
          </div>

        </div>
      </section>

      {/* Protected Features (Post-login) */}
      {isLoggedIn && (
        <section className="features">
          <h2 className="features-heading">Your Tools & Dashboard</h2>
          <div className="features-container">

            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Assignments & Exams</h3>
              <p>Submit coursework, take quizzes, and monitor academic progress online.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👤</div>
              <h3>Profile Management</h3>
              <p>Update your profile, manage your courses, and track achievements.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛠️</div>
              <h3>Lecturer/Admin Tools</h3>
              <p>Admins and educators can manage classes, assignments, and learners from one place.</p>
            </div>

          </div>
        </section>
      )}

      {/* CTA Section */}
      <div className="cta-section">
        {isLoggedIn ? (
          <Link to="/dashboard">
            <button className="learn-more-btn">My Dashboard</button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="learn-more-btn">Get Started</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomePage;
