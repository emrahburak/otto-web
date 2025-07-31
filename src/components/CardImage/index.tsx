import type { CardData } from "../../types/types"

interface CardProps {
  items: CardData
  variant: string
}

export default function CardImage({ items, variant }: CardProps) {
  const { title, image, bannerImage, logo } = items;

  if (variant === "banner") {
    return bannerImage ? (
      <img src={bannerImage} alt={title} className="w-full h-auto object-cover" />
    ) : (
      <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
        Görsel yok
      </div>
    );
  }

  // Burada default ise logo render et, değilse image
  const imgSrc = variant === "default" || variant === "activite" ? logo : image;

  return (
    <>
      {imgSrc ? (
        <div
          className={`
      ${variant === "team"
              ? "w-full aspect-[3/2] rounded-lg overflow-hidden flex items-center justify-center bg-gray-100"
              : "w-24 h-24 rounded-full bg-orange-01 flex items-center justify-center mx-auto"
            }
    `}
        >
          <img
            src={imgSrc}
            alt={title}
            className={`
        ${variant === "team"
                ? "w-full h-full object-cover"
                : "w-12 h-12 object-contain filter invert brightness-0"
              }
      `}
          />
        </div>
      ) : (
        <div
          className={`
      ${variant === "default" || variant === "activite"
              ? "w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm"
              : ""}
    `}
        >
          Görsel yok
        </div>
      )}
    </>
  );
}

