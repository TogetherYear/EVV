import { app } from 'electron';
import { ResourceLoad } from './Manager/ResourceLoad';
import { Configuration } from './Manager/Configuration';
import { ProcessPool } from './Manager/ProcessPool';
import { WindowPool } from './Manager/WindowPool';
import { IpcMainHandle } from './Manager/IpcMainHandle';
import { GlobalShortcut } from './Manager/GlobalShortcut';
import { CustomProtocol } from './Manager/CustomProtocol';
import { AppMainWindow } from './Manager/AppMainWindow';
import { AppTray } from './Manager/AppTray';
import { SingleInstance } from './Manager/SingleInstance';
import { CommonEvent } from './Manager/CommonEvent';
import { LocalServer } from './Manager/LocalServer';
import { CustomWidget } from './Manager/CustomWidget';
import { IM } from './Instructions/IM';

const target: Partial<IM.IContext> = {};

/**
 * 后面可能加东西 先弄一层代理
 */
const proxy = Proxy.revocable(target as IM.IContext, {
    get: (target: IM.IContext, p: keyof IM.IContext, receiver: any) => {
        return target[p];
    },
    set: (target: IM.IContext, p: keyof IM.IContext, newValue: any, receiver: any) => {
        target[p] = newValue;
        return true;
    }
});

const ctx = proxy.proxy;

ctx.SingleInstance = new SingleInstance(ctx);

ctx.ResourceLoad = new ResourceLoad(ctx);

ctx.Configuration = new Configuration(ctx);

ctx.ProcessPool = new ProcessPool(ctx);

ctx.WindowPool = new WindowPool(ctx);

ctx.IpcMainHandle = new IpcMainHandle(ctx);

ctx.LocalServer = new LocalServer(ctx);

ctx.GlobalShortcut = new GlobalShortcut(ctx);

ctx.CustomProtocol = new CustomProtocol(ctx);

ctx.CustomProtocol = new CustomProtocol(ctx);

ctx.CustomWidget = new CustomWidget(ctx);

ctx.AppMainWindow = new AppMainWindow(ctx);

ctx.AppTray = new AppTray(ctx);

ctx.CommonEvent = new CommonEvent(ctx);

ctx.SingleInstance.Run();

ctx.ResourceLoad.Run();

ctx.Configuration.Run();

ctx.ProcessPool.Run();

ctx.WindowPool.Run();

ctx.IpcMainHandle.Run();

ctx.LocalServer.Run();

app.on('ready', () => {
    ctx.GlobalShortcut.Run();

    ctx.CustomProtocol.Run();

    ctx.CustomWidget.Run();

    ctx.AppMainWindow.Run();

    ctx.AppTray.Run();

    ctx.CommonEvent.Run();
});

app.on('window-all-closed', () => {
    if (process.platform === 'win32') {
        app.exit(0);
    }
});

app.on('will-quit', () => {
    ctx.GlobalShortcut.UnregisterAll();
});
