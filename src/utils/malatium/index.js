// Malatium
class Provider {
  init (m, store, Component) {
    if (!m || !store || !store.getState) throw new Error("Mithril and Redux store are required")
    this.m = m
    this.store = store
    if (!Component) return lazyInit
    return lazyInit(Component)
  }
}

const Malatium = new Provider

// helper functions
export function isArray (arr) {
  return Object.prototype.toString.call(arr) === "[object Array]"
}

export function isFunction (fn) {
  return typeof fn === "function"
}

export function isObject (obj) {
  return obj === Object(obj)
}

export function isComponent (component) {
  return isObject(component) && isFunction(component.view) 
}

export function nestComponents (...components) {
  return components.reduce((out, component, idx) => {
    if (out === false) return Malatium.m.component(component)
    return Malatium.m.component(component, {}, out)
  }, false)
}

export const identity = x => x 

export const lazyInit = function (Component) {
  return typeof Component === "function" ? new Component() : Component
}

function bindActions (actions, dispatch) {
  if (typeof actions === "function") return actions(dispatch)
  if (typeof actions === "object") return Object.keys(actions).reduce(function (out, key, index) {
    if (typeof actions[key] === "function")
      out[key] = (...factoryArgs) => (...args) => {
        return dispatch(actions[key](...factoryArgs, ...args))
      }
    else if (typeof actions[key] === "object")
      out[key] = actions[key]
    return out
  }, {})
  return {}
}

function wrapView (comp, actionMap) {
  const originalView = comp.view
  comp.view = (ctrl, ...args) => {
    let nc = {...ctrl, ...actionMap}
    return originalView(nc, ...args)
  }
}

// connect
export const connect = (selector, actions, mergeProps) => (Component) => ({
  view (controller, props, children) {
    const { dispatch, getState } = Malatium.store 
    const state = selector(getState())
    const component = lazyInit(Component) 

    let actionMap = bindActions(actions, dispatch)
    wrapView(component, actionMap)

    return Malatium.m.component(component, { dispatch, ...state, ...actionMap, ...mergeProps }, children)
  }
})

// redraw middleware
export const redrawMiddleware = (store) => (next) => (action) => {
  next(action)
  if (action.redraw && Malatium.m && Malatium.m.redraw) {
    Malatium.m.redraw()
  }
}

// routing
const special = ["$container", "$alias", "$default"]
const trimRightSlash = (str) => str.replace(/\/$/, "")

export function flattenRoutes (routes, obj = {}, prefix = "", ...parents) {
  if (isFunction(routes)) routes = routes()

  if (isComponent(routes)) {
    obj[trimRightSlash(prefix)] = nestComponents(routes, ...parents)
    return routes 
  }

  if (!isObject(routes)) throw new Error("routes needs to be an object, or function that returns an object")

  if (routes.hasOwnProperty("$container")) {
    const $container = isFunction(routes.$container) ? routes.$container() : routes.$container
    parents = [$container, ...parents]
  }

  Object.keys(routes).forEach((key, idx) => {
    if (special.indexOf(key) > -1) return
    let value = routes[key]

    if (isFunction(value)) return value = value()
    if (isArray(value)) throw new Error("not set up to handle arrays")
    if (isComponent(value)) return (obj[trimRightSlash(prefix + key)] = nestComponents(value, ...parents))
    if (isObject(value)) return flattenRoutes(value, obj, prefix + key, ...parents)
    throw new Error("type not handled")
  })

  if (routes.hasOwnProperty("$default")) flattenRoutes(routes.$default, obj, prefix + "/:stub...", ...parents)

  return obj
}

Malatium.route = (DOMElement, defaultRoute, routes, mode) => {
  if (mode) Malatium.m.route.mode = mode
  return Malatium.m.route(DOMElement, defaultRoute, flattenRoutes(routes))
}

export default Malatium
