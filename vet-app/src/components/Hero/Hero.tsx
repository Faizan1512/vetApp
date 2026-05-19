import React, { useEffect, useRef } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const medicines = [
    { name: "Oxytetracycline 20%", category: "Antibiotic", price: "PKR 850", tag: "Bestseller" },
    { name: "Ivermectin Injection", category: "Antiparasitic", price: "PKR 1,200", tag: "In Stock" },
    { name: "Dexamethasone", category: "Anti-inflammatory", price: "PKR 640", tag: "In Stock" },
  ];

  return (
    <section className="hero">
      {/* Real photo grid background */}
      <div className="hero__photo-bg">
        <div className="hero__photo-col">
          <div className="hero__photo-item">
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80&fit=crop" alt="Dogs running" />
          </div>
          <div className="hero__photo-item">
            <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&q=80&fit=crop" alt="Dog close up" />
          </div>
          <div className="hero__photo-item">
            <img src="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&q=80&fit=crop" alt="Vet with animal" />
          </div>
        </div>
        <div className="hero__photo-col hero__photo-col--offset">
          <div className="hero__photo-item">
            <img src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&q=80&fit=crop" alt="Cat" />
          </div>
          <div className="hero__photo-item">
            <img src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&q=80&fit=crop" alt="Cow farm" />
          </div>
          <div className="hero__photo-item">
            <img src="https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=400&q=80&fit=crop" alt="Vet doctor" />
          </div>
        </div>
        <div className="hero__photo-col">
          <div className="hero__photo-item">
            <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80&fit=crop" alt="Dog portrait" />
          </div>
          <div className="hero__photo-item">
            <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80&fit=crop" alt="Vet examining dog" />
          </div>
          <div className="hero__photo-item">
            <img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&q=80&fit=crop" alt="Cat and dog" />
          </div>
        </div>
      </div>
      {/* Dark overlay so content stays readable */}
      <div className="hero__photo-overlay" />

      <div className="container hero__inner">
        {/* Left: Content */}
        <div className="hero__content">
          <div className="section-label hero__badge">
            Pakistan's First Vet Medicine Platform
          </div>

          <h1 className="hero__title">
            Vet Medicines,{" "}
            <span className="hero__title-accent">Delivered</span>
            <br />
            to Your Door
          </h1>

          <p className="hero__subtitle">
            Order certified veterinary medicines online, get expert prescriptions
            from licensed vets, and receive doorstep delivery — fast, affordable,
            and trusted across Pakistan.
          </p>

          {/* Medicine category tags */}
          <div className="hero__tags">
            {[
              "💊 Antibiotics",
              "🧴 Antiparasitics",
              "💉 Vaccines",
              "🩺 Supplements",
              "🔬 Diagnostics",
            ].map((tag) => (
              <span key={tag} className="hero__tag">
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero__cta-group">
<Link to="/shop-medicines" className="btn-primary hero__cta-primary">              Shop Medicines
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 9h10M10 5l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
</Link>            <a href="#" className="btn-outline hero__cta-secondary">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 6.5l4 2.5-4 2.5V6.5z" fill="currentColor" />
              </svg>
              Consult a Vet
            </a>
          </div>

          {/* Trust badges */}
          <div className="hero__trust">
            <div className="hero__trust-item">
              <span className="hero__trust-num">180+</span>
              <span className="hero__trust-label">Medicines listed</span>
            </div>
            <div className="hero__trust-divider" />
            <div className="hero__trust-item">
              <span className="hero__trust-num">40+</span>
              <span className="hero__trust-label">Licensed vets</span>
            </div>
            <div className="hero__trust-divider" />
            <div className="hero__trust-item">
              <span className="hero__trust-num">2,400+</span>
              <span className="hero__trust-label">Happy customers</span>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="hero__visual">
          {/* Main card — medicine catalog */}
          <div className="hero__card hero__card--main glass-card">
            <div className="hero__card-header">
              <div className="hero__card-dot hero__card-dot--green" />
              <div className="hero__card-dot hero__card-dot--gold" />
              <div className="hero__card-dot hero__card-dot--red" />
              <span className="hero__card-title">VetMeds Store</span>
              <div className="hero__card-search">
                <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
                  <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M12.5 12.5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                Search medicines...
              </div>
            </div>

            {/* Medicine list */}
            <div className="hero__meds">
              {medicines.map((med, i) => (
                <div key={i} className="hero__med-item">
                  <div className="hero__med-icon">💊</div>
                  <div className="hero__med-info">
                    <div className="hero__med-name">{med.name}</div>
                    <div className="hero__med-cat">{med.category}</div>
                  </div>
                  <div className="hero__med-right">
                    <span className="hero__med-tag">{med.tag}</span>
                    <div className="hero__med-price">{med.price}</div>
                    <button className="hero__add-btn">+ Add</button>
                  </div>
                </div>
              ))}

              {/* Cart summary */}
              <div className="hero__cart-summary">
                <div className="hero__cart-info">
                  <span>🛒</span>
                  <span>1 item in cart</span>
                </div>
                <button className="hero__order-btn">
                  Checkout — PKR 850
                </button>
              </div>
            </div>
          </div>

          {/* Floating mini cards */}
          <div className="hero__float hero__float--1 glass-card">
            <div className="hero__float-icon">🚚</div>
            <div>
              <div className="hero__float-title">Express Delivery</div>
              <div className="hero__float-sub">Lahore · 2–4 hours</div>
            </div>
          </div>

          <div className="hero__float hero__float--2 glass-card">
            <div className="hero__float-icon">✅</div>
            <div>
              <div className="hero__float-title">Order Confirmed</div>
              <div className="hero__float-sub">Faisalabad · just now</div>
            </div>
          </div>

          <div className="hero__float hero__float--3 glass-card">
            <div className="hero__float-icon">🩺</div>
            <div>
              <div className="hero__float-title">Dr. Ahmed Khan</div>
              <div className="hero__float-sub">4.9 · Available now</div>
            </div>
          </div>

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