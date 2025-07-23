import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faAt, faBars } from "@fortawesome/free-solid-svg-icons";
import ottoLogo from "@/assets/otto-logo.png"
import { useEffect, useState } from "react";
import { SocialButtons } from "../../ui/SocialButtons";
import { Button } from "../../ui/Button";
import { ContactData } from "../../data/contact";
import type { headLink, socialButton } from "../../types/types";




const socialButons: socialButton[] = [
  { id: 1, name: "facebook", icon: <FontAwesomeIcon icon={faFacebook} className="text-lg" />, href: "https://www.facebook.com/", style: { backgroundColor: "#f2682a" } },
  { id: 2, name: "x", icon: <FontAwesomeIcon icon={faXTwitter} className="text-lg" />, href: "https://x.com/home?lang=tr", style: { backgroundColor: "#5b9a42" } },
  { id: 3, name: "instagram", icon: <FontAwesomeIcon icon={faInstagram} className="text-lg" />, href: "https://www.instagram.com/ottodogaokulu/", style: { backgroundColor: "#efc429" } }
]



interface HeaderProps {
  onToggleMenu: () => void;
  menuItems: headLink[]

}


export const Header = ({ onToggleMenu, menuItems }: HeaderProps) => {

  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const contactData = ContactData




  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);

  }, [])

  return (
    <>

      <header className="sticky top-0 z-10 bg-white shadow transition-all duration-300  min-h-[6rem] w-full">

        <div className="absolute left-0 top-1/2 -translate-y-1/2  flex-row items-center gap-2 pl-5  xl:hidden " >
          <Link to="/">
            <img
              src={ottoLogo}
              alt="Logo"
              className={`transition-all duration-300 mx-auto ${scrolled ? "max-h-[4em]" : "max-h-[7.5em]"
                }`}
            />
          </Link>

        </div>


        <div className="absolute left-4 top-1/2 -translate-y-1/2  flex-row items-center gap-2 pl-5 hidden xl:flex " >

          <SocialButtons items={socialButons} variant="default" />


          <div className="flex flex-row items-center justify-start gap-2 border-l-3 border-gray-200 pl-3 ">
            <div className="rounded-full px-1.5 py-0.5 border-2 border-orange-01">
              <FontAwesomeIcon icon={faPhone} className="text-lg text-orange-01" />
            </div>
            <span className="text-sm font-semibold">
              {contactData.phone}
            </span>
          </div>
          <div className="flex flex-row items-center justify-start gap-2 border-l-3 border-gray-200 pl-3 ">
            <div>
              <FontAwesomeIcon icon={faAt} className="text-2xl  text-orange-01" />
            </div>
            <span className="text-sm font-semibold">
              {contactData.mail}
            </span>
          </div>
        </div>


        <div className="xl:flex justify-center hidden ">

          <Link to="/">
            <img
              src={ottoLogo}
              alt="Logo"
              className={`transition-all duration-300 mx-auto ${scrolled ? "max-h-[4em]" : "max-h-[7.5em]"
                }`}
            />
          </Link>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2  flex-row gap-4 pr-5 hidden md:flex ">
          {/* Menü linkleri */}

          {menuItems.map((item) => {
            const isActive = location.pathname === item.link
            return (
              <Button key={item.name} className={`font-display 
                ${isActive
                  ? "rounded-full px-4 py-2 bg-orange-01 text-white"
                  : "text-black"}
                `} >
                <Link to={item.link}>{item.name}</Link>
              </Button>
            );
          })}
        </div>

        <Button className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-row gap-4 pr-5 md:hidden " onClick={onToggleMenu} >

          <FontAwesomeIcon icon={faBars} className="text-xl font-semibold text-orange-01" />
        </Button>

      </header>

    </>
  )
}
