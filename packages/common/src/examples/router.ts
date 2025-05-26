import { RouteRecordRaw } from 'vue-router'

// 显式导入示例组件
const modules = import.meta.glob('./**/*.vue');

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('./Home.vue'),
    },
    ...Object.entries(modules).map(([path, component]) => {
        const name = path.match(/\/([^\/]+)\.vue$/)?.[1] || 'unknown'

        // 创建路由
        return {
            path: `/${name.toLowerCase()}`,
            name: name.replace('Demo', ''),
            component: component
        }
    }).filter(route => route)
]

export default routes
