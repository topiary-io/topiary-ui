import m from "mithril"
import Header from "./header-footer/header"
import SideBar from "./header-footer/side-bar"
import Footer from "./header-footer/footer"

class App {
  view (ctrl, props, children) {
    return m("#app",
        Header,
        SideBar,
        m("main", children),
        Footer
    )
  }
}

export default new App
