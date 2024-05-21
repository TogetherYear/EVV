import { EventSystem } from '@libs/EventSystem'
import { BrowserWindow } from 'electron'
import { WindowPool } from './WindowPool'
import { D } from '@decorators/D'
import { ResourceLoad } from './ResourceLoad'
import { Configuration } from './Configuration'
import { DM } from '@main/decorators/DM'

class CustomWidget extends EventSystem {
    private constructor() {
        super()
    }

    private static instance = new CustomWidget()

    public static get Instance() {
        return this.instance
    }

    private widgets = new Map<string, { widget: BrowserWindow, lable: string }>()

    public Run() {

    }

    public CreateWindow(options: TSingleton.CustomWidgetOptions) {
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
            icon: options.icon || ResourceLoad.Instance.GetImageByName('window.ico'),
            show: options.show || true,
            webPreferences: {
                // 同源
                webSecurity: false,
                // 渲染进程集成 node
                nodeIntegration: false,
                // 是否独立线程运行 api 和 preload
                contextIsolation: false,
                // 设为false则禁用devtool开发者调试工具
                devTools: Configuration.Instance.configs.debug,
                // https 运行 http
                allowRunningInsecureContent: true,
                // 预加载脚本 仅为示例
                preload: options.preload || ResourceLoad.Instance.GetPreloadByName('Renderer')
            }
        })
        widget.loadURL(options.url)

        if (Configuration.Instance.configs.debug) {
            widget.webContents.openDevTools()
        }

        this.widgets.set(options.label, { widget, lable: options.label })

        WindowPool.Instance.PostMessage({
            type: D.IpcRendererEvent.WidgetCreate,
            widgets: [D.IpcRendererWindow.Main],
            send: {
                label: options.label
            }
        })

        widget.on('close', () => {
            this.widgets.delete(options.label)
            WindowPool.Instance.PostMessage({
                type: D.IpcRendererEvent.WidgetDestroy,
                widgets: [D.IpcRendererWindow.Main],
                send: {
                    label: options.label
                }
            })
        })
    }

    public HandleWidgetEvents(id: number, cmd: DM.CustomWidgetCmd, options?: Record<string, unknown> | any) {
        const target = this.FindWidget(id)
        if (target) {
            switch (cmd) {
                case DM.CustomWidgetCmd.Min: this.OnMin(target.widget); return;
                case DM.CustomWidgetCmd.Max: this.OnMax(target.widget); return;
                case DM.CustomWidgetCmd.Hide: this.OnHide(target.widget); return;
                case DM.CustomWidgetCmd.Show: this.OnShow(target.widget); return;
                case DM.CustomWidgetCmd.Center: this.OnCenter(target.widget); return;
                case DM.CustomWidgetCmd.Position: this.OnSetPosition(target.widget, options); return;
                case DM.CustomWidgetCmd.Size: this.OnSetSize(target.widget, options); return;
                case DM.CustomWidgetCmd.Close: this.OnClose(target.widget); return;
                case DM.CustomWidgetCmd.Top: this.OnTop(target.widget, options); return;
            }
        }
    }

    public FindWidget(id: number) {
        for (let w of this.widgets) {
            if (w[1].widget.webContents.id == id) {
                return w[1]
            }
        }
    }

    public OnTop(widget: BrowserWindow, flag: boolean) {
        widget.setAlwaysOnTop(flag)
    }

    public OnMin(widget: BrowserWindow) {
        widget.minimize()
    }

    public OnMax(widget: BrowserWindow) {
        if (widget.isMaximized()) {
            widget.unmaximize()
        }
        else {
            widget.maximize()
        }
    }

    public OnHide(widget: BrowserWindow) {
        widget.hide()
    }

    public OnClose(widget: BrowserWindow) {
        widget.close()
    }

    public OnShow(widget: BrowserWindow) {
        if (widget.isMinimized()) {
            widget.restore()
            widget.focus()
        }
        else {
            widget.show()
        }
    }

    public OnCenter(widget: BrowserWindow) {
        widget.center()
    }

    public OnSetPosition(widget: BrowserWindow, position: { x: number, y: number }) {
        widget.setPosition(position.x, position.y)
    }

    public OnSetSize(widget: BrowserWindow, size: { width: number, height: number }) {
        widget.setSize(size.width, size.height)
    }
}

export { CustomWidget }