import m from "mithril"
import App from "./containers/app"

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

export default routes
