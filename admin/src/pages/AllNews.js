import { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/AllNews.css";
import RelativeTime from "../components/RelativeTime";

function AllNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH NEWS
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const res = await API.get("/api/news");
      setNews(res.data || []);

    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  // DELETE SINGLE NEWS
  const deleteNews = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this news?"
      );

      if (!confirmDelete) return;

      await API.delete(`/api/news/${id}`);

      alert("News Deleted Successfully 🗑️");

      // update UI without refetch (faster UX)
      setNews((prev) => prev.filter((item) => item._id !== id));

    } catch (error) {
      console.error("Delete Error:", error);
      alert("Delete Failed");
    }
  };

  // DELETE ALL NEWS
  const deleteAllNews = async () => {
    try {
      if (news.length === 0) {
        alert("No news to delete");
        return;
      }

      const confirmDelete = window.confirm(
        "⚠️ Are you sure you want to DELETE ALL news? This action cannot be undone!"
      );

      if (!confirmDelete) return;

      await API.delete("/api/news");

      alert("All News Deleted Successfully");

      setNews([]);

    } catch (error) {
      console.error("Delete All Error:", error);
      alert("Delete All Failed — Check backend route");
    }
  };

  // LOADING STATE
  if (loading) {
    return <div className="loading-text">Loading News...</div>;
  }

  return (
    <div className="all-news-page">

      {/* HEADER */}
      <div className="all-news-header">

        <h1 className="all-news-title">
          All News
        </h1>

        <div className="header-actions">

          <div className="news-count">
            Total News: {news.length}
          </div>

          <button
            className="delete-all-btn"
            onClick={deleteAllNews}
            disabled={news.length === 0}
          >
            🗑️ Delete All
          </button>

        </div>
      </div>

      {/* EMPTY STATE */}
      {news.length === 0 ? (
        <div className="empty-news">
          <h2>No News Found</h2>
          <p>Upload your first news 🚀</p>
        </div>
      ) : (
        <div className="news-grid">

          {news.map((item) => (
            <div key={item._id} className="news-card">

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="news-image"
              />

              {/* CONTENT */}
              <div className="news-content">

                <span className="news-category">
                  {item.category}
                </span>

                <h2 className="news-title">
                  {item.title}
                </h2>

                <p className="news-description">
                  {item.description?.substring(0, 140)}...
                </p>

                {/* META */}
                <div className="news-meta">
                  <div className="meta-box">
                    ⏰ <RelativeTime
  createdAt={item.createdAt}
  fallback={item.time}
/>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="news-actions">

                  <button
                    onClick={() => deleteNews(item._id)}
                    className="delete-btn"
                  >
                    Delete News
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AllNews;