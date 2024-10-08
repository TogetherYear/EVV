import { I } from '@Src/Instructions/I';
import { Window } from '@Main/Libs/Window';

class WindowPool {
    private pool = new Map<I.IpcRendererWindow, Window>();

    public Run() {}

    public RegisterWindow(t: I.IpcRendererWindow, w: Window) {
        this.pool.set(t, w);
    }

    public CancelWindow(t: I.IpcRendererWindow) {
        this.pool.delete(t);
    }

    public GetWindow(t: I.IpcRendererWindow) {
        return this.pool.get(t);
    }

    public GetPoolKV() {
        const result: Array<{ key: I.IpcRendererWindow; value: Window }> = [];
        for (let p of this.pool) {
            result.push({ key: p[0], value: p[1] });
        }
        return result;
    }

    /**
     * 发送信息到渲染进程
     */
    public PostMessage(e: I.IpcRendererSendMessage) {
        if (e.widgets && e.widgets.length != 0) {
            for (let w of e.widgets) {
                const window = this.GetWindow(w);
                if (window) {
                    window.widget.webContents.postMessage('RendererMessage', e);
                }
            }
        } else if (e.excludeWidgets && e.excludeWidgets.length != 0) {
            const need = this.GetPoolKV().filter((c) => (e.excludeWidgets || []).indexOf(c.key) === -1);
            for (let c of need) {
                c.value.widget.webContents.postMessage('RendererMessage', e);
            }
        } else {
            for (let c of this.pool) {
                c[1].widget.webContents.postMessage('RendererMessage', e);
            }
        }
    }

    public GetWindowById(id: number): Window {
        for (let p of this.pool) {
            if (p[1].widget.id === id) {
                return p[1];
            }
        }
        return this.GetWindow(I.IpcRendererWindow.Main) as Window;
    }
}

const WindowPoolInstance = new WindowPool();

export { WindowPoolInstance as WindowPool };
