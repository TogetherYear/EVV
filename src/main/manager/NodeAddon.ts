
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
        if (command == D.NodeAddonCommand.Automatic) {
            //@ts-ignore
            const result = this.Automatic[methon as TSingleton.AutomaticMethonType](...args)
            return result
        }
        else if (command == D.NodeAddonCommand.Image) {
            //@ts-ignore
            const result = this.Image[methon as TSingleton.AutomaticMethonType](...args)
            return result
        }
        else if (command == D.NodeAddonCommand.Monitor) {
            if (methon == "GetAllMonitors") {
                const r = this.Monitor.GetAllMonitors().map(c => this.TransformObjectToRenderer(c, 0))
                return r
            }
            else if (methon == "GetMonitorFromPoint") {
                //@ts-ignore
                const r = this.TransformObjectToRenderer(this.Monitor.GetMonitorFromPoint(...args), 0)
                return r
            }
            else if (methon == "GetCurrentMouseMonitor") {
                const r = this.TransformObjectToRenderer(this.Monitor.GetCurrentMouseMonitor(), 0)
                return r
            }
            else if (methon == "GetPrimaryMonitor") {
                const r = this.TransformObjectToRenderer(this.Monitor.GetPrimaryMonitor(), 0)
                return r
            }
        }
        else if (command == D.NodeAddonCommand.Serve) {
            //@ts-ignore
            const result = this.Serve[methon as TSingleton.AutomaticMethonType](...args)
            return result
        }
        else if (command == D.NodeAddonCommand.Wallpaper) {
            //@ts-ignore
            const result = this.Wallpaper[methon as TSingleton.AutomaticMethonType](...args)
            return result
        }
        else if (command == D.NodeAddonCommand.Window) {
            if (methon == "GetAllWindows") {
                const r = this.Window.GetAllWindows().map(c => this.TransformObjectToRenderer(c, 1))
                return r
            }
        }
        return null
    }

    private TransformObjectToRenderer(o: D.NodeAddon.IMonitor | D.NodeAddon.IWindow | D.NodeAddon.Color | D.NodeAddon.Point, type: number) {
        if (type == 0) {
            const current = o as D.NodeAddon.IMonitor
            const result: Omit<D.NodeAddon.IMonitor, "Capture"> = {
                id: current.id,
                name: current.name,
                x: current.x,
                y: current.y,
                width: current.width,
                height: current.height,
                rotation: current.rotation,
                scaleFactor: current.scaleFactor,
                frequency: current.frequency,
                isPrimary: current.isPrimary,
            }
            return result
        }
        else if (type == 1) {
            const current = o as D.NodeAddon.IWindow
            const result: Omit<D.NodeAddon.IWindow, "Capture"> = {
                id: current.id,
                title: current.title,
                appName: current.appName,
                x: current.x,
                y: current.y,
                width: current.width,
                height: current.height,
                isMinimized: current.isMinimized,
                isMaximized: current.isMaximized,
            }
            return result
        }
        else if (type == 2) {
            const current = o as D.NodeAddon.Color
            const result: D.NodeAddon.Color = {
                r: current.r,
                g: current.g,
                b: current.b,
                a: current.a,
            }
            return result
        }
        else if (type == 3) {
            const current = o as D.NodeAddon.Point
            const result: D.NodeAddon.Point = {
                x: current.x,
                y: current.y,
            }
            return result
        }
    }
}

export { NodeAddon }
