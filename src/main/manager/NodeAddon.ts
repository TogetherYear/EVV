import { DM } from "@main/decorators/DM"
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

    private automatic!: DM.NodeAddon.Automatic

    private image!: DM.NodeAddon.Image

    private monitor!: DM.NodeAddon.Monitor

    private serve!: DM.NodeAddon.Serve

    private wallpaper!: DM.NodeAddon.Wallpaper

    private window!: DM.NodeAddon.Window

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
}

export { NodeAddon }
