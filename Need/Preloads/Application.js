const { ipcRenderer } = require("electron")

window.Application = {
    Widget: {
        Max: () => {
            ipcRenderer.send("ApplicationMax")
        }
    },
    ipcRenderer: ipcRenderer
}