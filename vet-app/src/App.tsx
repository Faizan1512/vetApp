import React, { useEffect, useState } from "react";
// import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Stats from "./components/Stats/Stats";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Features from "./components/Features/Features";
import Diseases from "./components/Disease/Disease";
import Testimonials from "./components/Testimonials/Testamonial";
import Pricing from "./components/Pricing /Pricing";
import CTA from "./components/CTA/CTA";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./constants/global.css";
const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-root">
      <Navbar scrollY={scrollY} />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <Diseases />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;