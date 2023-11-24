import { ResourceLoad } from '@main/manager/ResourceLoad'
import { app, Menu, Tray, MenuItemConstructorOptions, MenuItem } from 'electron'
import { AppMainWindow } from './AppMainWindow'
import { TWindow } from '@main/libs/TWindow'

class AppTray extends TWindow {
    private constructor() {
        super()
    }

    private static instance: AppTray = new AppTray()

    public static get Instance(): AppTray {
        return this.instance
    }

    public tray!: Tray

    public menu!: Menu

    public Run() {
        this.CreateWidget()
        this.CreateTray()
    }

    private CreateWidget() {

    }

    private CreateTray() {
        if (process.platform === 'win32') {
            //设置托盘图标和菜单
            let trayMenuTemplate: Array<(MenuItemConstructorOptions) | (MenuItem)> = [
                {
                    label: 'Together丨233',
                    enabled: false
                },
                {
                    type: 'separator',

                },
                {
                    label: '显示主界面',
                    click: () => {
                        AppMainWindow.Instance.widget.show()
                    }
                },
                {
                    label: '关闭',
                    click: () => {
                        app.quit()
                        app.quit() //因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
                    }
                }
            ]
            //系统托盘图标
            this.tray = new Tray(ResourceLoad.Instance.GetImageByName('tray.png'))

            //图标的上下文菜单
            this.menu = Menu.buildFromTemplate(trayMenuTemplate)

            //设置此托盘图标的悬停提示内容
            this.tray.setToolTip('Electron-Vue-Vite')

            //设置此图标的上下文菜单
            this.tray.setContextMenu(this.menu)

            //右键
            this.tray.on('right-click', () => {
                this.tray.popUpContextMenu(this.menu)
            })

            this.tray.on('double-click', () => {
                AppMainWindow.Instance.widget.show()
            })
        }
    }
}

export { AppTray }
