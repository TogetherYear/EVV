import { AppMainWindow } from '@Main/Manager/AppMainWindow';
import { BrowserWindow, app, ipcMain, screen, shell, dialog } from 'electron';
import { ResourceLoad } from '@Main/Manager/ResourceLoad';
import { AppTray } from '@Main/Manager/AppTray';
import { D } from '@Src/Instructions/D';
import { GlobalShortcut } from './GlobalShortcut';
import { WindowPool } from './WindowPool';
import * as F from 'fs';
import { Download } from './Download';
import { CustomWidget } from './CustomWidget';
import * as NS from 'node-screenshots';
import * as FS from 'fs';
import * as RN from 'rubick-native';
import * as IN from '@napi-rs/image';

/**
 * 主线程 Ipc 监听
 */
class IpcMainHandle {
    public Run() {
        this.OnAppIPC();
        this.OnWidgetIPC();
        this.OnShellIPC();
        this.OnTrayIPC();
        this.OnScreenIPC();
        this.OnWindowIPC();
        this.OnResourceIPC();
        this.OnGlobalShortcutIPC();
        this.OnSimulateIPC();
        this.OnImageIPC();
    }

    private OnAppIPC() {
        ipcMain.on(`Renderer:App:Close`, (e) => {
            app.exit(0);
        });

        ipcMain.handle(`Renderer:App:SetAutostart`, async (e, enable: boolean) => {
            const result = app.setLoginItemSettings({
                openAtLogin: enable
            });
            return result;
        });

        ipcMain.on(`Renderer:App:Relaunch`, (e) => {
            app.relaunch();
            app.exit(0);
        });

        ipcMain.handle(`Renderer:App:IsAutostart`, async (e) => {
            const enable = app.getLoginItemSettings().openAtLogin;
            return enable;
        });

        ipcMain.handle(`Renderer:App:CreateCustomWindow`, async (e, options: TSingleton.CustomWidgetOptions) => {
            const result = CustomWidget.CreateWindow(options);
            return result;
        });
    }

    private OnWidgetIPC() {
        ipcMain.handle(`Renderer:Widget:Min`, async (e) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            return widget.minimize();
        });

        ipcMain.handle(`Renderer:Widget:Max`, async (e) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            if (widget.isMaximized()) {
                return widget.unmaximize();
            } else {
                return widget.maximize();
            }
        });

        ipcMain.handle(`Renderer:Widget:Hide`, async (e) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            return widget.hide();
        });

        ipcMain.handle(`Renderer:Widget:Close`, async (e) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            return widget.close();
        });

        ipcMain.handle(`Renderer:Widget:Show`, async (e) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            return widget.show();
        });

        ipcMain.handle(`Renderer:Widget:Center`, async (e) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            return widget.center();
        });

        ipcMain.handle(`Renderer:Widget:SetPosition`, async (e, position: { x: number; y: number }) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            return widget.setPosition(position.x, position.y);
        });

        ipcMain.handle(`Renderer:Widget:GetPosition`, async (e) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            const position = widget.getPosition();
            return {
                x: position[0],
                y: position[1]
            };
        });

        ipcMain.handle(`Renderer:Widget:SetSize`, async (e, size: { width: number; height: number }) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            return widget.setSize(size.width, size.height);
        });

        ipcMain.handle(`Renderer:Widget:SetAlwaysOnTop`, async (e, flag: boolean) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            return widget.setAlwaysOnTop(flag);
        });

        ipcMain.on(`Renderer:Widget:PostMessage`, (e, d: D.IIpcRendererReceiveMessage) => {
            switch (e.sender.id) {
                case AppMainWindow.widget.webContents.id:
                    this.OnMessage({ ...d, type: D.IpcRendererWindow.Main, id: e.sender.id });
                    return;
                case AppTray.widget.webContents.id:
                    this.OnMessage({ ...d, type: D.IpcRendererWindow.Tray, id: e.sender.id });
                    return;
                default:
                    this.OnMessage({ ...d, type: D.IpcRendererWindow.Other, id: e.sender.id });
                    return;
            }
        });

        ipcMain.handle(`Renderer:Widget:GetBounds`, async (e) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            return widget.getBounds();
        });

        ipcMain.handle(`Renderer:Widget:SetShadow`, async (e, flag: boolean) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            return (widget.shadow = flag);
        });

        ipcMain.handle(`Renderer:Widget:SetIgnoreCursorEvents`, async (e, flag: boolean) => {
            const widget = BrowserWindow.fromWebContents(e.sender) as BrowserWindow;
            return widget.setIgnoreMouseEvents(flag);
        });
    }

    private OnShellIPC() {
        ipcMain.handle(`Renderer:Shell:Beep`, async () => {
            const result = shell.beep();
            return result;
        });

        ipcMain.handle(`Renderer:Shell:OpenInFolder`, async (e, path: string) => {
            const result = shell.showItemInFolder(path);
            return result;
        });

        ipcMain.handle(`Renderer:Shell:OpenPathByDefault`, async (e, path: string) => {
            const result = shell.openPath(path);
            return result;
        });
    }

    private OnTrayIPC() {
        ipcMain.handle(`Renderer:Tray:Icon`, async (e, icon: string) => {
            const result = AppTray.OnSetIcon(icon);
            return result;
        });

        ipcMain.handle(`Renderer:Tray:Tooltip`, async (e, tooltip: string) => {
            const result = AppTray.OnSetTooltip(tooltip);
            return result;
        });

        ipcMain.handle(`Renderer:Tray:Flash`, async (e, icon: string) => {
            const result = AppTray.OnFlash(icon);
            return result;
        });

        ipcMain.handle(`Renderer:Tray:StopFlash`, async (e, icon: string) => {
            const result = AppTray.OnStopFlash(icon);
            return result;
        });
    }

    private OnScreenIPC() {
        ipcMain.handle(`Renderer:Screen:GetHoldCursor`, async (e) => {
            const point = screen.getCursorScreenPoint();
            const monitor = NS.Monitor.fromPoint(point.x, point.y) as NS.Monitor;
            return this.TransformScreen(monitor);
        });

        ipcMain.handle(`Renderer:Screen:GetAll`, async () => {
            const monitors = NS.Monitor.all().map((m) => this.TransformScreen(m));
            return monitors;
        });

        ipcMain.handle(`Renderer:Screen:GetPrimary`, async () => {
            const monitor = NS.Monitor.all().find((a) => a.isPrimary) as NS.Monitor;
            return this.TransformScreen(monitor);
        });

        ipcMain.handle(`Renderer:Screen:Capture`, async (e, id: number, path: string) => {
            const monitor = NS.Monitor.all().find((m) => m.id == id) as NS.Monitor;
            const image = monitor.captureImageSync();
            const buffer = Uint8Array.from(image.toPngSync());
            const target = ResourceLoad.GetResourcePathByName(path);
            return await new Promise((resolve, reject) => {
                FS.writeFile(target, buffer, (err) => {
                    if (err) {
                        resolve('');
                    }
                    resolve(target);
                });
            });
        });
    }

    private TransformScreen(monitor: NS.Monitor): Omit<TSingleton.IScreen, 'Capture'> {
        return {
            id: monitor.id,
            width: monitor.width,
            height: monitor.height,
            x: monitor.x,
            y: monitor.y,
            isPrimary: monitor.isPrimary
        };
    }

    private OnWindowIPC() {
        ipcMain.handle(`Renderer:Window:GetAll`, async () => {
            const windows = NS.Window.all().map((w) => this.TransformWindow(w));
            return windows;
        });

        ipcMain.handle(`Renderer:Window:Capture`, async (e, id: number, path: string) => {
            const window = NS.Window.all().find((w) => w.id == id) as NS.Window;
            const image = window.captureImageSync();
            const buffer = Uint8Array.from(image.toPngSync());
            const target = ResourceLoad.GetResourcePathByName(path);
            return await new Promise((resolve, reject) => {
                FS.writeFile(target, buffer, (err) => {
                    if (err) {
                        resolve('');
                    }
                    resolve(target);
                });
            });
        });
    }

    private TransformWindow(window: NS.Window): Omit<TSingleton.IWindow, 'Capture'> {
        return {
            id: window.id,
            name: window.appName,
            //@ts-ignore
            screen: this.TransformScreen(window.currentMonitor),
            width: window.width,
            height: window.height,
            isMinimized: window.isMinimized,
            x: window.x,
            y: window.y
        };
    }

    private OnResourceIPC() {
        ipcMain.handle(`Renderer:Resource:GetPathByName`, async (e, name: string) => {
            const path = ResourceLoad.GetResourcePathByName(name);
            return path;
        });

        ipcMain.handle(`Renderer:Resource:SelectResourcesPath`, async (e, options: TSingleton.SelectOptions) => {
            const window = WindowPool.GetWindowById(e.sender.id);
            const features: Array<'multiSelections' | 'openDirectory' | 'openFile'> = [];
            if (options.multiple) {
                features.push('multiSelections');
            }
            if (options.directory) {
                features.push('openDirectory');
            } else {
                features.push('openFile');
            }
            const path = dialog.showOpenDialogSync(window.widget, {
                title: options.title,
                defaultPath: options.defaultPath,
                filters: options.filters,
                properties: features
            });
            return path;
        });

        ipcMain.handle(`Renderer:Resource:GetSaveResourcesPath`, async (e, options: TSingleton.SaveOptions) => {
            const window = WindowPool.GetWindowById(e.sender.id);
            const path = dialog.showSaveDialog(window.widget, {
                title: options.title,
                defaultPath: options.defaultPath,
                filters: options.filters
            });
            return path;
        });

        ipcMain.handle(`Renderer:Resource:IsPathExists`, async (e, path: string) => {
            const result = F.existsSync(path);
            return result;
        });

        ipcMain.handle(`Renderer:Resource:ReadDirFiles`, async (e, dir: string) => {
            return await new Promise((resolve, reject) => {
                F.readdir(dir, (err, files) => {
                    if (err) {
                        resolve([]);
                    }
                    resolve(files);
                });
            });
        });

        ipcMain.handle(`Renderer:Resource:CreateDir`, async (e, dir: string) => {
            return await new Promise((resolve, reject) => {
                F.mkdir(dir, (err) => {
                    if (err) {
                        resolve(false);
                    }
                    resolve(true);
                });
            });
        });

        ipcMain.handle(`Renderer:Resource:RemoveDir`, async (e, dir: string) => {
            return await new Promise((resolve, reject) => {
                F.rmdir(dir, (err) => {
                    if (err) {
                        resolve(false);
                    }
                    resolve(true);
                });
            });
        });

        ipcMain.handle(`Renderer:Resource:RemoveFile`, async (e, path: string) => {
            return await new Promise((resolve, reject) => {
                F.unlink(path, (err) => {
                    if (err) {
                        resolve(false);
                    }
                    resolve(true);
                });
            });
        });

        ipcMain.handle(`Renderer:Resource:Rename`, async (e, path: string, newPath: string) => {
            return await new Promise((resolve, reject) => {
                F.rename(path, newPath, (err) => {
                    if (err) {
                        resolve(false);
                    }
                    resolve(true);
                });
            });
        });

        ipcMain.handle(`Renderer:Resource:CopyFile`, async (e, path: string, newPath: string) => {
            return await new Promise((resolve, reject) => {
                F.copyFile(path, newPath, (err) => {
                    if (err) {
                        resolve(false);
                    }
                    resolve(true);
                });
            });
        });

        ipcMain.on(`Renderer:Resource:Download`, (e, url: string) => {
            Download.DownloadFromUrl(url);
        });

        ipcMain.handle(`Renderer:Resource:WriteStringToFile`, async (e, path: string, str: string) => {
            return await new Promise((resolve, reject) => {
                F.writeFile(path, str, (err) => {
                    if (err) {
                        resolve(false);
                    }
                    resolve(true);
                });
            });
        });

        ipcMain.handle(`Renderer:Resource:ReadStringFromFile`, async (e, path: string) => {
            return await new Promise((resolve, reject) => {
                F.readFile(path, (err, data) => {
                    if (err) {
                        resolve('Error');
                    }
                    resolve(data.toString());
                });
            });
        });

        ipcMain.handle(`Renderer:Resource:AppendStringToFile`, async (e, path: string, str: string, newline: boolean) => {
            return await new Promise((resolve, reject) => {
                F.appendFile(path, newline ? `\n${str}` : str, (err) => {
                    if (err) {
                        resolve(false);
                    }
                    resolve(true);
                });
            });
        });

        ipcMain.handle(`Renderer:Resource:GetFileMetadata`, async (e, path: string) => {
            return await new Promise((resolve, reject) => {
                F.stat(path, (err, data) => {
                    if (err) {
                        resolve({});
                    }
                    resolve({
                        ...data,
                        file: data.isFile(),
                        directory: data.isDirectory()
                    });
                });
            });
        });
    }

    private OnGlobalShortcutIPC() {
        ipcMain.handle(`Renderer:GlobalShortcut:Register`, async (e, accelerator: Electron.Accelerator) => {
            const result = GlobalShortcut.Register(accelerator, () => {});
            return result;
        });

        ipcMain.handle(`Renderer:GlobalShortcut:Unregister`, async (e, accelerator: Electron.Accelerator) => {
            const result = GlobalShortcut.Unregister(accelerator);
            return result;
        });

        ipcMain.handle(`Renderer:GlobalShortcut:UnregisterAll`, (e) => {
            const result = GlobalShortcut.UnregisterAll();
            return result;
        });

        ipcMain.handle(`Renderer:GlobalShortcut:IsRegistered`, async (e, accelerator: Electron.Accelerator) => {
            const result = GlobalShortcut.IsRegistered(accelerator);
            return result;
        });
    }

    private OnSimulateIPC() {
        ipcMain.handle(`Renderer:Simulate:MouseMove`, async (e, options: TSingleton.MouseMoveOptions) => {
            const result = RN.mouseMove({
                type: options.type,
                data: {
                    x: options.x,
                    y: options.y
                }
            });
            return result;
        });

        ipcMain.handle(`Renderer:Simulate:MouseScroll`, async (e, options: TSingleton.MouseScrollOptions) => {
            if (options.type === 'x') {
                const result = RN.mouseScrollX(options.length);
                return result;
            } else {
                const result = RN.mouseScrollY(options.length);
                return result;
            }
        });

        ipcMain.handle(`Renderer:Simulate:MouseDown`, async (e, btn: TSingleton.MouseBtn) => {
            const result = RN.mouseDown(btn);
            return result;
        });

        ipcMain.handle(`Renderer:Simulate:MouseUp`, async (e, btn: TSingleton.MouseBtn) => {
            const result = RN.mouseUp(btn);
            return result;
        });

        ipcMain.handle(`Renderer:Simulate:GetMousePosition`, async (e) => {
            const result = RN.mouseLocaion();
            return result;
        });

        ipcMain.handle(`Renderer:Simulate:MouseClick`, async (e, btn: TSingleton.MouseBtn) => {
            const result = RN.mouseClick(btn);
            return result;
        });
    }

    private OnImageIPC() {
        ipcMain.handle(`Renderer:Image:Transformer`, async (e, options: TSingleton.ImageTransformerOptions) => {
            const t = new IN.Transformer(FS.readFileSync(options.inputPath));
            let buffer!: Buffer;
            switch (options.outputFormat) {
                case 'Webp':
                    buffer = await t.webp();
                    break;
                case 'Avif':
                    buffer = await t.avif();
                    break;
                case 'Png':
                    buffer = await t.png();
                    break;
                case 'Jpeg':
                    buffer = await t.jpeg();
                    break;
                case 'Bmp':
                    buffer = await t.bmp();
                    break;
                case 'Ico':
                    buffer = await t.ico();
                    break;
                case 'Tiff':
                    buffer = await t.tiff();
                    break;
                case 'Pnm':
                    buffer = await t.pnm();
                    break;
                case 'Tga':
                    buffer = await t.tga();
                    break;
                case 'Farbfeld':
                    buffer = await t.farbfeld();
                    break;
            }
            const result = FS.writeFileSync(options.outputPath, Uint8Array.from(buffer));
            return result;
        });
    }

    private OnMessage(e: D.IIpcRendererReceiveMessage & { type: D.IpcRendererWindow; id: number }) {
        if (e.type == D.IpcRendererWindow.Main) {
        } else if (e.type == D.IpcRendererWindow.Tray) {
        } else {
            if (e.reason == 'Empty') {
                const target = CustomWidget.FindWidget(e.id);
                WindowPool.PostMessage({
                    type: D.IpcRendererEvent.WidgetEmpty,
                    widgets: [D.IpcRendererWindow.Main],
                    send: {
                        label: target?.lable
                    }
                });
            }
        }
    }
}

const IpcMainHandleInstance = new IpcMainHandle();

export { IpcMainHandleInstance as IpcMainHandle };
