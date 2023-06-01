import { TWindow } from "@main/libs/TWindow";
import { Configuration } from "@main/plugins/Configuration";
import { ResourceLoad } from "@main/plugins/ResourceLoad";
import { BrowserWindow, Menu, ipcMain, screen } from "electron";

class Screenshot extends TWindow {
    public constructor(OnFinish: (e: Buffer | undefined) => void) {
        super()
        this.callback = OnFinish
        this.CreateWidget()
        this.ListenEvents()
    }

    private callback!: (e: Buffer | undefined) => void

    private CreateWidget() {
        this.widget = new BrowserWindow({
            title: 'Screenshot',
            show: false,
            resizable: false,
            movable: false,
            useContentSize: true,
            frame: false,
            transparent: true,
            backgroundColor: '#00212121',
            alwaysOnTop: true,
            opacity: 1.0,
            icon: ResourceLoad.Instance.GetImageByName('window.png'),
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                contextIsolation: false,
                devTools: true,
                preload: ResourceLoad.Instance.GetPreloadByName('Renderer')
            }
        })

        this.widget.once('ready-to-show', () => {
            const size = this.GetSize()
            this.widget.setBounds({ x: 0, y: -size.yDelta, width: size.width, height: size.height + (size.yDelta * 2) })
            this.widget.setAlwaysOnTop(true, 'pop-up-menu')
            this.widget.show()
            this.widget.focus()
        })

        if (Configuration.Instance.configs.debug) {
            this.widget.webContents.toggleDevTools()
        }
        this.widget.loadURL(ResourceLoad.Instance.GetPageByName('/Screenshot'))

        Menu.setApplicationMenu(null)
    }

    private ListenEvents() {
        this.widget.on('blur', () => {
            this.widget.setAlwaysOnTop(true, 'pop-up-menu')
            this.widget.show()
            this.widget.focus()
        })

        this.widget.webContents.on('before-input-event', (e, i) => {
            if (i.type == 'keyUp' && i.key == 'Escape') {
                this.OnClose()
            }
        })
    }

    private GetSize() {
        const displays = screen.getAllDisplays()
        let size = { width: 0, height: 0, yDelta: 0 }
        for (let d of displays) {
            size.width += d.bounds.width
            size.height = d.bounds.height > size.height ? d.bounds.height : size.height
            size.yDelta = Math.abs(d.bounds.y) > size.yDelta ? Math.abs(d.bounds.y) : size.yDelta
        }
        return size
    }

    public OnClose(e: Buffer | undefined = undefined) {
        this.callback(e)
        this.widget.close()
    }
}

export { Screenshot }