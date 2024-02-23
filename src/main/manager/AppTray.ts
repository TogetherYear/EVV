import { ResourceLoad } from '@main/manager/ResourceLoad'
import { Menu, Tray, BrowserWindow, screen } from 'electron'
import { AppMainWindow } from '@main/manager/AppMainWindow'
import { TWindow } from '@main/libs/TWindow'
import { Configuration } from '@main/manager/Configuration'
import { WindowPool } from '@main/manager/WindowPool'
import { D } from '@decorators/D'

class AppTray extends TWindow {
    private constructor() {
        super()
    }

    private static instance: AppTray = new AppTray()

    public static get Instance(): AppTray {
        return this.instance
    }

    public tray!: Tray

    private flashTimer: NodeJS.Timeout | null = null

    public Run() {
        this.CreateWidget()
        this.CreateTray()
    }

    private CreateWidget() {
        this.widget = new BrowserWindow({
            title: 'Tray',
            show: false,
            width: 260,
            minWidth: 260,
            maxWidth: 260,
            height: 303,
            minHeight: 303,
            maxHeight: 303,
            resizable: false,
            useContentSize: true,
            frame: false,
            backgroundColor: '#00212121',
            alwaysOnTop: true,
            transparent: true,
            skipTaskbar: true,
            icon: ResourceLoad.Instance.GetImageByName('tray.ico'),
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

        this.widget.on('blur', () => {
            this.OnHide()
        })

        if (Configuration.Instance.configs.debug) {
            this.widget.webContents.openDevTools()
        }

        this.widget.loadURL(ResourceLoad.Instance.GetPageByName('Tray'))

        // 我这里取消了默认的菜单栏 你可以自定义
        Menu.setApplicationMenu(null)

        WindowPool.Instance.RegisterWindow(D.IpcRendererWindow.Tray, this)
    }

    private CreateTray() {
        if (process.platform == 'win32') {
            //系统托盘图标
            this.tray = new Tray(ResourceLoad.Instance.GetImageByName('tray.ico'))

            //设置此托盘图标的悬停提示内容
            this.tray.setToolTip('去码头整点薯条')

            this.tray.on('right-click', () => {
                const point = screen.getCursorScreenPoint()
                const size = this.widget.getSize()
                this.OnSetPosition({ x: point.x - size[0] + 2, y: point.y - size[1] + 2 })
                this.OnShow()
            })

            this.tray.on('double-click', () => {
                AppMainWindow.Instance.OnShow()
            })
        }
    }

    public OnHide() {
        this.widget.hide()
    }

    public OnShow() {
        this.widget.setAlwaysOnTop(true)
        this.widget.show()
    }

    public OnSetPosition(position: { x: number, y: number }) {
        this.widget.setPosition(position.x, position.y)
    }

    public OnResize(size: { width: number, height: number }) {
        this.widget.setSize(size.width, size.height)
    }

    public OnSetIcon(icon: string) {
        const showIcon = ResourceLoad.Instance.GetImageByName(icon)
        this.tray.setImage(showIcon)
    }

    public OnSetTooltip(tooltip: string) {
        this.tray.setToolTip(tooltip)
    }

    public OnFlash(icon: string) {
        let show = true
        const emptyIcon = ResourceLoad.Instance.GetImageByName("empty.ico")
        const showIcon = ResourceLoad.Instance.GetImageByName(icon)
        this.flashTimer = setInterval(() => {
            if (show) {
                this.tray.setImage(emptyIcon)
            }
            else {
                this.tray.setImage(showIcon)
            }
            show = !show
        }, 700)
    }

    public OnStopFlash(icon: string) {
        const showIcon = ResourceLoad.Instance.GetImageByName(icon)
        if (this.flashTimer) {
            clearInterval(this.flashTimer)
            this.flashTimer = null
        }
        this.tray.setImage(showIcon)
    }
}

export { AppTray }
