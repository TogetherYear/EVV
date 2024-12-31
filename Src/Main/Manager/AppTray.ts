import { ResourceLoad } from '@Main/Manager/ResourceLoad';
import { Tray, BrowserWindow, screen } from 'electron';
import { AppMainWindow } from '@Main/Manager/AppMainWindow';
import { Configuration } from '@Main/Manager/Configuration';
import { WindowPool } from '@Main/Manager/WindowPool';
import { I } from '@Src/Instructions/I';
import { Manager } from '@Main/Libs/Manager';

class AppTray extends Manager {
    public tray!: Tray;

    private flashTimer: NodeJS.Timeout | null = null;

    public widget!: BrowserWindow;

    public Run() {
        this.CreateWidget();
        this.CreateTray();
    }

    private CreateWidget() {
        this.widget = new BrowserWindow({
            title: 'Tray',
            show: false,
            resizable: false,
            useContentSize: true,
            frame: false,
            backgroundColor: '#00212121',
            alwaysOnTop: true,
            transparent: true,
            skipTaskbar: true,
            hasShadow: false,
            icon: ResourceLoad.GetImageByName('tray.ico'),
            webPreferences: {
                devTools: Configuration.configs.debug,
                preload: ResourceLoad.GetPreloadByName('Renderer')
            }
        });

        this.widget.on('blur', () => {
            this.widget.hide();
        });

        if (Configuration.configs.debug) {
            this.widget.webContents.openDevTools();
        }

        this.widget.loadURL(ResourceLoad.GetPageByName('Tray'));

        WindowPool.RegisterWindow(I.IpcRendererWindow.Tray, this);
    }

    private CreateTray() {
        if (process.platform === 'win32') {
            this.tray = new Tray(ResourceLoad.GetImageByName('tray.ico'));

            this.tray.setToolTip('去码头整点薯条');

            this.tray.on('right-click', () => {
                this.FixPositionToCursor();
            });

            this.tray.on('double-click', () => {
                AppMainWindow.widget.show();
            });
        }
    }

    private FixPositionToCursor() {
        const point = screen.getCursorScreenPoint();
        const size = this.widget.getSize();
        this.widget.setPosition(point.x - size[0], point.y - size[1]);
        this.widget.show();
    }

    public OnSetIcon(icon: string) {
        const showIcon = ResourceLoad.GetImageByName(icon);
        this.tray.setImage(showIcon);
    }

    public OnSetTooltip(tooltip: string) {
        this.tray.setToolTip(tooltip);
    }

    public OnFlash(icon: string) {
        let show = true;
        const emptyIcon = ResourceLoad.GetImageByName('icon.ico');
        const showIcon = ResourceLoad.GetImageByName(icon);
        this.flashTimer = setInterval(() => {
            if (show) {
                this.tray.setImage(emptyIcon);
            } else {
                this.tray.setImage(showIcon);
            }
            show = !show;
        }, 700);
    }

    public OnStopFlash(icon: string) {
        const showIcon = ResourceLoad.GetImageByName(icon);
        if (this.flashTimer) {
            clearInterval(this.flashTimer);
            this.flashTimer = null;
        }
        this.tray.setImage(showIcon);
    }
}

const AppTrayInstance = new AppTray();

export { AppTrayInstance as AppTray };
