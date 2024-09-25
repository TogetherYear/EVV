import { BrowserWindow, Menu } from 'electron';
import { ResourceLoad } from '@Main/Manager/ResourceLoad';
import { Configuration } from '@Main/Manager/Configuration';
import { TWindow } from '@Main/Libs/TWindow';
import { I } from '@Src/Instructions/I';
import { WindowPool } from './WindowPool';

class AppMainWindow extends TWindow {
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
                // 同源
                webSecurity: false,
                // 渲染进程集成 node
                nodeIntegration: false,
                // 是否独立线程运行 api 和 preload
                contextIsolation: false,
                // 设为false则禁用devtool开发者调试工具
                devTools: Configuration.configs.debug,
                // https 运行 http
                allowRunningInsecureContent: true,
                // 预加载脚本 仅为示例
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
            this.widget.hide();
            e.preventDefault();
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
