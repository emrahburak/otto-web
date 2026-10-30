import { BrowserRouter, useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";

void appRoutes;

function AppRoutes() {
  return useRoutes(appRoutes)
}


function App() {

  return (
    <>
      <BrowserRouter
        // @ts-expect-error BrowserRouter extra prop for scroll restoration
        scrollRestoration="manual"
      >
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
