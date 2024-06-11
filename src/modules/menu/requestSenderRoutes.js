import { lazy } from "react"

const MenuRoutes = [
  {
    path: "/requestsender",
    component: lazy(() => import("./views/requestSender")),
    exact: true
  }
]

export default MenuRoutes
