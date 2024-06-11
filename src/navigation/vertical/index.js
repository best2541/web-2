// ** Navigation sections imports
// import dashboardsAnts from "./dashboards-ants"
import logout from "./logout"
import menus from "./menus"
import userAndManagement from './userandmanagement'
// ** Merge & Export
export default [
  ...menus,
  ...userAndManagement,
  ...logout
]
