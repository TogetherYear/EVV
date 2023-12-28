import { BrowserWindow, Menu } from 'electron'
import { ResourceLoad } from '@main/manager/ResourceLoad'
import { Configuration } from '@main/manager/Configuration'
import { TWindow } from '@main/libs/TWindow'
import { D } from '@decorators/D'
import { WindowPool } from './WindowPool'

class AppMainWindow extends TWindow {
    private constructor() {
        super()
    }

    private static instance: AppMainWindow = new AppMainWindow()

    public static get Instance(): AppMainWindow {
        return this.instance
    }

    public async Run() {
        this.CreateWidget()
    }

    private CreateWidget() {
        this.widget = new BrowserWindow({
            title: 'Application',
            show: false,
            width: 1000,
            minWidth: 550,
            height: 560,
            minHeight: 280,
            resizable: true,
            useContentSize: true,
            frame: false,
            backgroundColor: '#212121',
            icon: ResourceLoad.Instance.GetImageByName('window.png'),
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
                preload: ResourceLoad.Instance.GetPreloadByName('Renderer')
            }
        })

        this.widget.once('ready-to-show', () => {
            this.widget.show()
            this.widget.focus()
        })

        if (Configuration.Instance.configs.debug) {
            this.widget.webContents.openDevTools()
        }

        this.widget.loadURL(ResourceLoad.Instance.GetPageByName('Application'))

        // 我这里取消了默认的菜单栏 你可以自定义
        Menu.setApplicationMenu(null)

        WindowPool.Instance.RegisterWindow(D.IpcRendererWindow.Main, this)
    }

    public OnMin() {
        this.widget.minimize()
    }

    public OnMax() {
        if (this.widget.isMaximized()) {
            this.widget.unmaximize()
        }
        else {
            this.widget.maximize()
        }
    }

    public OnHide() {
        this.widget.hide()
    }

    public OnShow() {
        this.widget.show()
    }

    public OnCenter() {
        this.widget.center()
    }

    public OnSetPosition(position: { x: number, y: number }) {
        this.widget.setPosition(position.x, position.y)
    }

    public OnResize(size: { width: number, height: number }) {
        this.widget.setSize(size.width, size.height)
    }
}

export { AppMainWindow }