import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/Education.css";

import {
  FaClock,
  FaGraduationCap,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Education = () => {
  const navigate = useNavigate();

  const [educationNews, setEducationNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTamilMap = {
    education: "கல்வி",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    fetchEducationNews();
  }, []);

  const fetchEducationNews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/api/news/category/education");

      setEducationNews(res.data || []);

    } catch (err) {
      console.error("Education API Error:", err);
      setError("Failed to load education news");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading Education News...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", color: "red" }}>
        {error}
      </div>
    );
  }

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
          <FaGraduationCap /> EDUCATION LIVE
        </button>

      </div>

      {/* EMPTY STATE */}
      {educationNews.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No education news available...
        </div>
      ) : (
        <>
          {/* FEATURED NEWS */}
          <div
            className="featured-education-news"
            onClick={() =>
              navigate(`/news/${educationNews[0]._id}`, {
                state: educationNews[0],
              })
            }
          >

            <img
              src={educationNews[0].image}
              alt={educationNews[0].title}
              className="featured-education-image"
            />

            <div className="featured-education-content">

              <button className="education-category-btn">
                <FaGraduationCap /> {getCategoryLabel(educationNews[0].category)}
              </button>

              <h2>{educationNews[0].title}</h2>

              <div className="featured-education-meta">
                <span>
                  <FaClock /> {educationNews[0].time || "No time"}
                </span>
              </div>

            </div>

          </div>

          {/* GRID */}
          <div className="education-news-grid">

            {educationNews.map((news) => (

              <div
                key={news._id}
                className="education-news-card"
                onClick={() =>
                  navigate(`/news/${news._id}`, {
                    state: news,
                  })
                }
              >

                <img
                  src={news.image}
                  alt={news.title}
                  className="education-news-image"
                />

                <div className="education-news-content">

                  <button className="education-category-btn">
                    <FaGraduationCap /> {getCategoryLabel(news.category)}
                  </button>

                  <h3>{news.title}</h3>

                  <p>
                    {news.description?.substring(0, 100)}...
                  </p>

                  <div className="education-news-footer">

                    <div className="education-footer-left">
                      <span>
                        <FaClock /> {news.time || "No time"}
                      </span>
                    </div>

                    <div className="education-read-more">
                      Read More <FaArrowRight />
                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>
        </>
      )}

    </section>
  );
};

export default Education;