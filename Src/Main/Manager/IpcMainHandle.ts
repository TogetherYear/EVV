import { AppMainWindow } from '@Main/Manager/AppMainWindow';
import { BrowserWindow, app, ipcMain, shell, dialog } from 'electron';
import { ResourceLoad } from '@Main/Manager/ResourceLoad';
import { AppTray } from '@Main/Manager/AppTray';
import { I } from '@Src/Instructions/I';
import { WindowPool } from './WindowPool';
import * as F from 'fs';
import { CustomWidget } from './CustomWidget';
import * as HMC from 'hmc-win32';
import { Manager } from '@Main/Libs/Manager';

/**
 * 主线程 Ipc 监听
 */
class IpcMainHandle extends Manager {
    public Run() {
        this.OnAppIPC();
        this.OnWidgetIPC();
        this.OnShellIPC();
        this.OnTrayIPC();
        this.OnResourceIPC();
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

        ipcMain.on(`Renderer:Widget:PostMessage`, (e, d: I.IIpcRendererReceiveMessage) => {
            switch (e.sender.id) {
                case AppMainWindow.widget.webContents.id:
                    this.OnMessage({ ...d, type: I.IpcRendererWindow.Main, id: e.sender.id });
                    return;
                case AppTray.widget.webContents.id:
                    this.OnMessage({ ...d, type: I.IpcRendererWindow.Tray, id: e.sender.id });
                    return;
                default:
                    this.OnMessage({ ...d, type: I.IpcRendererWindow.Other, id: e.sender.id });
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

    private OnMessage(e: I.IIpcRendererReceiveMessage & { type: I.IpcRendererWindow; id: number }) {
        if (e.type === I.IpcRendererWindow.Main) {
        } else if (e.type === I.IpcRendererWindow.Tray) {
        } else {
            if (e.reason === 'Empty') {
                const target = CustomWidget.FindWidget(e.id);
                WindowPool.PostMessage({
                    type: I.IpcRendererEvent.WidgetEmpty,
                    widgets: [I.IpcRendererWindow.Main],
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
