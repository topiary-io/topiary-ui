
import m from "mithril"
import { identity, connect } from "./utils/malatium"
import { VisibilityFilters, setVisibilityFilter, addTodo, removeTodo, toggleTodo } from "./actions"

class FilterLink {
  view (ctrl, props, children) {
    const { active, onclick } = props
    if (active)
      return m("span", children)
    return m("a", { href: "#", onclick }, children)
  }
}
const filterLink = new FilterLink

const FilterLabels = {}
FilterLabels[VisibilityFilters.SHOW_ALL] = "Show all"
FilterLabels[VisibilityFilters.SHOW_ACTIVE] = "Show active"
FilterLabels[VisibilityFilters.SHOW_COMPLETED] = "Show completed"

class TodoControls {
  controller (props) {
    const { addTodo, text } = props
    return {
      ...props,
      onclick: () => {
        addTodo(text())()
        text("")
      }
    }
  }
  view (ctrl, props, children) {
    const { onclick, text } = ctrl
    const { visibilityFilter, setVisibilityFilter } = props

    // connect breaks attributes?
    return m(".add-todo",
      m("input", { oninput: m.withAttr("value", text), value: text() }),
      m("button", { onclick }, "Add todo"),
      m("div",
        m("strong", "Filter: "),
        Object.keys(VisibilityFilters).map((key, idx) => {
          const onclick = setVisibilityFilter(VisibilityFilters[key])
          return m.component(filterLink, { active: (VisibilityFilters[key] === visibilityFilter), onclick }, FilterLabels[key])
        })
      )
    )
  }
}

const todoControls = connect(identity, { addTodo, setVisibilityFilter }, { text: m.prop("") })(TodoControls)

// Todos List
class Todo {
  view (ctrl, props, children) {
    const { active, onclickTodo, onclick, key } = props
    const style = "text-decoration:" + (active ? "none" : "line-through") 
    return m("li", { key, onclick: onclickTodo, style },
        children,
        m("button", { onclick }, "X"))
  }
}
const todoView = new Todo

class TodosList {
  view (ctrl, props, children) {
    const { todos, removeTodo, toggleTodo } = props
    return m("ul",
      todos.map(({ text, id, active }, idx) => {
        const onclickTodo = toggleTodo(id)
        const onclick = removeTodo(id)
        return m.component(todoView, { active, onclick, onclickTodo, key: id }, text)
      })
    )
  }
}
const selectActiveTodos = state => {
  const { visibilityFilter, todos } = state
  if (visibilityFilter === VisibilityFilters.SHOW_ALL) return state
  const want = !(visibilityFilter ===  VisibilityFilters.SHOW_COMPLETED)
  return {
    ...state, 
    todos: todos.reduce((out, todo, idx) => {
      if (todo.active === want) return [...out, todo] 
      return out
    }, [])
  }
}
const todosList = connect(selectActiveTodos, { removeTodo, toggleTodo })(TodosList)

// TodoApp
export default class TodoApp {
  view (ctrl, props, children) {
    return m("#app",
      todoControls,
      todosList
    )
  }
}
