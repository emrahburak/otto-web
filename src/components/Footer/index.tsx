import { Link } from "react-router-dom";
import ottoLogo from "@/assets/otto-logo.png"
import ottoParkLogo from "@/assets/otto-doga-park.png"
import type { FooterLinkGroup } from "../../types/types";





interface FooterProps {
  footerItems: FooterLinkGroup[]
}


export const Footer = ({ footerItems }: FooterProps) => {
  return (
    <footer className=" w-full lg:pt-20 sm:pt-10 min-w-screen space-y-10 py-10">

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



      <section className="w-full max-w-6xl mx-auto flex items-center  justify-center">
        <div className="text-sm text-gray-500">
          <h2 className="font-semibold font-display text-center text-lg">Bize Ulaşın</h2>
          <p className="font-semibold text-center font-display-02">OTTO DOĞA PARK / OTTO DOĞA OKULU</p>
          <p className="text-center font-display-02">Kurna Mah. Kurtdoğmuş Yolu Cad. No: 63/1 Pendik – İstanbul</p>
        </div>


      </section>


      {/* Alt kısma arka plan görseli */}

      <div className="text-xs text-gray-600 mt-2 text-center">
        © {new Date().getFullYear()} Otto Doğa Okulu,
        <a href="https://ottodogapark.com" target="_blank" rel="noopener noreferrer" className=" underline  hover:text-black mx-1">
          <strong>
            OTTO DOĞA PARK
          </strong>
        </a>
        alanı içerisinde faaliyet göstermekte olup, içeriği <strong>ULUTAŞ SANAT AKADEMİ</strong> ve Prodüksiyon Hizmetleri tarafından hazırlanmıştır.
      </div>



    </footer>

  )
}
