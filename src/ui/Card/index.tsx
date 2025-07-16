import type { CardData } from "../../types/CardData"

interface CardProps {
  items: CardData
}

export default function Card({ items }: CardProps) {
  const { title, description, image } = items;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col justify-between">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
          Görsel yok
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
