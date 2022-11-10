import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import electron from 'vitejs-plugin-electron'

const root = join(__dirname, 'src/render')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        reactivityTransform: true
      }
    }),
    electron()
  ],
  root,
  base: './', // index.html 中静态资源加载位置
  envDir: join(__dirname, 'env'),
  server: {
    port: 6768 // 开发环境的启动端口
  },
  resolve: {
    alias: {
      '@render': join(__dirname, 'src/render'),
      '@main': join(__dirname, 'src/main'),
      '@libs': join(__dirname, 'src/libs'),
      '@decorators': join(__dirname, 'src/decorators'),
      '@src': join(__dirname, 'src'),
      '@root': __dirname
    }
  },
  build: {
    outDir: join(__dirname, 'dist/render'),
    emptyOutDir: true,
    // minify: false,
    // commonjsOptions: {},
    assetsDir: '', // 相对路径 加载问题
    sourcemap: false,
    rollupOptions: {
      output: {
        format: 'cjs'
      },
      external: ['electron']
    }
  },
  optimizeDeps: {
    exclude: ['electron']
  }
})
