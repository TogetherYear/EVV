import fs from 'fs';
import { app, Menu } from 'electron';
import { Manager } from '@Main/Libs/Manager';

class Configuration extends Manager {
    public configs!: Main.IConfigs;

    public Run() {
        this.LoadConfig();
        this.SetDefault();
    }

    private LoadConfig() {
        const data = fs.readFileSync(process.env.NODE_ENV === 'development' ? this.ctx.ResourceLoad.GetConfigByName('Development') : this.ctx.ResourceLoad.GetConfigByName('Production'), 'utf8');
        this.configs = JSON.parse(data);
    }

    private SetDefault() {
        Menu.setApplicationMenu(null);
        app.commandLine.appendSwitch('wm-window-animations-disabled');
        process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    }
}

export { Configuration };
