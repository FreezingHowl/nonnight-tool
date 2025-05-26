/// <reference types="vite/client" />

// 确保包含以下扩展声明
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
