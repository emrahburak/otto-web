import { BrowserRouter, useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";
appRoutes

function AppRoutes() {
  return useRoutes(appRoutes)
}


function App() {

  return (
    <>
      <BrowserRouter
        // @ts-ignore
        scrollRestoration="manual"
      >
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
