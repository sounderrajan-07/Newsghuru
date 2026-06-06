import React from "react";
import "../styles/Business.css";
import { FaClock, FaComment, FaEye, FaArrowRight, FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { cinemaNews } from "../data/newsData";

const Cinema = () => {
  const navigate = useNavigate();

  return (
    <section className="business-page">
      <div className="business-header">
        <div>
          <h1>சினிமா</h1>
          <p>சினிமா மற்றும் கலை உலகின் முக்கிய செய்திகளை உடனுக்குடன் அறியுங்கள்</p>
        </div>
        <button className="business-live-btn">
          <FaFilm /> CINEMA UPDATES
        </button>
      </div>

      <div className="featured-business-news" onClick={() => navigate(`/news/${cinemaNews[0].id}`, { state: cinemaNews[0] })}>
        <img src={cinemaNews[0].image} alt="" className="featured-business-image" />
        <div className="featured-business-content">
          <button className="business-category-btn">
            <FaFilm /> {cinemaNews[0].category}
          </button>
          <h2>{cinemaNews[0].title}</h2>
          <p>{cinemaNews[0].description.substring(0, 180)}...</p>
          <div className="featured-business-meta">
            <span><FaClock /> {cinemaNews[0].time}</span>
            <span><FaComment /> {cinemaNews[0].comments}</span>
            <span><FaEye /> {cinemaNews[0].views}</span>
          </div>
        </div>
      </div>

      <div className="business-news-grid">
        {cinemaNews.map((news) => (
          <div className="business-news-card" key={news.id} onClick={() => navigate(`/news/${news.id}`, { state: news })}>
            <img src={news.image} alt="" className="business-news-image" />
            <div className="business-news-content">
              <button className="business-category-btn">
                <FaFilm /> {news.category}
              </button>
              <h3>{news.title}</h3>
              <p>{news.description.substring(0, 120)}...</p>
              <div className="business-news-footer">
                <div className="business-footer-left">
                  <span><FaClock /> {news.time}</span>
                  <span><FaComment /> {news.comments}</span>
                </div>
                <div className="business-read-more">
                  Read More <FaArrowRight />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cinema;
