namespace I {
    const debounceMap = new Map<string, NodeJS.Timeout>();

    const throttleMap = new Map<string, number>();

    /**
     * 防抖 默认 500 毫秒
     */
    export function Debounce(delta = 500) {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            const original = descriptor.value.bind(target);
            descriptor.value = (...args: Array<unknown>) => {
                const key = `${target.constructor.name}:${propertyKey}`;
                let timer = debounceMap.get(key);
                if (timer) {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        original(...args);
                        debounceMap.delete(key);
                    }, delta);
                } else {
                    timer = setTimeout(() => {
                        original(...args);
                        debounceMap.delete(key);
                    }, delta);
                }
                debounceMap.set(key, timer);
            };
        };
    }

    /**
     * 节流 默认 500 毫秒
     */
    export function Throttle(delta = 500) {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            const original = descriptor.value.bind(target);
            descriptor.value = (...args: Array<unknown>) => {
                const key = `${target.constructor.name}:${propertyKey}`;
                let lastTime = throttleMap.get(key);
                if (lastTime) {
                    const currentTime = Date.now();
                    if (currentTime - lastTime > delta) {
                        lastTime = currentTime;
                        original(...args);
                    }
                } else {
                    lastTime = Date.now();
                    original(...args);
                }
                throttleMap.set(key, lastTime);
            };
        };
    }

    export enum IpcRendererEvent {
        SecondInstance = 'SecondInstance',
        GlobalShortcut = 'GlobalShortcut',
        FileDrop = 'FileDrop',
        WidgetCreate = 'WidgetCreate',
        WidgetDestroy = 'WidgetDestroy',
        ThemeUpdate = 'ThemeUpdate',
        WidgetEmpty = 'WidgetEmpty'
    }

    export enum IpcRendererWindow {
        Main = 'Main',
        Tray = 'Tray',
        Other = 'Other'
    }

    export interface IIpcRendererReceiveMessage {
        [key: string]: unknown;
    }

    export interface IIpcRendererAddon {
        methon: string;
        args?: Array<unknown>;
    }

    export type IpcRendererSendMessage = {
        type: IpcRendererEvent;
        /**
         * 要发送消息的窗口 与 excludeWidgets 冲突 二者填一个 此参数优先级高
         */
        widgets?: Array<IpcRendererWindow>;
        /**
         * 不要发送消息的窗口 与 widgets 冲突 二者填一个
         */
        excludeWidgets?: Array<IpcRendererWindow>;
        send?: IIpcRendererSendMessage;
    };

    export interface IIpcRendererSendMessage extends IIpcRendererReceiveMessage {}
}
export { I };
