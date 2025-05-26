import { UserConfigExport } from 'vite'

export const basePreset: UserConfigExport = {
    css: {
        modules: {
            localsConvention: 'camelCase'
        }
    },
    server: {
        port: 3000,
        open: false
    }
}
