import { lazy } from "react"

const MenuRoutes = [
  {
    path: "/credit",
    component: lazy(() => import("./views/credit")),
    exact: true
  }
]

export default MenuRoutes
