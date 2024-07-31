import { join } from 'path';
import { spawn, ChildProcess } from 'child_process';
import { watch, rollup, RollupOptions, OutputOptions } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import { Builtins, WaitOn } from './Utils';
import minimist from 'minimist';
import chalk from 'chalk';
import ora from 'ora';
import electron from 'electron';
import { main } from '../../package.json';

function ConfigFactory(env: string) {
    const options: RollupOptions = {
        input: join(__dirname, '../Main/main.ts'),
        output: {
            file: join(__dirname, `../../${main}`),
            format: 'cjs',
            name: 'ElectronMainBundle',
            sourcemap: true
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            json(),
            typescript(),
            alias({
                entries: [
                    { find: '@Render', replacement: join(__dirname, '../Render') },
                    { find: '@Main', replacement: join(__dirname, '../Main') },
                    { find: '@Src', replacement: join(__dirname, '../') },
                    { find: '@Root', replacement: join(__dirname, '../../') }
                ]
            })
        ],
        external: [...Builtins(), 'electron', 'node-screenshots', 'rubick-native', '@napi-rs/image']
    };

    return options;
}

//运行参数
const argv = minimist(process.argv.slice(2));
const opts = ConfigFactory(argv.env);
const TAG = '[Server.ts]';
const spinner = ora(`${TAG} Electron build...`);

if (argv.watch) {
    WaitOn({ port: 6768 }).then((msg) => {
        const watcher = watch(opts);
        let child: ChildProcess;
        watcher.on('change', (filename) => {
            const log = chalk.green(`change -- ${filename}`);
            console.log(TAG, log);
        });
        watcher.on('event', (ev) => {
            if (ev.code === 'END') {
                if (child) child.kill();
                child = spawn(electron as any, [join(__dirname, `../../${main}`)], {
                    stdio: 'inherit',
                    env: Object.assign(process.env, { NODE_ENV: argv.env })
                });
            } else if (ev.code === 'ERROR') {
                console.log(ev.error);
            }
        });
    });
} else {
    spinner.start();
    rollup(opts)
        .then((build) => {
            spinner.stop();
            console.log(TAG, chalk.green('Electron build successed.'));
            build.write(opts.output as OutputOptions);
        })
        .catch((error) => {
            spinner.stop();
            console.log(`\n${TAG} ${chalk.red('构建报错')}\n`, error, '\n');
        });
}
