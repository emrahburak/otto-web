import { Heading } from "../../ui/Typhography";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import type React from "react";




interface headLink {
  id: number,
  name: string;
  link: string
}

interface socialButton {
  id: number,
  icon: React.ReactNode,
  link: string

}

// const socialButons: socialButton[] = [
//   {id: 1, icon: <FontAwesomeIcon icon={}/>}
// ]


const headLinks: headLink[] = [
  { id: 1, name: 'ANASAYFA', link: '/' },
  { id: 2, name: 'HAKKIMIZDA', link: '/about' },
  { id: 3, name: 'İLETİŞİM', link: '/contact' }
]

export const Header = () => {
  return (
    <>

      <header className="flex flex-row items-center justify-between">
        <div>
          social Media
        </div>
        <div className="flex flex-row items-center">
          <div>
            555 55 55555
          </div>
          <div>
            mail@mail.info
          </div>
        </div>


        <div>
          LOGO
        </div>


        <div className="flex flex-row gap-4 px-3 ">
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
