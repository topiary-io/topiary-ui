
export const ADD_TODO = "ADD_TODO"
export const REMOVE_TODO = "REMOVE_TODO"
export const TOGGLE_TODO = "TOGGLE_TODO"
export const CHANGE_LOCATION = "CHANGE_LOCATION"
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_ACTIVE: "SHOW_ACTIVE",
  SHOW_COMPLETED: "SHOW_COMPLETED"
}

export function changeLocation(loc) {
  return {
    type: CHANGE_LOCATION,
    location: loc
  }
}

export function addTodo (text) {
  return {
    type: ADD_TODO,
    text
  }
}

export function removeTodo (id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

export function toggleTodo (id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

export function setVisibilityFilter (filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}
