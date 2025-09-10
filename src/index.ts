import type { App } from 'vue'
import SerializeTextarea from './components/SerializeTextarea.vue'

// 插件安装方法
const install = (app: App): void => {
    app.component('SerializeTextarea', SerializeTextarea)
}

// 允许 app.use() 使用
export default {
    install
}

// 支持按需导入
export { SerializeTextarea }
