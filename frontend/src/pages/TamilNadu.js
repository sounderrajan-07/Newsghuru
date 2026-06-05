import React from "react";
import "../styles/TamilNadu.css";

import {
  FaClock,
  FaComment,
  FaMapMarkerAlt,
  FaEye,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// ✅ shared data import (no layout change)
import { tamilNews } from "../data/newsData";

const TamilNadu = () => {
  const navigate = useNavigate();

  return (
    <section className="tamil-page">

      {/* HEADER */}
      <div className="tamil-header">
        <div>
          <h1>தமிழகம்</h1>
          <p>தமிழகத்தின் முக்கிய அரசியல் மற்றும் உடனடி செய்திகளை அறியுங்கள்</p>
        </div>

        <button className="state-live-btn">
          TAMILNADU LIVE
        </button>
      </div>

      {/* FEATURED */}
      <div
        className="featured-tamil-news"
        onClick={() =>
          navigate(`/news/${tamilNews[0].id}`, { state: tamilNews[0] })
        }
      >
        <img
          src={tamilNews[0].image}
          alt={tamilNews[0].title}
          className="featured-tamil-image"
        />

        <div className="featured-tamil-content">
          <button className="district-btn">
            {tamilNews[0].district}
          </button>

          <h2>{tamilNews[0].title}</h2>

          <p>{tamilNews[0].description.slice(0, 180)}...</p>

          <div className="featured-meta">
            <span><FaClock /> {tamilNews[0].time}</span>
            <span><FaComment /> {tamilNews[0].comments}</span>
            <span><FaEye /> {tamilNews[0].views}</span>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="tamil-news-grid">
        {tamilNews.map((news) => (
          <div
            key={news.id}
            className="tamil-news-card"
            onClick={() =>
              navigate(`/news/${news.id}`, { state: news })
            }
          >
            <img
              src={news.image}
              alt={news.title}
              className="tamil-news-image"
            />

            <div className="tamil-news-content">
              <button className="district-btn">
                <FaMapMarkerAlt /> {news.district}
              </button>

              <h3>{news.title}</h3>

              <p>{news.description.slice(0, 120)}...</p>

              <div className="tamil-news-footer">
                <div className="footer-left">
                  <span><FaClock /> {news.time}</span>
                  <span><FaComment /> {news.comments}</span>
                </div>

                <div className="read-more">
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

export default TamilNadu;