// src/components/ContactInfo.js

import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ContactInfo.css';

function ContactInfo() {
  return (
    <>
     
      <div className="contact-container">
        <header className="contact-header">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Whether you're a student, instructor, or visitor, reach out with any questions or feedback.</p>
        </header>

        <div className="contact-content">
          {/* Left: Contact Details */}
          <div className="contact-details">
            <div className="contact-item">
              <Phone className="icon" />
              <span>+254 712 345 678</span>
            </div>
            <div className="contact-item">
              <Mail className="icon" />
              <span>info@thikatech.ac.ke</span>
            </div>
            <div className="contact-item">
              <MapPin className="icon" />
              <span>Thika Town, Kiambu County, Kenya</span>
            </div>
          </div>

          {/* Right: Contact Form */}
          <form className="contact-form">
            <div className="input-group">
              <input type="text" required />
              <label>Name</label>
            </div>
            <div className="input-group">
              <input type="email" required />
              <label>Email</label>
            </div>
            <div className="input-group">
              <textarea required></textarea>
              <label>Message</label>
            </div>
            <button type="submit" className="send-btn">
              <Send size={18} style={{ marginRight: '8px' }} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactInfo;
