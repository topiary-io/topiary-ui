import m from "mithril"

class Link {
  view (ctrl, props, children) {
    const { active, onclick } = props
    if (active)
      return m("span", children)
    return m("a", { href: "#", onclick }, children)
  }
}

export default new Link
