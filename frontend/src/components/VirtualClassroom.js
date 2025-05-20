import React, { useState, useMemo } from 'react';
import styles from './VirtualClassroom.module.css';

const generateParticipants = (count) => {
  const names = ['Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank', 'Grace', 'Hassan'];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${names[i % names.length]} ${String.fromCharCode(65 + i % 5)}.`,
    duration: `${Math.floor(Math.random() * 2)}h ${Math.floor(Math.random() * 60)}m`,
    online: Math.random() > 0.5,
  }));
};

const getTimeFromString = (timeString) => {
  const now = new Date();
  const [day, hours] = timeString.split(' ');
  const [start] = hours.split('-');
  const [hour, minute] = start.split(':');
  now.setHours(parseInt(hour), parseInt(minute), 0, 0);
  return now;
};

const VirtualClassroom = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPast, setShowPast] = useState(false);

  const now = new Date();

  const classes = [
    {
      id: 1,
      title: 'Mathematics 101',
      instructor: 'John Doe',
      time: 'Mon 10:00 - 11:30 AM',
      joinLink: '#',
      recordingLink: '#',
      date: new Date('2025-05-14T10:00:00'), // Past
      participants: generateParticipants(4),
    },
    {
      id: 2,
      title: 'Introduction to Physics',
      instructor: 'Jane Smith',
      time: 'Thu 1:00 - 2:30 PM',
      joinLink: '#',
      recordingLink: '#',
      date: new Date('2025-05-17T13:00:00'), // Upcoming
      participants: generateParticipants(6),
    },
  ];

  const filteredClasses = useMemo(() => {
    return classes
      .filter((cls) => showPast || cls.date >= now)
      .map((cls) => ({
        ...cls,
        participants: searchTerm
          ? cls.participants.filter((p) =>
              p.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : cls.participants,
      }));
  }, [searchTerm, showPast]);

  return (
    <div className={styles.virtualClassroom}>
      <h2>Virtual Classroom</h2>
      <p className={styles.introText}>
        Join your upcoming classes, see who’s attending, or catch up on missed sessions.
      </p>

      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="Search participants..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label className={styles.toggleWrapper}>
          <input
            type="checkbox"
            checked={showPast}
            onChange={() => setShowPast(!showPast)}
          />
          <span>Show past classes</span>
        </label>
      </div>

      <div className={styles.classContainer}>
        {filteredClasses.length === 0 && <p>No classes to display.</p>}
        {filteredClasses.map((cls) => (
          <div key={cls.id} className={styles.classCard}>
            <div className={styles.classInfo}>
              <h3>{cls.title}</h3>
              <p><strong>Instructor:</strong> {cls.instructor}</p>
              <p><strong>Time:</strong> {cls.time}</p>
              <div className={styles.buttons}>
                <a href={cls.joinLink} className={styles.joinButton}>Join</a>
                <a href={cls.recordingLink} className={styles.recordingButton}>Recording</a>
              </div>
            </div>

            <div className={styles.participants}>
              <h4>
                Participants <span className={styles.participantCount}>({cls.participants.length})</span>
              </h4>
              <ul>
                {cls.participants.length === 0 ? (
                  <li className={styles.noParticipants}>No participants found</li>
                ) : (
                  cls.participants.map((participant) => (
                    <li key={participant.id} className={styles.participantItem}>
                      <span
                        className={`${styles.statusBadge} ${
                          participant.online ? styles.online : styles.offline
                        }`}
                      />
                      <span className={styles.participantName}>{participant.name}</span>
                      <span className={styles.participantDuration}>{participant.duration}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualClassroom;
