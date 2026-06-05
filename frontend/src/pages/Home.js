import React from "react";
import "../styles/Home.css";

import {
  FaClock,
  FaComment,
  FaArrowRight,
  FaEye,
  FaBolt,
  FaChartLine,
  FaGlobe,
  FaFutbol,
  FaBriefcase,
  FaNewspaper,
  FaFire,
  FaCloudRain,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// ✅ ONLY CHANGE: imported shared data
import { breakingNews } from "../data/newsData";

const Home = () => {
  const navigate = useNavigate();

  const getIcon = (category) => {
    switch (category) {
      case "தமிழகம்":
        return <FaBriefcase />;
      case "உலகம்":
        return <FaGlobe />;
      case "விளையாட்டு":
        return <FaFutbol />;
      case "அரசியல்":
        return <FaNewspaper />;
      case "வானிலை":
        return <FaCloudRain />;
      default:
        return <FaFire />;
    }
  };

  const categoryNews = breakingNews.slice(0, 4).map((news) => ({
    ...news,
    icon: getIcon(news.category),
  }));

  return (
    <section className="home-page">

      {/* HERO */}
      <div className="home-hero">

        <div
          className="hero-main-news"
          onClick={() =>
            navigate(`/news/${breakingNews[0].id}`, {
              state: breakingNews[0],
            })
          }
        >
          <img
            src={breakingNews[0].image}
            alt={breakingNews[0].title}
            className="hero-image"
          />

          <div className="hero-overlay">
            <button className="live-btn">
              <FaBolt /> BREAKING NEWS
            </button>

            <h1>{breakingNews[0].title}</h1>

            <div className="hero-meta">
              <span><FaClock /> {breakingNews[0].time}</span>
              <span><FaComment /> {breakingNews[0].comments}</span>
              <span><FaEye /> {breakingNews[0].views}</span>
            </div>
          </div>
        </div>

        <div className="hero-side-news">
          {breakingNews.slice(1, 3).map((news) => (
            <div
              key={news.id}
              className="side-news-card"
              onClick={() =>
                navigate(`/news/${news.id}`, { state: news })
              }
            >
              <img src={news.image} alt={news.title} />

              <div className="side-news-content">
                <button className="news-category-btn">
                  <FaFire /> {news.category}
                </button>

                <h3>{news.title}</h3>

                <span><FaClock /> {news.time}</span>
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
        {breakingNews.map((news) => (
          <div
            key={news.id}
            className="trending-news-card"
            onClick={() =>
              navigate(`/news/${news.id}`, { state: news })
            }
          >
            <img src={news.image} alt={news.title} />

            <div className="trending-news-content">
              <button className="news-category-btn">
                {news.category}
              </button>

              <h3>{news.title}</h3>

              <p>{news.description.substring(0, 150)}...</p>

              <div className="trending-news-footer">
                <span><FaClock /> {news.time}</span>
                <span><FaComment /> {news.comments}</span>

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
        {categoryNews.map((news) => (
          <div key={news.id} className="category-news-card">

            <img src={news.image} alt={news.title} />

            <div className="category-news-content">
              <span className="mini-category">
                {news.icon} {news.category}
              </span>

              <h3>{news.title}</h3>

              <span><FaClock /> {news.time}</span>
            </div>

          </div>
        ))}
      </div>

      {/* LIVE */}
      <div className="section-header">
        <h2><FaChartLine /> Live Updates</h2>
      </div>

      <div className="live-updates-section">
        {breakingNews.slice(0, 3).map((news) => (
          <div key={news.id} className="live-update-card">
            <span className="live-dot"></span>
            <div>
              <h4>{news.title}</h4>
              <p>{news.time}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Home;