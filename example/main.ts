import { createApp } from 'vue'
import App from './App.vue'
// 因为我们是本地调试组件库，直接从 src 引入
import VueSerializeInput from '../src/index'
const app = createApp(App)
app.use(VueSerializeInput)
app.mount('#app')
