import { EventSystem } from '@Src/Libs/EventSystem';
import { BrowserWindow } from 'electron';
import { WindowPool } from './WindowPool';
import { I } from '@Src/Instructions/I';
import { ResourceLoad } from './ResourceLoad';
import { Configuration } from './Configuration';
import { IM } from '@Main/Instructions/IM';

class CustomWidget extends EventSystem {
    private widgets = new Map<string, { widget: BrowserWindow; lable: string }>();

    public Run() {}

    public CreateWindow(options: TSingleton.CustomWidgetOptions) {
        const target = this.widgets.get(options.label);
        if (!target) {
            const widget = new BrowserWindow({
                title: options.label,
                width: options.width || 1000,
                height: options.height || 560,
                useContentSize: true,
                frame: options.frame || true,
                backgroundColor: options.backgroundColor || '#ff212121',
                alwaysOnTop: options.alwaysOnTop || false,
                transparent: options.transparent || false,
                skipTaskbar: options.skipTaskbar || false,
                icon: options.icon || ResourceLoad.GetImageByName('window.ico'),
                show: options.show || true,
                webPreferences: {
                    // 同源
                    webSecurity: false,
                    // 渲染进程集成 node
                    nodeIntegration: false,
                    // 是否独立线程运行 api 和 preload
                    contextIsolation: false,
                    // 设为false则禁用devtool开发者调试工具
                    devTools: Configuration.configs.debug,
                    // https 运行 http
                    allowRunningInsecureContent: true,
                    // 预加载脚本 仅为示例
                    preload: options.preload || ResourceLoad.GetPreloadByName('Renderer')
                }
            });
            widget.loadURL(options.url);

            if (Configuration.configs.debug) {
                widget.webContents.openDevTools();
            }

            this.RegisterWidget(options.label, widget);

            WindowPool.PostMessage({
                type: I.IpcRendererEvent.WidgetCreate,
                widgets: [I.IpcRendererWindow.Main],
                send: {
                    label: options.label
                }
            });

            widget.on('close', () => {
                this.DeleteWidget(options.label);
                WindowPool.PostMessage({
                    type: I.IpcRendererEvent.WidgetDestroy,
                    widgets: [I.IpcRendererWindow.Main],
                    send: {
                        label: options.label
                    }
                });
            });
        } else {
            target.widget.show();
        }
    }

    public FindWidget(id: number) {
        for (let w of this.widgets) {
            if (w[1].widget.webContents.id === id) {
                return w[1];
            }
        }
    }

    public RegisterWidget(label: string, widget: BrowserWindow) {
        this.widgets.set(label, { widget, lable: label });
    }

    public DeleteWidget(label: string) {
        this.widgets.delete(label);
    }
}

const CustomWidgetInstance = new CustomWidget();

export { CustomWidgetInstance as CustomWidget };
