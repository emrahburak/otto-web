// src/routes/index.tsx
import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ActivitesPage from "../pages/Activites";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "activites", element: <ActivitesPage /> },
    ],
  },
];

