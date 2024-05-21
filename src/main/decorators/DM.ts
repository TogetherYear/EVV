namespace DM {
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

    export enum ChildrenProcessType {
        Log = 'Log',
        Push = 'Push',
        Custom = 'Custom',
        Other = 'Other',
    }

    export enum ChildrenProcessEvent {
        Message = 'Message',
    }

    export interface IChildrenProcessReceiveMessage {
        [key: string]: unknown
    }

    export type ChildrenProcessSendMessage = {
        type: ChildrenProcessEvent,
        /**
         * 要发送消息的子进程 与 excludeProcesses 冲突 二者填一个 此参数优先级高
         */
        processes?: Array<ChildrenProcessType>,
        /**
         * 不要发送消息的子进程 与 processes 冲突 二者填一个
         */
        excludeProcesses?: Array<ChildrenProcessType>,
        send?: IChildrenProcessSendMessage
    }

    export interface IChildrenProcessSendMessage extends IChildrenProcessReceiveMessage {

    }

    export enum CustomWidgetCmd {
        Min,
        Max,
        Hide,
        Show,
        Center,
        Position,
        Size,
        Close,
        Top,
    }
}
export { DM }
