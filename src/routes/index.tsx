// src/routes/index.tsx
import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ActivitesPage from "../pages/Activites";
import ServiceDetailPage from "../pages/SeviceDetail";
import PageDetailPage from "../pages/PageDetail";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      // "about" yerine daha samimi ve Türkçe "hakkimizda"
      { path: "hakkimizda", element: <About /> },
      // "contact" yerine doğrudan "iletisim"
      { path: "iletisim", element: <Contact /> },
      // "activites" (hatalıydı) yerine SEO gücü yüksek "aktiviteler"
      { path: "aktiviteler", element: <ActivitesPage /> },
      // "services" yerine daha kurumsal ve SEO dostu "programlar" veya "aktivite"
      { path: "aktiviteler/:slug", element: <ServiceDetailPage /> },
      // Genel sayfalar (kvkk, kurallar vb.) için "bilgi" veya "sayfa"
      { path: "sayfa/:slug", element: <PageDetailPage /> },
      // 1. Seçenek: Doğrudan 404 içeriğini göster (Daha iyi SEO)
      {
        path: "*",
        element: <PageDetailPage />
      },
    ],
  },
];
