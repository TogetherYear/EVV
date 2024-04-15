import fs from 'fs'
import { ResourceLoad } from '@main/manager/ResourceLoad'

class Configuration {
    private constructor() { }

    private static instance = new Configuration()

    public configs: Main.IConfigs = {
        debug: false,
        version: ""
    }

    public static get Instance() {
        return this.instance
    }

    public Run() {
        const data = fs.readFileSync(process.env.NODE_ENV === 'development' ? ResourceLoad.Instance.GetConfigByName('Development') : ResourceLoad.Instance.GetConfigByName('Production'), 'utf8')
        this.configs = JSON.parse(data)
    }
}

export { Configuration }