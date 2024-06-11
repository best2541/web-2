import { lazy } from "react"

const MenuRoutes = [
  {
    path: "/connection",
    component: lazy(() => import("./views/connection")),
    exact: true
  }
]

export default MenuRoutes
