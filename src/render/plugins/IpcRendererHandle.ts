import { ipcRenderer } from 'electron'

/**
 * 渲染进程 Ipc 监听
 */
class IpcRendererHandle {
    private constructor() { }

    private static instance = new IpcRendererHandle()

    public static get Instance() {
        return this.instance
    }

    public Run() {

    }

    public SendEvent(e: string) {
        ipcRenderer.send(e)
    }
}

export { IpcRendererHandle }