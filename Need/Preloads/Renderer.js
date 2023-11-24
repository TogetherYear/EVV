const { ipcRenderer } = require("electron")

const Renderer = {
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
    Ipc: {
        Send: (channel, ...args) => {
            return ipcRenderer.send(channel, ...args)
        },
        Invoke: (channel, ...args) => {
            return ipcRenderer.invoke(channel, ...args)
        },
        On: (channel, callback) => {
            return ipcRenderer.on(channel, (e, data) => {
                callback(data)
            })
        }
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
    },
    Message: {

    }
}

window.Renderer = Renderer