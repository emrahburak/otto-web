import { Link } from "react-router-dom";
import ottoLogo from "@/assets/otto-logo-rbg.png"




const bottomImage:string = "https://themounty.ancorathemes.com/wp-content/uploads/2018/04/bg-footer.png?id=558"

interface FooterLink {
  id: number;
  name: string;
  link: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}



const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Bilgi",
    links: [
      { id: 1, name: "Hakkımızda", link: "/about" },
      { id: 2, name: "Kariyer", link: "/careers" },
      { id: 3, name: "Blog", link: "/blog" },
    ],
  },
  {
    title: "Kampımız",
    links: [
      { id: 4, name: "Konaklama", link: "/accommodation" },
      { id: 5, name: "Fiyatlandırma", link: "/pricing" },
      { id: 6, name: "S.S.S.", link: "/faq" },
    ],
  },
  {
    title: "Rezervasyon",
    links: [
      { id: 7, name: "İletişim", link: "/contact" },
      { id: 8, name: "Destek", link: "/support" },
      { id: 9, name: "Gizlilik", link: "/privacy" },
    ],
  },
  {
    title: "Aktiviteler",
    links: [
      { id: 10, name: "Atölyeler", link: "/workshops" },
      { id: 11, name: "Sporlar", link: "/sports" },
      { id: 12, name: "Doğa Yürüyüşü", link: "/hiking" },
    ],
  },
];


export const Footer = () => {
  return (
    <footer className="relative w-full pt-20 min-w-screen">
      <div className="w-full  flex items-center justify-center">
        <div className="xl:w-3/4 w-1/2 mx-auto grid xl:grid-cols-5 grid-cols-2 gap-2">
          {footerLinkGroups.slice(0, 2).map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <h4 className="text-gray-900 font-display">{group.title}</h4>
              {group.links.map((link) => (
                <Link key={link.id} to={link.link} className="text-gray-600 hover:text-gray-900 font-display-02">
                  {link.name}
                </Link>
              ))}
            </div>
          ))}

          {/* Orta Logo */}
          <Link to="/" className="xl:flex items-center justify-center hidden">
            <img src={ottoLogo} alt="Logo" className="w-auto" />
          </Link>

          {footerLinkGroups.slice(2).map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <h4 className="text-lg  text-gray-900 font-display ">{group.title}</h4>
              {group.links.map((link) => (
                <Link key={link.id} to={link.link} className="text-gray-600 hover:text-gray-900 font-display-02 ">
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>


      </div>


      {/* Alt kısma arka plan görseli */}
      <div className="w-full">
        <img
          src={bottomImage}
          alt="footer pattern"
          className="w-full h-auto"
        />
      </div>


    </footer>

  )
}
