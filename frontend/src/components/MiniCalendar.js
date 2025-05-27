import React, { useState } from 'react';
import styles from './MiniCalendar.module.css';

const MiniCalendar = () => {
  const [currentDate] = useState(new Date());

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getCurrentWeekDates = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const weekDates = getCurrentWeekDates(currentDate);

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.monthNavigation}>
        <span>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </span>
      </div>

      <div className={styles.daysGrid}>
        {dayNames.map((name, i) => (
          <div key={i} className={styles.dayName}>
            {name}
          </div>
        ))}

        {weekDates.map((date, i) => (
          <div
            key={i}
            className={`${styles.dayNumber} ${isToday(date) ? styles.today : ''}`}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;
