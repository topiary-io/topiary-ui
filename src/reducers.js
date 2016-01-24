import { combineReducers } from "redux"
import { VisibilityFilters, SET_VISIBILITY_FILTER, ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from "./actions"

/* TODOS have form:
 *  {
 *    id: <Number>,
 *    text: <String>,
 *    active: <Boolean>
 *  }
 */

export function visibilityFilter (state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER: return action.filter
  }
  return state
}

let index = 0

export function todos (state = [], action) {
  console.log(action)
  switch (action.type) {
    case ADD_TODO: 
      if (!action.text) return state
      return [...state, { id: index++, text: action.text, active: true }]
    case REMOVE_TODO:
      return state.reduce((out, val, idx) => {
        if (val.id !== action.id) return [...out, val] 
        return out
      }, [])
    case TOGGLE_TODO:
      return state.reduce((out, val, idx) => {
        if (val.id !== action.id) return [...out, val] 
        return [...out, {...val, active: !val.active}] 
      }, [])
  }
  return state
}
