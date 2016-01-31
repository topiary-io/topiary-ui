import m from "mithril"
import { connect } from "malatium"
import { changeLocation } from "../actions"

class NavLink {
  controller({
    href,
    location,
    changeLocation
  }) {
    const onclick = changeLocation(href) 
    const active = href === location
    return active ?
      {
        tag: "span",
        props: {},
        active
      } :
      {
        tag: "a",
        props: {
          onclick,
          href,
          config: m.route,
          active
        }
      }
  }
  view ({ tag, props, active }, _, children) {
    children = active ? "&middot; " + children : children
    return m(tag, props, m.trust(children))
  }
}

export default connect(
  ({ location }) => ({location}),
  { changeLocation }
)(NavLink)
