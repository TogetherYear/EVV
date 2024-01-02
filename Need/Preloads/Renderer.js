const { ipcRenderer } = require("electron")

const Renderer = {
    Listen: (callback) => {
        return ipcRenderer.on("RendererMessage", (e, data) => {
            callback(data)
        })
    },
    App: {
        Close: () => {
            return ipcRenderer.postMessage(`Renderer:App:Close`)
        }
    },
    Widget: {
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
    }
}

window.Renderer = Renderer