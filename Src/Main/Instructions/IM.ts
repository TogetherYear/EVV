import { AppMainWindow } from '@Main/Manager/AppMainWindow';
import { AppTray } from '@Main/Manager/AppTray';
import { CommonEvent } from '@Main/Manager/CommonEvent';
import { Configuration } from '@Main/Manager/Configuration';
import { CustomProtocol } from '@Main/Manager/CustomProtocol';
import { CustomWidget } from '@Main/Manager/CustomWidget';
import { GlobalShortcut } from '@Main/Manager/GlobalShortcut';
import { IpcMainHandle } from '@Main/Manager/IpcMainHandle';
import { LocalServer } from '@Main/Manager/LocalServer';
import { ProcessPool } from '@Main/Manager/ProcessPool';
import { ResourceLoad } from '@Main/Manager/ResourceLoad';
import { SingleInstance } from '@Main/Manager/SingleInstance';
import { WindowPool } from '@Main/Manager/WindowPool';

namespace IM {
    export interface IContext {
        SingleInstance: SingleInstance;
        ResourceLoad: ResourceLoad;
        Configuration: Configuration;
        ProcessPool: ProcessPool;
        WindowPool: WindowPool;
        IpcMainHandle: IpcMainHandle;
        LocalServer: LocalServer;
        CustomWidget: CustomWidget;
        GlobalShortcut: GlobalShortcut;
        CustomProtocol: CustomProtocol;
        CommonEvent: CommonEvent;
        AppTray: AppTray;
        AppMainWindow: AppMainWindow;
    }

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
export { IM };
