import m from "mithril"

import MainNav from "./header-footer/main-nav"

class App {
  view (ctrl, props, children) {
    return m("#app",
      MainNav,
      children
    )
  }
}

export default new App
