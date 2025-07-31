import { Header } from "../Header";
import { Footer } from "../Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "../MobileMenu";
import { footerItems } from "../../data/footerData";
import { menuItems } from "../../data/menu";
import { Toaster } from "sonner";
import { ScrollToTop } from "../ScrollToTop";
import ChatField from "../ChatField";






export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen  w-full max-w-screen ">
      <Toaster
        position="top-right"
        duration={3000} // toast ne kadar süre görünür
        richColors // varsayılan renklendirmeyi biraz daha modern hale getirir
        expand // içeriği daha geniş gösterir
      />

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

