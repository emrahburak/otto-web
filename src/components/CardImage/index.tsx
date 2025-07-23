import type { CardData } from "../../types/types"

interface CardProps {
  items: CardData
  variant: string
}

export default function CardImage({ items, variant }: CardProps) {
  const { title, image, bannerImage } = items

  if (variant === "banner") {
    return bannerImage ? (
      <img
        src={bannerImage}
        alt={title}
        className="w-full h-auto object-cover"
      />
    ) : (
      <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
        Görsel yok
      </div>
    )
  }

  return (
    <>
      {image ? (
        <div
          className={`
            ${variant === "default" || variant === "activite"
              ? "w-24 h-24 rounded-full bg-orange-01 flex items-center justify-center mx-auto"
              : ""}
          `}
        >
          <img
            src={image}
            alt={title}
            className={`
              ${variant === "default" || variant === "activite" ? "w-12 h-12 object-contain filter invert brightness-0" : ""}
              ${variant === "team" ? "w-full object-cover" : ""}
            `}
          />
        </div>
      ) : (
        <div
          className={`
            ${variant === "default" || variant === "activite" ? "w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm" : ""}
          `}
        >
          Görsel yok
        </div>
      )}
    </>
  )
}
