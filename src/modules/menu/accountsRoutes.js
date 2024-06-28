import { lazy } from "react"

const MenuRoutes = [
  {
    path: "/accounts",
    component: lazy(() => import("./views/accounts")),
    exact: true
  },
  {
    path: "/accounts/new",
    component: lazy(() => import("./views/accounts/accountsNew.js")),
    exact: true
  },
  {
    path: "/accounts/Edit/:id",
    component: lazy(() => import('./views/accounts/accountsEdit.js'))
  },
  {
    path: "/accounts/user/add/:id",
    component: lazy(() => import('./views/accounts/user/addUser.js'))
  },
  {
    path: "/accounts/user/edit/:id/:subId",
    component: lazy(() => import('./views/accounts/user/editUser.js'))
  }
]

export default MenuRoutes
