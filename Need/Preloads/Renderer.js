const { ipcRenderer } = require("electron")

const Renderer = {
    App: {
        Close: () => {
            return ipcRenderer.postMessage(`Renderer:App:Close`)
        },
        Relaunch: () => {
            return ipcRenderer.postMessage(`Renderer:App:Relaunch`)
        },
        IsAutostart: async () => {
            const enable = await ipcRenderer.invoke('Renderer:App:IsAutostart')
            return enable
        },
        SetAutostart: (enable) => {
            return ipcRenderer.postMessage(`Renderer:App:SetAutostart`, enable)
        }
    },
    Tray: {
        SetTrayIcon: (icon) => {
            return ipcRenderer.postMessage(`Renderer:Tray:Icon`, icon)
        },
        SetTrayTooltip: (tooltip) => {
            return ipcRenderer.postMessage(`Renderer:Tray:Tooltip`, tooltip)
        },
        Flash: (icon) => {
            return ipcRenderer.postMessage(`Renderer:Tray:Flash`, icon)
        },
        StopFlash: (icon) => {
            return ipcRenderer.postMessage(`Renderer:Tray:StopFlash`, icon)
        },
    },
    Widget: {
        Listen: (callback) => {
            return ipcRenderer.on("RendererMessage", (e, data) => {
                callback(data)
            })
        },
        Min: () => {
            return ipcRenderer.postMessage(`Renderer:Widget:Min`)
        },
        Max: () => {
            return ipcRenderer.postMessage(`Renderer:Widget:Max`)
        },
        Hide: () => {
            return ipcRenderer.postMessage(`Renderer:Widget:Hide`)
        },
        Show: () => {
            return ipcRenderer.postMessage(`Renderer:Widget:Show`)
        },
        SetSize: (size) => {
            return ipcRenderer.postMessage(`Renderer:Widget:Size`, size)
        },
        Center: () => {
            return ipcRenderer.postMessage(`Renderer:Widget:Center`)
        },
        SetPosition: (position) => {
            return ipcRenderer.postMessage(`Renderer:Widget:Position`, position)
        },
        GetBounds: async () => {
            const bounds = await ipcRenderer.invoke('Renderer:Widget:Bounds')
            return bounds
        },
        PostMessage: (e) => {
            return ipcRenderer.postMessage(`Renderer:Widget:Message`, e)
        }
    },
    Screen: {
        GetHoldCursor: async () => {
            const screen = await ipcRenderer.invoke('Renderer:Screen:Cursor')
            return screen
        },
        GetAll: async () => {
            const screens = await ipcRenderer.invoke('Renderer:Screen:All')
            return screens
        },
        GetPrimary: async () => {
            const screens = await ipcRenderer.invoke('Renderer:Screen:Primary')
            return screens
        },
    },
    Shell: {
        Beep: () => {
            return ipcRenderer.postMessage(`Renderer:Shell:Beep`)
        },
        OpenInFolder: (path) => {
            return ipcRenderer.postMessage(`Renderer:Shell:Folder`, path)
        },
        OpenPathByDefault: (path) => {
            return ipcRenderer.postMessage(`Renderer:Shell:Default`, path)
        },
    },
    Resource: {
        GetPathByName: async (name) => {
            const path = await ipcRenderer.invoke(`Renderer:Resource:Name`, name)
            return path
        }
    },
}

window.Renderer = Renderer