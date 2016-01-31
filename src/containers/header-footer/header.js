import m from "mithril"
import NavLink from "../nav-link"

class Header {
  view () {
    return m("header",
      m("a#admin-home",
        { href: "/admin", config: m.route },
        // TODO : link this text to config value
        "topiary"
      )  
    )
  }
}

export default new Header
