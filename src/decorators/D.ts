namespace D {
    export function ClassDec() {
        return function <T extends new (...args: Array<any>) => Object>(C: T) {
            return class extends C {
                constructor(...args: Array<any>) {
                    super(...args)
                    this.Hooks()
                }

                private Hooks() {

                }

            }
        }
    }

    export function FunctionDec() {
        return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
            const original = descriptor.value.bind(target)
            descriptor.value = () => {
                original()

            }
        }
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
        Other = 'Other',
    }

    export interface IIpcRendererReceiveMessage {
        [key: string]: unknown
    }

    export interface IIpcRendererAddon {
        methon: string,
        args?: Array<unknown>
    }

    export type IpcRendererSendMessage = {
        type: IpcRendererEvent,
        /**
         * 要发送消息的窗口 与 excludeWidgets 冲突 二者填一个 此参数优先级高
         */
        widgets?: Array<IpcRendererWindow>,
        /**
         * 不要发送消息的窗口 与 widgets 冲突 二者填一个
         */
        excludeWidgets?: Array<IpcRendererWindow>,
        send?: IIpcRendererSendMessage
    }

    export interface IIpcRendererSendMessage extends IIpcRendererReceiveMessage {

    }
}
export { D }
