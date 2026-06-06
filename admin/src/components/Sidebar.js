import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");

    // show message
    alert("Logged out successfully");

    // redirect to login
    navigate("/login");
  };

  return (
    <div className="sidebar">

      <h2 className="sidebar-title">News Admin</h2>

      <div className="sidebar-links">

        <Link className="sidebar-link" to="/">
          Add News
        </Link>

        <Link className="sidebar-link" to="/all-news">
          All News
        </Link>

      </div>

      {isLoggedIn && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}

    </div>
  );
}

export default Sidebar;