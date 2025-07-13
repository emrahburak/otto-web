import React from "react";
import "./style.css";

interface TextProps {
  size?: "sm" | "md" | "lg";
  fontWeight?: "normal" | "medium" | "semibold" | "bold"; // Font-weight seçimi
  className?: string;
  href?: string;
  children: React.ReactNode;
}

const getTextClasses = (
  size: "sm" | "md" | "lg",
  fontWeight: "normal" | "medium" | "semibold" | "bold",
  className: string
) => {
  const sizeClass = `font-size--${size}`;
  const weightClass = `font-weight-${fontWeight}`;
  return `${sizeClass} ${weightClass} ${className}`.trim();
};

export const Heading: React.FC<TextProps> = ({
  size = "md",
  fontWeight = "normal",
  className = "",
  children,
}) => {
  const classes = getTextClasses(
    size,
    fontWeight,
    `${className}`
  );
  return (
    <h1 className={classes}>
      {children}
    </h1>
  );
};

export const Title: React.FC<TextProps> = ({
  size = "md",
  fontWeight = "semibold",
  className = "",
  children,
}) => {
  const classes = getTextClasses(size, fontWeight, `text-title ${className}`);

  return <p className={classes}>{children}</p>;
};

export const Paragraph: React.FC<TextProps> = ({
  size = "md",
  fontWeight = "semibold",
  className = "",
  children,
}) => {
  const classes = getTextClasses(
    size,
    fontWeight,
    ` text-paragraph ${className}`
  );

  return <p className={classes}>{children}</p>;
};
