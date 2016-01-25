import m from "mithril"

import Malatium from "malatium"
import { initModule, defn } from "./utils/redux-ud"

import App from "./containers/app"
import { configureStore } from "./store"

initModule(module)
Malatium.init(m, configureStore())

const routes = {
  "$container": App,
  "/": {view:()=>m("p", "home")},
  "/post": {
    "$container": {view:(ctrl, props, children)=>m("strong", children)},
    "/": {view:()=>m("p", "post index")},
    "$default": {view:()=>m("p", "catch-all post container")}
  },
  "$default": {view:()=>m("p", "404: page not found")}
}

defn(() => Malatium.route(document.body, "/", routes, "hash"))()

