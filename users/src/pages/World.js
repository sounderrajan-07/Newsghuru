import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/World.css";

import {
  FaClock,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const World = () => {
  const navigate = useNavigate();

  const [worldNews, setWorldNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTamilMap = {
    world: "உலகம்",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    fetchWorldNews();
  }, []);

  const fetchWorldNews = async () => {
    try {
      setLoading(true);
      setError("");

      // ✅ Backend filtering (faster + scalable)
      const res = await API.get("/api/news/category/world");

      setWorldNews(res.data || []);

    } catch (err) {
      console.error("World API Error:", err);
      setError("Failed to load world news");
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return <div style={{ padding: "30px" }}>Loading news...</div>;
  }

  // ERROR
  if (error) {
    return (
      <div style={{ padding: "30px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <section className="world-page">

      {/* HEADER */}
      <div className="world-header">

        <div>
          <h1>உலகம்</h1>
          <p>உலக நாடுகளின் முக்கிய செய்திகளை உடனுக்குடன் அறியுங்கள்</p>
        </div>

        <button className="world-live-btn">
          <FaGlobe /> WORLD LIVE
        </button>

      </div>

      {/* EMPTY STATE */}
      {worldNews.length === 0 ? (
        <div style={{ padding: "30px" }}>
          No World news found
        </div>
      ) : (
        <>
          {/* FEATURED NEWS */}
          <div
            className="featured-world-news"
            onClick={() =>
              navigate(`/news/${worldNews[0]._id}`, {
                state: worldNews[0],
              })
            }
          >

            <img
              src={worldNews[0].image}
              alt={worldNews[0].title}
              className="featured-world-image"
            />

            <div className="featured-world-content">

              <button className="world-category-btn">
                <FaGlobe /> {getCategoryLabel(worldNews[0].category)}
              </button>

              <h2>{worldNews[0].title}</h2>

              <div className="featured-world-meta">
                <span>
                  <FaClock /> {worldNews[0].time || "No time"}
                </span>
              </div>

            </div>

          </div>

          {/* GRID NEWS */}
          <div className="world-news-grid">

            {worldNews.map((news) => (

              <div
                className="world-news-card"
                key={news._id}
                onClick={() =>
                  navigate(`/news/${news._id}`, {
                    state: news,
                  })
                }
              >

                <img
                  src={news.image}
                  alt={news.title}
                  className="world-news-image"
                />

                <div className="world-news-content">

                  <button className="world-category-btn">
                    <FaGlobe /> {getCategoryLabel(news.category)}
                  </button>

                  <h3>{news.title}</h3>

                  <p>
                    {news.description?.slice(0, 100)}...
                  </p>

                  <div className="world-news-footer">

                    <div className="world-footer-left">
                      <span>
                        <FaClock /> {news.time || "No time"}
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
        </>
      )}

    </section>
  );
};

export default World;