const { ipcRenderer } = require("electron")

const Renderer = {
    widget: {
        Min: () => {
            return ipcRenderer.send(`Renderer:Widget:Min:id`)
        },
        Max: () => {
            return ipcRenderer.send(`Renderer:Widget:Max:id`)
        },
        Close: () => {
            return ipcRenderer.send(`Renderer:Widget:Close:id`)
        },
        GetBounds: async () => {
            const bounds = await ipcRenderer.invoke('Renderer:Tool:Widget:Bounds')
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
    },
    Screen: {
        GetHoldCursor: async () => {
            const screen = await ipcRenderer.invoke('Renderer:Tool:Screen:Cursor')
            return screen
        }
    },
    Screenshot: {
        GetFocus: async () => {
            const buffer = await ipcRenderer.invoke('Renderer:Tool:Screenshot:Focus')
            return buffer
        },
        GetByIndex: async (index) => {
            const buffer = await ipcRenderer.invoke(`Renderer:Tool:Screenshot:Index`, index)
            return buffer
        },
        GetAll: async () => {
            const buffers = await ipcRenderer.invoke("Renderer:Tool:Screenshot:All")
            return buffers
        },
        GetEdit: async () => {
            const buffer = await ipcRenderer.invoke("Renderer:Tool:Screenshot:Edit")
            return buffer
        }
    },
}

window.Renderer = Renderer