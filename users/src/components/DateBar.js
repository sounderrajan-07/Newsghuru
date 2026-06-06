import React, { useState, useEffect, useRef } from "react";
import "../styles/DateBar.css";
import { FaCalendarAlt, FaClock, FaSun, FaMoon, FaChevronDown, FaChevronUp } from "react-icons/fa";
const DateBar = () => {
  // Check for page reload to clear date parameter and return to today
  useEffect(() => {
    try {
      const navEntries = window.performance.getEntriesByType("navigation");
      if (navEntries.length > 0 && navEntries[0].type === "reload") {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('date')) {
          window.location.href = '/';
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Read initial date from URL if it exists, otherwise return null
  const getUrlDate = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const dateParam = urlParams.get('date');
      if (dateParam) {
        // Simple check to ensure valid date
        const d = new Date(dateParam);
        if (!isNaN(d.getTime())) return d;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef(null);

  const urlDate = getUrlDate();
  
  // If viewing a specific date from URL, use it. Otherwise, use live time (auto-updates at midnight)
  const displayDate = urlDate || currentTime;

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date((urlDate || new Date()).getFullYear(), (urlDate || new Date()).getMonth(), 1));
  const calendarWrapperRef = useRef(null);

  // Sync calendarMonth when displayDate changes or calendar is toggled open
  useEffect(() => {
    setCalendarMonth(new Date(displayDate.getFullYear(), displayDate.getMonth(), 1));
  }, [displayDate, showCalendar]);

  /* CLOSE CUSTOM CALENDAR WHEN CLICKING OUTSIDE */
  useEffect(() => {
    const handleClickOutsideCalendar = (event) => {
      if (calendarWrapperRef.current && !calendarWrapperRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideCalendar);
    return () => document.removeEventListener("mousedown", handleClickOutsideCalendar);
  }, []);

  const prevMonth = (e) => {
    e.stopPropagation();
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const getCalendarDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevTotalDays = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevTotalDays - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month days to pad to 42
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handleCalendarDayClick = (date) => {
    navigateToDate(date);
    setShowCalendar(false);
  };

  const handleCalendarClear = (e) => {
    e.stopPropagation();
    window.location.href = '/';
  };

  const handleCalendarToday = (e) => {
    e.stopPropagation();
    navigateToDate(new Date());
  };

  /* LIVE CLOCK */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* CLOSE DROPDOWN WHEN CLICKING OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateToDate = (newDate) => {
    const dateString = newDate.toISOString().split('T')[0];
    window.location.href = `/?date=${dateString}`;
  };

  const handlePrevDay = () => {
    const prevDate = new Date(displayDate);
    prevDate.setDate(prevDate.getDate() - 1);
    navigateToDate(prevDate);
  };

  const handleNextDay = () => {
    const nextDate = new Date(displayDate);
    nextDate.setDate(nextDate.getDate() + 1);
    navigateToDate(nextDate);
  };

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

  const day = displayDate.getDay();
  const date = displayDate.getDate();
  const year = displayDate.getFullYear();

  /* ================================
     STABLE TAMIL CALENDAR ENGINE
  ================================ */
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const tamilMonthLengths = [
    31, 31, 32, 31, 31, 30,
    30, 29, 29, 30, 30, isLeapYear ? 32 : 31,
  ];

  const tamilNewYear = new Date(year, 3, 14); // April 14

  let diffDays = Math.floor(
    (displayDate - tamilNewYear) / (1000 * 60 * 60 * 24)
  );

  let cycleYear = year;

  if (diffDays < 0) {
    cycleYear = year - 1;
    const prevNY = new Date(year - 1, 3, 14);

    diffDays = Math.floor(
      (displayDate - prevNY) / (1000 * 60 * 60 * 24)
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
  const tamilYearIndex = ((cycleYear - 1987) % 60 + 60) % 60;
  const tamilYear = tamilYears[tamilYearIndex];

  /* NORMAL DATE */
  const normalDate = `${date} ${displayDate.toLocaleString("ta-IN", { month: "long" })} ${year}`;

  /* TAMIL DATE */
  const tamilFullDate = `${tamilDate} ${tamilMonth}, ${tamilYear} ஆண்டு`;

  /* TIME */
  const time = currentTime.toLocaleTimeString("ta-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const hour = currentTime.getHours();
  const TimeIcon = hour >= 6 && hour < 18 ? FaSun : FaMoon;

  return (
    <div className="date-bar-container" ref={dropdownRef}>
      <div className="date-bar" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="date-section">
          <FaCalendarAlt className="date-icon" />
          <div className="date-content">
            <span className="date-text">{normalDate}</span>
            <span> | </span>
            <span className="date-text">{tamilWeekDays[day]}</span>
            <span> | </span>
            <span className="tamil-date-text">{tamilFullDate}</span>
          </div>
          <FaChevronDown className={`dropdown-icon ${isExpanded ? "open" : ""}`} />
        </div>

        <div className="time-section">
          <TimeIcon className="time-icon" />
          <span className="time-text">{time}</span>
          <FaClock className="clock-icon" />
        </div>
      </div>

      {isExpanded && (
        <div className="date-dropdown-menu">
          <div className="dinamalar-calendar-panel" onClick={(e) => e.stopPropagation()}>
            {/* Row 1: Header */}
            <div className="dc-header">
              <button className="dc-nav-btn" onClick={handlePrevDay}>&lt; Pre</button>
              <div 
                className="dc-date-picker-wrapper" 
                ref={calendarWrapperRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCalendar(!showCalendar);
                }}
                title="Select a Date"
              >
                <FaCalendarAlt className="dc-cal-icon" />
                <span className="dc-date-input-text">
                  {displayDate.toLocaleDateString("en-GB").replace(/\//g, "-")}
                </span>
                <FaChevronDown className="dc-cal-chevron" />
                
                {showCalendar && (
                  <div className="custom-calendar-popup" onClick={(e) => e.stopPropagation()}>
                    <div className="cc-header">
                      <span className="cc-month-year">
                        {calendarMonth.toLocaleString("en-US", { month: "long" })}, {calendarMonth.getFullYear()}
                      </span>
                      <div className="cc-nav-arrows">
                        <button type="button" className="cc-arrow-btn" onClick={prevMonth} title="Previous Month">
                          <FaChevronUp size={10} />
                        </button>
                        <button type="button" className="cc-arrow-btn" onClick={nextMonth} title="Next Month">
                          <FaChevronDown size={10} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="cc-weekdays">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                        <div key={d} className="cc-weekday">{d}</div>
                      ))}
                    </div>
                    
                    <div className="cc-days-grid">
                      {getCalendarDays().map(({ date: d, isCurrentMonth }, idx) => {
                        const isSelected = d.toDateString() === displayDate.toDateString();
                        const isToday = d.toDateString() === new Date().toDateString();
                        
                        return (
                          <div 
                            key={idx} 
                            className={`cc-day ${isCurrentMonth ? "" : "other-month"} ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
                            onClick={() => handleCalendarDayClick(d)}
                          >
                            {d.getDate()}
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="cc-footer">
                      <button type="button" className="cc-footer-btn" onClick={handleCalendarClear}>
                        Clear
                      </button>
                      <button type="button" className="cc-footer-btn" onClick={handleCalendarToday}>
                        Today
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button className="dc-nav-btn" onClick={handleNextDay}>Next &gt;</button>
            </div>

            {/* Row 2: Big Dates */}
            <div className="dc-big-dates-row">
              <div className="dc-big-date-box left-box">
                <div className="dc-month-text">{displayDate.toLocaleString("ta-IN", { month: "long" })}</div>
                <div className="dc-huge-text">{date}</div>
              </div>
              <div className="dc-big-date-box right-box">
                <div className="dc-month-text">{tamilMonth} <br/> {tamilYear} வருடம்</div>
                <div className="dc-huge-text highlight-text">{tamilDate}</div>
                <div className="dc-special-days">
                  <span>சுபமுகூர்த்த நாள்</span>
                </div>
              </div>
            </div>

            {/* Row 3: Day Info Bar */}
            <div className="dc-day-info-bar">
              <span>{displayDate.toLocaleString("ta-IN", { month: "long" })} {date}, {year}</span>
              <span className="dc-day-name">{tamilWeekDays[day]}</span>
              <span></span> {/* Empty span to maintain flex balance */}
            </div>

            {/* Row 4: Timings Grid 1 */}
            <div className="dc-timings-section">
              <div className="dc-timings-col">
                <div className="dc-timing-item"><span className="dc-label">நல்ல நேரம் :</span><span className="dc-val">கா 10.30 - 12.00</span></div>
                <div className="dc-timing-item"><span className="dc-label">எமகண்டம் :</span><span className="dc-val">கா 6.00 - 7.30</span></div>
              </div>
              <div className="dc-timings-icon">
                <FaClock size={40} color="#cbd5e1" />
              </div>
              <div className="dc-timings-col">
                <div className="dc-timing-item"><span className="dc-label">குளிகை :</span><span className="dc-val">கா 9.00 - 10.30</span></div>
                <div className="dc-timing-item"><span className="dc-label">ராகு :</span><span className="dc-val">ம 1.30 - 3.00</span></div>
              </div>
            </div>

            {/* Row 5: Panchangam Grid 2 */}
            <div className="dc-panchangam-section">
              <div className="dc-panchangam-col">
                <div className="dc-timing-item"><span className="dc-label">திதி :</span><span className="dc-val">திரையோதசி</span></div>
                <div className="dc-timing-item"><span className="dc-label">திதி நேரம் :</span><span className="dc-val">துவாதசி கா 8.13</span></div>
                <div className="dc-timing-item"><span className="dc-label">நட்சத்திரம் :</span><span className="dc-val">ரேவதி இ 8.06</span></div>
              </div>
              <div className="dc-panchangam-col">
                <div className="dc-timing-item"><span className="dc-label">யோகம் :</span><span className="dc-val">சித்த-அமிர்த</span></div>
                <div className="dc-timing-item"><span className="dc-label">சந்திராஷ்டமம் :</span><span className="dc-val">உத்திரம்</span></div>
                <div className="dc-timing-item"><span className="dc-label">சூலம் :</span><span className="dc-val">தெற்கு</span></div>
                <div className="dc-timing-item"><span className="dc-label">பரிகாரம் :</span><span className="dc-val">தைலம்</span></div>
              </div>
            </div>

            {/* Row 6: Info Box */}
            <div className="dc-info-box">
              <div className="dc-info-image">
                <div className="placeholder-img"></div>
              </div>
              <div className="dc-info-text">
                <p><strong>சிறப்பு :</strong> முகூர்த்த நாள். பிரதோஷம்.</p>
                <p><strong>வழிபாடு :</strong> சிவபெருமான் வழிபாடு.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateBar;