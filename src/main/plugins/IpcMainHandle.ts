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

    }
}

export { IpcMainHandle }
