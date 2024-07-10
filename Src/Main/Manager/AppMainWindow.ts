import { BrowserWindow, Menu } from 'electron'
import { ResourceLoad } from '@Main/Manager/ResourceLoad'
import { Configuration } from '@Main/Manager/Configuration'
import { TWindow } from '@Main/Libs/TWindow'
import { D } from '@Decorators/D'
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
            icon: ResourceLoad.Instance.GetImageByName('window.ico'),
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
            // this.widget.show()
        })

        //这样并不会生效 详情去issues看 链接：https://github.com/electron/electron/issues/26726
        this.widget.on('system-context-menu', (e) => {
            e.preventDefault()
        })

        //目前临时解决方法 链接：https://github.com/electron/electron/issues/24893#issuecomment-1109262719
        this.widget.hookWindowMessage(0x0116, () => {
            this.widget.setEnabled(false)
            this.widget.setEnabled(true)
        })

        this.widget.on('close', (e) => {
            e.preventDefault()
            this.widget.hide()
        })

        if (Configuration.Instance.configs.debug) {
            this.widget.webContents.openDevTools()
        }

        this.widget.loadURL(ResourceLoad.Instance.GetPageByName('Application'))

        // 我这里取消了默认的菜单栏 你可以自定义
        Menu.setApplicationMenu(null)

        WindowPool.Instance.RegisterWindow(D.IpcRendererWindow.Main, this)
    }
}

export { AppMainWindow }