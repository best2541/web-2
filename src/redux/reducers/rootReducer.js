// ** Redux Imports
import { combineReducers } from "redux"

// ** Reducers Imports
import main from "./main"
import auth from "./auth"
import navbar from "./navbar"
import layout from "./layout"
import template from "./template"
import updatePassword from "@modules/authentication/store/updatePassword/reducers"
import login from "@modules/authentication/store/login/reducers"

const rootReducer = combineReducers({
  main,
  auth,
  navbar,
  layout,
  template,

  // authentication
  updatePassword,
  login
})

export default rootReducer
