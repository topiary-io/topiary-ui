import m from "mithril"
import App from "./containers/app"

const routes = {
  "$container": App,
  "/admin": { // the app is only served at /admin/*
    "/": {view: ()=>m("p", "home")},
    "$default": {view:()=>m("p", "404: page not found")}
  }
}

export default routes
