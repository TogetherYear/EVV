import { Tray, BrowserWindow, screen } from 'electron';
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
            backgroundColor: '#0013131a',
            alwaysOnTop: true,
            transparent: true,
            skipTaskbar: true,
            hasShadow: false,
            icon: this.ctx.ResourceLoad.GetImageByName('tray.ico'),
            webPreferences: {
                devTools: this.ctx.Configuration.configs.debug,
                preload: this.ctx.ResourceLoad.GetPreloadByName('Renderer')
            }
        });

        this.widget.on('blur', () => {
            this.widget.hide();
        });

        if (this.ctx.Configuration.configs.debug) {
            this.widget.webContents.openDevTools();
        }

        this.widget.loadURL(this.ctx.ResourceLoad.GetPageByName('Tray'));

        this.ctx.WindowPool.RegisterWindow(I.IpcRendererWindow.Tray, this);
    }

    private CreateTray() {
        if (process.platform === 'win32') {
            this.tray = new Tray(this.ctx.ResourceLoad.GetImageByName('tray.ico'));

            this.tray.setToolTip('去码头整点薯条');

            this.tray.on('right-click', () => {
                this.FixPositionToCursor();
            });

            this.tray.on('double-click', () => {
                this.ctx.AppMainWindow.widget.show();
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
        const showIcon = this.ctx.ResourceLoad.GetImageByName(icon);
        this.tray.setImage(showIcon);
    }

    public OnSetTooltip(tooltip: string) {
        this.tray.setToolTip(tooltip);
    }

    public OnFlash(icon: string) {
        let show = true;
        const emptyIcon = this.ctx.ResourceLoad.GetImageByName('icon.ico');
        const showIcon = this.ctx.ResourceLoad.GetImageByName(icon);
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
        const showIcon = this.ctx.ResourceLoad.GetImageByName(icon);
        if (this.flashTimer) {
            clearInterval(this.flashTimer);
            this.flashTimer = null;
        }
        this.tray.setImage(showIcon);
    }
}

export { AppTray };
