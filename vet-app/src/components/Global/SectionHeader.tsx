import React from "react";
import "./SectionHeader.css";

interface Props {
  label: string;
  title: React.ReactNode;
  subtitle: string;
  variant?: string; // 👈 key idea (diseases, testimonials, features)
}

const SectionHeader: React.FC<Props> = ({
  label,
  title,
  subtitle,
  variant = "section",
}) => {
  return (
    <div className={`${variant}__header `}>
      <span className={`section-label ${variant}__label`}>
        {label}
      </span>

      <h2 className={`${variant}__title`}>
        {title}
      </h2>

      <p className={`${variant}__subtitle`}>
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;