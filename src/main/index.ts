import { app, globalShortcut } from 'electron'
import { ResourceLoad } from './manager/ResourceLoad'
import { Configuration } from './manager/Configuration'
import { ProcessPool } from './manager/ProcessPool'
import { WindowPool } from './manager/WindowPool'
import { NodeAddon } from './manager/NodeAddon'
import { IpcMainHandle } from './manager/IpcMainHandle'
import { GlobalShortcut } from './manager/GlobalShortcut'
import { CustomProtocol } from './manager/CustomProtocol'
import { AppMainWindow } from './manager/AppMainWindow'
import { AppTray } from './manager/AppTray'
import { SingleInstance } from './manager/SingleInstance'
import { D } from '@decorators/D'
import { Download } from './manager/Download'
import { CommonEvent } from './manager/CommonEvent'

app.commandLine.appendSwitch('disable-web-security')

app.commandLine.appendSwitch('wm-window-animations-disabled')

// app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer')

SingleInstance.Instance.Run()

ResourceLoad.Instance.Run()

Configuration.Instance.Run()

ProcessPool.Instance.Run()

WindowPool.Instance.Run()

NodeAddon.Instance.Run()

IpcMainHandle.Instance.Run()

app.on('ready', () => {
    GlobalShortcut.Instance.Run()

    CustomProtocol.Instance.Run()

    Download.Instance.Run()

    AppMainWindow.Instance.Run()

    AppTray.Instance.Run()

    CommonEvent.Instance.Run()
})

app.on('window-all-closed', () => {
    if (process.platform == 'win32') {
        app.exit(0)
    }
})

app.on('will-quit', () => {
    GlobalShortcut.Instance.UnregisterAll()
})

app.on('second-instance', () => {
    WindowPool.Instance.PostMessage({ type: D.IpcRendererEvent.SecondInstance, widgets: [D.IpcRendererWindow.Main] })
})