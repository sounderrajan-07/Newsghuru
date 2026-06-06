import React from "react";

import "../styles/Footer.css";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  // FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {

  return (

    <footer className="footer">

      {/* =========================================
          TOP FOOTER
      ========================================= */}

      <div className="footer-top">

        {/* LOGO SECTION */}

        <div className="footer-brand">

          <img
            src="images/newsghuru.jpg"
            alt="News Logo"
            className="footer-logo"
          />

          <h2>
            நியூஸ் குரு 
          </h2>

          <p>
            தமிழகத்தின் சமீபத்திய செய்திகள்,
            அரசியல், விளையாட்டு, உலகம்,
            வணிகம் மற்றும் கல்வி தொடர்பான
            அனைத்து தகவல்களும் ஒரே இடத்தில்.
          </p>

          {/* SOCIAL MEDIA */}

          <div className="footer-socials">

            <a
              href="https://www.facebook.com/share/1JWbyTwjG3/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://x.com/news_ghuruTamil"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>

            <a
              href="https://www.instagram.com/newsghuru_tamil/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://youtube.com/@newsghurutamil?si=6FgN4CcfJbiD698y"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>

          </div>
        </div>

        {/* QUICK LINKS */}

        <div className="footer-links">

          <h3>
            Quick Links
          </h3>

          <ul>

            <li>
              <Link to="/">
                <FaArrowRight />
                முகப்பு 
              </Link>
            </li>

            <li>
              <Link to="/latest-news">
                <FaArrowRight />
                தற்போதைய செய்தி 
              </Link>
            </li>

            <li>
              <Link to="/tamilnadu">
                <FaArrowRight />
                தமிழகம்
              </Link>
            </li>

            <li>
              <Link to="/india">
                <FaArrowRight />
                இந்தியா
              </Link>
            </li>

            <li>
              <Link to="/world">
                <FaArrowRight />
                உலகம்
              </Link>
            </li>

          </ul>

        </div>

        {/* CATEGORY LINKS */}

        <div className="footer-links">

          <h3>
            Categories
          </h3>

          <ul>

            <li>
              <Link to="/business">
                <FaArrowRight />
                வணிகம்
              </Link>
            </li>

            <li>
              <Link to="/sports">
                <FaArrowRight />
                விளையாட்டு
              </Link>
            </li>

            <li>
              <Link to="/education">
                <FaArrowRight />
                கல்வி
              </Link>
            </li>

            <li>
              <Link to="/politics">
                <FaArrowRight />
                அரசியல்
              </Link>
            </li>
            <li>
              <Link to="/cinema">
                <FaArrowRight />
                சினிமா
              </Link>
            </li>

            {/* <li>
              <Link to="/news-guru">
                <FaArrowRight />
                நியூஸ் குரு
              </Link>
            </li> */}

          </ul>

        </div>

        {/* CONTACT SECTION */}

        <div className="footer-contact">

          <h3>
            Contact Us
          </h3>

          <p>
            Email:{" "}
            <a href="mailto:info@newsghuru.in" className="footer-email">
              info@newsghuru.in
            </a>
          </p>

          <p>
            Chennai, Tamil Nadu,
            India
          </p>

          <p className="footer-company">
            News Ghuru is a digital media brand operated by
            Ghurudeva Entertainments Private Limited.
          </p>

          <button className="footer-btn">
            Subscribe Now
          </button>

        </div>  
      </div>

      {/* =========================================
          FOOTER BOTTOM
      ========================================= */}

      <div className="footer-bottom">

        <p>
          © 2026 நியூஸ் குரு.
          அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
        </p>

        <div className="footer-bottom-links">

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>

      </div>

    </footer>

  );
};

export default Footer;