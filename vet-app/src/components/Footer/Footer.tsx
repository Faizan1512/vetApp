// components/Footer/Footer.tsx
import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>VetCare</h3>
          <p>Empowering farmers with smart animal healthcare.</p>
        </div>

        <div>
          <h4>Links</h4>
          <ul>
            <li>Features</li>
            <li>Pricing</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <p>support@vetcare.pk</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;