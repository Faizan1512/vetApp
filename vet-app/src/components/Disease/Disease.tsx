// components/Diseases/Diseases.tsx
import React, { useEffect, useRef } from "react";
import "./Disease.css";

const diseases = [
  { name: "Foot & Mouth Disease", type: "Cattle", severity: "High" },
  { name: "Mastitis", type: "Dairy", severity: "Medium" },
  { name: "Newcastle Disease", type: "Poultry", severity: "High" },
  { name: "Rabies", type: "Pets", severity: "Critical" },
];

const Diseases: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal").forEach((t) =>
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
    <section className="diseases" ref={sectionRef} id="diseases">
      <div className="container">

        {/* ✅ SAME HEADER SYSTEM AS FEATURES */}
        <div className="diseases__header reveal">
          <span className="section-label diseases__label">
            Animal Health
          </span>

          <h2 className="diseases__title">
            Common Animal<br />
            <em>Diseases</em>
          </h2>

          <p className="diseases__subtitle">
            Identify early symptoms and protect your livestock before it’s too late.
          </p>
        </div>

        <div className="disease-grid">
          {diseases.map((d) => (
            <div className="disease-card reveal" key={d.name}>
              <h3>{d.name}</h3>
              <p>{d.type}</p>
              <span className={`severity ${d.severity.toLowerCase()}`}>
                {d.severity}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Diseases;