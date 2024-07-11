import { app } from 'electron'
import { ResourceLoad } from './Manager/ResourceLoad'
import { Configuration } from './Manager/Configuration'
import { ProcessPool } from './Manager/ProcessPool'
import { WindowPool } from './Manager/WindowPool'
import { IpcMainHandle } from './Manager/IpcMainHandle'
import { GlobalShortcut } from './Manager/GlobalShortcut'
import { CustomProtocol } from './Manager/CustomProtocol'
import { AppMainWindow } from './Manager/AppMainWindow'
import { AppTray } from './Manager/AppTray'
import { SingleInstance } from './Manager/SingleInstance'
import { Download } from './Manager/Download'
import { CommonEvent } from './Manager/CommonEvent'
import { LocalServer } from './Manager/LocalServer'
import { CustomWidget } from './Manager/CustomWidget'

app.commandLine.appendSwitch('disable-web-security')

app.commandLine.appendSwitch('wm-window-animations-disabled')

// app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer')

SingleInstance.Instance.Run()

ResourceLoad.Instance.Run()

Configuration.Instance.Run()

ProcessPool.Instance.Run()

WindowPool.Instance.Run()

IpcMainHandle.Instance.Run()

LocalServer.Instance.Run()

app.on('ready', () => {
    GlobalShortcut.Instance.Run()

    CustomProtocol.Instance.Run()

    Download.Instance.Run()

    CustomWidget.Instance.Run()

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
    SingleInstance.Instance.OnSecondInstance()
})