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
        ipcMain.on('ApplicationMin', () => {
            AppMainWindow.Instance.widget.minimize()
        })

        ipcMain.on('ApplicationMax', () => {
            if (AppMainWindow.Instance.widget.isMaximized()) {
                AppMainWindow.Instance.widget.restore()
            }
            else {
                AppMainWindow.Instance.widget.maximize()
            }
        })

        ipcMain.on('ApplicationClose', () => {
            AppMainWindow.Instance.widget.hide()
        })
    }
}

export { IpcMainHandle }
