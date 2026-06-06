import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/NewsDetails.css";

import { useLocation, useNavigate } from "react-router-dom";

import {
  FaClock,
  FaArrowLeft,
  FaFacebookF,
  FaTwitter,
  FaUserAlt,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const NewsDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [news, setNews] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState("");

  const currentUrl = window.location.href;

  const categoryTamilMap = {
    breaking: "தற்போதைய செய்திகள்",
    tamil: "தமிழகம்",
    india: "இந்தியா",
    world: "உலகம்",
    business: "வணிகம்",
    sports: "விளையாட்டு",
    education: "கல்வி",
    politics: "அரசியல்",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    const fetchNewsById = async () => {
      if (location.state) return;

      try {
        setLoading(true);

        const id = window.location.pathname.split("/").pop();

        const res = await API.get(`/api/news/${id}`);

        setNews(res.data || null);
      } catch (err) {
        console.error("News Details Error:", err);
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsById();
  }, [location.state]);

  if (loading) {
    return (
      <div className="news-not-found">
        <h2>Loading News...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-not-found">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="news-not-found">
        <h2>News not found</h2>
      </div>
    );
  }

  return (
    <div className="news-details-page">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
        Back
      </button>

      {/* IMAGE */}
      <div className="details-image-wrapper">
        <img
          src={news.image}
          alt={news.title}
          className="details-image"
        />
      </div>

      {/* CONTENT */}
      <div className="details-content">

        {/* CATEGORY */}
        <button className="category-btn">
          {getCategoryLabel(news.category)}
        </button>

        {/* TITLE */}
        <h1 className="details-title">
          {news.title}
        </h1>

        {/* META */}
        <div className="details-meta">

          <span>
            <FaClock />
            {news.time || "No time"}
          </span>

          <span>
            <FaUserAlt />
            Admin Reporter
          </span>

        </div>

        {/* DESCRIPTION */}
        <div className="details-section">
          <p>{news.description || "No description available"}</p>
        </div>

        {/* SHARE */}
        <div className="share-section">

          <h3 className="share-title">
            Share This News
          </h3>

          <div className="share-buttons">

            {/* FACEBOOK */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <FaFacebookF />
              Facebook
            </a>

            {/* TWITTER */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(news.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <FaTwitter />
              Twitter
            </a>

            {/* INSTAGRAM (profile only) */}
            <a
              href="https://www.instagram.com/newsghuru_tamil/"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <FaInstagram />
              Instagram
            </a>

            {/* YOUTUBE */}
            <a
              href="https://youtube.com/@newsghurutamil?si=6FgN4CcfJbiD698y"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <FaYoutube />
              YouTube
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};

export default NewsDetails;