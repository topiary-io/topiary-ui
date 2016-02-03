import m from "mithril"
import { connect } from "malatium"

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
  return items.map((link, key) => {
    const href = link.uri
    return m.component(navLink, { href, key }, link.text)
  })
}

class SideBar {
  view (ctrl, { sideBar }, children) {
    return m("nav",
      // break menu out into own component, sidebar retains being the
      // "connect" component / optionally: connect 
      // sidebarlayout instead 
      sideBar.map((group, key) =>
        [ m("h2", { key }, group.name),
          m("ul", navItems(group.options))]))  
  }
}

// where should logic to determine which elements display live?
const initial = [{"name":"Content","options":[{"text":"Posts","uri":"/admin/content/posts"},{"text":"Pages","uri":"/admin/content/pages"},{"text":"Media","uri":"/admin/static/media"}]},{"name":"Theme","options":[{"text":"Layouts","uri":"/admin/layouts"},{"text":"Assets","uri":"/admin/static"},{"text":"Data","uri":"/admin/data"}]},{"name":"Theme","options":[{"text":"Configuration","uri":"/admin/edit/config.toml"},{"text":"Archetypes","uri":"/admin/archetypes"},{"text":"Users","uri":"/admin/users"}]},{"name":"Test","options":[{"text":"Loader","uri":"/admin/loader"}]}]

export default connect(
  ({ sideBar }) => ({ sideBar: initial })
)(SideBar)
