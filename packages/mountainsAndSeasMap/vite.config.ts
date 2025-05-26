import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import cleaner from 'rollup-plugin-cleaner'
export default defineConfig({
  plugins: [
    vue(),
    cleaner({
      targets: [
        './node_modules/@nonNightTool/common/node_modules/'
      ]
    })
  ],
  server: {
    watch: {
      ignored: ['!../../packages/common/**']
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@nonNightTool/common': process.env.NODE_ENV === 'development' ? resolve(__dirname, '../common/src') : '@nonNightTool/common',
      '@common': resolve(__dirname, '../common/src'),
    }
  },
  build: {
    assetsDir: 'assets', // 静态资源输出目录
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]' // 控制资源文件名
      }
    }
  }
})
