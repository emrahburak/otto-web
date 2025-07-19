import type React from "react";

export interface socialButton {
  id: number;
  name: string;
  icon: React.ReactNode;
  href: string;
  style?: React.CSSProperties;
}
