declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent
    export default component
}

declare module '*.less'
declare module '*.png'
declare module '*.woff2'
