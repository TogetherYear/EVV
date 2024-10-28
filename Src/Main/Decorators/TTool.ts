import { Entity } from '@Main/Libs/Entity';
import { Time } from '@Src/Utils/Time';

namespace TTool {
    /**
     * 防抖列表
     */
    const debounceMap = new Map<string, number>();

    /**
     * 节流列表
     */
    const throttleMap = new Map<string, number>();

    /**
     * 工具生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => Entity>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.TTool_Generate_Hooks();
                }

                private TTool_Generate_Hooks() {
                    this.TTool_Generate_Debounce();
                    this.TTool_Generate_Throttle();
                    this.TTool_Generaye_Retry();
                }

                private TTool_Generate_Debounce() {
                    //@ts-ignore
                    const create = (this['tTool_Debounce_NeedCreate'] || []) as Array<{
                        funcName: string;
                        delta: number | ((instance: Object) => number);
                    }>;
                    for (let e of create) {
                        //@ts-ignore
                        const original = this[`${e.funcName}`].bind(this);
                        //@ts-ignore
                        this[`${e.funcName}`] = function (...args: Array<unknown>) {
                            //@ts-ignore
                            const key = `${this.unique_Id}:${e.funcName}`;
                            let timer = debounceMap.get(key);
                            if (timer) {
                                clearTimeout(timer);
                                //@ts-ignore
                                timer = setTimeout(
                                    () => {
                                        original(...args);
                                        debounceMap.delete(key);
                                    },
                                    typeof e.delta === 'function' ? e.delta(this) : e.delta
                                );
                            } else {
                                //@ts-ignore
                                timer = setTimeout(
                                    () => {
                                        original(...args);
                                        debounceMap.delete(key);
                                    },
                                    typeof e.delta === 'function' ? e.delta(this) : e.delta
                                );
                            }
                            //@ts-ignore
                            debounceMap.set(key, timer);
                        };
                    }
                }

                private TTool_Generate_Throttle() {
                    //@ts-ignore
                    const create = (this['tTool_Throttle_NeedCreate'] || []) as Array<{
                        funcName: string;
                        delta: number | ((instance: Object) => number);
                    }>;
                    for (let e of create) {
                        //@ts-ignore
                        const original = this[`${e.funcName}`].bind(this);
                        //@ts-ignore
                        this[`${e.funcName}`] = function (...args: Array<unknown>) {
                            //@ts-ignore
                            const key = `${this.unique_Id}:${e.funcName}`;
                            let lastTime = throttleMap.get(key);
                            if (lastTime) {
                                const currentTime = Date.now();
                                if (currentTime - lastTime > (typeof e.delta === 'function' ? e.delta(this) : e.delta)) {
                                    lastTime = currentTime;
                                    original(...args);
                                }
                            } else {
                                lastTime = Date.now();
                                original(...args);
                            }
                            throttleMap.set(key, lastTime);
                        };
                    }
                }

                private TTool_Generaye_Retry() {
                    //@ts-ignore
                    const retry = (this['tTool_Retry_Need'] || []) as Array<{
                        retryCount: number | ((instance: Object) => number);
                        retryDelay: number | ((instance: Object) => number);
                        PassRetryCondition: (data: Record<string, unknown>) => boolean;
                        propertyKey: string;
                    }>;

                    for (let r of retry) {
                        //@ts-ignore
                        const original: (...args: Array<unknown>) => Promise<Record<string, unknown>> = this[`${r.propertyKey}`].bind(this);
                        const temp = (...args: Array<unknown>): Promise<{ type: 'Success' | 'Error'; data: Record<string, unknown> }> => {
                            return new Promise((resolve, reject) => {
                                original(...args)
                                    .then((res) => {
                                        resolve({ type: 'Success', data: res });
                                    })
                                    .catch((err) => {
                                        resolve({ type: 'Error', data: err });
                                    });
                            });
                        };

                        //@ts-ignore
                        this[`${r.propertyKey}`] = function (...args: Array<unknown>) {
                            return new Promise(async (resolve, reject) => {
                                const count = typeof r.retryCount === 'function' ? r.retryCount(this) : r.retryCount;
                                for (let i = 0; i < count; ++i) {
                                    const result = await temp(...args);
                                    if (i === count - 1) {
                                        result.type === 'Success' ? resolve(result.data) : reject(result.data);
                                        break;
                                    }
                                    if (result.type === 'Success' && r.PassRetryCondition(result.data)) {
                                        resolve(result.data);
                                        break;
                                    }
                                    await Time.Sleep(typeof r.retryDelay === 'function' ? r.retryDelay(this) : r.retryDelay);
                                }
                            });
                        };
                    }
                }
            };
        };
    }

    /**
     * 防抖 默认 500 毫秒
     */
    export function Debounce<T extends Entity>(delta: number | ((instance: T) => number) = 500) {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tTool_Debounce_NeedCreate']) {
                //@ts-ignore
                target['tTool_Debounce_NeedCreate'].push({
                    funcName: propertyKey,
                    delta
                });
            } else {
                //@ts-ignore
                target['tTool_Debounce_NeedCreate'] = [
                    {
                        funcName: propertyKey,
                        delta
                    }
                ];
            }
        };
    }

    /**
     * 节流 默认 500 毫秒
     */
    export function Throttle<T extends Entity>(delta: number | ((instance: T) => number) = 500) {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tTool_Throttle_NeedCreate']) {
                //@ts-ignore
                target['tTool_Throttle_NeedCreate'].push({
                    funcName: propertyKey,
                    delta
                });
            } else {
                //@ts-ignore
                target['tTool_Throttle_NeedCreate'] = [
                    {
                        funcName: propertyKey,
                        delta
                    }
                ];
            }
        };
    }

    /**
     * 重复执行函数 必须是返回 Promise 的函数签名
     */
    export function Retry<T extends Entity>(
        retryCount: number | ((instance: T) => number),
        retryDelay: number | ((instance: T) => number),
        PassRetryCondition: (data: Record<string, unknown> | undefined | any) => boolean
    ) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tTool_Retry_Need']) {
                //@ts-ignore
                target['tTool_Retry_Need'].push({ retryCount, retryDelay, PassRetryCondition, propertyKey });
            } else {
                //@ts-ignore
                target['tTool_Retry_Need'] = [{ retryCount, retryDelay, PassRetryCondition, propertyKey }];
            }
        };
    }
}
export { TTool };
