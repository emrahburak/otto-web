import { Link, useLocation } from "react-router-dom";
import type { headLink } from "../../types/headlink";
import { Button } from "../../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ottoLogo from "@/assets/otto-logo.png"


interface MobileMenuProps {
  menuItems: headLink[];
  isOpen: Boolean;
  onClose: () => void;

}

export default function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps) {
  const location = useLocation()
  return (
    <div className={`
      fixed top-0 bottom-0 left-0 right-0 z-50 bg-gray-01 p-6 flex flex-col gap-6
      transition-all duration-500 ease-in-out
      ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-[-100%] opacity-0 pointer-events-none'}
    `}>
      <Button onClick={onClose} className="self-end text-2xl">
        <FontAwesomeIcon icon={faXmark} />
      </Button>
      <div className="w-full flex items-center justify-center" >
        <img
          src={ottoLogo}
          alt="Logo"
          className="object-cover h-ful max-h-[7.5em]"
        />
      </div>



      <nav className="flex flex-col gap-4 items-start w-1/2 mx-auto ">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.link
          return (
            <Button key={idx} className={`font-display
              ${isActive
                ? "text-orange-01"
                : "text-black"}
              `}>
              <Link to={item.link} onClick={onClose}>{item.name}</Link>
            </Button>


          )

        }

        )}
      </nav>
    </div>
  );
}

