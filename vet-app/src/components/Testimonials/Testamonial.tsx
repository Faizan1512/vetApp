import React from "react";
import "./Testimonials.css";
import SectionHeader from "../Global/SectionHeader";

const testimonials = [
  {
    name: "Ali Khan",
    text: "This app saved my livestock during an outbreak!",
  },
  {
    name: "Sara Ahmed",
    text: "Vet chat is super fast and reliable.",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials">
      <div className="container">

        {/* ✅ GLOBAL SECTION HEADER */}
        <SectionHeader
          variant="testimonials"
          label="Testimonials"
          title={
            <>
              What Farmers <br />
              <em>Say</em>
            </>
          }
          subtitle="Real feedback from farmers and pet owners using VetCare."
        />

        {/* GRID */}
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p>"{t.text}"</p>
              <h4>- {t.name}</h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;