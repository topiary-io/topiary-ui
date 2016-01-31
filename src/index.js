import m from "mithril"
import Malatium from "malatium"

window.m = m

// hot module reloading
import { initModule, defn } from "./utils/redux-ud"

// our redux store and routes
import { configureStore } from "./store"
import routes from "./routes"

initModule(module)

defn(() => 
  Malatium
    .init(m, configureStore())
    .route(document.body, "/", routes, "hash")
)()

