// components/SocialButtons.tsx
import React from "react";

export interface SocialItem {
  id: number;
  name: string;
  icon?: React.ReactNode;
  href: string;
  style?: React.CSSProperties;
}

interface SocialButtonsProps {
  items: SocialItem[];
  variant?: "default" | "minimal"; // Header'daki gibi dolu butonlar mı yoksa Card'daki gibi link mi?
}


export const SocialButtons: React.FC<SocialButtonsProps> = ({ items, variant = "default" }) => {
  return (
    <div className= {`flex gap-4 ${variant === "minimal" ? "justify-center" : ""}`
}>
{
  items.map((item) => (
    <a
          key= { item.id }
          href = { item.href }
          target = "_blank"
          rel = "noopener noreferrer"
          className = { variant === "default"
      ? "w-12 h-12 rounded-3xl flex items-center justify-center text-white text-xl"
      : "text-gray-500 hover:text-blue-500 text-base"}
style = { variant === "default" ? item.style : undefined}
        >
  { item.icon || item.name }
  </a>
      ))}
</div>
  );
};

