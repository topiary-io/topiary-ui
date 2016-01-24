import m from "mithril"

import M from "./utils/malatium"
import { initModule, defn } from "./utils/redux-ud"

import App from "./app"
import { configureStore } from "./store"

initModule(module)
const Provider = M.init(m, configureStore())

defn(() => {
  return m.mount(
    document.body,
    Provider(App)
  )
})()

