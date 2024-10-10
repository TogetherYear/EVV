import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [
            vue({
                script: {
                    defineModel: true
                }
            }),
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            }),
            ElementPlus({})
        ],
        root: join(__dirname, 'Src/Render'),
        base: './',
        envDir: join(__dirname, 'Env'),
        server: {
            port: 6768
        },
        publicDir: 'Public',
        resolve: {
            alias: {
                '@Render': join(__dirname, 'Src/Render'),
                '@Main': join(__dirname, 'Src/Main'),
                '@Src': join(__dirname, 'Src'),
                '@Root': __dirname
            }
        },
        esbuild: {
            drop: command === 'serve' ? [] : ['console', 'debugger']
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler'
                }
            }
        },
        build: {
            outDir: join(__dirname, 'Dist/Render'),
            emptyOutDir: true,
            minify: 'esbuild',
            assetsDir: 'Source',
            sourcemap: false,
            target: 'esnext',
            rollupOptions: {
                output: {
                    manualChunks: (id: string) => {
                        if (id.includes('node_modules')) {
                            return 'Vendor';
                        }
                    }
                }
            }
        },
        optimizeDeps: {
            include: [],
            exclude: ['electron']
        }
    };
});
