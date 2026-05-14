import React, { useEffect, useRef } from "react";
import "./Features.css";

const features = [
  {
    icon: "🦠",
    title: "Disease Encyclopedia",
    description: "Browse 50+ common animal diseases with symptoms, prevention tips, and seasonal alerts — in Urdu and English.",
    tag: "Free",
  },
  {
    icon: "💊",
    title: "Medicine Marketplace",
    description: "Compare prices across multiple verified pharmacies. Filter by animal type, disease, or brand name.",
    tag: "Core",
  },
  {
    icon: "💬",
    title: "Real-Time Vet Chat",
    description: "Connect instantly with licensed vets via text and images. Get expert advice without leaving your farm.",
    tag: "Premium",
  },
  {
    icon: "📹",
    title: "Video Consultations",
    description: "Book face-to-face video calls with veterinarians. Show your animal live and get a proper diagnosis.",
    tag: "Premium",
  },
  {
    icon: "📋",
    title: "Digital Prescriptions",
    description: "Vets issue downloadable PDF prescriptions that link directly to your medicine order — seamless.",
    tag: "Auto",
  },
  {
    icon: "🚚",
    title: "Doorstep Delivery",
    description: "Order medicines online and get them delivered. JazzCash, EasyPaisa, or Cash on Delivery — your choice.",
    tag: "Delivery",
  },
  {
    icon: "🔔",
    title: "Seasonal Alerts",
    description: "Get notified about disease outbreaks in your region before they hit. Prevention is better than cure.",
    tag: "Smart",
  },
  {
    icon: "🏪",
    title: "Pharmacy Dashboard",
    description: "Pharmacy owners get a full dashboard to upload medicines, manage orders, and track earnings in real time.",
    tag: "B2B",
  },
];

const tagColors: Record<string, string> = {
  Free: "#3DB877",
  Core: "#1A6B8A",
  Premium: "#D4A017",
  Auto: "#C44B1B",
  Delivery: "#6B4FBB",
  Smart: "#2D7A4F",
  B2B: "#4A2C0A",
};

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((t) =>
              t.classList.add("visible")
            );
          }
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="features" id="features" ref={sectionRef}>
      <div className="features__glow features__glow--1" />
      <div className="features__glow features__glow--2" />
      <div className="noise-overlay" style={{ opacity: 0.06 }} />

      <div className="container">
        <div className="features__header reveal">
          <span className="section-label features__label">Platform Features</span>
          <h2 className="features__title">
            Everything You Need<br />
            <em>In One Place</em>
          </h2>
          <p className="features__subtitle">
            Built specifically for Pakistan's animal owners — farmers, breeders, and pet lovers alike.
          </p>
        </div>

        <div className="features__grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card reveal delay-${(i % 4) + 1}`}
            >
              <div className="feature-card__top">
                <div className="feature-card__icon">{f.icon}</div>
                <span
                  className="feature-card__tag"
                  style={{ background: `${tagColors[f.tag]}22`, color: tagColors[f.tag], borderColor: `${tagColors[f.tag]}44` }}
                >
                  {f.tag}
                </span>
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.description}</p>
              <div className="feature-card__hover-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;