import React, { useEffect, useRef } from "react";
import "./HowItWorks.css";
const steps = [
  {
    num: "01",
    icon: "🔍",
    title: "Select Your Animal",
    description: "Choose from cattle, goats, poultry, dogs, cats and more. Browse diseases common to your animal type and filter by season.",
    color: "#3DB877",
  },
  {
    num: "02",
    icon: "💊",
    title: "Find the Right Medicine",
    description: "Search our verified medicine catalog. Compare prices across pharmacies, read dosage guides, and add to cart instantly.",
    color: "#D4A017",
  },
  {
    num: "03",
    icon: "👨‍⚕️",
    title: "Consult a Vet (Optional)",
    description: "Not sure what your animal needs? Chat with a licensed vet in real-time or book a video call. Get a digital prescription.",
    color: "#1A6B8A",
  },
  {
    num: "04",
    icon: "🚚",
    title: "Order & Get Delivered",
    description: "Pay via JazzCash, EasyPaisa, or cash on delivery. Track your order in real time and get medicines at your doorstep.",
    color: "#C44B1B",
  },
];

const HowItWorks: React.FC = () => {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hiw" id="how-it-works" ref={sectionRef}>
      <div className="hiw__bg-pattern" />
      <div className="container">
        <div className="hiw__header reveal">
          <span className="section-label">Simple Process</span>
          <h2 className="hiw__title">
            From Symptom to Medicine<br />
            <em>In Four Steps</em>
          </h2>
          <p className="hiw__subtitle">
            Designed for Pakistani farmers and pet owners — works in Urdu too.
          </p>
        </div>

        <div className="hiw__steps">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`hiw__step reveal delay-${i + 1}`}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hiw__connector">
                  <svg viewBox="0 0 120 24" fill="none">
                    <path
                      d="M0 12 Q30 4 60 12 Q90 20 120 12"
                      stroke="url(#conn-grad)"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                    />
                    <defs>
                      <linearGradient id="conn-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop stopColor="#3DB877" stopOpacity="0.5" />
                        <stop offset="1" stopColor="#D4A017" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="hiw__connector-arrow" />
                </div>
              )}

              {/* Step card */}
              <div className="hiw__card" style={{ "--step-color": step.color } as React.CSSProperties}>
                <div className="hiw__num">{step.num}</div>
                <div className="hiw__icon-wrap">
                  <span className="hiw__icon">{step.icon}</span>
                  <div className="hiw__icon-ring" />
                </div>
                <h3 className="hiw__card-title">{step.title}</h3>
                <p className="hiw__card-desc">{step.description}</p>
                <div className="hiw__card-accent" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="hiw__bottom reveal delay-5">
          <div className="hiw__bottom-card glass-card">
            <div className="hiw__bottom-icon">🇵🇰</div>
            <div>
              <div className="hiw__bottom-title">Available across Pakistan</div>
              <div className="hiw__bottom-sub">Lahore · Karachi · Islamabad · Faisalabad · Sheikhupura · and growing</div>
            </div>
            <a href="#" className="btn-primary" style={{ marginLeft: "auto", flexShrink: 0 }}>
              Start Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;