import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import electron from 'vitejs-plugin-electron'

export default defineConfig({
    plugins: [
        vue(),
        electron()
    ],
    root: join(__dirname, 'src/render'),
    base: './',
    envDir: join(__dirname, 'env'),
    server: {
        port: 6768
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
        minify: 'esbuild',
        assetsDir: '', // 相对路径 加载问题
        sourcemap: false,
        target: 'esnext',
    },
    // optimizeDeps: {
    //     include: ['axios'],
    //     exclude: ['electron']
    // }
})
