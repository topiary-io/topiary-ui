export const identity = x => x 

function lazyInit(Component) {
  return typeof Component === "function" ? new Component() : Component
}

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
export default Malatium

// connect helpers
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
