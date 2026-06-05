import React from "react";
import "../styles/Header.css";
import { FaBars, FaSun, FaMoon, FaSearch } from "react-icons/fa";

const Header = ({ setSidebar, darkMode, setDarkMode }) => {
  return (
    <header className="header">
      <div className="menu-icon" onClick={() => setSidebar(true)}>
        <FaBars />
      </div>

      <div className="logo-section">
        <img
          src="/images/newsghuru.jpg"
          alt="logo"
          className="logo-image"
        />

        {/* Title Added */}
        <h1 className="logo-title">நியூஸ் குரு</h1>
      </div>

      <div className="header-actions">
        <div
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </div>

        <div className="search-icon">
          <FaSearch />
        </div>
      </div>
    </header>
  );
};

export default Header;