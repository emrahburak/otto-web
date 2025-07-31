import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import type { CardData } from "../../types/types";
import CardImage from "../../components/CardImage";
import { Slugify } from "../../components/Slugify";
// import { faXTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";


// const socialIcon = {
//   facebook: { id: 1, name: "facebook", icon: <FontAwesomeIcon icon={faFacebook} className="text-lg" />, style: { backgroundColor: "#f2682a" } },
//   x: { id: 2, name: "x", icon: <FontAwesomeIcon icon={faXTwitter} className="text-lg" />, style: { backgroundColor: "#5b9a42" } },
//   instagram: { id: 3, name: "instagram", icon: <FontAwesomeIcon icon={faInstagram} className="text-lg" />, style: { backgroundColor: "#efc429" } }
//
// }

interface CardProps {
  items: CardData
  variant: string
}

export default function Card({ items, variant }: CardProps) {
  const { title, description, user } = items;


  return (
    <div className={`
      group 
          ${variant === "default" || variant === "activite" ? " relative pb-6 cursor-grab h-full w-full" : ""}
          ${variant === "team" ? "w-[340px] h-[360px] relative overflow-hidden cursor-pointer" : ""}
      `}>
      <div className={`
  ${variant === "default" || variant === "activite" ? "shadow-md p-7 flex flex-col gap-5 text-gray-02 w-full h-full" : ""}
  ${variant === "default" ? "bg-white " : ""}
  ${variant === "activite" ? "bg-gray-01 hover:shadow-xl transition-all duration-200 ease-in-out" : ""}
`}>


        <Slugify title={title} disable={variant === "team"}>

          <div className={`${variant === "team" ? "relative w-full h-full" : ""}`}>
            <CardImage items={items} variant={variant} />
            {/* Siyah perde */}
            <div className={` ${variant === "team" ? "absolute inset-0 bg-black  opacity-0 group-hover:opacity-40 transition-opacity duration-400 ease-in-out pointer-events-none rounded-lg" : "hidden"}`}
            />

          </div>
        </Slugify>




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

        <Slugify title={title}>
          <span
            className={`
      absolute left-1/2 translate-x-[-50%] bottom-3 p-2 rounded-full
      text-center w-fit h-fit z-10 text-green-01 hover:text-white text-xl
      transition-all duration-300 ease-in-out
      ${variant === "default" ? "bg-gray-01 hover:bg-green-01" : ""}
      ${variant === "activite" ? "bg-white hover:bg-green-01" : ""}
    `}
          >
            <FontAwesomeIcon icon={faLink} />
          </span>
        </Slugify>
      )}




      {
        variant === "team" && (
          <div className="absolute left-0 right-0 -bottom-2 p-6 text-center bg-white
    transition-all duration-300 ease-in-out group-hover:bottom-3">
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
                  className=" rounded-3xl flex items-center justify-center  text-sm "
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
