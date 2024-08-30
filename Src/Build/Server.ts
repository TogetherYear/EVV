import { join } from 'path';
import { spawn, ChildProcess } from 'child_process';
import { watch, rollup, RollupOptions, OutputOptions } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import esbuild from 'rollup-plugin-esbuild';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import { Builtins, WaitOn } from './Utils';
import electron from 'electron';

function ConfigFactory(env: string) {
    const options: RollupOptions = {
        input: join(__dirname, '../Main/main.ts'),
        output: {
            file: join(__dirname, `../../Dist/Main/main.js`),
            format: 'cjs',
            name: 'ElectronMainBundle',
            sourcemap: true
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            json(),
            typescript(),
            esbuild({ minify: true, target: 'node20' }),
            alias({
                entries: [
                    { find: '@Render', replacement: join(__dirname, '../Render') },
                    { find: '@Main', replacement: join(__dirname, '../Main') },
                    { find: '@Src', replacement: join(__dirname, '../') },
                    { find: '@Root', replacement: join(__dirname, '../../') }
                ]
            })
        ],
        external: [...Builtins(), 'electron', 'hmc-win32']
    };

    return options;
}

const boundEnv = process.argv.slice(-1)[0];
const opts = ConfigFactory(boundEnv);
const TAG = '[Server.ts]';

if (boundEnv === 'development') {
    WaitOn({ port: 6768 }).then((msg) => {
        const watcher = watch(opts);
        let child: ChildProcess;
        watcher.on('change', (filename) => {
            console.info(TAG, `change -- ${filename}`);
        });
        watcher.on('event', (ev) => {
            if (ev.code === 'END') {
                if (child) child.kill();
                child = spawn(electron as any, [join(__dirname, `../../Dist/Main/main.js`)], {
                    stdio: 'inherit',
                    env: Object.assign(process.env, { NODE_ENV: boundEnv })
                });
            } else if (ev.code === 'ERROR') {
                console.error(ev.error);
            }
        });
    });
} else {
    console.log(TAG, '主进程打包开始');
    rollup(opts)
        .then((build) => {
            console.log(TAG, '主进程打包完成');
            build.write(opts.output as OutputOptions);
        })
        .catch((error) => {
            console.log(TAG, '打包失败');
        });
}
