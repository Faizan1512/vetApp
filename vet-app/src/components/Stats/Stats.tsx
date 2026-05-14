import React, { useEffect, useRef, useState } from "react";
import "./Stats.css";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  description: string;
}

const stats: Stat[] = [
  { value: 80, suffix: "M+", label: "Livestock in Pakistan", icon: "🐄", description: "Animals that need care" },
  { value: 2400, suffix: "+", label: "Animal Owners Served", icon: "👨‍🌾", description: "Farmers & pet owners" },
  { value: 180, suffix: "+", label: "Medicines Available", icon: "💊", description: "Verified & quality checked" },
  { value: 40, suffix: "+", label: "Licensed Vets Online", icon: "👨‍⚕️", description: "Ready for consultation" },
];

function useCountUp(target: number, isVisible: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
}

const StatCard: React.FC<{ stat: Stat; isVisible: boolean; delay: number }> = ({ stat, isVisible, delay }) => {
  const count = useCountUp(stat.value, isVisible);
  return (
    <div className="stat-card " style={{ transitionDelay: `${delay}ms` }}>
      <div className="stat-card__icon">{stat.icon}</div>
      <div className="stat-card__number">
        {isVisible ? count.toLocaleString() : "0"}{stat.suffix}
      </div>
      <div className="stat-card__label">{stat.label}</div>
      <div className="stat-card__desc">{stat.description}</div>
      <div className="stat-card__bar" />
    </div>
  );
};

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats__bg" />
      <div className="container">
        <div className="stats__header ">
          <span className="section-label">By The Numbers</span>
          <h2 className="stats__title">
            Pakistan's Animal Care<br />
            <em>Gap Is Real</em>
          </h2>
          <p className="stats__subtitle">
            Millions of animals, almost zero digital infrastructure. We're changing that.
          </p>
        </div>

        <div className="stats__grid">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} isVisible={isVisible} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;