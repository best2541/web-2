import { lazy } from "react"

const MenuRoutes = [
  {
    path: "/ftpconfig",
    component: lazy(() => import("./views/ftpConfig")),
    exact: true
  },
  {
    path: "/ftpconfig/add",
    component: lazy(() => import("./views/ftpConfig/addFTPConfig")),
    exact: true
  }
]

export default MenuRoutes
