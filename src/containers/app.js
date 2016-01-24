import m from "mithril"

import TodoControls from "./todo-controls"
import TodosList from "./todos-list"

// TodoApp
export default class TodoApp {
  view (ctrl, props, children) {
    return m("#app",
      TodoControls,
      TodosList
    )
  }
}
