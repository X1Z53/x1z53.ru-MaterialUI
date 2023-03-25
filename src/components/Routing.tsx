import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import { Main, Collection, TrumBlacklist, TrumAdmins, ImportReplacement } from "../pages"
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

export default function Routing(): JSX.Element {
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
