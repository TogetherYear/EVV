const { ipcRenderer } = require("electron")

const Renderer = {
    widget: {
        id: -1
    },
    Ipc: {
        Send: (channel, ...args) => {
            return ipcRenderer.send(channel, ...args)
        },
        Invoke: (channel, ...args) => {
            return ipcRenderer.invoke(channel, ...args)
        },
    },
    Screenshot: {
        GetFocus: async () => {
            const buffer = await ipcRenderer.invoke('Tool:Screenshot:Focus')
            return buffer
        },
        GetByIndex: async (index) => {
            const buffer = await ipcRenderer.invoke(`Tool:Screenshot:Index`, index)
            return buffer
        },
        GetAll: async () => {
            const buffers = await ipcRenderer.invoke("Tool:Screenshot:All")
            return buffers
        },
        GetEdit: async () => {
            const buffer = await ipcRenderer.invoke("Tool:Screenshot:Edit")
            return buffer
        }
    },
}

window.Renderer = Renderer