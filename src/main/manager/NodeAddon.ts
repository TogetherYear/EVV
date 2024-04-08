
import { D } from "@decorators/D"
import { ResourceLoad } from "@main/manager/ResourceLoad"

/**
 * node 拓展
 */
class NodeAddon {
    private constructor() { }

    private static instance: NodeAddon = new NodeAddon()

    public static get Instance(): NodeAddon {
        return this.instance
    }

    private automatic!: D.NodeAddon.Automatic

    private image!: D.NodeAddon.Image

    private monitor!: D.NodeAddon.Monitor

    private serve!: D.NodeAddon.Serve

    private wallpaper!: D.NodeAddon.Wallpaper

    private window!: D.NodeAddon.Window

    public get Automatic() {
        return this.automatic
    }

    public get Image() {
        return this.image
    }

    public get Monitor() {
        return this.monitor
    }

    public get Serve() {
        return this.serve
    }

    public get Wallpaper() {
        return this.wallpaper
    }

    public get Window() {
        return this.window
    }

    public Run() {
        this.automatic = require(`${ResourceLoad.Instance.GetAddonByName("Automatic.win32-x64-msvc")}`)
        this.image = require(`${ResourceLoad.Instance.GetAddonByName("Image.win32-x64-msvc")}`)
        this.monitor = require(`${ResourceLoad.Instance.GetAddonByName("Monitor.win32-x64-msvc")}`)
        this.serve = require(`${ResourceLoad.Instance.GetAddonByName("Serve.win32-x64-msvc")}`)
        this.wallpaper = require(`${ResourceLoad.Instance.GetAddonByName("Wallpaper.win32-x64-msvc")}`)
        this.window = require(`${ResourceLoad.Instance.GetAddonByName("Window.win32-x64-msvc")}`)
    }

    public ExeAddon(command: D.NodeAddonCommand, methon: TSingleton.NodeAddonMethonType, args: Array<unknown>) {
        return new Promise((resolve, reject) => {
            if (command == D.NodeAddonCommand.Automatic) {
                //@ts-ignore
                const result = this.Automatic[methon as TSingleton.AutomaticMethonType](...args)
                resolve(result)
            }
            else if (command == D.NodeAddonCommand.Image) {
                //@ts-ignore
                const result = this.Image[methon as TSingleton.AutomaticMethonType](...args)
                resolve(result)
            }
            else if (command == D.NodeAddonCommand.Monitor) {
                //@ts-ignore
                const result = this.Monitor[methon as TSingleton.AutomaticMethonType](...args)
                resolve(result)
            }
            else if (command == D.NodeAddonCommand.Serve) {
                //@ts-ignore
                const result = this.Serve[methon as TSingleton.AutomaticMethonType](...args)
                resolve(result)
            }
            else if (command == D.NodeAddonCommand.Wallpaper) {
                //@ts-ignore
                const result = this.Wallpaper[methon as TSingleton.AutomaticMethonType](...args)
                resolve(result)
            }
            else if (command == D.NodeAddonCommand.Window) {
                //@ts-ignore
                const result = this.Window[methon as TSingleton.AutomaticMethonType](...args)
                resolve(result)
            }
        })
    }
}

export { NodeAddon }
