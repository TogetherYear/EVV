import { BrowserWindow, Menu, ipcMain } from 'electron'
import { ResourceLoad } from '@main/manager/ResourceLoad'
import { Configuration } from '@main/manager/Configuration'
import { TWindow } from '@main/libs/TWindow'

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
            minWidth: 1000,
            height: 560,
            minHeight: 560,
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

        this.widget.loadURL(ResourceLoad.Instance.GetPageByName('/Application'))

        // 我这里取消了默认的菜单栏 你可以自定义
        Menu.setApplicationMenu(null)
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

    public OnClose() {
        this.widget.hide()
    }
}

export { AppMainWindow }