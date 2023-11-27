const { ipcRenderer } = require("electron")

const Renderer = {
    Listen: (callback) => {
        return ipcRenderer.on("RendererMessage", (e, data) => {
            callback(data)
        })
    },
    App: {
        Close: () => {
            return ipcRenderer.send(`Renderer:App:Close`)
        }
    },
    Widget: {
        Min: () => {
            return ipcRenderer.send(`Renderer:Widget:Min`)
        },
        Max: () => {
            return ipcRenderer.send(`Renderer:Widget:Max`)
        },
        Hide: () => {
            return ipcRenderer.send(`Renderer:Widget:Hide`)
        },
        Show: () => {
            return ipcRenderer.send(`Renderer:Widget:Show`)
        },
        Resize: (size) => {
            return ipcRenderer.send(`Renderer:Widget:Resize`, size)
        },
        Center: () => {
            return ipcRenderer.send(`Renderer:Widget:Center`)
        },
        SetPosition: (position) => {
            return ipcRenderer.send(`Renderer:Widget:Position`, position)
        },
        GetBounds: async () => {
            const bounds = await ipcRenderer.invoke('Renderer:Widget:Bounds')
            return bounds
        },
    },
    Screen: {
        GetHoldCursor: async () => {
            const screen = await ipcRenderer.invoke('Renderer:Screen:Cursor')
            return screen
        }
    },
    Screenshot: {
        GetFocus: async () => {
            const buffer = await ipcRenderer.invoke('Renderer:Screenshot:Focus')
            return buffer
        },
        GetByIndex: async (index) => {
            const buffer = await ipcRenderer.invoke(`Renderer:Screenshot:Index`, index)
            return buffer
        },
        GetAll: async () => {
            const buffers = await ipcRenderer.invoke("Renderer:Screenshot:All")
            return buffers
        }
    },
    Shell: {
        Beep: () => {
            return ipcRenderer.send(`Renderer:Shell:Beep`)
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