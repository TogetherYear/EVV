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

    public Run() {
        global.NodeAddon = {
            Automatic: require(`${ResourceLoad.Instance.GetAddonByName("Automatic.win32-x64-msvc")}`),
            Image: require(`${ResourceLoad.Instance.GetAddonByName("Image.win32-x64-msvc")}`),
            Monitor: require(`${ResourceLoad.Instance.GetAddonByName("Monitor.win32-x64-msvc")}`),
            Serve: require(`${ResourceLoad.Instance.GetAddonByName("Serve.win32-x64-msvc")}`),
            Wallpaper: require(`${ResourceLoad.Instance.GetAddonByName("Wallpaper.win32-x64-msvc")}`),
            Window: require(`${ResourceLoad.Instance.GetAddonByName("Window.win32-x64-msvc")}`),
        }
    }
}

export { NodeAddon }
