import m from "mithril"

import Malatium from "./utils/malatium"
import { initModule, defn } from "./utils/redux-ud"

import App from "./containers/app"
import { configureStore } from "./store"

initModule(module)
Malatium.init(m, configureStore())

const routes = {
  "/": App,
  "/a": {
    "$container": App,
    "/b": App,
    "/c": {
      "$container": {view: (_,__,children) => m("div", "foo", children)},
      "/d": App,
      "$default": {view: () => m("strong", "bar")}
    }
  },
  "$default": {view:() => m("div", "uh oh, route not found")}
}

defn(() => Malatium.route(document.body, "/", routes, "hash"))()

