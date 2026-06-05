import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/Business.css";

import {
  FaClock,
  FaBriefcase,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Business = () => {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTamilMap = {
    business: "வணிகம்",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    fetchBusinessNews();
  }, []);

  const fetchBusinessNews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/api/news/category/business");
      setNews(res.data || []);

    } catch (err) {
      console.error("Business News Error:", err);
      setError("Failed to load business news");
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading Business News...
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <section className="business-page">

      {/* HEADER */}
      <div className="business-header">

        <div>
          <h1>வணிகம்</h1>
          <p>இந்தியா மற்றும் உலக வணிகத்தின் முக்கிய செய்திகளை அறியுங்கள்</p>
        </div>

        <button className="business-live-btn">
          <FaBriefcase /> MARKET LIVE
        </button>

      </div>

      {/* EMPTY STATE */}
      {news.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No business news available...
        </div>
      ) : (
        <>
          {/* FEATURED NEWS */}
          <div
            className="featured-business-news"
            onClick={() =>
              navigate(`/news/${news[0]._id}`, {
                state: news[0],
              })
            }
          >

            <img
              src={news[0].image}
              alt={news[0].title}
              className="featured-business-image"
            />

            <div className="featured-business-content">

              <button className="business-category-btn">
                <FaBriefcase /> {getCategoryLabel(news[0].category)}
              </button>

              <h2>{news[0].title}</h2>

              <div className="featured-business-meta">
                <span>
                  <FaClock /> {news[0].time || "No time"}
                </span>
              </div>

            </div>

          </div>

          {/* GRID */}
          <div className="business-news-grid">

            {news.map((item) => (
              <div
                key={item._id}
                className="business-news-card"
                onClick={() =>
                  navigate(`/news/${item._id}`, {
                    state: item,
                  })
                }
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="business-news-image"
                />

                <div className="business-news-content">

                  <button className="business-category-btn">
                    <FaBriefcase /> {getCategoryLabel(item.category)}
                  </button>

                  <h3>{item.title}</h3>

                  <p>
                    {item.description?.substring(0, 120)}...
                  </p>

                  <div className="business-news-footer">

                    <div className="business-footer-left">
                      <span>
                        <FaClock /> {item.time || "No time"}
                      </span>
                    </div>

                    <div className="business-read-more">
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

export default Business;