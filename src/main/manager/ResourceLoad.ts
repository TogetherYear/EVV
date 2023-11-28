import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import { CustomProtocol } from '@main/manager/CustomProtocol'

class ResourceLoad {
    private constructor() { }

    private static instance = new ResourceLoad()

    public static get Instance() {
        return this.instance
    }

    public Run() {
        this.InitBat()
    }

    private InitBat() {
        const std = path.join(app.getPath('temp'), '/screenCapture')
        if (fs.existsSync(std)) {
            const files = fs.readdirSync(std)
            if (files.length == 0) {
                fs.rmdirSync(std)
            }
        }
    }

    public GetPageByName(name: string = '/') {
        return app.isPackaged
            ? `file://${path.join(__dirname, `../render/index.html#${name}`)}`.replaceAll('\\', '/')
            : `http://localhost:6768#${name}`
    }

    public GetExtraFolder() {
        return app.isPackaged
            ? path.join(app.getPath('exe'), `/../resources/Need`)
            : path.join(__dirname, `../../Need`)
    }

    public GetImageByName(name: string) {
        return `${this.GetExtraFolder()}/Images/${name}`
    }

    public GetConfigByName(name: string) {
        return `${this.GetExtraFolder()}/Configs/${name}.json`
    }

    public GetPreloadByName(name: string) {
        return `${this.GetExtraFolder()}/Preloads/${name}.js`
    }

    public GetChildProcessesFolder() {
        return `${this.GetExtraFolder()}/ChildProcesses`
    }

    public GetChildProcessesByName(name: string) {
        return `${this.GetChildProcessesFolder()}/${name}.js`
    }

    /**
     * 渲染进程使用
     */
    public GetResourcePathByName(name: string) {
        return `${this.GetExtraFolder()}/${name}`.replace('file', CustomProtocol.Instance.fileProtocol)
    }
}

export { ResourceLoad }