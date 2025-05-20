import React, { useState } from 'react';
import styles from './MiniCalendar.module.css';

const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.monthNavigation}>
        <button onClick={goToPreviousMonth}>&lt;</button>
        <span>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </span>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>

      <div className={styles.daysGrid}>
        {dayNames.map((name, index) => (
          <div key={index} className={styles.dayName}>{name}</div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          return (
            <div
              key={day}
              className={`${styles.dayNumber} ${isToday(day) ? styles.today : ''}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;