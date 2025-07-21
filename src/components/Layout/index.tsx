import { Header } from "../Header";
import { Footer } from "../Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "../MobileMenu";
import type { headLink } from "../../types/headlink";



const menuItems: headLink[] = [
  { id: 1, name: 'ANASAYFA', link: '/' },
  { id: 2, name: 'HAKKIMIZDA', link: '/about' },
  { id: 3, name: 'AKTİVİTELER', link: '/activites' },
  { id: 4, name: 'İLETİŞİM', link: '/contact' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen  w-full max-w-screen ">
      <MobileMenu menuItems={menuItems} isOpen={open} onClose={() => setOpen(false)} />

      <Header menuItems={menuItems} onToggleMenu={() => setOpen(true)} />

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />


    </div>
  )
}

