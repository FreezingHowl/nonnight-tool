// 导出组件
export * from './components/Button'

// 导出工具方法
export * from './utils/index'

// 导出样式
import './styles/global.css'
import './styles/variables.less'
import './assets/fonts/iconfont.css'

// 导出静态资源路径
export const ASSETS_PATH = {
    IMAGES: '/assets/images',
    FONTS: '/assets/fonts'
} as const
