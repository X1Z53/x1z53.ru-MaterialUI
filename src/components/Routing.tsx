import { Navigate, Route, Routes } from "react-router-dom"
import { Collection, ImportReplacement, Main, TrumAdmins, TrumBlacklist } from "../pages"
import { Plug } from "./"


const routes = [
  { path: "/", element: <Main /> },
  { path: "/collection", element: <Collection /> },
  { path: "/trum_admins", element: <TrumAdmins /> },
  { path: "/trum_blacklist", element: <TrumBlacklist /> },
  { path: "/import_replacement", element: <ImportReplacement /> },
  { path: "/*", element: <Plug /> },
]

const redirectRoutes = [
  { path: "/import_substitution", element: <Navigate to="/import_replacement" replace /> },
]

export default function Routing() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {redirectRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}
