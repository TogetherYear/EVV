import { AppMainWindow } from "@main/manager/AppMainWindow"
import { BrowserWindow, app, ipcMain, screen, shell } from "electron"
import { ResourceLoad } from "@main/manager/ResourceLoad"
import { AppTray } from "@main/manager/AppTray"
import { D } from "@decorators/D"
import { GlobalShortcut } from "./GlobalShortcut"

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
        this.OnAppIPC()
        this.OnWidgetIPC()
        this.OnShellIPC()
        this.OnTrayIPC()
        this.OnScreenIPC()
        this.OnResourceIPC()
        this.OnGlobalShortcutIPC()
    }

    private OnAppIPC() {
        ipcMain.on(`Renderer:App:Close`, (e) => {
            app.exit(0)
        })

        ipcMain.on(`Renderer:App:SetAutostart`, (e, enable: boolean) => {
            app.setLoginItemSettings({
                openAtLogin: enable
            })
        })

        ipcMain.on(`Renderer:App:Relaunch`, (e) => {
            app.relaunch()
            app.exit(0)
        })

        ipcMain.handle(`Renderer:App:IsAutostart`, (e) => {
            const enable = app.getLoginItemSettings().openAtLogin
            return enable
        })
    }

    private OnWidgetIPC() {
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
                case AppTray.Instance.widget.webContents.id: AppTray.Instance.OnHide(); return;
            }
        })

        ipcMain.on(`Renderer:Widget:Show`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnShow(); return;
                case AppTray.Instance.widget.webContents.id: AppTray.Instance.OnShow(); return;
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
                case AppTray.Instance.widget.webContents.id: AppTray.Instance.OnSetPosition(position); return;
            }
        })

        ipcMain.on(`Renderer:Widget:Size`, (e, size: { width: number, height: number }) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnSetSize(size); return;
                case AppTray.Instance.widget.webContents.id: AppTray.Instance.OnSetSize(size); return;
            }
        })

        ipcMain.on(`Renderer:Widget:Message`, (e, d: D.IIpcRendererReceiveMessage) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: this.OnMessage({ ...d, type: D.IpcRendererWindow.Main }); return;
                case AppTray.Instance.widget.webContents.id: this.OnMessage({ ...d, type: D.IpcRendererWindow.Tray }); return;
                default: this.OnMessage({ ...d, type: D.IpcRendererWindow.Other }); return;
            }
        })

        ipcMain.handle(`Renderer:Widget:Bounds`, (e) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow
            return widget.getBounds()
        })
    }

    private OnShellIPC() {
        ipcMain.on(`Renderer:Shell:Beep`, () => {
            shell.beep()
        })

        ipcMain.on(`Renderer:Shell:Folder`, (e, path: string) => {
            shell.showItemInFolder(path)
        })

        ipcMain.on(`Renderer:Shell:Default`, (e, path: string) => {
            shell.openPath(path)
        })
    }

    private OnTrayIPC() {
        ipcMain.on(`Renderer:Tray:Icon`, (e, icon: string) => {
            AppTray.Instance.OnSetIcon(icon)
        })

        ipcMain.on(`Renderer:Tray:Tooltip`, (e, tooltip: string) => {
            AppTray.Instance.OnSetTooltip(tooltip)
        })

        ipcMain.on(`Renderer:Tray:Flash`, (e, icon: string) => {
            AppTray.Instance.OnFlash(icon)
        })

        ipcMain.on(`Renderer:Tray:StopFlash`, (e, icon: string) => {
            AppTray.Instance.OnStopFlash(icon)
        })
    }

    private OnScreenIPC() {
        ipcMain.handle(`Renderer:Screen:Cursor`, (e) => {
            return screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
        })

        ipcMain.handle(`Renderer:Screen:All`, () => {
            return screen.getAllDisplays()
        })

        ipcMain.handle(`Renderer:Screen:Primary`, () => {
            return screen.getPrimaryDisplay()
        })
    }

    private OnResourceIPC() {
        ipcMain.handle(`Renderer:Resource:Name`, (e, name: string) => {
            const path = ResourceLoad.Instance.GetResourcePathByName(name)
            return path
        })
    }

    private OnGlobalShortcutIPC() {
        ipcMain.handle(`Renderer:GlobalShortcut:Register`, (e, accelerator: Electron.Accelerator) => {
            const result = GlobalShortcut.Instance.Register(accelerator)
            return result
        })

        ipcMain.on(`Renderer:GlobalShortcut:Unregister`, (e, accelerator: Electron.Accelerator) => {
            GlobalShortcut.Instance.Unregister(accelerator)
        })

        ipcMain.on(`Renderer:GlobalShortcut:UnregisterAll`, (e) => {
            GlobalShortcut.Instance.UnregisterAll()
        })

        ipcMain.handle(`Renderer:GlobalShortcut:IsRegistered`, (e, accelerator: Electron.Accelerator) => {
            const result = GlobalShortcut.Instance.IsRegistered(accelerator)
            return result
        })
    }

    private OnMessage(e: D.IIpcRendererReceiveMessage & { type: D.IpcRendererWindow }) {
        if (e.type == D.IpcRendererWindow.Main) {

        }
        else if (e.type == D.IpcRendererWindow.Tray) {

        }
        else {

        }
    }
}

export { IpcMainHandle }
