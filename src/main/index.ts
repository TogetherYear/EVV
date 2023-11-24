import { app, globalShortcut } from 'electron'
import { AppMainWindow } from './manager/AppMainWindow'
import { AppTray } from './manager/AppTray'
import { Configuration } from './manager/Configuration'
import { CustomProtocol } from './manager/CustomProtocol'
import { GlobalShortcut } from './manager/GlobalShortcut'
import { IpcMainHandle } from './manager/IpcMainHandle'
import { IpcRendererHandle } from './manager/IpcRendererHandle'
import { ResourceLoad } from './manager/ResourceLoad'
import { Time } from '@libs/Time'
import { ProcessPool } from './manager/ProcessPool'
import { D } from '@decorators/D'

const additionalData = { key: "TSingleton", Time: Time.GetTime() }

const lock = app.requestSingleInstanceLock(additionalData)

// 只允许唯一实例
if (!lock) {
    app.quit()
}
else {
    app.commandLine.appendSwitch('disable-web-security')

    app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer')

    ResourceLoad.Instance.Run()

    Configuration.Instance.Run()

    ProcessPool.Instance.Run()

    IpcMainHandle.Instance.Run()

    IpcRendererHandle.Instance.Run()

    app.on('ready', () => {
        GlobalShortcut.Instance.Run()

        CustomProtocol.Instance.Run()

        AppMainWindow.Instance.Run()

        AppTray.Instance.Run()
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('will-quit', () => {
        globalShortcut.unregisterAll()
    })

    app.on('second-instance', () => {
        IpcRendererHandle.Instance.Send({ type: D.IpcRendererEvent.SecondInstance })
    })
}