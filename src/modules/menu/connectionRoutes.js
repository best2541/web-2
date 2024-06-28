import { lazy } from "react"

const MenuRoutes = [
  {
    path: "/connection",
    component: lazy(() => import("./views/connection")),
    exact: true
  },
  {
    path: "/connection/add",
    component: lazy(() => import("./views/connection/addConnection")),
    exact: true
  },
  {
    path: "/connection/edit/:id",
    component: lazy(() => import("./views/connection/editConnection")),
    exact: true
  }
]

export default MenuRoutes
