import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import {resolve} from 'path'

export default defineConfig({
    resolve: {
        extensions: ['.ts', '.vue', '.json'],
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    plugins: [
        vue(),
        dts({
            entryRoot: './src',
            outDir: './dist/types',
            insertTypesEntry: true
        })
    ],
    optimizeDeps: {
        include: ['vue']
    },
    build: {
        assetsInlineLimit: 4096, // 4KB以下资源转base64
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'CommonLib',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['vue', 'ant-design-vue'],
            output: {
                preserveModules: true,
                entryFileNames: '[name].mjs',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith('.woff2')) {
                        return 'fonts/[name][extname]'
                    }
                    return 'assets/[name][extname]'
                },
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                additionalData: `@import "${resolve(__dirname, 'src/styles/variables.less')}";`,
                javascriptEnabled: true
            }
        }
    }
})
