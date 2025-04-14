import { BrowserWindow } from 'electron';
import { I } from '@Src/Instructions/I';
import { Manager } from '@Main/Libs/Manager';

class CustomWidget extends Manager {
    private widgets = new Map<string, { widget: BrowserWindow; lable: string }>();

    public Run() {}

    public CreateWindow(options: TSingleton.CustomWidgetOptions) {
        const target = this.widgets.get(options.label);
        if (!target) {
            const widget = new BrowserWindow({
                title: options.label,
                width: options.width || 1000,
                height: options.height || 560,
                useContentSize: true,
                frame: options.frame || true,
                backgroundColor: options.backgroundColor || '#ff13131a',
                alwaysOnTop: options.alwaysOnTop || false,
                transparent: options.transparent || false,
                skipTaskbar: options.skipTaskbar || false,
                icon: options.icon || this.ctx.ResourceLoad.GetImageByName('icon.ico'),
                show: options.show || true,
                webPreferences: {
                    devTools: this.ctx.Configuration.configs.debug,
                    preload: options.preload || this.ctx.ResourceLoad.GetPreloadByName('Renderer')
                }
            });
            widget.loadURL(options.url);

            if (this.ctx.Configuration.configs.debug) {
                widget.webContents.openDevTools();
            }

            this.RegisterWidget(options.label, widget);

            this.ctx.WindowPool.PostMessage({
                type: I.IpcRendererEvent.WidgetCreate,
                widgets: [I.IpcRendererWindow.Main],
                send: {
                    label: options.label
                }
            });

            widget.on('close', () => {
                this.DeleteWidget(options.label);
                this.ctx.WindowPool.PostMessage({
                    type: I.IpcRendererEvent.WidgetDestroy,
                    widgets: [I.IpcRendererWindow.Main],
                    send: {
                        label: options.label
                    }
                });
            });
        } else {
            target.widget.show();
        }
    }

    public FindWidget(id: number) {
        for (let w of this.widgets) {
            if (w[1].widget.webContents.id === id) {
                return w[1];
            }
        }
    }

    public RegisterWidget(label: string, widget: BrowserWindow) {
        this.widgets.set(label, { widget, lable: label });
    }

    public DeleteWidget(label: string) {
        this.widgets.delete(label);
    }
}

export { CustomWidget };
