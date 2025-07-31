import { Header } from "../Header";
import { Footer } from "../Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "../MobileMenu";
import { footerItems } from "../../data/footerData";
import { menuItems } from "../../data/menu";
import { ScrollToTop } from "../ScrollToTop";
import ChatField from "../ChatField";







export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen  w-full max-w-screen ">

    
      <MobileMenu menuItems={menuItems} isOpen={open} onClose={() => setOpen(false)} />

      <Header menuItems={menuItems} onToggleMenu={() => setOpen(true)} />
      <ScrollToTop />

      <main className="flex-grow">
        <Outlet />
      </main>
      <ChatField />
      <Footer footerItems={footerItems} />

    </div>
  )
}

