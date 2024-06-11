import { lazy } from "react"

const MenuRoutes = [
  {
    path: "/sender",
    component: lazy(() => import("./views/sender")),
    exact: true
  },
  {
    path: "/sender/detail/:id",
    component: lazy(() => import("./views/sender/senderEdit")),
    exact: true
  }
]

export default MenuRoutes
