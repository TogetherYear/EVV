import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [
            vue({
                script: {
                    defineModel: true
                }
            })
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
                '@Libs': join(__dirname, 'Src/Libs'),
                '@Decorators': join(__dirname, 'Src/Decorators'),
                '@Src': join(__dirname, 'Src'),
                '@Root': __dirname
            }
        },
        esbuild: {
            drop: command === 'serve' ? [] : ['console', 'debugger']
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
