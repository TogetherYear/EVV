import { AppMainWindow } from "@main/manager/AppMainWindow"
import { ipcMain } from "electron"

/**
 * 主线程 Ipc 监听 
 */
class IpcMainHandle {
    private constructor() { }

    private static instance: IpcMainHandle = new IpcMainHandle()

    public static get Instance(): IpcMainHandle {
        return this.instance
    }

    public Run() {
        this.ListenMainWindowIpc()
    }

    private ListenMainWindowIpc() {
        ipcMain.on('VesselMin', () => {
            AppMainWindow.Instance.widget?.minimize()
        })

        ipcMain.on('VesselMax', () => {
            if (AppMainWindow.Instance.widget) {
                if (AppMainWindow.Instance.widget.isMaximized()) {
                    AppMainWindow.Instance.widget.restore()
                }
                else {
                    AppMainWindow.Instance.widget.maximize()
                }
            }
        })

        ipcMain.on('VesselClose', () => {
            AppMainWindow.Instance.widget?.hide()
        })
    }
}

export { IpcMainHandle }
