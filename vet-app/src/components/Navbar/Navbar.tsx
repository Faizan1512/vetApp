import React, { useState } from "react";
import "./Navbar.css";

interface NavbarProps {
  scrollY: number;
}

const Navbar: React.FC<NavbarProps> = ({ scrollY }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollY > 60;

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Diseases", href: "#diseases" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <a href="#" className="navbar__logo">
          <div className="navbar__logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2C8.477 2 4 6.477 4 12c0 3.5 1.8 6.6 4.5 8.48V24a1 1 0 001 1h9a1 1 0 001-1v-3.52C22.2 18.6 24 15.5 24 12c0-5.523-4.477-10-10-10z" fill="url(#logo-grad)" />
              <path d="M10 11h8M14 7v8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
              <defs>
                <linearGradient id="logo-grad" x1="4" y1="2" x2="24" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3DB877" />
                  <stop offset="1" stopColor="#0D2818" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="navbar__logo-text">VetCare<span>PK</span></span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="navbar__link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="navbar__actions">
          <a href="#" className="navbar__login">Sign In</a>
          <a href="#" className="navbar__cta">
            Get Started
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a href="#" className="btn-primary" style={{ marginTop: "12px" }}>
          Get Started
        </a>
      </div>
    </nav>
  );
};

export default Navbar;