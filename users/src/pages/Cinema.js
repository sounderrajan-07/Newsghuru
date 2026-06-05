import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/Business.css"; // Reuse Business style or create custom
import { FaClock, FaFilm, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RelativeTime from "../components/RelativeTime";

const Cinema = () => {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTamilMap = {
    cinema: "சினிமா செய்திகள்",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    fetchCinemaNews();
  }, []);

  const fetchCinemaNews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/api/news/category/cinema");
      setNews(res.data || []);
    } catch (err) {
      console.error("Cinema News Error:", err);
      setError("Failed to load cinema news");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading Cinema News...
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
    <section className="business-page">
      {/* HEADER */}
      <div className="business-header">
        <div>
          <h1>சினிமா</h1>
          <p>சினிமா மற்றும் கலை உலகின் முக்கிய செய்திகளை உடனுக்குடன் அறியுங்கள்</p>
        </div>

        <button className="business-live-btn">
          <FaFilm /> CINEMA UPDATES
        </button>
      </div>

      {/* EMPTY STATE */}
      {news.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No cinema news available...
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
                <FaFilm /> {getCategoryLabel(news[0].category)}
              </button>

              <h2>{news[0].title}</h2>

              <div className="featured-business-meta">
                <span>
                  <FaClock /> <RelativeTime createdAt={news[0].createdAt} fallback={news[0].time} />
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
                    <FaFilm /> {getCategoryLabel(item.category)}
                  </button>

                  <h3>{item.title}</h3>

                  <p>{item.description?.substring(0, 120)}...</p>

                  <div className="business-news-footer">
                    <div className="business-footer-left">
                      <span>
                        <FaClock /> <RelativeTime createdAt={item.createdAt} fallback={item.time} />
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

export default Cinema;