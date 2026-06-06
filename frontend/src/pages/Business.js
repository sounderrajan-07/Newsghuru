import React from "react";
import "../styles/Business.css";

import {
  FaClock,
  FaComment,
  FaChartLine,
  FaEye,
  FaArrowRight,
  FaRupeeSign,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// ✅ shared data import
import { businessNews } from "../data/newsData";

const Business = () => {
  const navigate = useNavigate();

  return (
    <section className="business-page">

      {/* HEADER */}
      <div className="business-header">

        <div>

          <h1>வணிகம்</h1>

          <p>
            இந்தியா மற்றும் உலக வணிகத்தின் முக்கிய செய்திகளை அறியுங்கள்
          </p>

        </div>

        <button className="business-live-btn">

          <FaChartLine />

          MARKET LIVE

        </button>

      </div>

      {/* FEATURED NEWS */}
      <div
        className="featured-business-news"
        onClick={() =>
          navigate(`/news/${businessNews[0].id}`, {
            state: businessNews[0],
          })
        }
      >

        <img
          src={businessNews[0].image}
          alt=""
          className="featured-business-image"
        />

        <div className="featured-business-content">

          <button className="business-category-btn">

            <FaRupeeSign />

            {businessNews[0].market}

          </button>

          <h2>{businessNews[0].title}</h2>

          <p>
            {businessNews[0].description.substring(0, 180)}...
          </p>

          <div className="featured-business-meta">

            <span>
              <FaClock />
              {businessNews[0].time}
            </span>

            <span>
              <FaComment />
              {businessNews[0].comments}
            </span>

            <span>
              <FaEye />
              {businessNews[0].views}
            </span>

          </div>

        </div>

      </div>

      {/* BUSINESS GRID */}
      <div className="business-news-grid">

        {businessNews.map((news) => (

          <div
            className="business-news-card"
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
              className="business-news-image"
            />

            <div className="business-news-content">

              <button className="business-category-btn">

                <FaRupeeSign />

                {news.market}

              </button>

              <h3>{news.title}</h3>

              <p>
                {news.description.substring(0, 120)}...
              </p>

              <div className="business-news-footer">

                <div className="business-footer-left">

                  <span>
                    <FaClock />
                    {news.time}
                  </span>

                  <span>
                    <FaComment />
                    {news.comments}
                  </span>

                </div>

                <div className="business-read-more">

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

export default Business;