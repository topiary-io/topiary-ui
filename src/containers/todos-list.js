import m from "mithril"
import { connect } from "malatium"
import { VisibilityFilters, addTodo, removeTodo, toggleTodo } from "../actions"

import Todo from "./todo"

class TodosList {
  view (ctrl, props, children) {
    const { todos, removeTodo, toggleTodo } = props
    return m("ul",
      todos.map(({ text, id, active }, idx) => {
        const onclickTodo = toggleTodo(id)
        const onclick = removeTodo(id)
        return m.component(Todo, { active, onclick, onclickTodo, key: id }, text)
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

export default connect(
  selectActiveTodos,
  { removeTodo, toggleTodo }
)(TodosList)
