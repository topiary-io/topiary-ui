import m from "mithril"
import { connect } from "malatium"

class NavLink {
  controller({
    key,
    href
  }) {
    const active = href === m.route()
    if (active) {
      return {
        tag: "span",
        props: {
          key
        },
        decorator: "&middot;"
      }
    } else {
      return {
        tag: "a",
        props: {
          key,
          href,
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

export default new NavLink
