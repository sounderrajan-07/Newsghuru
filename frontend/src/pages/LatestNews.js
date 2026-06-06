import React from "react";
import "../styles/LatestNews.css";

import {
  FaClock,
  FaComment,
  FaVolumeUp,
  FaEye,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// ✅ ONLY CHANGE: shared data import
import { breakingNews } from "../data/newsData";

const LatestNews = () => {
  const navigate = useNavigate();

  return (
    <section className="breaking-news-page">

      {/* TITLE */}
      <div className="breaking-page-title">
        <h1>தற்போதைய செய்தி</h1>
        <span className="live-badge">LIVE</span>
      </div>

      {/* FEATURED NEWS */}
      <div
        className="main-breaking-card"
        onClick={() =>
          navigate(`/news/${breakingNews[0].id}`, {
            state: breakingNews[0],
          })
        }
      >
        <img
          src={breakingNews[0].image}
          alt=""
          className="main-breaking-image"
        />

        <div className="main-breaking-content">
          <button className="breaking-category-btn">
            {breakingNews[0].category}
          </button>

          <h2>{breakingNews[0].title}</h2>

          <p>
            {breakingNews[0].description.substring(0, 180)}...
          </p>

          <div className="breaking-meta">
            <span>
              <FaClock /> {breakingNews[0].time}
            </span>

            <span>
              <FaComment /> {breakingNews[0].comments}
            </span>

            <span>
              <FaEye /> {breakingNews[0].views}
            </span>
          </div>
        </div>
      </div>

      {/* BREAKING NEWS GRID */}
      <div className="breaking-news-grid">
        {breakingNews.map((news) => (
          <div
            className="breaking-news-card"
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
              className="breaking-news-image"
            />

            <div className="breaking-news-content">
              <button className="breaking-category-btn">
                {news.category}
              </button>

              <h3>{news.title}</h3>

              <p>
                {news.description.substring(0, 140)}...
              </p>

              <div className="breaking-news-footer">
                <div className="footer-left">
                  <span>
                    <FaClock /> {news.time}
                  </span>

                  <span>
                    <FaComment /> {news.comments}
                  </span>
                </div>

                <div className="breaking-icons">
                  <FaVolumeUp />

                  <span>
                    <FaEye /> {news.views}
                  </span>

                  <div className="read-more">
                    Read More <FaArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default LatestNews;