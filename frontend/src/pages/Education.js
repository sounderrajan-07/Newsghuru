import React from "react";
import "../styles/Education.css";

import {
  FaClock,
  FaComment,
  FaGraduationCap,
  FaEye,
  FaArrowRight,
  FaBookOpen,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// ✅ shared data import
import { educationNews } from "../data/newsData";

const Education = () => {
  const navigate = useNavigate();

  return (
    <section className="education-page">

      {/* HEADER */}
      <div className="education-header">

        <div>

          <h1>கல்வி</h1>

          <p>
            கல்வி, மாணவர்கள் மற்றும் பல்கலைக்கழகங்களின் முக்கிய செய்திகளை அறியுங்கள்
          </p>

        </div>

        <button className="education-live-btn">

          <FaGraduationCap />

          EDUCATION LIVE

        </button>

      </div>

      {/* FEATURED NEWS */}
      <div
        className="featured-education-news"
        onClick={() =>
          navigate(`/news/${educationNews[0].id}`, {
            state: educationNews[0],
          })
        }
      >

        <img
          src={educationNews[0].image}
          alt=""
          className="featured-education-image"
        />

        <div className="featured-education-content">

          <button className="education-category-btn">

            <FaBookOpen />

            {educationNews[0].category}

          </button>

          <h2>{educationNews[0].title}</h2>

          <p>{educationNews[0].description.slice(0, 140)}...</p>

          <div className="featured-education-meta">

            <span>
              <FaClock />
              {educationNews[0].time}
            </span>

            <span>
              <FaComment />
              {educationNews[0].comments}
            </span>

            <span>
              <FaEye />
              {educationNews[0].views}
            </span>

          </div>

        </div>

      </div>

      {/* EDUCATION GRID */}
      <div className="education-news-grid">

        {educationNews.map((news) => (

          <div
            className="education-news-card"
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
              className="education-news-image"
            />

            <div className="education-news-content">

              <button className="education-category-btn">

                <FaBookOpen />

                {news.category}

              </button>

              <h3>{news.title}</h3>

              <p>{news.description.slice(0, 100)}...</p>

              <div className="education-news-footer">

                <div className="education-footer-left">

                  <span>
                    <FaClock />
                    {news.time}
                  </span>

                  <span>
                    <FaComment />
                    {news.comments}
                  </span>

                </div>

                <div className="education-read-more">

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

export default Education;