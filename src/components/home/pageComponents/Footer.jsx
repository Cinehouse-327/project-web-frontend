import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <ul className="footer__linkList">
          <li>
            <a href="/about" className="footer__link">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="footer__link">
              Contact
            </a>
          </li>
          <li>
            <a href="/privacy" className="footer__link">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="footer__link">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>

      <div className="footer__socials">
        <ul className="footer__socialList">
          <li>
            <a
              href="https://www.facebook.com/sazzadadib"
              className="footer__socialIcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com"
              className="footer__socialIcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com"
              className="footer__socialIcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com"
              className="footer__socialIcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
        </ul>
      </div>

      <div className="footer__copyright">
        <p>&copy; 2024 Cholo Dekhi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
