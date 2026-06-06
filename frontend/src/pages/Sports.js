import React from "react";
import "../styles/Sports.css";

import {
  FaClock,
  FaComment,
  FaFutbol,
  FaEye,
  FaArrowRight,
  FaMedal,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// ✅ shared data import
import { sportsNews } from "../data/newsData";

const Sports = () => {
  const navigate = useNavigate();

  return (
    <section className="sports-page">

      {/* HEADER */}
      <div className="sports-header">

        <div>

          <h1>விளையாட்டு</h1>

          <p>
            உலக விளையாட்டு மற்றும் இந்திய அணிகளின் முக்கிய செய்திகளை அறியுங்கள்
          </p>

        </div>

        <button className="sports-live-btn">

          <FaFutbol />

          SPORTS LIVE

        </button>

      </div>

      {/* FEATURED NEWS */}
      <div
        className="featured-sports-news"
        onClick={() =>
          navigate(`/news/${sportsNews[0].id}`, {
            state: sportsNews[0],
          })
        }
      >

        <img
          src={sportsNews[0].image}
          alt=""
          className="featured-sports-image"
        />

        <div className="featured-sports-content">

          <button className="sports-category-btn">

            <FaMedal />

            {sportsNews[0].sport}

          </button>

          <h2>{sportsNews[0].title}</h2>

          <p>
            {sportsNews[0].description.slice(0, 140)}...
          </p>

          <div className="featured-sports-meta">

            <span>
              <FaClock />
              {sportsNews[0].time}
            </span>

            <span>
              <FaComment />
              {sportsNews[0].comments}
            </span>

            <span>
              <FaEye />
              {sportsNews[0].views}
            </span>

          </div>

        </div>

      </div>

      {/* SPORTS GRID */}
      <div className="sports-news-grid">

        {sportsNews.map((news) => (

          <div
            className="sports-news-card"
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
              className="sports-news-image"
            />

            <div className="sports-news-content">

              <button className="sports-category-btn">

                <FaMedal />

                {news.sport}

              </button>

              <h3>{news.title}</h3>

              <p>
                {news.description.slice(0, 100)}...
              </p>

              <div className="sports-news-footer">

                <div className="sports-footer-left">

                  <span>
                    <FaClock />
                    {news.time}
                  </span>

                  <span>
                    <FaComment />
                    {news.comments}
                  </span>

                </div>

                <div className="sports-read-more">

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

export default Sports;