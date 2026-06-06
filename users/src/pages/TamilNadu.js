import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/TamilNadu.css";
import RelativeTime from "../components/RelativeTime";

import {
  FaArrowRight,
  FaMapMarkedAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const TamilNadu = () => {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTamilMap = {
    tamil: "தமிழகம்",
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

      // ✅ Backend filtering (optimized)
      const res = await API.get("/api/news/category/tamil");

      setNews(res.data || []);

    } catch (err) {
      console.error("Tamil Nadu API Error:", err);
      setError("Failed to load Tamil Nadu news");
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", fontSize: "20px" }}>
        Loading Tamil News...
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <section className="tamil-page">

      {/* HEADER */}
      <div className="tamil-header">

        <div>
          <h1>தமிழகம்</h1>
          <p>
            தமிழகத்தின் முக்கிய அரசியல் மற்றும் உடனடி செய்திகளை அறியுங்கள்
          </p>
        </div>

        <button className="state-live-btn">
          <FaMapMarkedAlt /> TAMILNADU LIVE
        </button>

      </div>

      {/* EMPTY STATE */}
      {news.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No Tamil Nadu news available...
        </div>
      ) : (
        <>
          {/* FEATURED NEWS */}
          <div
            className="featured-tamil-news"
            onClick={() =>
              navigate(`/news/${news[0]._id}`, {
                state: news[0],
              })
            }
          >

            <img
              src={news[0].image}
              alt={news[0].title}
              className="featured-tamil-image"
            />

            <div className="featured-tamil-content">

              <button className="district-btn">
                <FaMapMarkedAlt /> {getCategoryLabel(news[0].category)}
              </button>

              <h2>{news[0].title}</h2>

              <div className="featured-meta">
                <span>
                  <RelativeTime
                  createdAt={news[0].createdAt}
                  fallback={news[0].time}
/>
                </span>
              </div>

            </div>

          </div>

          {/* GRID */}
          <div className="tamil-news-grid">

            {news.map((newsItem) => (

              <div
                key={newsItem._id}
                className="tamil-news-card"
                onClick={() =>
                  navigate(`/news/${newsItem._id}`, {
                    state: newsItem,
                  })
                }
              >

                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className="tamil-news-image"
                />

                <div className="tamil-news-content">

                  <button className="district-btn">
                    <FaMapMarkedAlt /> {getCategoryLabel(newsItem.category)}
                  </button>

                  <h3>{newsItem.title}</h3>

                  <p>
                    {newsItem.description?.slice(0, 120)}...
                  </p>

                  <div className="tamil-news-footer">

                    <div className="footer-left">
                      <span>
                        <RelativeTime
                        createdAt={newsItem.createdAt}
                        fallback={newsItem.time}
                        />
                      </span>
                    </div>

                    <div className="read-more">
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

export default TamilNadu;