import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/India.css";

import {
  FaClock,
  FaFlag,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const India = () => {
  const navigate = useNavigate();

  const [indiaNews, setIndiaNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTamilMap = {
    india: "இந்தியா",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      // BEST APPROACH: backend filtering instead of frontend filtering
      const res = await API.get("/api/news/category/india");

      setIndiaNews(res.data || []);

    } catch (err) {
      console.error("India API Error:", err);
      setError("Failed to load India news");
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
    <section className="india-page">

      {/* HEADER */}
      <div className="india-header">

        <div>
          <h1>இந்தியா</h1>
          <p>இந்தியாவின் முக்கிய தேசிய செய்திகளை அறியுங்கள்</p>
        </div>

        <button className="india-live-btn">
          <FaFlag /> INDIA LIVE
        </button>

      </div>

      {/* EMPTY STATE */}
      {indiaNews.length === 0 ? (
        <div style={{ padding: "30px" }}>
          No India news found
        </div>
      ) : (
        <>
          {/* FEATURED NEWS */}
          <div
            className="featured-india-news"
            onClick={() =>
              navigate(`/news/${indiaNews[0]._id}`, {
                state: indiaNews[0],
              })
            }
          >

            <img
              src={indiaNews[0].image}
              alt={indiaNews[0].title}
              className="featured-india-image"
            />

            <div className="featured-india-content">

              <button className="india-category-btn">
                <FaFlag /> {getCategoryLabel(indiaNews[0].category)}
              </button>

              <h2>{indiaNews[0].title}</h2>

              <div className="featured-india-meta">
                <span>
                  <FaClock /> {indiaNews[0].time || "No time"}
                </span>
              </div>

            </div>

          </div>

          {/* GRID NEWS */}
          <div className="india-news-grid">

            {indiaNews.map((news) => (

              <div
                className="india-news-card"
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
                  className="india-news-image"
                />

                <div className="india-news-content">

                  <button className="india-category-btn">
                    <FaFlag /> {getCategoryLabel(news.category)}
                  </button>

                  <h3>{news.title}</h3>

                  <p>
                    {news.description?.slice(0, 110)}...
                  </p>

                  <div className="india-news-footer">

                    <div className="india-footer-left">
                      <span>
                        <FaClock /> {news.time || "No time"}
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
        </>
      )}

    </section>
  );
};

export default India;