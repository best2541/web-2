import { lazy } from "react"

const MenuRoutes = [
  {
    path: "/gateway",
    component: lazy(() => import("./views/gateway")),
    exact: true
  },
  {
    path: "/gateway/add",
    component: lazy(() => import("./views/gateway/addGateway")),
    exact: true
  },
  {
    path: "/gateway/edit/:id",
    component: lazy(() => import("./views/gateway/editGateway")),
    exact: true
  }
]

export default MenuRoutes
