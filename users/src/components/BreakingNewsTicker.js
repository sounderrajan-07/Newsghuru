import React, { useEffect, useState } from "react";
import { FaBolt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../config/api";
import "../styles/BreakingNewsTicker.css";

const BreakingNewsTicker = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const { data } = await API.get("/api/news/category/breaking");
        if (data && data.length > 0) {
          setBreakingNews(data);
        }
      } catch (err) {
        console.error("Error fetching breaking news:", err);
      }
    };
    fetchBreakingNews();
  }, []);

  if (breakingNews.length === 0) return null;

  return (
    <div className="ticker-container">
      <div className="ticker-label">
        <FaBolt /> BREAKING NEWS
      </div>

      <div className="ticker-scroll-wrapper">
        <div className="ticker-scroll-content">
          {breakingNews.map((news, index) => (
            <span key={news._id} className="ticker-item">
              <span
                className="ticker-title"
                onClick={() => navigate(`/news/${news._id}`, { state: news })}
              >
                {news.title}
              </span>
              {index < breakingNews.length - 1 && (
                <span className="ticker-separator">|</span>
              )}
            </span>
          ))}
          {/* Duplicate for infinite scroll loop */}
          {breakingNews.map((news, index) => (
            <span key={`dup-${news._id}`} className="ticker-item">
              <span
                className="ticker-title"
                onClick={() => navigate(`/news/${news._id}`, { state: news })}
              >
                {news.title}
              </span>
              {index < breakingNews.length - 1 && (
                <span className="ticker-separator">|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;