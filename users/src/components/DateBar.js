import React, { useState, useEffect } from "react";
import "../styles/DateBar.css";

import { FaCalendarAlt, FaClock, FaSun, FaMoon } from "react-icons/fa";

const DateBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  /* LIVE CLOCK */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* WEEK DAYS */
  const tamilWeekDays = [
    "ஞாயிறு",
    "திங்கள்",
    "செவ்வாய்",
    "புதன்",
    "வியாழன்",
    "வெள்ளி",
    "சனி",
  ];

  /* MONTHS */
  const tamilMonths = [
    "சித்திரை",
    "வைகாசி",
    "ஆனி",
    "ஆடி",
    "ஆவணி",
    "புரட்டாசி",
    "ஐப்பசி",
    "கார்த்திகை",
    "மார்கழி",
    "தை",
    "மாசி",
    "பங்குனி",
  ];

  /* 60-YEAR CYCLE */
  const tamilYears = [
    "பிரபவ","விபவ","சுக்ல","பிரமோதூத","பிரஜோற்பத்தி","ஆங்கீரச",
    "ஸ்ரீமுக","பவ","யுவ","தாது","ஈஸ்வர","வெகுதான்ய","பிரமாதி",
    "விக்ரம","விஷு","சித்திரபானு","சுபானு","தாரண","பார்த்திப","விய",
    "சர்வஜித்","சர்வதாரி","விரோதி","விக்ருதி","கர","நந்தன","விஜய",
    "ஜய","மன்மத","துர்முகி","ஹேவிளம்பி","விளம்பி","விகாரி","சார்வரி",
    "பிலவ","சுபகிருது","சோபகிருது","குரோதி","விசுவாவசு","பராபவ",
    "பிலவங்க","கீலக","சௌமிய","சாதாரண","விரோதிகிருது","பரிதாபி",
    "பிரமாதீச","ஆனந்த","ராக்ஷச","நள","பிங்கள","காளயுக்தி",
    "சித்தார்த்தி","ரௌத்திரி","துன்மதி","துந்துபி","ருத்ரோத்காரி",
    "ரக்தாட்சி","குரோதன","அட்சய",
  ];

  const now = currentTime;

  const day = now.getDay();
  const date = now.getDate();
  const year = now.getFullYear();

  /* ================================
     STABLE TAMIL CALENDAR ENGINE
  ================================ */

  const tamilMonthLengths = [
    31, 31, 32, 31, 31, 30,
    30, 29, 29, 30, 30, 31,
  ];

  const tamilNewYear = new Date(year, 3, 14); // April 14

  let diffDays = Math.floor(
    (now - tamilNewYear) / (1000 * 60 * 60 * 24)
  );

  let cycleYear = year;

  if (diffDays < 0) {
    cycleYear = year - 1;
    const prevNY = new Date(year - 1, 3, 14);

    diffDays = Math.floor(
      (now - prevNY) / (1000 * 60 * 60 * 24)
    );
  }

  let tamilMonthIndex = 0;

  while (diffDays >= tamilMonthLengths[tamilMonthIndex]) {
    diffDays -= tamilMonthLengths[tamilMonthIndex];
    tamilMonthIndex++;

    if (tamilMonthIndex === 12) tamilMonthIndex = 0;
  }

  const tamilDate = diffDays + 1;
  const tamilMonth = tamilMonths[tamilMonthIndex];

  /* ================================
     TAMIL YEAR
  ================================ */

  const tamilYearIndex =
    ((cycleYear - 1987) % 60 + 60) % 60;

  const tamilYear = tamilYears[tamilYearIndex];

  /* NORMAL DATE */
  const normalDate = `
    ${tamilWeekDays[day]},
    ${date} ${now.toLocaleString("ta-IN", {
      month: "long",
    })} ${year}
  `;

  /* TAMIL DATE */
  const tamilFullDate = `
    ${tamilDate} ${tamilMonth}, ${tamilYear} ஆண்டு
  `;

  /* TIME */
  const time = now.toLocaleTimeString("ta-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const hour = now.getHours();
  const TimeIcon = hour >= 6 && hour < 18 ? FaSun : FaMoon;

  return (
    <div className="date-bar">
      <div className="date-section">
        <FaCalendarAlt className="date-icon" />

        <div className="date-content">
          <span className="date-text">{normalDate}</span>
          <span> | </span>
          <span className="tamil-date-text">
            {tamilFullDate}
          </span>
        </div>
      </div>

      <div className="time-section">
        <TimeIcon className="time-icon" />
        <span className="time-text">{time}</span>
        <FaClock className="clock-icon" />
      </div>
    </div>
  );
};

export default DateBar;