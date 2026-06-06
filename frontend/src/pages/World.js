import React from "react";
import "../styles/World.css";

import {
  FaClock,
  FaComment,
  FaGlobeAsia,
  FaEye,
  FaArrowRight,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// ✅ shared data import
import { worldNews } from "../data/newsData";

const World = () => {
  const navigate = useNavigate();

  return (
    <section className="world-page">

      {/* HEADER */}
      <div className="world-header">
        <div>
          <h1>உலகம்</h1>
          <p>உலக நாடுகளின் முக்கிய செய்திகளை உடனுக்குடன் அறியுங்கள்</p>
        </div>

        <button className="world-live-btn">
          <FaGlobeAsia />
          WORLD LIVE
        </button>
      </div>

      {/* FEATURED NEWS */}
      <div
        className="featured-world-news"
        onClick={() =>
          navigate(`/news/${worldNews[0].id}`, {
            state: worldNews[0],
          })
        }
      >
        <img
          src={worldNews[0].image}
          alt=""
          className="featured-world-image"
        />

        <div className="featured-world-content">
          <button className="world-category-btn">
            <FaMapMarkerAlt />
            {worldNews[0].country}
          </button>

          <h2>{worldNews[0].title}</h2>

          <p>{worldNews[0].description.slice(0, 140)}...</p>

          <div className="featured-world-meta">
            <span>
              <FaClock /> {worldNews[0].time}
            </span>

            <span>
              <FaComment /> {worldNews[0].comments}
            </span>

            <span>
              <FaEye /> {worldNews[0].views}
            </span>
          </div>
        </div>
      </div>

      {/* GRID NEWS */}
      <div className="world-news-grid">
        {worldNews.map((news) => (
          <div
            className="world-news-card"
            key={news.id}
            onClick={() =>
              navigate(`/news/${news.id}`, {
                state: news,
              })
            }
          >
            <img
              src={news.image}
              alt=""
              className="world-news-image"
            />

            <div className="world-news-content">
              <button className="world-category-btn">
                <FaMapMarkerAlt />
                {news.country}
              </button>

              <h3>{news.title}</h3>

              <p>{news.description.slice(0, 100)}...</p>

              <div className="world-news-footer">
                <div className="world-footer-left">
                  <span>
                    <FaClock /> {news.time}
                  </span>

                  <span>
                    <FaComment /> {news.comments}
                  </span>
                </div>

                <div className="world-read-more">
                  Read More <FaArrowRight />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default World;