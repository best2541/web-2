import { lazy } from "react"

const HomeRoutes = [
  // Home
  {
    path: "/home",
    component: lazy(() => import("@modules/home/views/Home.js")),
    exact: true
  }
]

export default HomeRoutes