import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './examples/Home.vue'
import routes from './examples/router'
import Antd from 'ant-design-vue'

// 导入Ant Design全局样式
import './assets/fonts/iconfont.css'
import './styles/antd.less' // 自定义样式
import 'ant-design-vue/dist/reset.css' // 使用新版样式（v4）

// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 创建Vue实例
const app = createApp(Home)
app.use(router)
app.use(Antd)
app.mount('#app')
