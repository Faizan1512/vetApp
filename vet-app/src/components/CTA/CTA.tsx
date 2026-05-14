// components/CTA/CTA.tsx
import React from "react";
import "./CTA.css";

const CTA: React.FC = () => {
  return (
    <section className="cta">
      <div className="container">
        <h2>Start Protecting Your Animals Today</h2>
        <p>Join thousands of farmers using VetCare</p>
        <button>Get Started</button>
      </div>
    </section>
  );
};

export default CTA;