namespace I {
    export enum IpcRendererEvent {
        SecondInstance = 'SecondInstance',
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
