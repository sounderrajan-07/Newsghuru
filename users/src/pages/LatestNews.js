import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/LatestNews.css";

import {
  FaClock,
  FaVolumeUp,
  FaArrowRight,
  FaFire,
  FaGlobe,
  FaFutbol,
  FaChartLine,
  FaGraduationCap,
  FaFlag,
  FaLandmark,
  FaMapMarkedAlt,
  FaNewspaper,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const LatestNews = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [breaking, setBreaking] = useState([]);
  const [tamil, setTamil] = useState([]);
  const [india, setIndia] = useState([]);
  const [world, setWorld] = useState([]);
  const [business, setBusiness] = useState([]);
  const [sports, setSports] = useState([]);
  const [education, setEducation] = useState([]);
  const [politics, setPolitics] = useState([]);

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

  const getIcon = (category) => {
    switch ((category || "").toLowerCase()) {
      case "breaking":
        return <FaFire />;
      case "tamil":
        return <FaMapMarkedAlt />;
      case "india":
        return <FaFlag />;
      case "world":
        return <FaGlobe />;
      case "sports":
        return <FaFutbol />;
      case "politics":
        return <FaLandmark />;
      case "business":
        return <FaChartLine />;
      case "education":
        return <FaGraduationCap />;
      default:
        return <FaNewspaper />;
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        b,
        t,
        i,
        w,
        bu,
        s,
        e,
        p,
      ] = await Promise.all([
        API.get("/api/news/category/breaking"),
        API.get("/api/news/category/tamil"),
        API.get("/api/news/category/india"),
        API.get("/api/news/category/world"),
        API.get("/api/news/category/business"),
        API.get("/api/news/category/sports"),
        API.get("/api/news/category/education"),
        API.get("/api/news/category/politics"),
      ]);

      setBreaking(b.data || []);
      setTamil(t.data || []);
      setIndia(i.data || []);
      setWorld(w.data || []);
      setBusiness(bu.data || []);
      setSports(s.data || []);
      setEducation(e.data || []);
      setPolitics(p.data || []);

    } catch (err) {
      console.error("Latest News Error:", err);
      setError("Failed to load latest news");
    } finally {
      setLoading(false);
    }
  };

  const allNews = [
    ...breaking,
    ...tamil,
    ...india,
    ...world,
    ...business,
    ...sports,
    ...education,
    ...politics,
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading Latest News...
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
    <section className="breaking-news-page">

      {/* TITLE */}
      <div className="breaking-page-title">
        <h1>தற்போதைய செய்தி</h1>
        <span className="live-badge">
          <FaFire /> LIVE
        </span>
      </div>

      {/* EMPTY STATE */}
      {allNews.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No news available...
        </div>
      ) : (
        <>
          {/* FEATURED */}
          <div
            className="main-breaking-card"
            onClick={() =>
              navigate(`/news/${allNews[0]._id}`, {
                state: allNews[0],
              })
            }
          >
            <img
              src={allNews[0].image}
              className="main-breaking-image"
              alt={allNews[0].title}
            />

            <div className="main-breaking-content">

              <button className="breaking-category-btn">
                {getIcon(allNews[0].category)}{" "}
                {getCategoryLabel(allNews[0].category)}
              </button>

              <h2>{allNews[0].title}</h2>

              <p>
                {allNews[0].description?.substring(0, 180)}...
              </p>

              <div className="breaking-meta">
                <span>
                  <FaClock /> {allNews[0].time || "No time"}
                </span>
              </div>

            </div>
          </div>

          {/* GRID */}
          <div className="breaking-news-grid">

            {allNews.map((item) => (
              <div
                key={item._id}
                className="breaking-news-card"
                onClick={() =>
                  navigate(`/news/${item._id}`, {
                    state: item,
                  })
                }
              >

                <img
                  src={item.image}
                  className="breaking-news-image"
                  alt={item.title}
                />

                <div className="breaking-news-content">

                  <button className="breaking-category-btn">
                    {getIcon(item.category)}{" "}
                    {getCategoryLabel(item.category)}
                  </button>

                  <h3>{item.title}</h3>

                  <p>
                    {item.description?.substring(0, 140)}...
                  </p>

                  <div className="breaking-news-footer">

                    <div className="footer-left">
                      <span>
                        <FaClock /> {item.time || "No time"}
                      </span>
                    </div>

                    <div className="breaking-icons">
                      <FaVolumeUp />

                      <div className="read-more">
                        Read More <FaArrowRight />
                      </div>
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

export default LatestNews;