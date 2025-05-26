import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

// 公共图标与样式
import '@common/assets/fonts/iconfont.css'
import '@common/styles/global.css'
import '@common/styles/variables.less'

const app = createApp(App)

// 注册 Pinia
const pinia = createPinia()
app.use(pinia)

// 注册路由
app.use(router)

app.mount('#app')
