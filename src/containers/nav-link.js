import m from "mithril"
import { connect } from "malatium"

// TODO : link up to redux global state

class NavLink {
  view (ctrl, { href }, children) {
    return m("a", { href, config: m.route }, children)
  }
}

export default new NavLink
