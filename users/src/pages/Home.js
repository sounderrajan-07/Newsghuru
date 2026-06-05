import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/Home.css";

import {
  FaClock,
  FaArrowRight,
  FaBolt,
  FaChartLine,
  FaGlobe,
  FaFutbol,
  FaNewspaper,
  FaFire,
  FaGraduationCap,
  FaMapMarkedAlt,
  FaFlag,
  FaLandmark,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [breakingNews, setBreakingNews] = useState([]);
  const [tamilNews, setTamilNews] = useState([]);
  const [worldNews, setWorldNews] = useState([]);
  const [indiaNews, setIndiaNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [politicsNews, setPoliticsNews] = useState([]);
  const [businessNews, setBusinessNews] = useState([]);
  const [educationNews, setEducationNews] = useState([]);

  const categoryTamilMap = {
    breaking: "தற்போதைய செய்திகள்",
    tamil: "தமிழகம்",
    india: "இந்தியா",
    world: "உலகம்",
    business: "வணிகம்",
    sports: "விளையாட்டு",
    education: "கல்வி",
    politics: "அரசியல்",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  const getIcon = (category) => {
    switch ((category || "").toLowerCase()) {
      case "breaking":
        return <FaFire />;
      case "tamil":
        return <FaMapMarkedAlt />;
      case "india":
        return <FaFlag />;
      case "world":
        return <FaGlobe />;
      case "sports":
        return <FaFutbol />;
      case "politics":
        return <FaLandmark />;
      case "business":
        return <FaChartLine />;
      case "education":
        return <FaGraduationCap />;
      default:
        return <FaNewspaper />;
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        breaking,
        tamil,
        world,
        india,
        sports,
        politics,
        business,
        education,
      ] = await Promise.all([
        API.get("/api/news/category/breaking"),
        API.get("/api/news/category/tamil"),
        API.get("/api/news/category/world"),
        API.get("/api/news/category/india"),
        API.get("/api/news/category/sports"),
        API.get("/api/news/category/politics"),
        API.get("/api/news/category/business"),
        API.get("/api/news/category/education"),
      ]);

      setBreakingNews(breaking.data || []);
      setTamilNews(tamil.data || []);
      setWorldNews(world.data || []);
      setIndiaNews(india.data || []);
      setSportsNews(sports.data || []);
      setPoliticsNews(politics.data || []);
      setBusinessNews(business.data || []);
      setEducationNews(education.data || []);

    } catch (err) {
      console.error("Home API Error:", err);
      setError("Failed to load home news");
    } finally {
      setLoading(false);
    }
  };

  const trendingNews = [
    breakingNews[0],
    tamilNews[0],
    indiaNews[0],
    politicsNews[0],
    sportsNews[0],
    businessNews[0],
    educationNews[0],
    worldNews[0],
  ].filter(Boolean);

  const categoryNews = [
    breakingNews[0],
    tamilNews[0],
    worldNews[0],
    indiaNews[0],
    sportsNews[0],
    politicsNews[0],
    businessNews[0],
    educationNews[0],
  ]
    .filter(Boolean)
    .map((n) => ({ ...n, icon: getIcon(n.category) }));

  if (loading) {
    return <h2 style={{ padding: "30px" }}>Loading Home News...</h2>;
  }

  if (error) {
    return (
      <h2 style={{ padding: "30px", color: "red" }}>
        {error}
      </h2>
    );
  }

  return (
    <section className="home-page">

      {/* HERO */}
      <div className="home-hero">

        {breakingNews[0] && (
          <div
            className="hero-main-news"
            onClick={() =>
              navigate(`/news/${breakingNews[0]._id}`, {
                state: breakingNews[0],
              })
            }
          >
            <img src={breakingNews[0].image} alt="" className="hero-image" />

            <div className="hero-overlay">
              <button className="live-btn">
                <FaBolt /> {getCategoryLabel("breaking")}
              </button>

              <h1>{breakingNews[0].title}</h1>

              <div className="hero-meta">
                <span>
                  <FaClock /> {breakingNews[0].time || "No time"}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="hero-side-news">
          {breakingNews.slice(1, 3).map((n) => (
            <div
              key={n._id}
              className="side-news-card"
              onClick={() => navigate(`/news/${n._id}`, { state: n })}
            >
              <img src={n.image} alt="" />

              <div className="side-news-content">
                <button className="news-category-btn">
                  <FaFire /> {getCategoryLabel(n.category)}
                </button>

                <h3>{n.title}</h3>

                <span>
                  <FaClock /> {n.time || "No time"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRENDING */}
      <div className="section-header">
        <h2><FaFire /> Trending News</h2>
      </div>

      <div className="trending-news-grid">
        {trendingNews.map((n) => (
          <div
            key={n._id}
            className="trending-news-card"
            onClick={() => navigate(`/news/${n._id}`, { state: n })}
          >
            <img src={n.image} alt="" />

            <div className="trending-news-content">
              <button className="news-category-btn">
                {getCategoryLabel(n.category)}
              </button>

              <h3>{n.title}</h3>

              <p>{n.description?.slice(0, 150)}...</p>

              <div className="trending-news-footer">
                <span>
                  <FaClock /> {n.time || "No time"}
                </span>

                <div className="read-more">
                  Read More <FaArrowRight />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CATEGORY */}
      <div className="section-header">
        <h2><FaNewspaper /> Category Highlights</h2>
      </div>

      <div className="category-news-grid">
        {categoryNews.map((n) => (
          <div
            key={n._id}
            className="category-news-card"
            onClick={() => navigate(`/news/${n._id}`, { state: n })}
          >
            <img src={n.image} alt="" />

            <div className="category-news-content">
              <span className="mini-category">
                {n.icon} {getCategoryLabel(n.category)}
              </span>

              <h3>{n.title}</h3>

              <span>
                <FaClock /> {n.time || "No time"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* LIVE */}
      <div className="section-header">
        <h2><FaChartLine /> Live Updates</h2>
      </div>

      <div className="live-updates-section">
        {breakingNews.slice(0, 3).map((n) => (
          <div key={n._id} className="live-update-card">
            <span className="live-dot"></span>
            <div>
              <h4>{n.title}</h4>
              <p>{n.time}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Home;