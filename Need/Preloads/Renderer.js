const { ipcRenderer } = require("electron")

window.Renderer = {
    widget: {
        id: -1
    },
    ipcRenderer: ipcRenderer
}