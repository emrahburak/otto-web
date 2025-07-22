import { Header } from "../Header";
import { Footer } from "../Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "../MobileMenu";
import { footerItems } from "../../data/footerData";
import { menuItems } from "../../data/menu";
import { Toaster } from "sonner";







export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen  w-full max-w-screen ">
    <Toaster/>
      <MobileMenu menuItems={menuItems} isOpen={open} onClose={() => setOpen(false)} />

      <Header menuItems={menuItems} onToggleMenu={() => setOpen(true)} />

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer footerItems={footerItems} />


    </div>
  )
}

