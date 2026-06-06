import React from "react";
import "../styles/Politics.css";

import {
  FaClock,
  FaComment,
  FaEye,
  FaArrowRight,
  FaNewspaper,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// ✅ shared data import
import { politicsNews } from "../data/newsData";

const Politics = () => {
  const navigate = useNavigate();

  return (
    <section className="politics-page">

      {/* HEADER */}
      <div className="politics-header">

        <div>

          <h1>அரசியல்</h1>

          <p>
            தமிழக மற்றும் இந்திய அரசியல் செய்திகளை அறியுங்கள்
          </p>

        </div>

        <button className="politics-live-btn">

          <FaNewspaper />

          POLITICS LIVE

        </button>

      </div>

      {/* FEATURED NEWS */}
      <div
        className="featured-politics-news"
        onClick={() =>
          navigate(`/news/${politicsNews[0].id}`, {
            state: politicsNews[0],
          })
        }
      >

        <img
          src={politicsNews[0].image}
          className="featured-politics-image"
          alt=""
        />

        <div className="featured-politics-content">

          <button className="politics-category-btn">

            {politicsNews[0].category}

          </button>

          <h2>{politicsNews[0].title}</h2>

          <p>{politicsNews[0].description.slice(0, 140)}...</p>

          <div className="featured-politics-meta">

            <span>
              <FaClock />
              {politicsNews[0].time}
            </span>

            <span>
              <FaComment />
              {politicsNews[0].comments}
            </span>

            <span>
              <FaEye />
              {politicsNews[0].views}
            </span>

          </div>

        </div>

      </div>

      {/* POLITICS GRID */}
      <div className="politics-news-grid">

        {politicsNews.map((news) => (

          <div
            className="politics-news-card"
            key={news.id}
            onClick={() =>
              navigate(`/news/${news.id}`, {
                state: news,
              })
            }
          >

            <img
              src={news.image}
              className="politics-news-image"
              alt=""
            />

            <div className="politics-news-content">

              <button className="politics-category-btn">

                {news.category}

              </button>

              <h3>{news.title}</h3>

              <p>{news.description.slice(0, 100)}...</p>

              <div className="politics-news-footer">

                <div className="politics-footer-left">

                  <span>
                    <FaClock />
                    {news.time}
                  </span>

                  <span>
                    <FaComment />
                    {news.comments}
                  </span>

                </div>

                <div className="politics-read-more">

                  Read More

                  <FaArrowRight />

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Politics;