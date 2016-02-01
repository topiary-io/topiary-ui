import m from "mithril"

class NavLink {
  controller({ href }) {
    return {
      active: href === m.route(),
      config: m.route
    }
  }

  view({ active, config }, { href, key }, children) {
    return active ?
      m("li", { key },
        m("span", children)
      ) :
      m("li", { key }, 
        m("a", { href, config }, children)
      )
  }
}
const navLink = new NavLink

function navItems (items) {
  return Object.keys(items).map((href, key) =>
    m.component(navLink, { href, key }, items[href])
  )
}

const contentItems = {
  "/admin/content/posts" : "Posts",
  "/admin/content/pages" : "Pages",
  "/admin/static/media" : "Media"
}

const themeItems = {
  "/admin/layouts" : "Layouts",
  "/admin/static" : "Assets",
  "/admin/data" : "Data"
}

const settingsItems = {
  "/admin/edit/config.toml" : "Configuration",
  "/admin/archetypes" : "Archetypes",
  "/admin/users" : "Users"
}

class SideBar {
  view (ctrl, props, children) {
    return m("div",
        m("nav",
          m("h2", "Content"),
            m("ul", navItems(contentItems)
          ),
          m("h2", "Theme"),
            m("ul", navItems(themeItems)
          ),
          m("h2", "Settings"),
            m("ul", navItems(settingsItems)
          )
        ),
        m("main", children)
      )
  }
}

export default new SideBar 
