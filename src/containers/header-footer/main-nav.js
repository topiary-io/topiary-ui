import m from "mithril"
import NavLink from "../nav-link"

const navItems = {
  "/admin": "Home",
  "/admin/post": "Posts"
}

function navLinks (links) {
  return Object.keys(links).map((href, key) => {
    const text = links[href]
    return m.component(NavLink, { key, href }, text)
  })
}

class MainNav {
  view () {
    return m("nav", navLinks(navItems)) 
  }
}

export default new MainNav
