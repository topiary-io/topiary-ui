import m from "mithril"

import M from "./utils/malatium"
import { initModule, defn } from "./utils/redux-ud"

import App from "./containers/app"
import { configureStore } from "./store"

initModule(module)

defn(() => {
  return m.mount(
    document.body,
    M.init(m, configureStore(), App)
  )
})()

