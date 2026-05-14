// components/Pricing/Pricing.tsx
import React from "react";
import "./Pricing.css";
import SectionHeader from "../Global/SectionHeader";
const plans = [
  { name: "Free", price: "0", features: ["Disease Info", "Alerts"] },
  { name: "Pro", price: "999 PKR", features: ["Vet Chat", "Video Call"] },
];

const Pricing: React.FC = () => {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
  <SectionHeader
          variant="testimonials"
          label="Testimonials"
          title={
            <>
              Pricing <br />
              <em>Plan</em>
            </>
          }
          subtitle="Real feedback from farmers and pet owners using VetCare."
        />        <div className="pricing-grid">
          {plans.map((plan) => (
            <div className="pricing-card" key={plan.name}>
              <h3>{plan.name}</h3>
              <h1>{plan.price}</h1>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button>Choose Plan</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;