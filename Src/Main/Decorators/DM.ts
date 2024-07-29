namespace DM {
    export enum ChildrenProcessType {
        Log = 'Log',
        Push = 'Push',
        Custom = 'Custom',
        Other = 'Other'
    }

    export enum ChildrenProcessEvent {
        Message = 'Message'
    }

    export interface IChildrenProcessReceiveMessage {
        [key: string]: unknown;
    }

    export type ChildrenProcessSendMessage = {
        type: ChildrenProcessEvent;
        /**
         * 要发送消息的子进程 与 excludeProcesses 冲突 二者填一个 此参数优先级高
         */
        processes?: Array<ChildrenProcessType>;
        /**
         * 不要发送消息的子进程 与 processes 冲突 二者填一个
         */
        excludeProcesses?: Array<ChildrenProcessType>;
        send?: IChildrenProcessSendMessage;
    };

    export interface IChildrenProcessSendMessage extends IChildrenProcessReceiveMessage {}
}
export { DM };
