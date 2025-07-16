export interface CardData {
  id: number;
  title: string;
  description?: string;
  image?: string;
  variant?: "default" | "compact" | "featured";
}
