import fs from 'fs';
import { ResourceLoad } from '@Main/Manager/ResourceLoad';
import { app, Menu } from 'electron';
import { Manager } from '@Main/Libs/Manager';

class Configuration extends Manager {
    public configs!: Main.IConfigs;

    public Run() {
        this.LoadConfig();
        this.SetDefault();
    }

    private LoadConfig() {
        const data = fs.readFileSync(process.env.NODE_ENV === 'development' ? ResourceLoad.GetConfigByName('Development') : ResourceLoad.GetConfigByName('Production'), 'utf8');
        this.configs = JSON.parse(data);
    }

    private SetDefault() {
        Menu.setApplicationMenu(null);
        if (this.configs.debug) {
            app.commandLine.appendSwitch('wm-window-animations-disabled');
            process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
        } else {
        }
    }
}

const ConfigurationInstance = new Configuration();

export { ConfigurationInstance as Configuration };
