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
        Resize: (size) => {
            return ipcRenderer.postMessage(`Renderer:Widget:Resize`, size)
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
        }
    },
    Shell: {
        Beep: () => {
            return ipcRenderer.postMessage(`Renderer:Shell:Beep`)
        },
    },
    Resource: {
        GetPathByName: async (name) => {
            const path = await ipcRenderer.invoke(`Renderer:Resource:Name`, name)
            return path
        }
    },
    NodeAddon: {
        EmitNR: async (options) => {
            const result = await ipcRenderer.invoke(`Renderer:Addon:NR`, options)
            return result
        }
    }
}

window.Renderer = Renderer