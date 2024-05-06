
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

    public ExeAddon(command: D.NodeAddonCommand, methon: TSingleton.NodeAddonMethonType, arg: Record<string, unknown>) {
        if (command == D.NodeAddonCommand.Automatic) {
            if (methon == "GetMousePosition") {
                const result = this.TransformPointToRenderer(this.Automatic.GetMousePosition())
                return result
            }
            else if (methon == "SetMousePosition") {
                const result = this.Automatic.SetMousePosition(arg.x as number, arg.y as number)
                return result
            }
            else if (methon == "SetButtonClick") {
                const result = this.Automatic.SetButtonClick(arg.button as D.NodeAddon.MosueButton)
                return result
            }
            else if (methon == "SetButtonToggle") {
                const result = this.Automatic.SetButtonToggle(arg.button as D.NodeAddon.MosueButton, arg.down as boolean)
                return result
            }
            else if (methon == "SetMouseScroll") {
                const result = this.Automatic.SetMouseScroll(arg.direction as D.NodeAddon.ScrollDirection, arg.clicks as number)
                return result
            }
            else if (methon == "GetColorFromPosition") {
                const result = this.TransformColorToRenderer(this.Automatic.GetColorFromPosition(arg.x as number, arg.y as number))
                return result
            }
            else if (methon == "GetCurrentPositionColor") {
                const result = this.TransformColorToRenderer(this.Automatic.GetCurrentPositionColor())
                return result
            }
            else if (methon == "WriteText") {
                const result = this.Automatic.WriteText(arg.content as string)
                return result
            }
            else if (methon == "SetKeysToggle") {
                const result = this.Automatic.SetKeysToggle(arg.keys as Array<D.NodeAddon.ToggleKey>)
                return result
            }
            else if (methon == "SetKeysClick") {
                const result = this.Automatic.SetKeysClick(arg.content as Array<D.NodeAddon.KeyboardKey>)
                return result
            }
        }
        else if (command == D.NodeAddonCommand.Image) {
            if (methon == "ConvertImageFormat") {
                const result = this.Image.ConvertImageFormat(arg.originPath as string, arg.convertPath as string, arg.options as D.NodeAddon.ConvertOptions)
                return result
            }
        }
        else if (command == D.NodeAddonCommand.Monitor) {
            if (methon == "GetAllMonitors") {
                const result = this.Monitor.GetAllMonitors().map(c => this.TransformMonitorToRenderer(c))
                return result
            }
            else if (methon == "GetMonitorFromPoint") {
                const result = this.TransformMonitorToRenderer(this.Monitor.GetMonitorFromPoint(arg.x as number, arg.y as number))
                return result
            }
            else if (methon == "GetCurrentMouseMonitor") {
                const result = this.TransformMonitorToRenderer(this.Monitor.GetCurrentMouseMonitor())
                return result
            }
            else if (methon == "GetPrimaryMonitor") {
                const result = this.TransformMonitorToRenderer(this.Monitor.GetPrimaryMonitor())
                return result
            }
        }
        else if (command == D.NodeAddonCommand.Serve) {
            if (methon == "CreateStaticFileServe") {
                /**
                 * 自己用的时候 去用 子线程调用这个方法 不要去阻塞主线程
                 */
                const result = this.Serve.CreateStaticFileServe(arg.path as string, arg.onOpen as (...args: Array<unknown>) => unknown)
                return result
            }
        }
        else if (command == D.NodeAddonCommand.Wallpaper) {
            if (methon == "GetWallpaper") {
                const result = this.Wallpaper.GetWallpaper()
                return result
            }
            else if (methon == "SetWallpaper") {
                const result = this.Wallpaper.SetWallpaper(arg.path as string, arg.mode as D.NodeAddon.WallpaperMode)
                return result
            }
        }
        else if (command == D.NodeAddonCommand.Window) {
            if (methon == "GetAllWindows") {
                const result = this.Window.GetAllWindows().map(c => this.TransformWindowToRenderer(c))
                return result
            }
        }
        return null
    }

    private TransformMonitorToRenderer(o: D.NodeAddon.IMonitor) {
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

    private TransformWindowToRenderer(o: D.NodeAddon.IWindow) {
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

    private TransformColorToRenderer(o: D.NodeAddon.Color) {
        const current = o as D.NodeAddon.Color
        const result: D.NodeAddon.Color = {
            r: current.r,
            g: current.g,
            b: current.b,
            a: current.a,
        }
        return result
    }

    private TransformPointToRenderer(o: D.NodeAddon.Point) {
        const current = o as D.NodeAddon.Point
        const result: D.NodeAddon.Point = {
            x: current.x,
            y: current.y,
        }
        return result
    }
}

export { NodeAddon }
