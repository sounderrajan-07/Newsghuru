import React, { useState, useEffect } from "react";
import API from "../config/api";
import "../styles/InformationPopup.css";
import { FaInfoCircle, FaTimes } from "react-icons/fa";

function InformationPopup() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [storageKey, setStorageKey] = useState("");

  useEffect(() => {
    const fetchPopupMessage = async () => {
      try {
        const res = await API.get("/api/information");
        if (res.data && res.data.message) {
          const msg = res.data.message;
          const key = `hasSeenInfoPopup_${res.data.updatedAt || res.data._id || "info"}`;
          
          setMessage(msg);
          setStorageKey(key);

          // Check if user has already closed this message in this session
          if (!sessionStorage.getItem(key)) {
            // Add a small delay to make the entrance feel smooth
            const timer = setTimeout(() => {
              setVisible(true);
            }, 800);
            return () => clearTimeout(timer);
          }
        }
      } catch (err) {
        console.error("Error fetching popup message:", err);
      }
    };

    fetchPopupMessage();
  }, []);

  const handleClose = () => {
    setVisible(false);
    if (storageKey) {
      sessionStorage.setItem(storageKey, "true");
    }
  };

  if (!visible || !message) return null;

  return (
    <div className="info-popup-overlay">
      <div className="info-popup-backdrop" onClick={handleClose}></div>
      <div className="info-popup-card">
        <button className="info-popup-close-btn" onClick={handleClose} aria-label="Close Announcement">
          <FaTimes />
        </button>
        <div className="info-popup-icon-container">
          <FaInfoCircle className="info-popup-icon" />
        </div>
        <h3 className="info-popup-title">அறிவிப்பு / Announcement</h3>
        <p className="info-popup-message">{message}</p>
        <button className="info-popup-action-btn" onClick={handleClose}>
          Okay, Got It
        </button>
      </div>
    </div>
  );
}

export default InformationPopup;
