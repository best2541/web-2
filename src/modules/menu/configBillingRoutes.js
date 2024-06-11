import { lazy } from "react"

const MenuRoutes = [
  {
    path: "/configbilling",
    component: lazy(() => import("./views/configBilling")),
    exact: true
  },
  {
    path: "/configbilling/add",
    component: lazy(() => import("./views/configBilling/addBilling")),
    exact: true
  },
  {
    path: "/configbilling/edit/:id",
    component: lazy(() => import("./views/configBilling/editBilling")),
    exact: true
  }
]

export default MenuRoutes
