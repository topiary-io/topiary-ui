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
        props: {}
      } :
      {
        tag: "a",
        props: {
          onclick,
          href,
          config: m.route
        }
      }
  }
  view ({ tag, props }, _, children) {
    return m(tag, props, children)
  }
}

export default connect(
  ({ location }) => ({location}),
  { changeLocation }
)(NavLink)
