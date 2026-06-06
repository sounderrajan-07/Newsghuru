import React,{ useState } from "react";
import "../styles/Header.css";
import { FaBars, FaSun, FaMoon, FaSearch,FaTimes} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ setSidebar, darkMode, setDarkMode }) => {
   const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const term = searchTerm.toLowerCase().trim();

    const categoryMap = {
      "தற்போதைய செய்திகள்": "latest-news",
      "breaking": "latest-news",
      "latest news": "latest-news",
      "தமிழகம்": "tamilnadu",
      "tamil": "tamilnadu",
      "tamilnadu": "tamilnadu",
      "இந்தியா": "india",
      "india": "india",
      "உலகம்": "world",
      "world": "world",
      "வணிகம்": "business",
      "business": "business",
      "விளையாட்டு": "sports",
      "sports": "sports",
      "கல்வி": "education",
      "education": "education",
      "அரசியல்": "politics",
      "politics": "politics"
    };

    const route = categoryMap[term] || term;
    navigate(`/${route}`);
    setShowSearch(false);
    setSearchTerm("");
  };

  if (showSearch) {
    return (
      <header className="header active-search-header">
        <form onSubmit={handleSearch} className="full-width-search">
          <button type="submit" className="full-search-btn">
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button type="button" className="full-close-btn" onClick={() => {
            setShowSearch(false);
            setSearchTerm("");
          }}>
            <FaTimes />
          </button>
        </form>
      </header>
    );
  }
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
          <div className="search-icon" onClick={() => setShowSearch(true)}></div>
          <FaSearch />
        </div>
      </div>
    </header>
  );
};

export default Header;