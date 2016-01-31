import m from "mithril"
import { connect } from "malatium"
import { changeLocation } from "../actions"

class NavLink {
  controller({
    key,
    href,
    location,
    changeLocation
  }) {
    const active = href === location
    if (active) {
      return {
        tag: "span",
        props: {
          key
        },
        decorator: "&middot;"
      }
    } else {
      const onclick = changeLocation(href) 

      return {
        tag: "a",
        props: {
          key,
          href,
          onclick,
          config: m.route
        },
        decorator: ""
      }
    }
  }
  view ({ tag, props, decorator }, _, children) {
    return m(tag, props, m.trust(decorator + children))
  }
}

export default connect(
  ({ location }) => ({location}),
  { changeLocation }
)(NavLink)
