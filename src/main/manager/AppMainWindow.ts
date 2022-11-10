import { BrowserWindow, Menu } from 'electron'
import { ResourceLoad } from '@main/plugins/ResourceLoad'
import { Configuration } from '@main/plugins/Configuration'

class AppMainWindow {
    private constructor() { }

    private static instance: AppMainWindow = new AppMainWindow()

    public static get Instance(): AppMainWindow {
        return this.instance
    }

    public widget: BrowserWindow | null = null

    public Run() {
        this.CreateWidget()
    }

    private CreateWidget() {
        this.widget = new BrowserWindow({
            title: 'Vessel',
            width: 1000,
            minWidth: 1000,
            height: 560,
            minHeight: 560,
            resizable: true,
            useContentSize: true,
            frame: false,
            backgroundColor: '#212121',
            opacity: 1.0,
            icon: ResourceLoad.Instance.GetImageByName('window.png'),
            webPreferences: {
                // elecrton v5.0.0 以后该选项默认为false,需手动设为true
                nodeIntegration: true,
                // elecrton v12.0.0 以后该选项默认为true,需手动设为false       与上一个合作消除require提示错误
                contextIsolation: false,
                // 设为false则禁用devtool开发者调试工具
                devTools: true,
                // 预加载脚本 仅为示例
                preload: ResourceLoad.Instance.GetPreloadByName('Vibe')
            }
        })
        if (Configuration.Instance.configs.DEBUG) {
            this.widget.webContents.toggleDevTools()
        }
        this.widget.loadURL(ResourceLoad.Instance.GetPageByName('/'))
        // 我这里取消了默认的菜单栏 你可以自定义
        Menu.setApplicationMenu(null)

        this.widget.on('closed', () => {
            this.widget = null
        })
    }
}

export { AppMainWindow }