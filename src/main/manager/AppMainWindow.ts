import { BrowserWindow, Menu, ipcMain } from 'electron'
import { ResourceLoad } from '@main/plugins/ResourceLoad'
import { Configuration } from '@main/plugins/Configuration'
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
                // elecrton v5.0.0 以后该选项默认为false,需手动设为true
                nodeIntegration: true,
                // elecrton v12.0.0 以后该选项默认为true,需手动设为false与上一个合作消除require提示错误
                contextIsolation: false,
                // 设为false则禁用devtool开发者调试工具
                devTools: true,
                // 预加载脚本 仅为示例
                preload: ResourceLoad.Instance.GetPreloadByName('Renderer')
            }
        })

        this.widget.once('ready-to-show', () => {
            this.widget.show()
            this.widget.focus()
        })

        if (Configuration.Instance.configs.debug) {
            this.widget.webContents.toggleDevTools()
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