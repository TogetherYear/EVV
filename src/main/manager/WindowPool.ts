import { D } from "@decorators/D"
import { TWindow } from "@main/libs/TWindow"

class WindowPool {
    private constructor() { }

    private static instance = new WindowPool()

    public static get Instance() {
        return this.instance
    }

    public pool = new Map<D.IpcRendererWindow, TWindow>()

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

}

export { WindowPool }