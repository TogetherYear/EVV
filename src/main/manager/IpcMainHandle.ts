import { AppMainWindow } from "@main/manager/AppMainWindow"
import { BrowserWindow, Notification, ipcMain, screen, shell } from "electron"
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

        ipcMain.handle(`Renderer:Tool:Screen:Cursor`, (e) => {
            return screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
        })

        ipcMain.handle(`Renderer:Tool:Widget:Bounds`, (e) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow
            return widget.getBounds()
        })
    }
}

export { IpcMainHandle }