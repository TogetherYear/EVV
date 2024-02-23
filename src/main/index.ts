import { app, globalShortcut } from 'electron'
import { Time } from '@libs/Time'
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
import { D } from '@decorators/D'

const additionalData = { key: "TSingleton", Time: Time.GetTime() }

const lock = app.requestSingleInstanceLock(additionalData)

// 只允许唯一实例
if (!lock) {
    app.quit()
    app.quit()
}
else {
    app.commandLine.appendSwitch('disable-web-security')

    app.commandLine.appendSwitch('wm-window-animations-disabled')

    app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer')

    ResourceLoad.Instance.Run()

    Configuration.Instance.Run()

    ProcessPool.Instance.Run()

    WindowPool.Instance.Run()

    NodeAddon.Instance.Run()

    IpcMainHandle.Instance.Run()

    app.on('ready', () => {
        GlobalShortcut.Instance.Run()

        CustomProtocol.Instance.Run()

        AppMainWindow.Instance.Run()

        AppTray.Instance.Run()
    })

    app.on('window-all-closed', () => {
        if (process.platform == 'win32') {
            app.quit()
            app.quit()
        }
    })

    app.on('will-quit', () => {
        globalShortcut.unregisterAll()
    })

    app.on('second-instance', () => {
        WindowPool.Instance.PostMessage({ type: D.IpcRendererEvent.SecondInstance, widgets: [D.IpcRendererWindow.Main] })
    })
}