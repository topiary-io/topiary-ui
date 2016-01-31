import m from "mithril"

import TodoControls from "./todo-controls"
import TodosList from "./todos-list"
import MainNav from "./main-nav"

class TodoApp {
  view (ctrl, props, children) {
    return m("#app",
      MainNav,
      TodoControls,
      TodosList,
      children
    )
  }
}

export default new TodoApp
