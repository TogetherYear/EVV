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
            NR: require(`${ResourceLoad.Instance.GetAddonByName("NR.win32-x64-msvc")}`)
        }
    }
}

export { NodeAddon }
