import { BrowserWindow } from "electron"
import { D } from "@decorators/D"
import { WindowPool } from "./WindowPool"

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
    public PostMessage(e: D.IIpcRendererMessage) {
        if (e.widgets && e.widgets.length != 0) {
            for (let w of e.widgets) {
                const window = WindowPool.Instance.GetWindow(w)
                if (window) {
                    window.widget.webContents.postMessage("RendererMessage", e)
                }
            }
        }
        else if (e.excludeWidgets && e.excludeWidgets.length != 0) {
            const need = WindowPool.Instance.GetPoolKV().filter(c => (e.excludeWidgets || []).indexOf(c.key) == -1)
            for (let c of need) {
                c.value.widget.webContents.postMessage("RendererMessage", e)
            }
        }
        else {
            const contents = BrowserWindow.getAllWindows().map(w => w.webContents)
            for (let c of contents) {
                c.postMessage("RendererMessage", e)
            }
        }

    }
}

export { IpcRendererHandle }
