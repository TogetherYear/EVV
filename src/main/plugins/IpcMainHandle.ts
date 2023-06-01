import { AppMainWindow } from "@main/manager/AppMainWindow"
import { ipcMain, screen } from "electron"
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

    private signal = {
        screenshotEdit: false
    }

    public Run() {
        this.ListenIpcSend()
        this.ListenIpcHandle()
    }

    private ListenIpcSend() {
        ipcMain.on(`Renderer:Widget:Min:id`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnMin(); return;
            }
        })
        ipcMain.on(`Renderer:Widget:Max:id`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnMax(); return;
            }
        })
        ipcMain.on(`Renderer:Widget:Close:id`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnClose(); return;
            }
        })
    }

    private ListenIpcHandle() {
        ipcMain.handle(`Renderer:Tool:Screenshot:All`, async (e) => {
            const buffers = await Screenshot.all()
            return buffers
        })

        ipcMain.handle(`Renderer:Tool:Screenshot:Index`, async (e, index: number) => {
            const list = await Screenshot.listDisplays()
            const buffer = await Screenshot({ format: 'png', screen: list[index].id })
            return buffer
        })

        ipcMain.handle(`Renderer:Tool:Screenshot:Focus`, async (e) => {
            const current = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
            const list = await Screenshot.listDisplays()
            const id = list.find(l => l.left == current.bounds.x && l.top == current.bounds.y)?.id
            const buffer = await Screenshot({ format: 'png', screen: id })
            return buffer
        })

        ipcMain.handle(`Renderer:Tool:Screenshot:Edit`, async (e) => {
            if (this.signal.screenshotEdit) {
                return undefined
            }
            else {
                this.signal.screenshotEdit = true
                const result = await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve("Renderer:Tool:Screenshot:Edit")
                    }, 5000);
                })
                this.signal.screenshotEdit = false
                return result
            }

        })
    }
}

export { IpcMainHandle }
