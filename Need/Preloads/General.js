const { ipcRenderer } = require("electron")

window.General = {
    Widget: {
        Max: () => {
            ipcRenderer.send("VesselMax")
        }
    },
    ipcRenderer: ipcRenderer
}