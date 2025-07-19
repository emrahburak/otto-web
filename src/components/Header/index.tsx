import { Heading } from "../../ui/Typhography";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faAt } from "@fortawesome/free-solid-svg-icons";
import type React from "react";
import { Button } from "../../ui/Button";
import ottoLogo from "@/assets/otto-logo.png"
import { useEffect, useState } from "react";
import { SocialButtons } from "../../ui/SocialButtons";
import type { socialButton } from "../../types/SocialButtons";




interface headLink {
  id: number,
  name: string;
  link: string
}


const socialButons: socialButton[] = [
  { id: 1, name: "facebook", icon: <FontAwesomeIcon icon={faFacebook} className="text-lg" />, href: "https://www.facebook.com/", style: { backgroundColor: "#f2682a" } },
  { id: 2, name: "x", icon: <FontAwesomeIcon icon={faXTwitter} className="text-lg" />, href: "https://x.com/home?lang=tr", style: { backgroundColor: "#5b9a42" } },
  { id: 3, name: "instagram", icon: <FontAwesomeIcon icon={faInstagram} className="text-lg" />, href: "https://www.instagram.com/", style: { backgroundColor: "#efc429" } }
]


const headLinks: headLink[] = [
  { id: 1, name: 'ANASAYFA', link: '/' },
  { id: 2, name: 'HAKKIMIZDA', link: '/about' },
  { id: 3, name: 'İLETİŞİM', link: '/contact' },
  { id: 4, name: 'AKTİVİTELER', link: '/activites' }
]

export const Header = () => {

  const [scrolled, setScrolled] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);

  }, [])

  return (
    <>

      <header className="sticky top-0 z-50 bg-white shadow transition-all duration-300 ">

        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-row items-center gap-2 pl-5">

        <SocialButtons items={socialButons} variant="default"/>

          {/* <div className="flex flex-row items-center gap-2"> */}
          {/*   {socialButons.map(btn => ( */}
          {/*     <Button key={btn.id} className=" w-12 h-12 py-1 px-2 text-white text-xl  rounded-3xl" {...btn} ></Button> */}
          {/*   ))} */}
          {/* </div> */}

          <div className="flex flex-row items-center justify-start gap-2 border-l-3 border-gray-200 pl-3 ">
            <div className="rounded-full px-1.5 py-0.5 border-2 border-orange-01">
              <FontAwesomeIcon icon={faPhone} className="text-lg text-orange-01" />
            </div>
            <span className="text-sm font-semibold">
              5555 555 555
            </span>
          </div>
          <div className="flex flex-row items-center justify-start gap-2 border-l-3 border-gray-200 pl-3 ">
            <div>
              <FontAwesomeIcon icon={faAt} className="text-2xl  text-orange-01" />
            </div>
            <span className="text-sm font-semibold">
              mail@mail.info
            </span>
          </div>
        </div>


        <div className="flex justify-center">
          <img
            src={ottoLogo}
            alt="Logo"
            className={`transition-all duration-300 mx-auto ${scrolled ? "max-h-[4em]" : "max-h-[7.5em]"
              }`}
          />
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-row gap-4 pr-5">
          {/* Menü linkleri */}
          {headLinks.map((item) => (
            <Heading size="sm" key={item.id} className="font-display">
              <Link to={item.link}>{item.name}</Link>
            </Heading>
          ))}
        </div>
      </header>

    </>
  )
}
