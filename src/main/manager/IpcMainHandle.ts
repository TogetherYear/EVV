import { AppMainWindow } from "@main/manager/AppMainWindow"
import { BrowserWindow, app, ipcMain, screen, shell, dialog } from "electron"
import { ResourceLoad } from "@main/manager/ResourceLoad"
import { AppTray } from "@main/manager/AppTray"
import { D } from "@decorators/D"
import { GlobalShortcut } from "./GlobalShortcut"
import { WindowPool } from "./WindowPool"
import * as F from 'fs'
import { Download } from "./Download"
import { CustomWidget } from "./CustomWidget"
import { DM } from "@main/decorators/DM"
import * as NS from 'node-screenshots'
import * as FS from 'fs'
import { CustomProtocol } from "./CustomProtocol"

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
        this.OnWindowIPC()
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

        ipcMain.handle(`Renderer:App:IsAutostart`, async (e) => {
            const enable = app.getLoginItemSettings().openAtLogin
            return enable
        })

        ipcMain.handle(`Renderer:App:CreateCustomWindow`, async (e, options: TSingleton.CustomWidgetOptions) => {
            const result = CustomWidget.Instance.CreateWindow(options)
            return result
        })
    }

    private OnWidgetIPC() {
        ipcMain.on(`Renderer:Widget:Min`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnMin(); return;
                default: CustomWidget.Instance.HandleWidgetEvents(e.sender.id, DM.CustomWidgetCmd.Min); return
            }
        })

        ipcMain.on(`Renderer:Widget:Max`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnMax(); return;
                default: CustomWidget.Instance.HandleWidgetEvents(e.sender.id, DM.CustomWidgetCmd.Max); return
            }
        })

        ipcMain.on(`Renderer:Widget:Hide`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnHide(); return;
                case AppTray.Instance.widget.webContents.id: AppTray.Instance.OnHide(); return;
                default: CustomWidget.Instance.HandleWidgetEvents(e.sender.id, DM.CustomWidgetCmd.Hide); return
            }
        })

        ipcMain.on(`Renderer:Widget:Show`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnShow(); return;
                case AppTray.Instance.widget.webContents.id: AppTray.Instance.OnShow(); return;
                default: CustomWidget.Instance.HandleWidgetEvents(e.sender.id, DM.CustomWidgetCmd.Show); return
            }
        })

        ipcMain.on(`Renderer:Widget:Center`, (e) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnCenter(); return;
                default: CustomWidget.Instance.HandleWidgetEvents(e.sender.id, DM.CustomWidgetCmd.Center); return
            }
        })

        ipcMain.on(`Renderer:Widget:Position`, (e, position: { x: number, y: number }) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnSetPosition(position); return;
                case AppTray.Instance.widget.webContents.id: AppTray.Instance.OnSetPosition(position); return;
                default: CustomWidget.Instance.HandleWidgetEvents(e.sender.id, DM.CustomWidgetCmd.Position, position); return
            }
        })

        ipcMain.on(`Renderer:Widget:Size`, (e, size: { width: number, height: number }) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: AppMainWindow.Instance.OnSetSize(size); return;
                case AppTray.Instance.widget.webContents.id: AppTray.Instance.OnSetSize(size); return;
                default: CustomWidget.Instance.HandleWidgetEvents(e.sender.id, DM.CustomWidgetCmd.Size, size); return
            }
        })

        ipcMain.on(`Renderer:Widget:Message`, (e, d: D.IIpcRendererReceiveMessage) => {
            switch (e.sender.id) {
                case AppMainWindow.Instance.widget.webContents.id: this.OnMessage({ ...d, type: D.IpcRendererWindow.Main, id: e.sender.id }); return;
                case AppTray.Instance.widget.webContents.id: this.OnMessage({ ...d, type: D.IpcRendererWindow.Tray, id: e.sender.id }); return;
                default: this.OnMessage({ ...d, type: D.IpcRendererWindow.Other, id: e.sender.id }); return;
            }
        })

        ipcMain.handle(`Renderer:Widget:Bounds`, async (e) => {
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
        ipcMain.handle(`Renderer:Screen:Cursor`, async (e) => {
            const point = screen.getCursorScreenPoint()
            const monitor = NS.Monitor.fromPoint(point.x, point.y) as NS.Monitor
            return this.TransformScreen(monitor)
        })

        ipcMain.handle(`Renderer:Screen:All`, async () => {
            const monitors = NS.Monitor.all().map(m => this.TransformScreen(m))
            return monitors
        })

        ipcMain.handle(`Renderer:Screen:Primary`, async () => {
            const monitor = NS.Monitor.all().find(a => a.isPrimary) as NS.Monitor
            return this.TransformScreen(monitor)
        })

        ipcMain.handle(`Renderer:Screen:Capture`, async (e, id: number, path: string) => {
            const monitor = NS.Monitor.all().find(m => m.id == id) as NS.Monitor
            const image = monitor.captureImageSync()
            const buffer = image.toPngSync()
            const target = ResourceLoad.Instance.GetResourcePathByName(path)
            return await new Promise((resolve, reject) => {
                FS.writeFile(target, buffer, (err => {
                    if (err) {
                        resolve("")
                    }
                    resolve(target)
                }))
            })
        })
    }

    private TransformScreen(monitor: NS.Monitor): Omit<TSingleton.IScreen, "Capture"> {
        return {
            id: monitor.id,
            width: monitor.width,
            height: monitor.height,
            x: monitor.x,
            y: monitor.y,
            isPrimary: monitor.isPrimary,
        }
    }

    private OnWindowIPC() {
        ipcMain.handle(`Renderer:Window:All`, async () => {
            const windows = NS.Window.all().map(w => this.TransformWindow(w))
            return windows
        })

        ipcMain.handle(`Renderer:Window:Capture`, async (e, id: number, path: string) => {
            const window = NS.Window.all().find(w => w.id == id) as NS.Window
            const image = window.captureImageSync()
            const buffer = image.toPngSync()
            const target = ResourceLoad.Instance.GetResourcePathByName(path)
            return await new Promise((resolve, reject) => {
                FS.writeFile(target, buffer, (err => {
                    if (err) {
                        resolve("")
                    }
                    resolve(target)
                }))
            })
        })
    }

    private TransformWindow(window: NS.Window): Omit<TSingleton.IWindow, "Capture"> {
        return {
            id: window.id,
            name: window.appName,
            //@ts-ignore
            screen: this.TransformScreen(window.currentMonitor),
            width: window.width,
            height: window.height,
            isMinimized: window.isMinimized,
            x: window.x,
            y: window.y,
        }
    }

    private OnResourceIPC() {
        ipcMain.handle(`Renderer:Resource:Name`, async (e, name: string) => {
            const path = ResourceLoad.Instance.GetResourcePathByName(name)
            return path
        })

        ipcMain.handle(`Renderer:Resource:SelectResourcesPath`, async (e, options: TSingleton.SelectOptions) => {
            const window = WindowPool.Instance.GetWindowById(e.sender.id)
            const features: Array<"multiSelections" | "openDirectory" | "openFile"> = []
            if (options.multiple) {
                features.push("multiSelections")
            }
            if (options.directory) {
                features.push("openDirectory")
            }
            else {
                features.push("openFile")
            }
            const path = dialog.showOpenDialogSync(window.widget, {
                title: options.title,
                defaultPath: options.defaultPath,
                filters: options.filters,
                properties: features
            })
            return path
        })

        ipcMain.handle(`Renderer:Resource:SaveResourcesPath`, async (e, options: TSingleton.SaveOptions) => {
            const window = WindowPool.Instance.GetWindowById(e.sender.id)
            const path = dialog.showSaveDialog(window.widget, {
                title: options.title,
                defaultPath: options.defaultPath,
                filters: options.filters,
            })
            return path
        })

        ipcMain.handle(`Renderer:Resource:Exists`, async (e, path: string) => {
            const result = F.existsSync(path)
            return result
        })

        ipcMain.handle(`Renderer:Resource:ReadDirFiles`, async (e, dir: string) => {
            return await new Promise((resolve, reject) => {
                F.readdir(dir, (err, files) => {
                    if (err) {
                        resolve([])
                    }
                    resolve(files)
                })
            })
        })

        ipcMain.handle(`Renderer:Resource:CreateDir`, async (e, dir: string) => {
            return await new Promise((resolve, reject) => {
                F.mkdir(dir, (err) => {
                    if (err) {
                        resolve(false)
                    }
                    resolve(true)
                })
            })
        })

        ipcMain.handle(`Renderer:Resource:RemoveDir`, async (e, dir: string) => {
            return await new Promise((resolve, reject) => {
                F.rmdir(dir, (err) => {
                    if (err) {
                        resolve(false)
                    }
                    resolve(true)
                })
            })
        })

        ipcMain.handle(`Renderer:Resource:RemoveFile`, async (e, path: string) => {
            return await new Promise((resolve, reject) => {
                F.unlink(path, (err) => {
                    if (err) {
                        resolve(false)
                    }
                    resolve(true)
                })
            })
        })

        ipcMain.handle(`Renderer:Resource:Rename`, async (e, path: string, newPath: string) => {
            return await new Promise((resolve, reject) => {
                F.rename(path, newPath, (err) => {
                    if (err) {
                        resolve(false)
                    }
                    resolve(true)
                })
            })
        })

        ipcMain.handle(`Renderer:Resource:CopyFile`, async (e, path: string, newPath: string) => {
            return await new Promise((resolve, reject) => {
                F.copyFile(path, newPath, (err) => {
                    if (err) {
                        resolve(false)
                    }
                    resolve(true)
                })
            })
        })

        ipcMain.on(`Renderer:Resource:Download`, (e, url: string) => {
            Download.Instance.DownloadFromUrl(url)
        })

        ipcMain.handle(`Renderer:Resource:WriteStringToFile`, async (e, path: string, str: string) => {
            return await new Promise((resolve, reject) => {
                F.writeFile(path, str, (err) => {
                    if (err) {
                        resolve(false)
                    }
                    resolve(true)
                })
            })
        })

        ipcMain.handle(`Renderer:Resource:ReadStringFromFile`, async (e, path: string) => {
            return await new Promise((resolve, reject) => {
                F.readFile(path, (err, data) => {
                    if (err) {
                        resolve({})
                    }
                    resolve(data.toString())
                })
            })
        })

        ipcMain.handle(`Renderer:Resource:AppendStringToFile`, async (e, path: string, str: string, newline: boolean) => {
            return await new Promise((resolve, reject) => {
                F.appendFile(path, newline ? `\n${str}` : str, (err) => {
                    if (err) {
                        resolve(false)
                    }
                    resolve(true)
                })
            })
        })

        ipcMain.handle(`Renderer:Resource:GetFileMetadata`, async (e, path: string) => {
            return await new Promise((resolve, reject) => {
                F.stat(path, (err, data) => {
                    if (err) {
                        resolve({})
                    }
                    resolve({
                        ...data,
                        file: data.isFile(),
                        directory: data.isDirectory()
                    })
                })
            })
        })
    }

    private OnGlobalShortcutIPC() {
        ipcMain.handle(`Renderer:GlobalShortcut:Register`, async (e, accelerator: Electron.Accelerator) => {
            const result = GlobalShortcut.Instance.Register(accelerator, () => { })
            return result
        })

        ipcMain.on(`Renderer:GlobalShortcut:Unregister`, (e, accelerator: Electron.Accelerator) => {
            GlobalShortcut.Instance.Unregister(accelerator)
        })

        ipcMain.on(`Renderer:GlobalShortcut:UnregisterAll`, (e) => {
            GlobalShortcut.Instance.UnregisterAll()
        })

        ipcMain.handle(`Renderer:GlobalShortcut:IsRegistered`, async (e, accelerator: Electron.Accelerator) => {
            const result = GlobalShortcut.Instance.IsRegistered(accelerator)
            return result
        })
    }

    private OnMessage(e: D.IIpcRendererReceiveMessage & { type: D.IpcRendererWindow, id: number }) {
        if (e.type == D.IpcRendererWindow.Main) {

        }
        else if (e.type == D.IpcRendererWindow.Tray) {

        }
        else {
            if (e.reason == "Empty") {
                const target = CustomWidget.Instance.FindWidget(e.id)
                WindowPool.Instance.PostMessage({
                    type: D.IpcRendererEvent.WidgetEmpty,
                    widgets: [D.IpcRendererWindow.Main],
                    send: {
                        label: target?.lable
                    }
                })
            }
        }
    }
}

export { IpcMainHandle }
