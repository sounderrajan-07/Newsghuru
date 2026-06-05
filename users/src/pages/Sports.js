import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/Sports.css";

import {
  FaClock,
  FaFutbol,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Sports = () => {
  const navigate = useNavigate();

  const [sportsNews, setSportsNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTamilMap = {
    sports: "விளையாட்டு",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    fetchSportsNews();
  }, []);

  const fetchSportsNews = async () => {
    try {
      setLoading(true);
      setError("");

      // ✅ Backend filtering (optimized)
      const res = await API.get("/api/news/category/sports");

      setSportsNews(res.data || []);

    } catch (err) {
      console.error("Sports API Error:", err);
      setError("Failed to load sports news");
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return <div style={{ padding: "20px" }}>Loading sports news...</div>;
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
          <FaFutbol /> SPORTS LIVE
        </button>

      </div>

      {/* EMPTY STATE */}
      {sportsNews.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No sports news available...
        </div>
      ) : (
        <>
          {/* FEATURED NEWS */}
          <div
            className="featured-sports-news"
            onClick={() =>
              navigate(`/news/${sportsNews[0]._id}`, {
                state: sportsNews[0],
              })
            }
          >

            <img
              src={sportsNews[0].image}
              alt={sportsNews[0].title}
              className="featured-sports-image"
            />

            <div className="featured-sports-content">

              <button className="sports-category-btn">
                <FaFutbol /> {getCategoryLabel(sportsNews[0].category)}
              </button>

              <h2>{sportsNews[0].title}</h2>

              <div className="featured-sports-meta">
                <span>
                  <FaClock /> {sportsNews[0].time || "No time"}
                </span>
              </div>

            </div>

          </div>

          {/* GRID */}
          <div className="sports-news-grid">

            {sportsNews.map((news) => (

              <div
                className="sports-news-card"
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
                  className="sports-news-image"
                />

                <div className="sports-news-content">

                  <button className="sports-category-btn">
                    <FaFutbol /> {getCategoryLabel(news.category)}
                  </button>

                  <h3>{news.title}</h3>

                  <p>
                    {news.description?.slice(0, 100)}...
                  </p>

                  <div className="sports-news-footer">

                    <div className="sports-footer-left">
                      <span>
                        <FaClock /> {news.time || "No time"}
                      </span>
                    </div>

                    <div className="sports-read-more">
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

export default Sports;