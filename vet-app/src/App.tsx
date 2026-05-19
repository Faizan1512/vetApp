import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

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
import Shop from "./components/Shop/Shop";
import "./constants/global.css";

// Home page
const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Diseases />
      <Testimonials />
      <Pricing />
      <CTA />
    </>
  );
};

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop-medicines" element={<Shop />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;