import m from "mithril"

class Todo {
  view (ctrl, props, children) {
    const { active, onclickTodo, onclick, key } = props
    const style = "text-decoration:" + (active ? "none" : "line-through") 
    return m("li", { key, onclick: onclickTodo, style },
        children,
        m("button", { onclick }, "X"))
  }
}

export default new Todo
