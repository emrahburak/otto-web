import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { ContactData } from "../../data/contact";



export default function ChatField() {
  const [waLink, setWaLink] = useState("");

  useEffect(() => {
    const isMobile = /iPhone|Android|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    );

    const phone = ContactData.phone90
    const base = isMobile
      ? `https://wa.me/${phone}`
      : `https://web.whatsapp.com/send?phone=${phone}`;

    setWaLink(base);
  }, []);

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-[#25D366] text-white px-4 py-2 rounded-full font-semibold shadow-md flex items-center gap-2 hover:scale-105 transition-transform z-50"
    >
      <FontAwesomeIcon icon={faWhatsapp} />
      <span className="hidden sm:block">
        WhatsApp
      </span>
    </a>
  );
}

