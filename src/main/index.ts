import { app, globalShortcut } from 'electron'
import { AppMainWindow } from './manager/AppMainWindow'
import { AppTray } from './manager/AppTray'
import { Configuration } from './manager/Configuration'
import { CustomProtocol } from './manager/CustomProtocol'
import { GlobalShortcut } from './manager/GlobalShortcut'
import { IpcMainHandle } from './manager/IpcMainHandle'
import { ResourceLoad } from './manager/ResourceLoad'

const additionalData = { key: "Together" }

const lock = app.requestSingleInstanceLock(additionalData)

// 只允许唯一实例
if (!lock) {
    app.quit()
}
else {
    app.commandLine.appendSwitch('disable-web-security')

    ResourceLoad.Instance.Run()

    Configuration.Instance.Run()

    IpcMainHandle.Instance.Run()

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

    })
}