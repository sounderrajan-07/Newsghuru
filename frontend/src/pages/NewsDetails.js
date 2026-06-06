import React from "react";

import "../styles/NewsDetails.css";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaClock,
  FaComment,
  FaArrowLeft,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaUserAlt,
  FaEye,
} from "react-icons/fa";

const NewsDetails = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const news = location.state;

  if (!news) {

    return (

      <div className="news-not-found">

        <h2>News not found</h2>

      </div>

    );
  }

  return (

    <div className="news-details-page">

      {/* =========================
          BACK BUTTON
      ========================= */}

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        Back
      </button>

      {/* =========================
          TOP IMAGE
      ========================= */}

      <div className="details-image-wrapper">

        <img
          src={news.image}
          alt=""
          className="details-image"
        />

      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="details-content">

        {/* CATEGORY */}

        <button className="category-btn">

          {news.category}

        </button>

        {/* TITLE */}

        <h1 className="details-title">

          {news.title}

        </h1>

        {/* META INFO */}

        <div className="details-meta">

          <span>
            <FaClock />
            {news.time}
          </span>

          <span>
            <FaComment />
            {news.comments} Comments
          </span>

          <span>
            <FaUserAlt />
            Admin Reporter
          </span>

          <span>
            <FaEye />
            12.5K Views
          </span>

        </div>

        {/* MAIN DESCRIPTION */}

        <div className="details-section">

          <p>
            {news.description}
          </p>

        </div>

        {/* SHARE SECTION */}

        <div className="share-section">

          <h3 className="share-title">

            Share This News

          </h3>

          <div className="share-buttons">

            <button className="share-btn">

              <FaFacebookF />

              Facebook

            </button>

            <button className="share-btn">

              <FaTwitter />

              Twitter

            </button>

            <button className="share-btn">

              <FaWhatsapp />

              WhatsApp

            </button>

          </div>

        </div>

      </div>

    </div>

  );
};

export default NewsDetails;