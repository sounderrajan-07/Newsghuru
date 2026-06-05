import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/Politics.css";

import {
  FaClock,
  FaLandmark,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Politics = () => {
  const navigate = useNavigate();

  const [politicsNews, setPoliticsNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTamilMap = {
    politics: "அரசியல்",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    fetchPoliticsNews();
  }, []);

  const fetchPoliticsNews = async () => {
    try {
      setLoading(true);
      setError("");

      // BEST PRACTICE: backend filtering instead of frontend filtering
      const res = await API.get("/api/news/category/politics");

      setPoliticsNews(res.data || []);

    } catch (err) {
      console.error("Politics API Error:", err);
      setError("Failed to load politics news");
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return <div style={{ padding: "20px" }}>Loading politics news...</div>;
  }

  // ERROR
  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <section className="politics-page">

      {/* HEADER */}
      <div className="politics-header">

        <div>
          <h1>அரசியல்</h1>
          <p>தமிழக மற்றும் இந்திய அரசியல் செய்திகளை அறியுங்கள்</p>
        </div>

        <button className="politics-live-btn">
          <FaLandmark /> POLITICS LIVE
        </button>

      </div>

      {/* EMPTY STATE */}
      {politicsNews.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No politics news available...
        </div>
      ) : (
        <>
          {/* FEATURED NEWS */}
          <div
            className="featured-politics-news"
            onClick={() =>
              navigate(`/news/${politicsNews[0]._id}`, {
                state: politicsNews[0],
              })
            }
          >

            <img
              src={politicsNews[0].image}
              className="featured-politics-image"
              alt={politicsNews[0].title}
            />

            <div className="featured-politics-content">

              <button className="politics-category-btn">
                <FaLandmark /> {getCategoryLabel(politicsNews[0].category)}
              </button>

              <h2>{politicsNews[0].title}</h2>

              <div className="featured-politics-meta">

                <span>
                  <FaClock /> {politicsNews[0].time || "No time"}
                </span>

              </div>

            </div>

          </div>

          {/* GRID */}
          <div className="politics-news-grid">

            {politicsNews.map((news) => (

              <div
                className="politics-news-card"
                key={news._id}
                onClick={() =>
                  navigate(`/news/${news._id}`, {
                    state: news,
                  })
                }
              >

                <img
                  src={news.image}
                  className="politics-news-image"
                  alt={news.title}
                />

                <div className="politics-news-content">

                  <button className="politics-category-btn">
                    <FaLandmark /> {getCategoryLabel(news.category)}
                  </button>

                  <h3>{news.title}</h3>

                  <p>
                    {news.description?.slice(0, 100)}...
                  </p>

                  <div className="politics-news-footer">

                    <div className="politics-footer-left">
                      <span>
                        <FaClock /> {news.time || "No time"}
                      </span>
                    </div>

                    <div className="politics-read-more">
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

export default Politics;