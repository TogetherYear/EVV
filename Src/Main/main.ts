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
import { Download } from './Manager/Download';
import { CommonEvent } from './Manager/CommonEvent';
import { LocalServer } from './Manager/LocalServer';
import { CustomWidget } from './Manager/CustomWidget';

app.commandLine.appendSwitch('disable-web-security');

app.commandLine.appendSwitch('wm-window-animations-disabled');

app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer');

SingleInstance.Run();

ResourceLoad.Run();

Configuration.Run();

ProcessPool.Run();

WindowPool.Run();

IpcMainHandle.Run();

LocalServer.Run();

app.on('ready', () => {
    GlobalShortcut.Run();

    CustomProtocol.Run();

    Download.Run();

    CustomWidget.Run();

    AppMainWindow.Run();

    AppTray.Run();

    CommonEvent.Run();
});

app.on('window-all-closed', () => {
    if (process.platform == 'win32') {
        app.exit(0);
    }
});

app.on('will-quit', () => {
    GlobalShortcut.UnregisterAll();
});

app.on('second-instance', () => {
    SingleInstance.OnSecondInstance();
});
