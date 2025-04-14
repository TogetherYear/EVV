import { BrowserWindow } from 'electron';
import { I } from '@Src/Instructions/I';
import { Manager } from '@Main/Libs/Manager';

class AppMainWindow extends Manager {
    public async Run() {
        this.CreateWidget();
    }

    public widget!: BrowserWindow;

    private CreateWidget() {
        this.widget = new BrowserWindow({
            title: 'Application',
            show: false,
            resizable: true,
            useContentSize: true,
            frame: false,
            backgroundColor: '#13131a',
            icon: this.ctx.ResourceLoad.GetImageByName('icon.ico'),
            webPreferences: {
                devTools: this.ctx.Configuration.configs.debug,
                preload: this.ctx.ResourceLoad.GetPreloadByName('Renderer')
            }
        });

        //这样并不会生效 详情去issues看 链接：https://github.com/electron/electron/issues/26726
        this.widget.on('system-context-menu', (e) => {
            e.preventDefault();
        });

        //目前临时解决方法 链接：https://github.com/electron/electron/issues/24893#issuecomment-1109262719
        this.widget.hookWindowMessage(0x0116, () => {
            this.widget.setEnabled(false);
            this.widget.setEnabled(true);
        });

        this.widget.on('close', (e) => {
            e.preventDefault();
            this.widget.hide();
        });

        if (this.ctx.Configuration.configs.debug) {
            this.widget.webContents.openDevTools();
        }

        this.widget.loadURL(this.ctx.ResourceLoad.GetPageByName('Application'));

        this.ctx.WindowPool.RegisterWindow(I.IpcRendererWindow.Main, this);
    }
}

export { AppMainWindow };
