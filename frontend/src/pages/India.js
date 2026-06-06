import React from "react";
import "../styles/India.css";

import {
  FaClock,
  FaComment,
  FaFlag,
  FaEye,
  FaArrowRight,
  FaMapMarkedAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// ✅ shared data import
import { indiaNews } from "../data/newsData";

const India = () => {
  const navigate = useNavigate();

  return (
    <section className="india-page">

      {/* HEADER */}
      <div className="india-header">
        <div>
          <h1>இந்தியா</h1>
          <p>இந்தியாவின் முக்கிய தேசிய செய்திகளை அறியுங்கள்</p>
        </div>

        <button className="india-live-btn">
          <FaFlag />
          INDIA LIVE
        </button>
      </div>

      {/* FEATURED NEWS */}
      <div
        className="featured-india-news"
        onClick={() =>
          navigate(`/news/${indiaNews[0].id}`, {
            state: indiaNews[0],
          })
        }
      >
        <img
          src={indiaNews[0].image}
          alt=""
          className="featured-india-image"
        />

        <div className="featured-india-content">
          <button className="india-category-btn">
            <FaMapMarkedAlt />
            {indiaNews[0].state}
          </button>

          <h2>{indiaNews[0].title}</h2>

          <p>{indiaNews[0].description.slice(0, 140)}...</p>

          <div className="featured-india-meta">
            <span>
              <FaClock /> {indiaNews[0].time}
            </span>

            <span>
              <FaComment /> {indiaNews[0].comments}
            </span>

            <span>
              <FaEye /> {indiaNews[0].views}
            </span>
          </div>
        </div>
      </div>

      {/* GRID NEWS */}
      <div className="india-news-grid">
        {indiaNews.map((news) => (
          <div
            className="india-news-card"
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
              className="india-news-image"
            />

            <div className="india-news-content">
              <button className="india-category-btn">
                <FaMapMarkedAlt />
                {news.state}
              </button>

              <h3>{news.title}</h3>

              <p>{news.description.slice(0, 110)}...</p>

              <div className="india-news-footer">
                <div className="india-footer-left">
                  <span>
                    <FaClock /> {news.time}
                  </span>

                  <span>
                    <FaComment /> {news.comments}
                  </span>
                </div>

                <div className="india-read-more">
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

export default India;