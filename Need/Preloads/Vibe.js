const { ipcRenderer } = require("electron")

window.EN_Vibe = {
    Max: () => {
        ipcRenderer.send("VesselMax")
    }
}