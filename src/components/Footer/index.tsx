import { Link } from "react-router-dom";
import ottoLogo from "@/assets/otto-logo-rbg.png"
import ottoParkLogo from "@/assets/otto-doga-park.png"
import type { FooterLinkGroup } from "../../types/types";




const bottomImage: string = "https://themounty.ancorathemes.com/wp-content/uploads/2018/04/bg-footer.png?id=558"



interface FooterProps {
  footerItems: FooterLinkGroup[]
}


export const Footer = ({ footerItems }: FooterProps) => {
  return (
    <footer className=" w-full lg:pt-20 sm:pt-10 min-w-screen">

      <div className="flex flex-nowrap items-center justify-center gap-5 lg:hidden mb-5">
        <Link to="/" >
          <img src={ottoLogo} alt="otto doğa okulu" className="object-cover w-28" />
        </Link>
        <a href="https://ottodogapark.com/" target="_blank">
          <img src={ottoParkLogo} alt="otto doğa park" className="object-cover w-20 " />
        </a>
      </div>

      <div className="grid lg:grid-cols-5 grid-cols-2 lg:max-w-6xl max-w-3xl mx-auto px-10 gap-5 lg:text-left text-center ">


        {footerItems.slice(0, 2).map((group) => (
          <div key={group.title} className="flex flex-col gap-2 ">
            <h4 className="text-gray-900 font-display">{group.title}</h4>
            {group.links.map((link) => (
              <Link key={link.id} to={link.link} className="text-gray-600 hover:text-gray-900 font-display-02">
                {link.name}
              </Link>
            ))}
          </div>
        ))}

        {/* Orta Logo */}
        <div className="hidden lg:flex flex-col flex-nowrap items-center justify-evenly">

          <Link to="/" >
            <img src={ottoLogo} alt="otto doğa okulu" className="object-cover w-28" />
          </Link>
          <a href="https://ottodogapark.com/" target="_blank">
            <img src={ottoParkLogo} alt="otto doğa park" className="object-cover w-24 " />
          </a>
        </div>

        {footerItems.slice(2).map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <h4 className="text-lg  text-gray-900 font-display ">{group.title}</h4>
            {group.links.map((link: any) => (
              <Link key={link.id} to={link.link} className="text-gray-600 hover:text-gray-900 font-display-02 ">
                {link.name}
              </Link>
            ))}
          </div>
        ))}
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
