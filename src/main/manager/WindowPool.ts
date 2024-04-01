import { D } from "@decorators/D"
import { TWindow } from "@main/libs/TWindow"

class WindowPool {
    private constructor() { }

    private static instance = new WindowPool()

    public static get Instance() {
        return this.instance
    }

    private pool = new Map<D.IpcRendererWindow, TWindow>()

    public Run() {

    }

    public RegisterWindow(t: D.IpcRendererWindow, w: TWindow) {
        this.pool.set(t, w)
    }

    public CancelWindow(t: D.IpcRendererWindow) {
        this.pool.delete(t)
    }

    public GetWindow(t: D.IpcRendererWindow) {
        return this.pool.get(t)
    }

    public GetPoolKV() {
        const result: Array<{ key: D.IpcRendererWindow, value: TWindow }> = []
        for (let p of this.pool) {
            result.push({ key: p[0], value: p[1] })
        }
        return result
    }

    /**
     * 发送信息到渲染进程
     */
    public PostMessage(e: D.IpcRendererSendMessage) {
        if (e.widgets && e.widgets.length != 0) {
            for (let w of e.widgets) {
                const window = this.GetWindow(w)
                if (window) {
                    window.widget.webContents.postMessage("RendererMessage", e)
                }
            }
        }
        else if (e.excludeWidgets && e.excludeWidgets.length != 0) {
            const need = this.GetPoolKV().filter(c => (e.excludeWidgets || []).indexOf(c.key) == -1)
            for (let c of need) {
                c.value.widget.webContents.postMessage("RendererMessage", e)
            }
        }
        else {
            for (let c of this.pool) {
                c[1].widget.webContents.postMessage("RendererMessage", e)
            }
        }

    }

    public GetWindowById(id: number): TWindow {
        for (let p of this.pool) {
            if (p[1].widget.id == id) {
                return p[1]
            }
        }
        return this.GetWindow(D.IpcRendererWindow.Main) as TWindow
    }

}

export { WindowPool }