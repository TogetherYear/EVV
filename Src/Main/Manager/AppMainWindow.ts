import { BrowserWindow, Menu } from 'electron';
import { ResourceLoad } from '@Main/Manager/ResourceLoad';
import { Configuration } from '@Main/Manager/Configuration';
import { Window } from '@Main/Libs/Window';
import { I } from '@Src/Instructions/I';
import { WindowPool } from './WindowPool';

class AppMainWindow extends Window {
    public async Run() {
        this.CreateWidget();
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
            icon: ResourceLoad.GetImageByName('window.ico'),
            webPreferences: {
                devTools: Configuration.configs.debug,
                preload: ResourceLoad.GetPreloadByName('Renderer')
            }
        });

        this.widget.once('ready-to-show', () => {
            // this.widget.show()
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

        if (Configuration.configs.debug) {
            this.widget.webContents.openDevTools();
        }

        this.widget.loadURL(ResourceLoad.GetPageByName('Application'));

        WindowPool.RegisterWindow(I.IpcRendererWindow.Main, this);
    }
}

const AppMainWindowInstance = new AppMainWindow();

export { AppMainWindowInstance as AppMainWindow };
