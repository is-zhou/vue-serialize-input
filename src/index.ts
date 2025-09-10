import type { App } from "vue"
import SerializeTextarea from "./components/SerializeTextarea.vue"

export { default as SerializeTextarea } from "./components/SerializeTextarea.vue"

export default {
    install(app: App) {
        app.component("SerializeTextarea", SerializeTextarea)
    }
}