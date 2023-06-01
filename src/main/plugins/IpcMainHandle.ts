import { Screenshot } from "@main/common/Screenshot"
import { AppMainWindow } from "@main/manager/AppMainWindow"
import { BrowserWindow, Notification, app, ipcMain, nativeImage, screen, shell } from "electron"
import ScreenshotDesktop from 'screenshot-desktop'
import { ResourceLoad } from "./ResourceLoad"

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

        ipcMain.on(`Renderer:Tool:Shell:Beep`, () => {
            shell.beep()
        })
    }

    private ListenIpcHandle() {
        ipcMain.handle(`Renderer:Tool:Screenshot:All`, async (e) => {
            const buffers = await ScreenshotDesktop.all()
            return buffers
        })

        ipcMain.handle(`Renderer:Tool:Screenshot:Index`, async (e, index: number) => {
            const list = await ScreenshotDesktop.listDisplays()
            const buffer = await ScreenshotDesktop({ format: 'png', screen: list[index].id })
            return buffer
        })

        ipcMain.handle(`Renderer:Tool:Screenshot:Focus`, async (e) => {
            const current = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
            const list = await ScreenshotDesktop.listDisplays()
            const id = list.find(l => l.left == current.bounds.x)?.id
            const buffer = await ScreenshotDesktop({ format: 'png', screen: id })
            return buffer
        })

        ipcMain.handle(`Renderer:Tool:Screenshot:Edit`, async (e) => {
            if (this.signal.screenshotEdit) {
                return undefined
            }
            else {
                this.signal.screenshotEdit = true
                const result = await new Promise((resolve, reject) => {
                    const st = new Screenshot((r) => {
                        resolve(r)
                    })
                })
                this.signal.screenshotEdit = false
                return result
            }

        })

        ipcMain.handle(`Renderer:Tool:Screen:Cursor`, (e) => {
            return screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
        })

        ipcMain.handle(`Renderer:Tool:Widget:Bounds`, (e) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow
            return widget.getBounds()
        })

        ipcMain.handle(`Renderer:Tool:Notification:Show`, async (e, options: { title?: string, body?: string, silent?: boolean }) => {
            return await new Promise((resolve, reject) => {
                if (Notification.isSupported()) {
                    const icon = ResourceLoad.Instance.GetImageByName('tray.png')
                    const n = new Notification({ ...options, icon })
                    n.once('click', () => {
                        resolve('click')
                    })
                    n.once('close', () => {
                        resolve("close")
                    })
                    n.once('failed', () => {
                        resolve('fail')
                    })
                    n.show()
                }
                else {
                    resolve("fail")
                }
            })
        })
    }
}

export { IpcMainHandle }
