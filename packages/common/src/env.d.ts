/// <reference types="vite/client" />

// 使用模块增强扩展类型
declare module 'vite' {
    interface ImportMeta {
        readonly glob: (pattern: string) => Record<string, () => Promise<any>>
    }
}
