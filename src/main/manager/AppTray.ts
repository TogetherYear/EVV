import { ResourceLoad } from '@main/plugins/ResourceLoad'
import { app, Menu, Tray } from 'electron'
import { AppMainWindow } from './AppMainWindow'

class AppTray {
    private constructor() { }

    private static instance: AppTray = new AppTray()

    public static get Instance(): AppTray {
        return this.instance
    }

    public widget: Tray | null = null

    public Run() {
        this.CreateTray()
    }

    private CreateTray() {
        if (process.platform === 'win32') {
            //设置托盘图标和菜单
            let trayMenuTemplate: any = [
                {
                    label: 'Together丨233',
                    enabled: false
                },
                {
                    type: 'separator'
                },
                {
                    label: '显示主界面',
                    click: () => {
                        AppMainWindow.Instance.widget?.show()
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
            this.widget = new Tray(ResourceLoad.Instance.GetImageByName('tray.png'))

            //图标的上下文菜单
            const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)

            //设置此托盘图标的悬停提示内容
            this.widget.setToolTip('Electron-Vue-Vite')

            //设置此图标的上下文菜单
            this.widget.setContextMenu(contextMenu)

            this.widget.on('click', () => {

            })

            this.widget.on('double-click', () => {
                AppMainWindow.Instance.widget?.show()
            })
            //右键
            this.widget.on('right-click', () => {
                this.widget?.popUpContextMenu(trayMenuTemplate)
            })
        }
    }
}

export { AppTray }
