import fs from 'fs';
import { ResourceLoad } from '@Main/Manager/ResourceLoad';

class Configuration {
    public configs!: Main.IConfigs;

    public Run() {
        const data = fs.readFileSync(
            process.env.NODE_ENV === 'development'
                ? ResourceLoad.GetConfigByName('Development')
                : ResourceLoad.GetConfigByName('Production'),
            'utf8'
        );
        this.configs = JSON.parse(data);
    }
}

const ConfigurationInstance = new Configuration();

export { ConfigurationInstance as Configuration };
