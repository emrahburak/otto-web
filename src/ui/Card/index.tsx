import type { CardData } from "../../types/CardData"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


interface CardProps {
  items: CardData
  variant: string
}

export default function Card({ items, variant }: CardProps) {
  const { title, description, image, user } = items;


  return (
    <div className={`
      group 
          ${variant === "default" || variant === "activite" ? " relative pb-6 cursor-grab" : ""}
          ${variant === "team" ? "w-[400px] h-[400px] relative overflow-hidden cursor-pointer" : ""}
      `}>
      <div className={`
  ${variant === "default" || variant === "activite" ? "shadow-md p-7 flex flex-col gap-5 text-gray-02 w-full max-w-[296px] h-full min-h-[384px]" : ""}
  ${variant === "default" ? "bg-white" : ""}
  ${variant === "activite" ? "bg-gray-01" : ""}
`}>        {image ? (

          <img
            src={image}
            alt={title}
            className={
              `${variant === "default" || variant === "activite" ? "w-40 h-40 object-cover  mx-auto" : ""}
              ${variant === "team" ? "w-full object-cover  " : ""}`
            }
          />
        ) : (
          <div className={`
          ${variant === "default" || variant === "activite" ? "w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm" : ""}
          `}>
            Görsel yok
          </div>
        )}
        <div className="grid grid-cols-1 gap-2">
          <h3 className={`${variant === "default" || variant === "activite" ? "text-lg font-semibold mb-2 text-center font-display text-black" : ""}
          `}>{title}</h3>
          {description && (
            <p className={`
            ${variant === "default" || variant === "activite" ? "text-gray-600 text-sm leading-relaxed text-center font-display-02" : ""}`}>
              {description}
            </p>
          )}
        </div>
      </div>

      {(variant === "default" || variant === "activite") && (
        <Link
          to="/"
          className={`
      absolute left-1/2 translate-x-[-50%] bottom-3 p-2 rounded-full 
      text-center w-fit h-fit z-20 text-green-01 hover:text-white text-xl 
      transition-all duration-300 ease-in-out 
      ${variant === "default" ? "bg-gray-01 hover:bg-green-01" : ""}
      ${variant === "activite" ? "bg-white hover:bg-green-01" : ""}
    `}
        >
          <FontAwesomeIcon icon={faLink} />
        </Link>
      )}




      {
        variant === "team" && (
          <div className="absolute left-0 right-0 -bottom-8 p-6 text-center bg-white 
    transition-all duration-300 ease-in-out group-hover:bottom-0">
            <p className="font-display text-3xl">{user?.name}</p>
            <span className="font-display-02 text-gray-500">{user?.position}</span>
            <div className="mt-2 flex justify-center gap-4 opacity-0 translate-y-4 
      group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
              {user?.socialMedia?.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-500"
                >
                  {social.title}
                </a>
              ))}
            </div>
          </div>
        )
      }

    </div>
  );
}
