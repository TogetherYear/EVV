import fs from 'fs'
import { ResourceLoad } from './ResourceLoad'

interface IConfigs {
    /**
     * 是否开启 Debug
     */
    debug: boolean
    /**
     * 软件版本
     */
    version: string
}

/**
 * 主线程 环境变量 在 Need/Configs 中配置 我这里啥都没有
 */
class Configuration {
    private constructor() { }

    private static instance = new Configuration()

    public configs: IConfigs = {
        debug: false,
        version: ""
    }

    public static get Instance() {
        return this.instance
    }

    public Run() {
        const data = fs.readFileSync(process.env.NODE_ENV === 'development' ? ResourceLoad.Instance.GetConfigByName('Development.json') : ResourceLoad.Instance.GetConfigByName('Production.json'), 'utf8')
        this.configs = JSON.parse(data)
    }
}

export { Configuration }