import type { App } from 'vue'
import SerializeInput from './components/SerializeInput.vue'
import { useSerialize } from './composables/useSerialize'

// 插件安装方法
const install = (app: App): void => {
    app.component('SerializeInput', SerializeInput)
}

// 允许 app.use() 使用
export default {
    install
}
// 支持按需导入
export { SerializeInput, useSerialize }
