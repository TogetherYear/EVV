import { app } from 'electron'
import path from 'path'
import fs from 'fs'

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

    public GetImageByName(name: string) {
        return app.isPackaged
            ? path.join(app.getPath('exe'), `/../resources/Need/Images/${name}`)
            : `Need/Images/${name}`
    }

    public GetConfigByName(name: string) {
        return app.isPackaged
            ? path.join(app.getPath('exe'), `/../resources/Need/Configs/${name}`)
            : `Need/Configs/${name}`
    }

    public GetPageByName(name: string = '/') {
        return app.isPackaged
            ? `file://${path.join(__dirname, `../render/index.html#${name}`)}`.replaceAll('\\', '/')
            : `http://localhost:6768#${name}`
    }

    public GetPreloadByName(name: string) {
        return app.isPackaged
            ? path.join(app.getPath('exe'), `/../resources/Need/Preloads/${name}.js`)
            : path.join(__dirname, `../../Need/Preloads/${name}.js`)
    }
}

export { ResourceLoad }