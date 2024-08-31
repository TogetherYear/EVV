import { builtinModules } from 'module';
import { get } from 'http';

/** 轮询监听 vite 启动 */
export function WaitOn() {
    return new Promise((resolve) => {
        const url = `http://localhost:6768`;
        let counter = 0;
        const timer: NodeJS.Timeout = setInterval(() => {
            get(url, (res) => {
                clearInterval(timer);
                console.log('Web Finish');
                resolve(res.statusCode);
            }).on('error', (err) => {
                console.log('Wait Web Start:', ++counter);
            });
        }, 1000);
    });
}

/** node.js builtins module */
export const Builtins = () => builtinModules.filter((x) => !/^_|^(internal|v8|node-inspect)\/|\//.test(x));
