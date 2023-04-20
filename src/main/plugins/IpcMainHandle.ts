import { ipcMain } from "electron"
import Screenshot from 'screenshot-desktop'

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
        ipcMain.handle(`Tool:Screenshot`, async (e) => {
            const buffer = await Screenshot({ format: 'png' })
            return buffer
        })
    }
}

export { IpcMainHandle }
