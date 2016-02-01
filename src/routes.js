import m from "mithril"
import App from "./containers/app"
import SideBar from "./containers/side-bar"

const Login = {
  view:  () => m("p", "Login... (TODO)")
}

const routes = {
  "$container": App,
  "/admin/login": Login,
  "/admin": { // the app is only served at /admin/*
    "$container": SideBar,
    "/": {view: ()=>m("p", "home")},
    "$default": {view:()=>m("p", "404: page not found")}
  }
}

export default routes
