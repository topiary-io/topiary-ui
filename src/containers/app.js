import m from "mithril"

import TodoControls from "./todo-controls"
import TodosList from "./todos-list"

class TodoApp {
  view (ctrl, props, children) {
    return m("#app",
      TodoControls,
      TodosList,
      children
    )
  }
}

export default new TodoApp
