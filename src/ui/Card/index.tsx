import type { CardData } from "../../types/CardData"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";
import { Link } from "react-router-dom";


interface CardProps {
  items: CardData
}

export default function Card({ items }: CardProps) {
  const { title, description, image, variant } = items;


  return (
    <div className={`
          ${variant === "default" && " relative pb-6"}
      `}>
      <div className={`
          ${variant === "default" && " shadow-md p-7 h-full flex flex-col gap-5 bg-white  text-gray-02 w-full max-w-[296px] min-h-[384px] "}
      `}>
        {image ? (

          <img
            src={image}
            alt={title}
            className={
              `${variant === "default" && "w-40 h-40 object-cover  mx-auto"}`
            }
          />
        ) : (
          <div className={`
          ${variant === "default" && "w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm "}
          `}>
            Görsel yok
          </div>
        )}
        <div className="grid grid-cols-1 gap-2">
          <h3 className={`${variant === "default" && "text-lg font-semibold mb-2 text-center font-display text-black"}
          `}>{title}</h3>
          {description && (
            <p className={`
            ${variant === "default" && "text-gray-600 text-sm leading-relaxed text-center font-display-02"}`}>
              {description}
            </p>
          )}
        </div>
      </div>

      {
        variant === "default" && (

          <Link to="/" className="absolute left-1/2 translate-x-[-50%] bottom-3 p-4 rounded-full bg-gray-01 text-center w-fit h-fit z-20 hover:bg-green-01 text-green-01 hover:text-white text-xl transition-all duration-300 ease-in-out">
            <FontAwesomeIcon icon={faLink} />
          </Link>
        )
      }


    </div>
  );
}
