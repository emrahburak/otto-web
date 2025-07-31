import { useEffect } from "react";

// useSeo.ts
interface SeoProps {
  title: string;
  description: string;
}

export function useSeo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }
  }, [title, description]);
}
