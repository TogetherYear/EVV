import { Entity } from '@Main/Libs/Entity';
import { Time } from '@Src/Utils/Time';
import { Resolve } from '.';

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

                private tTool_Generate_Interval: Array<number> = [];

                private TTool_Generate_Hooks() {
                    this.TTool_Generate_Debounce();
                    this.TTool_Generate_Throttle();
                    this.TTool_Generate_Retry();
                    this.TTool_Generate_Interval();
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

                private TTool_Generate_Retry() {
                    //@ts-ignore
                    const retry = (this['tTool_Retry_Need'] || []) as Array<{
                        retryCount: number | ((instance: Object) => number);
                        retryDelay: number | ((instance: Object) => number);
                        PassRetryCondition: (instance: Object, data: Record<string, unknown>) => boolean;
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
                                    if (i === count - 1 || r.PassRetryCondition(this, result.data)) {
                                        result.type === 'Success' ? resolve(result.data) : reject(result.data);
                                        break;
                                    }
                                    if (result.type === 'Success' && r.PassRetryCondition(this, result.data)) {
                                        resolve(result.data);
                                        break;
                                    }
                                    await Time.Sleep(typeof r.retryDelay === 'function' ? r.retryDelay(this) : r.retryDelay);
                                }
                            });
                        };
                    }
                }

                private TTool_Generate_Interval() {
                    Resolve.then(() => {
                        //@ts-ignore
                        const interval = (this['tTool_Interval_Need'] || []) as Array<{
                            propertyKey: string;
                            condition: boolean | ((instance: Object) => boolean);
                            time: number | ((instance: Object) => number);
                        }>;

                        for (let i of interval) {
                            //@ts-ignore
                            const original = this[`${i.propertyKey}`].bind(this);

                            const timer = setInterval(
                                () => {
                                    if (typeof i.condition === 'function' ? i.condition(this) : i.condition) {
                                        original();
                                    }
                                },
                                typeof i.time === 'function' ? i.time(this) : i.time
                            );

                            //@ts-ignore
                            this.tTool_Generate_Interval.push(timer);

                            //@ts-ignore
                            this[`${i.propertyKey}`] = function (...args: Array<unknown>) {
                                original(...args);
                            };
                        }
                    });
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
        PassRetryCondition: (instance: T, data: Record<string, unknown> | undefined | any) => boolean
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

    /**
     * 自动间隔时间重复执行 Manager 在构造函数完成的下一次事件循环执行 Component 在 onMounted 后的下一次事件循环执行
     * condition 是否执行的条件 time 每次执行间隔
     */
    export function Interval<T extends Entity>(condition: boolean | ((instance: T) => boolean), time: number | ((instance: T) => number)) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tTool_Interval_Need']) {
                //@ts-ignore
                target['tTool_Interval_Need'].push({ propertyKey, condition, time });
            } else {
                //@ts-ignore
                target['tTool_Interval_Need'] = [{ propertyKey, condition, time }];
            }
        };
    }
}
export { TTool };
