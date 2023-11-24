import { BrowserWindow } from "electron"
import { D } from "@decorators/D"

/**
 * 主进程发送消息到渲染进程处理
 */
class IpcRendererHandle {
    private constructor() { }

    private static instance: IpcRendererHandle = new IpcRendererHandle()

    public static get Instance(): IpcRendererHandle {
        return this.instance
    }

    public Run() {

    }

    /**
     * 发送信息到渲染进程
     */
    public Send(e: D.IIpcMessage) {
        const contents = BrowserWindow.getAllWindows().map(w => w.webContents)
        for (let c of contents) {
            c.send("Message", e)
        }
    }
}

export { IpcRendererHandle }
