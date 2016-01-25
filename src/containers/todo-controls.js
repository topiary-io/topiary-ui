import m from "mithril"
import { identity, connect } from "malatium" 
import { VisibilityFilters, setVisibilityFilter, addTodo } from "../actions"

// TODO : nav link vs "button" link?
import Link from "./filter-link"

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
          return m.component(Link, { active: (VisibilityFilters[key] === visibilityFilter), onclick }, FilterLabels[key])
        })
      )
    )
  }
}

export default connect(
  identity,
  { addTodo, setVisibilityFilter },
  { text: m.prop("") }
)(TodoControls)
