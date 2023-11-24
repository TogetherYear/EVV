import { AppMainWindow } from "@main/manager/AppMainWindow"
import { BrowserWindow, ipcMain, screen, shell } from "electron"
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
        ipcMain.on(`Renderer:Widget:Min`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnMin(); return;
            }
        })

        ipcMain.on(`Renderer:Widget:Max`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnMax(); return;
            }
        })

        ipcMain.on(`Renderer:Widget:Hide`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnHide(); return;
            }
        })

        ipcMain.on(`Renderer:Widget:Show`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnShow(); return;
            }
        })

        ipcMain.on(`Renderer:Widget:Center`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnCenter(); return;
            }
        })

        ipcMain.on(`Renderer:Widget:Position`, (e, position: { x: number, y: number }) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnSetPosition(position); return;
            }
        })

        ipcMain.on(`Renderer:Widget:Resize`, (e, size: { width: number, height: number }) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnResize(size); return;
            }
        })

        ipcMain.on(`Renderer:Shell:Beep`, () => {
            shell.beep()
        })
    }

    private ListenIpcHandle() {
        ipcMain.handle(`Renderer:Screenshot:All`, async (e) => {
            const buffers = await ScreenshotDesktop.all()
            return buffers
        })

        ipcMain.handle(`Renderer:Screenshot:Index`, async (e, index: number) => {
            const list = await ScreenshotDesktop.listDisplays()
            const buffer = await ScreenshotDesktop({ format: 'png', screen: list[index].id })
            return buffer
        })

        ipcMain.handle(`Renderer:Screenshot:Focus`, async (e) => {
            const current = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
            const list = await ScreenshotDesktop.listDisplays()
            const id = list.find(l => l.left == current.bounds.x)?.id
            const buffer = await ScreenshotDesktop({ format: 'png', screen: id })
            return buffer
        })

        ipcMain.handle(`Renderer:Screen:Cursor`, (e) => {
            return screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
        })

        ipcMain.handle(`Renderer:Widget:Bounds`, (e) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow
            return widget.getBounds()
        })

        ipcMain.handle(`Renderer:Resource:Name`, (e, name: string) => {
            const path = ResourceLoad.Instance.GetResourcePathByName(name)
            return path
        })
    }
}

export { IpcMainHandle }
