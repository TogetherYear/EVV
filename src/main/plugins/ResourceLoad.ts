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
        const files = fs.readdirSync(std)
        if (files.length == 0) {
            fs.rmdirSync(std)
        }
    }

    public GetImageByName(name: string) {
        return process.env.NODE_ENV === 'development'
            ? `Need/Images/${name}`
            : path.join(app.getPath('exe'), `/../resources/Need/Images/${name}`)
    }

    public GetConfigByName(name: string) {
        return process.env.NODE_ENV === 'development'
            ? `Need/Configs/${name}`
            : path.join(app.getPath('exe'), `/../resources/Need/Configs/${name}`)
    }

    public GetPageByName(name: string = '/') {
        return app.isPackaged
            ? `file://${path.join(__dirname, `../render/index.html#${name}`)}`.replaceAll('\\', '/')
            : `http://localhost:6768#${name}`
    }

    public GetPreloadByName(name: string) {
        return process.env.NODE_ENV === 'development'
            ? path.join(__dirname, `../../Need/Preloads/${name}.js`)
            : path.join(app.getPath('exe'), `/../resources/Need/Preloads/${name}.js`)
    }
}

export { ResourceLoad }