import { Manager } from '@Main/Libs/Manager';
import { Resolve } from './index';

/**
 * 事件相关
 */
namespace TEvent {
    /**
     * 事件循环生成
     */
    export function Generate() {
        return function <T extends new (...args: Array<any>) => Manager>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.tEvent_Generate_IsFinish = true;
                    this.TEvent_Generate_ListenEvents();
                    this.TEvent_Generate_Hooks();
                    //@ts-ignore
                    if (this['tEvent_Create_IsFinish']) {
                        this.TEvent_Generate_CreatEvents();
                    }
                }

                public tEvent_Generate_IsFinish = false;

                public tEvent_Generate_OtherEvents = new Map<string, Function>();

                public TEvent_Generate_CreatEvents() {
                    //@ts-ignore
                    const create = (this['tEvent_Create_NeedCreate'] || []) as Array<string>;
                    for (let e of create) {
                        this.AddKey(e);
                    }
                }

                private TEvent_Generate_ListenEvents() {
                    Resolve.then(() => {
                        //@ts-ignore
                        const listen = (this['tEvent_Listen_NeedListen'] || []) as Array<{
                            listenTarget: Object | ((instance: Object) => Object);
                            eventName: string;
                            funcName: string;
                            once: boolean;
                        }>;
                        for (let e of listen) {
                            const t = typeof e.listenTarget === 'function' ? e.listenTarget(this) : e.listenTarget;
                            //@ts-ignore
                            t.AddListen(e.eventName, this, this[`${e.funcName}`], e.once);
                        }
                    });
                }

                private TEvent_Generate_Hooks() {}
            };
        };
    }

    /**
     * @author Together
     * @param events 创建的事件名称
     * @description 生成事件列表
     */
    export function Create(events: Array<string>) {
        return function <T extends new (...args: Array<any>) => Manager>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args);
                    this.tEvent_Create_NeedCreate = events;
                    this.tEvent_Create_IsFinish = true;
                    //@ts-ignore
                    if (this['tEvent_Generate_IsFinish']) {
                        //@ts-ignore
                        this['TEvent_Generate_CreatEvents']();
                    }
                }

                public tEvent_Create_IsFinish = false;

                public tEvent_Create_NeedCreate!: Array<string>;
            };
        };
    }

    /**
     * 监听事件
     */
    export function Listen<T>(es: Manager | ((instance: T) => Manager), eventName: string, once?: boolean) {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            //@ts-ignore
            if (target['tEvent_Listen_NeedListen']) {
                //@ts-ignore
                target['tEvent_Listen_NeedListen'].push({
                    listenTarget: es,
                    eventName,
                    funcName: propertyKey,
                    once: once || false
                });
            } else {
                //@ts-ignore
                target['tEvent_Listen_NeedListen'] = [{ listenTarget: es, eventName, funcName: propertyKey, once: once || false }];
            }
        };
    }
}

export { TEvent };
