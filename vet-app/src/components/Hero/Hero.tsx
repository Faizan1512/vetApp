import React, { useEffect, useRef } from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated particle field on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // Organic floating particles
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? "#3DB877" : "#D4A017",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(61,184,119,${0.08 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color === "#3DB877"
            ? `rgba(61,184,119,${p.opacity})`
            : `rgba(212,160,23,${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="hero">
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* Background layers */}
      <div className="hero__bg-mesh" />
      <div className="hero__bg-circle hero__bg-circle--1" />
      <div className="hero__bg-circle hero__bg-circle--2" />
      <div className="hero__bg-circle hero__bg-circle--3" />
      <div className="noise-overlay" />

      <div className="container hero__inner">
        {/* Left: Content */}
        <div className="hero__content">
          <div className="section-label hero__badge">
            Pakistan's First Vet Platform
          </div>

          <h1 className="hero__title">
            Healthy Animals,{" "}
            <span className="hero__title-accent">Thriving</span>
            <br />
            Farms & Families
          </h1>

          <p className="hero__subtitle">
            Find medicines for your livestock and pets, consult licensed
            veterinarians online, and get doorstep delivery — all in one
            platform built for Pakistan.
          </p>

          {/* Animal type tags */}
          <div className="hero__tags">
            {["🐄 Cattle", "🐐 Goats", "🐓 Poultry", "🐕 Dogs", "🐈 Cats"].map(
              (tag) => (
                <span key={tag} className="hero__tag">
                  {tag}
                </span>
              )
            )}
          </div>

          {/* CTAs */}
          <div className="hero__cta-group">
            <a href="#" className="btn-primary hero__cta-primary">
              Find Medicines
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M4 9h10M10 5l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#" className="btn-outline hero__cta-secondary">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M7 6.5l4 2.5-4 2.5V6.5z"
                  fill="currentColor"
                />
              </svg>
              Watch Demo
            </a>
          </div>

          {/* Trust badges */}
          <div className="hero__trust">
            <div className="hero__trust-item">
              <span className="hero__trust-num">2,400+</span>
              <span className="hero__trust-label">Animal owners</span>
            </div>
            <div className="hero__trust-divider" />
            <div className="hero__trust-item">
              <span className="hero__trust-num">180+</span>
              <span className="hero__trust-label">Medicines listed</span>
            </div>
            <div className="hero__trust-divider" />
            <div className="hero__trust-item">
              <span className="hero__trust-num">40+</span>
              <span className="hero__trust-label">Licensed vets</span>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="hero__visual">
          {/* Main card */}
          <div className="hero__card hero__card--main glass-card">
            <div className="hero__card-header">
              <div className="hero__card-dot hero__card-dot--green" />
              <div className="hero__card-dot hero__card-dot--gold" />
              <div className="hero__card-dot hero__card-dot--red" />
              <span className="hero__card-title">VetCare Dashboard</span>
            </div>

            {/* Vet consultation preview */}
            <div className="hero__chat">
              <div className="hero__chat-msg hero__chat-msg--vet">
                <div className="hero__chat-avatar">
                  <span>👨‍⚕️</span>
                </div>
                <div className="hero__chat-bubble">
                  <p>Your buffalo shows signs of FMD. I recommend Oxytetracycline 20% immediately.</p>
                  <div className="hero__chat-rx">
                    <span>📋</span> Prescription issued
                  </div>
                </div>
              </div>
              <div className="hero__chat-msg hero__chat-msg--user">
                <div className="hero__chat-bubble hero__chat-bubble--user">
                  <p>Can I order it directly from here?</p>
                </div>
                <div className="hero__chat-avatar hero__chat-avatar--user">
                  <span>👨‍🌾</span>
                </div>
              </div>
              <div className="hero__chat-action">
                <button className="hero__order-btn">
                  🛒 Order Medicine — PKR 850
                </button>
              </div>
            </div>
          </div>

          {/* Floating mini cards */}
          <div className="hero__float hero__float--1 glass-card">
            <div className="hero__float-icon">🦠</div>
            <div>
              <div className="hero__float-title">Seasonal Alert</div>
              <div className="hero__float-sub">FMD season active · Punjab</div>
            </div>
          </div>

          <div className="hero__float hero__float--2 glass-card">
            <div className="hero__float-icon">✅</div>
            <div>
              <div className="hero__float-title">Order Delivered</div>
              <div className="hero__float-sub">Lahore · 2 hours ago</div>
            </div>
          </div>

          <div className="hero__float hero__float--3 glass-card">
            <div className="hero__float-icon">⭐</div>
            <div>
              <div className="hero__float-title">Dr. Ahmed Khan</div>
              <div className="hero__float-sub">4.9 · Available now</div>
            </div>
          </div>

          {/* Decorative ring */}
          <div className="hero__ring" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;