// components/Slugify.tsx
import type { ReactNode } from "react"
import slugify from "slugify"
import { Link } from "react-router-dom"

interface SlugifyProps {
  title?: string
  children: ReactNode
  disable?: boolean
}

export function Slugify({ title, disable, children }: SlugifyProps) {
  if (disable) return <>{children}</>;
  const slug = slugify(title ?? "", { lower: true, locale: "tr" }) || ""

  return <Link to={`/services/${slug}`}>{children}</Link>
}

