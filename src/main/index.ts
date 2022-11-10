import { app, globalShortcut } from 'electron'
import { AppMainWindow } from './manager/AppMainWindow'
import { AppTray } from './manager/AppTray'
import { Configuration } from './plugins/Configuration'
import { CustomProtocol } from './plugins/CustomProtocol'
import { GlobalShortcut } from './plugins/GlobalShortcut'
import { IpcMainHandle } from './plugins/IpcMainHandle'
import { ResourceLoad } from './plugins/ResourceLoad'

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